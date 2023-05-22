<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    public function index(){
        $categorie = Categorie::all();
        return response()->json($categorie);
    }
    
    public function show( $id){
        $categorie = Categorie::find($id);

        if(is_null($categorie)){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not found!' 
                ],400);
        }

        return response()->json([
            'message'=> 'Categorie fetched successfully',
            'data'=> $categorie
            ]);
    }

    
    public function store(Request $request){
        $input = $request->all();
        $validator = Validator::make($input,[
            'libelle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1024'],
            'image' => ['nullable', 'string'],
            'sous_type_id' => ['required', 'exists:sous_types,id'],
        ]);

        if( $validator->fails()){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not stored',
                'error'=> $validator->errors()
                ],400);
        }
        
        if($request->image){
        $base64 = explode(",", $request->image);
                $image = base64_decode($base64[1]);
                $filename = 'images/'.time() . '.' . 'png';
                Storage::put('public/'.$filename, $image);
                $input['image'] = $filename;
        }

        $categorie =  Categorie::create($input);

        return response()->json([
            'message'=> 'Categorie created successfully',
            'data'=> $categorie
            ]);
    }


    public function update(Request $request, Categorie $categorie){
       
        $input = $request->all();
        $validator = Validator::make($input,[
            'libelle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1024'],
            'image' => ['nullable', 'string'],
            'sous_type_id' => ['required', 'exists:sous_types,id'],
        ]);

        if( $validator->fails()){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not stored',
                'error'=> $validator->errors()
                ],400);
        }
        
        if($request->image){
        $base64 = explode(",", $request->image);
                $image = base64_decode($base64[1]);
                $filename = 'images/'.time() . '.' . 'png';
                Storage::put('public/'.$filename, $image);
                $input['image'] = $filename;
        }

        $categorie->fill($input);
        $categorie->save();

        return response()->json([
            'success'=> true,
            'message'=> 'product updated successfully',
            'data'=> $categorie
            ]);
    }


    public function destroy(Categorie $categorie){
        
        $categorie->delete();

        return response()->json([
            'message'=> 'product deleted successfully',
            'data'=> $categorie
            ]);
        }
}
