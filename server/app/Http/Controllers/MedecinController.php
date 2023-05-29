<?php

namespace App\Http\Controllers;

use App\Models\Medecin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MedecinController extends Controller
{
    public function index()
    {
        $medecin = DB::table('medecins')->join('specialites', function ($join) {
            $join->on('specialite_id', '=', 'specialites.id');
        })
            ->select('medecins.*', 'specialites.nom AS specialite')
            ->get();
        return response()->json($medecin);
    }

    public function index_online()
    {
        $medecin = DB::table('medecins')->join('specialites', function ($join) {
            $join->on('specialite_id', '=', 'specialites.id');
        })
            ->select('medecins.*', 'specialites.nom AS specialite')
            ->where('online', '=', '1')
            ->get();
        return response()->json($medecin);
    }

    public function show($id)
    {
        // $medecin = Medecin::find($id);
        // TODO:NEED 
        $medecin = DB::table('medecins')
            ->join('specialites', 'medecins.specialite_id', '=', 'specialites.id')
            ->select('medecins.*', 'specialites.nom AS specialite')
            ->where('medecins.id', $id)
            ->first();

        if (is_null($medecin)) {
            return response()->json([
                'fail' => false,
                'message' => 'Sorry not found!'
            ], 400);
        }

        return response()->json([
            'message' => 'Medecin fetched successfully',
            'data' => $medecin
        ]);
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'cin' => ['required', 'string', 'max:10'],
            'email' => ['required', 'email', 'max:255'],
            'telephone' => ['required', 'numeric', 'digits_between:8,15'],
            'naissance' => ['required', 'date'],
            'civilité' => ['required', 'in:male,female'],
            'adresse' => ['required', 'string'],
            'password' => ['nullable', 'string'],
            'specialite_id' => ['required', 'exists:specialites,id'],
            'image' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'fail' => false,
                'message' => 'Sorry not stored',
                'error' => $validator->errors()
            ], 400);
        }

        if ($request->image) {
            $base64 = explode(",", $request->image);
            $image = base64_decode($base64[1]);
            $filename = 'images/' . time() . '.' . 'png';
            Storage::put('public/' . $filename, $image);
            $input['image'] = $filename;
        }
        $input['password'] = bcrypt($request->password);
        $medecin =  Medecin::create($input);
        $user = User::create([
            'email' => $medecin->email,
            'password' => $medecin->password,
            'role' => 'medecin',
            'id_fk' => $medecin->id,
        ]);
        $user->createToken('AuthByIs-Tech')->accessToken;

        return response()->json([
            'message' => 'Medecin created successfully',
            'data' => $medecin
        ]);
    }


    public function update(Request $request, Medecin $medecin)
    {

        $input = $request->all();
        $validator = Validator::make($input, [
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'cin' => ['required', 'string', 'max:10'],
            'email' => ['required', 'email', 'max:255'],
            'telephone' => ['required', 'numeric', 'digits_between:8,15'],
            'naissance' => ['required', 'date'],
            'civilité' => ['required', 'in:male,female'],
            'adresse' => ['required', 'string'],
            'password' => ['string'],
            'specialite_id' => ['required', 'exists:specialites,id'],
            'image' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'fail' => false,
                'message' => 'Sorry not stored',
                'error' => $validator->errors()
            ], 400);
        }
        if ($request->image) {
            $base64 = explode(",", $request->image);
            $image = base64_decode($base64[1]);
            $filename = 'images/' . time() . '.' . 'png';
            Storage::put('public/' . $filename, $image);
            $input['image'] = $filename;
        }

        $medecin->fill($input);
        $medecin->save();

        return response()->json([
            'success' => true,
            'message' => 'product updated successfully',
            'data' => $medecin
        ]);
    }


    public function destroy(Medecin $medecin)
    {

        $medecin->delete();

        return response()->json([
            'message' => 'product deleted successfully',
            'data' => $medecin
        ]);
    }
}
