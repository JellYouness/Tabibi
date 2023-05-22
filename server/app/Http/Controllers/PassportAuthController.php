<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class PassportAuthController extends Controller
{
    public function register(Request $request){
        $this->validate($request,[
            'username' => 'required',
            'password' => 'required|min:8'
        ]);
        $user = User::create([
            'username' => $request->username,
            'password' => bcrypt($request->password),
        ]);
        $token =  $user->createToken('AuthByIs-Tech')->accessToken;
        return response()->json(['token'=> $token],200);
    }

    public function login(Request $request){
        $data = [
            'username' => $request->username,
            'password' => $request->password
        ];
        if(auth()->attempt($data)){
            $token =  auth()->user()->createToken('AuthByIs-Tech')->accessToken;
            $id = auth()->user()->id;
            $username =  auth()->user()->username;
            return response()->json(['id'=>$id,'username'=> $username,'token'=> $token],200);
        }else{
            return response()->json(['error'=> 'Unauthorised'],401);
        } 
        
    }


    public function userInfo(){
        $user =  auth()->user();
        return response()->json(['user'=> $user],200);
    }
}
