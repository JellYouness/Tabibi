<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('register',[PassportAuthController::class,'register']);
Route::post('login',[PassportAuthController::class,'login']);
Route::get('userinfo', [PassportAuthController::class, 'userinfo']);

Route::middleware('auth:api')->group(function(){

});

Route::resource('users',UserController::class);
Route::resource('patients',PatientController::class);
Route::resource('medecins',MedecinController::class);
Route::get('medecinsOnline',[MedecinController::class,'index_online']);
Route::resource('specialites',SpecialiteController::class);
Route::resource('urgences',UrgenceController::class);
Route::resource('soustypes',SousTypeController::class);
Route::get('soustypes/fk/{id}',[SousTypeController::class,'index_fk']);
Route::resource('categories',CategorieController::class);
Route::get('categories/fk/{id}',[CategorieController::class,'index_fk']);
Route::resource('traitements',TraitementController::class);
Route::get('traitements/patients/{id}',[TraitementController::class,'index_patient']);
Route::get('traitements/medecins/{id}',[TraitementController::class,'index_medecin']);
Route::get('traitementsConsulte',[TraitementController::class,'index_consulte']);
Route::get('traitementsNonConsulte',[TraitementController::class,'index_nonconsulte']);
