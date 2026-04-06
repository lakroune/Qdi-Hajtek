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
            $table->foreignId('artisan_id')->constrained('artisans')->onDelete('cascade');
            $table->foreignId('offre_travail_id')->constrained('offre_travails')->onDelete('cascade');
            $table->float('prix_propose');
            $table->float('prix_final');
            $table->string('delai_execution');
            $table->text('message_explicatif');
            $table->date('date_debut');
            $table->text('conditions_speciales')->nullable();

            $table->enum('statut', ['en_attente', 'accepte', 'refuse', 'annule', 'termine'])
                ->default('en_attente');

            $table->string('code_confirmation')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->date('date_confirmation')->nullable();
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
