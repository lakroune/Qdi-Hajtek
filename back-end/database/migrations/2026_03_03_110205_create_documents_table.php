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
        Schema::create('documents', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('artisan_id')->constrained('artisans')->onDelete('cascade');
            $table->enum('type_document', ['cin', 'diplome', 'certificat', 'autre']);
            $table->string('titre_document'); // 
            $table->string('file_path'); // 
            $table->enum('statut_verification', ['en_attente', 'valide', 'rejete'])->default('en_attente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
