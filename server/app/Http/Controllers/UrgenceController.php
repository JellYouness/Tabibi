<?php

namespace App\Http\Controllers;

use App\Models\Urgence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UrgenceController extends Controller
{
    public function index(){
        $urgence = Urgence::all();
        return response()->json($urgence);
    }
    
    public function show( $id){
        $urgence = Urgence::find($id);

        if(is_null($urgence)){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not found!' 
                ],400);
        }

        return response()->json([
            'message'=> 'Urgence fetched successfully',
            'data'=> $urgence
            ]);
    }

    
    public function store(Request $request){
        $input = $request->all();
        $validator = Validator::make($input,[
            'libelle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1024'],
            'image' => ['nullable', 'string'],
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

        $urgence =  Urgence::create($input);

        return response()->json([
            'message'=> 'Urgence created successfully',
            'data'=> $urgence
            ]);
    }


    public function update(Request $request, Urgence $urgence){
       
        $input = $request->all();
        $validator = Validator::make($input,[
            'libelle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1024'],
            'image' => ['nullable', 'string'],
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

        $urgence->fill($input);
        $urgence->save();

        return response()->json([
            'success'=> true,
            'message'=> 'product updated successfully',
            'data'=> $urgence
            ]);
    }


    public function destroy(Urgence $urgence){
        
        $urgence->delete();

        return response()->json([
            'message'=> 'product deleted successfully',
            'data'=> $urgence
            ]);
    }
}
