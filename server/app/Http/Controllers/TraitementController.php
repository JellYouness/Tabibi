<?php

namespace App\Http\Controllers;

use App\Models\Traitement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TraitementController extends Controller
{
    public function index(){
        $traitements = Traitement::with(['patient','medecin.specialite','categorie.sous_type.urgence'])
        ->latest()
        ->get();
        return response()->json($traitements);
    }

    public function index_patient($id){
        // TODO:get the latest 
        $traitement = Traitement::with(['patient','medecin.specialite','categorie.sous_type.urgence'])
        ->where('patient_id', $id)
        ->latest()
        ->get();
        return response()->json($traitement);
    }
    
    public function index_medecin($id){
        // TODO:get the latest 
       $traitement = Traitement::with(['patient','medecin.specialite','categorie.sous_type.urgence'])
        ->where('medecin_id', $id)
        ->latest()
        ->get();
        return response()->json($traitement);
    }

    public function index_consulte(){
        $traitement = Traitement::with(['patient','medecin.specialite','categorie.sous_type.urgence'])
        ->where('etat', 1)
        ->latest()
        ->get();
        return response()->json($traitement);
    }

    public function index_nonconsulte(){
        $traitement = Traitement::with(['patient','categorie.sous_type.urgence'])
        ->where('etat', 0)->latest()
        ->get();
        return response()->json($traitement);
    }
    
    public function show($id){
        $traitement = Traitement::find($id);

        if(is_null($traitement)){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not found!' 
                ],400);
        }

        return response()->json([
            'message'=> 'Traitement fetched successfully',
            'data'=> $traitement
            ]);
    }

    public function store(Request $request){
        $input = $request->all();
        $validator = Validator::make($input,[
             'date' => ['required', 'date'],
             'etat' => ['required', 'boolean'],
             'description' => ['required', 'string'],
             'reponse' => ['nullable', 'string'],
             'categorie_id' => ['required', 'exists:categories,id'],
             'patient_id' => ['required', 'exists:patients,id'],
             'medecin_id' => ['nullable', 'exists:medecins,id'],
        ]);

        if( $validator->fails()){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not stored',
                'error'=> $validator->errors()
                ],400);
        }

        $traitement =  Traitement::create($input);

        return response()->json([
            'message'=> 'Traitement created successfully',
            'data'=> $traitement
            ]);
    }

    public function update(Request $request, Traitement $traitement){
       
        $input = $request->all();
        $validator = Validator::make($input,[
             'etat' => ['boolean'],
             'description' => ['string'],
             'reponse' => ['string'],
             'medecin_id' => ['nullable', 'exists:medecins,id'],
        ]);

        if( $validator->fails()){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not stored',
                'error'=> $validator->errors()
                ],400);
        }
        
        $traitement->fill($input);
        $traitement->save();

        return response()->json([
            'success'=> true,
            'message'=> 'product updated successfully',
            'data'=> $traitement
            ]);
    }

    public function destroy(Traitement $traitement){
        
        $traitement->delete();

        return response()->json([
            'message'=> 'product deleted successfully',
            'data'=> $traitement
            ]);
    }
}
