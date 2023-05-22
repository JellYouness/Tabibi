<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
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
        'image'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
