<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('propositions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('artisan_id')
                  ->constrained('artisans')
                  ->onDelete('cascade');

            $table->foreignId('offre_id')
                  ->constrained('offre_travails')
                  ->onDelete('cascade');

            $table->float('prix_propose'); 
            $table->string('delai_execution'); 
            $table->text('message_explicatif'); 
            $table->timestamp('date_soumission'); 
            $table->date('date_disponibilite'); 
            $table->text('conditions_speciales')->nullable(); 

            $table->enum('statut_proposition', ['en_attente', 'accepte', 'refuse', 'annule'])
                  ->default('en_attente');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('propositions');
    }
};
