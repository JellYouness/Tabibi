<?php

namespace App\Http\Controllers;

use App\Models\Specialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SpecialiteController extends Controller
{
    public function index(){
        $specialite = Specialite::all();
        return response()->json($specialite);
    }
    
    public function show( $id){
        $specialite = Specialite::find($id);

        if(is_null($specialite)){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not found!' 
                ],400);
        }

        return response()->json([
            'message'=> 'Specialite fetched successfully',
            'data'=> $specialite
            ]);
    }

    
    public function store(Request $request){
        $input = $request->all();
        $validator = Validator::make($input,[
            'nom' => ['required', 'string', 'max:255']
        ]);

        if( $validator->fails()){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not stored',
                'error'=> $validator->errors()
                ],400);
        }

        $specialite =  Specialite::create($input);

        return response()->json([
            'message'=> 'Specialite created successfully',
            'data'=> $specialite
            ]);
    }


    public function update(Request $request, Specialite $specialite){
       
        $input = $request->all();
        $validator = Validator::make($input,[
            'nom' => ['required', 'string', 'max:255']
        ]);

        if( $validator->fails()){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not stored',
                'error'=> $validator->errors()
                ],400);
        }
        
        $specialite->fill($input);
        $specialite->save();

        return response()->json([
            'success'=> true,
            'message'=> 'product updated successfully',
            'data'=> $specialite
            ]);
    }


    public function destroy(Specialite $specialite){
        
        $specialite->delete();

        return response()->json([
            'message'=> 'product deleted successfully',
            'data'=> $specialite
            ]);
    }
}
