<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SousType extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'description',
        'image',
        'urgence_id'
    ];
    
    public function urgence(){
        return $this->belongsTo(Urgence::class);
    }
}
