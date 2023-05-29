<?php

use App\Models\Categorie;
use App\Models\Medecin;
use App\Models\Patient;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('traitements', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date');
            $table->boolean('etat');
            // TODO:TExt
            $table->text('description');
            // TODO:TExt
            $table->text('reponse')->nullable();
            $table->foreignIdFor(Categorie::class)->nullOnDelete();
            $table->foreignIdFor(Patient::class)->nullOnDelete();
            $table->foreignIdFor(Medecin::class)->nullOnDelete()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('traitements');
    }
};
