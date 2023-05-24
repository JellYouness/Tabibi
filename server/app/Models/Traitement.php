<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Traitement extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'date',
        'etat',
        'description',
        'reponse',
        'categorie_id',
        'patient_id',
        'medecin_id',
    ];

    public function categorie(){
        return $this->hasMany(Categorie::class);
    }
    public function patient(){
        return $this->hasMany(Patient::class);
    }
    public function medecin(){
        return $this->hasMany(Medecin::class);
    }
}
