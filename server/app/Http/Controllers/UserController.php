<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(){
        $user = User::all();
        return response()->json($user);
    }
    
    public function show( $id){
        $user = User::find($id);

        if(is_null($user)){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not found!' 
                ],400);
        }

        return response()->json([
            'message'=> 'User fetched successfully',
            'data'=> $user
            ]);
    }

    
    public function store(Request $request){
        $this->validate($request,[
            'username' => 'required',
            'password' => 'required|min:8',
            'role' => 'required',
        ]);
        $user = User::create([
            'username' => $request->username,
            'password' => bcrypt($request->password),
            'role' => $request->role
        ]);
        $user->createToken('AuthByIs-Tech')->accessToken;

        return response()->json([
            'message'=> 'User created successfully',
            'data'=> $user
            ]);
    }


    public function update(Request $request, User $user){
       
        $input = $request->all();
        $validator = Validator::make($input,[
            'username' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if( $validator->fails()){
            return response()->json([
                'fail'=> false,
                'message'=> 'Sorry not stored',
                'error'=> $validator->errors()
                ],400);
        }
        
        $user->fill($input);
        $user->save();
        $user->createToken('AuthByIs-Tech')->accessToken;

        return response()->json([
            'success'=> true,
            'message'=> 'product updated successfully',
            'data'=> $user
            ]);
    }


    public function destroy(User $user){
        
        $user->delete();

        return response()->json([
            'message'=> 'product deleted successfully',
            'data'=> $user
            ]);
    }
}
