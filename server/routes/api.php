<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('register',[PassportAuthController::class,'register']);
Route::post('login',[PassportAuthController::class,'login']);

Route::middleware('auth:api')->group(function(){

});
Route::resource('patients',PatientController::class);
Route::resource('medecins',MedecinController::class);
Route::resource('specialites',SpecialiteController::class);
Route::resource('urgences',UrgencetController::class);
Route::resource('soustypes',SousTypeController::class);
