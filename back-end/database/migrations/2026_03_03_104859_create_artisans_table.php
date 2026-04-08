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
        Schema::create('artisans', function (Blueprint $table) {
            $table->foreignId('id')->constrained('users')->onDelete('cascade');
            $table->string('specialite');
            $table->text('bio')->nullable();
            $table->string('experience')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->decimal('note', 3, 1)->default(0.0);
            $table->integer('nb_offres')->default(0);
            $table->integer('rayon_action')->default(10);
            $table->primary('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artisans');
    }
};
