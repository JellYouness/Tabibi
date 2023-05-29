<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PatientController extends Controller
{
    public function index(){
        $patient = Patient::all();
        return response()->json($patient);
    }
    
    public function show( $id){
        $patient = Patient::find($id);

        if(is_null($patient)){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not found!' 
                ],400);
        }

        return response()->json([
            'message'=> 'Patient fetched successfully',
            'data'=> $patient
            ]);
    }

    
    public function store(Request $request){
        $input = $request->all();
        $validator = Validator::make($input,[
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'cin' => ['required', 'string', 'max:10'],
            'email' => ['required', 'email', 'max:255'],
            'telephone' => ['required', 'numeric', 'digits_between:8,15'],
            'naissance' => ['required', 'date'],
            'civilité' => ['required', 'in:male,female'],
            'adresse' =>['required', 'string'],
            'password' =>['nullable', 'string'],
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
        $input['password'] = bcrypt($request->password);
        $patient =  Patient::create($input);

        $user = User::create([
            'email' => $patient->email,
            'password' => $patient->password,
            'role' => 'patient',
            'id_fk' => $patient->id,
        ]);

        return response()->json([
            'message'=> 'Patient created successfully',
            'data'=> $patient
            ]);
    }


    public function update(Request $request, Patient $patient){
       
        $input = $request->all();
        $validator = Validator::make($input,[
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'cin' => ['required', 'string', 'max:10'],
            'email' => ['required', 'email', 'max:255'],
            'telephone' => ['required', 'numeric', 'digits_between:8,15'],
            'naissance' => ['required', 'date'],
            'civilité' => ['required', 'in:male,female'],
            'adresse' =>['required', 'string'],
            'password' =>['nullable','string'],
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

        $patient->fill($input);
        $patient->save();

        return response()->json([
            'success'=> true,
            'message'=> 'product updated successfully',
            'data'=> $patient
            ]);
    }


    public function destroy(Patient $patient){
        
        $patient->delete();

        return response()->json([
            'message'=> 'product deleted successfully',
            'data'=> $patient
            ]);
    }
}
