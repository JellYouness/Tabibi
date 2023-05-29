<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PassportAuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required|min:8',
            'role' => 'required',
        ]);
        $user = User::create([
            'username' => $request->username,
            'password' => bcrypt($request->password),
            'role' => $request->role
        ]);
        $token =  $user->createToken('AuthByIs-Tech')->accessToken;
        return response()->json(['token' => $token], 200);
    }
// TODO: changed
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('AuthByIs-Tech')->accessToken;
            $id = $user->id_fk;
            $username = $user->email;
            $role =  $user->role;
            return response()->json([
                'id' => $id,
                'username' => $username,
                'role' => $role,
                'token' => $token
            ], 200);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }

    // public function login(Request $request)
    // {
    //     $data = [
    //         'email' => $request->email,
    //         'password' => $request->password
    //     ];
    //     $user = User::where('email', $request->email)->first();
    //     // if ($user && Hash::check($request->password, $user->password)) {
    //     $u = Hash::check($request->password, $user->password);
    //     $token = $user->createToken('AuthByIs-Tech')->accessToken;
    //     // return response()->json(['error' => $user, 'data' => $u], 401);

    //     if (Auth::attempt($request->only(['email', 'password']))) {
    //         $token =  auth()->user()->createToken('AuthByIs-Tech')->accessToken;
    //         $id = $user->id_fk;
    //         $username = $user->email;
    //         $role =  $user->role;
    //         return response()->json(['id' => $id, 'username' => $username, 'role' => $role, 'token' => $token], 200);
    //     } else {
    //         return response()->json(['error' => $user], 401);
    //     }
    //     // }
    // }


    public function userInfo()
    {
        $user =  auth()->user();
        return response()->json(['user' => $user], 200);
    }
}
