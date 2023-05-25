<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medecin extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'cin',
        'email',
        'telephone',
        'naissance',
        'civilité',
        'adresse',
        'password',
        'image',
        'specialite_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function specialite(){
        return $this->belongsTo(Specialite::class);
    }

    public function traitement(){
        return $this->hasMany(Traitement::class);
    }
}
