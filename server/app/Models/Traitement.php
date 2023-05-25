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
        return $this->belongsTo(Categorie::class);
    }
    public function patient(){
        return $this->belongsTo(Patient::class);
    }
    public function medecin(){
        return $this->belongsTo(Medecin::class);
    }
}
