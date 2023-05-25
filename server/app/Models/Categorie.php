<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'description',
        'image',
        'sous_type_id'
    ];

    public function sous_type(){
        return $this->belongsTo(SousType::class);
    }
public function traitement(){
        return $this->hasMany(Traitement::class);
    }
}
