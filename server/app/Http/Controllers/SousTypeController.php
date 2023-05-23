<?php

namespace App\Http\Controllers;

use App\Models\SousType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SousTypeController extends Controller
{
    public function index(){
        $sous_type = SousType::all();
        return response()->json($sous_type);
    }

    public function index_fk($id){
        $sous_type = SousType::where('urgence_id', $id)->get();
        return response()->json($sous_type);
    }
    
    public function show($id){
        $sous_type = SousType::find($id);

        if(is_null($sous_type)){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not found!' 
                ],400);
        }

        return response()->json([
            'message'=> 'SousType fetched successfully',
            'data'=> $sous_type
            ]);
    }

    
    public function store(Request $request){
        $input = $request->all();
        $validator = Validator::make($input,[
            'libelle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1024'],
            'image' => ['nullable', 'string'],
            'urgence_id' => ['required', 'exists:urgences,id'],
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

        $sous_type =  SousType::create($input);

        return response()->json([
            'message'=> 'SousType created successfully',
            'data'=> $sous_type
            ]);
    }


    public function update(Request $request){
       
        $input = $request->all();
        $validator = Validator::make($input,[
            'libelle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1024'],
            'image' => ['nullable', 'string'],
            'urgence_id' => ['required', 'exists:urgences,id'],
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

        $sous_type=SousType::findOrFail($request->id);
        $sous_type->update($request->all());

        return response()->json([
            'success'=> true,
            'message'=> 'product updated successfully',
            'data'=> $sous_type
            ]);
    }


    public function destroy($id){
        
        $sous_type=SousType::findOrFail($id);
        $sous_type->delete();

        return response()->json([
            'message'=> 'product deleted successfully',
            'data'=> $sous_type
            ]);
        }
}
