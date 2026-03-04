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
        Schema::create('offre_travails', function (Blueprint $table) {
            $table->id();

            $table->foreignId('client_id')
                ->constrained('clients')
                ->onDelete('cascade');

            $table->foreignId('categorie_id')
                ->constrained('categories')
                ->onDelete('cascade');

            $table->string('titre');
            $table->text('description');
            $table->float('budget_estime');
            $table->date('date_limite');

            $table->enum('statut', ['ouvert', 'en_cours', 'complete', 'annule'])
                ->default('ouvert');

            $table->enum('type_remuneration', ['prix_fixe', 'prix_heure']);
            $table->enum('niveau_urgence', ['faible', 'moyen', 'urgent']);
            $table->boolean('is_completed')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_travails');
    }
};
