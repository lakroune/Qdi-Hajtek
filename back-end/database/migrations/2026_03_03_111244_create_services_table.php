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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artisan_id')->constrained('artisans')->onDelete('cascade');
            $table->foreignId('categorie_id')->constrained('categories')->onDelete('cascade');
            $table->string('titre');
            $table->text('description'); 
            $table->decimal('tarif', 8, 2);
            $table->enum('type_tarif', ['prix_fixe', 'prix_heure', 'prix_jour', 'prix_m2'])->default('prix_fixe');
            $table->boolean('is_completed')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('estimation_duree');
            $table->string('material')->nullable();
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
