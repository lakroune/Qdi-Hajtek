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
        Schema::create('dommande_derictes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade');

            $table->date('date_debut');
            $table->date('date_fin_estimee');
            $table->enum('statut', ['en_attente', 'accepte', 'refuse', 'termine', 'annule'])->default('en_attente');

            $table->text('description_specifique')->nullable();
            $table->float('prix_final');
            $table->string('code_confirmation')->nullable();

            $table->enum('mode_paiement', ['cash', 'transfert', 'en_ligne'])->nullable();
            $table->boolean('a_ete_signale')->default(false);
            $table->timestamp('date_cloture')->nullable();
            $table->boolean('is_completed')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dommande_derictes');
    }
};
