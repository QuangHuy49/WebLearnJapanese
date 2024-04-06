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
        Schema::create('tbl_japanese_alphabet', function (Blueprint $table) {
            $table->increments('alphabet_id')->unsigned();
            $table->unsignedInteger('lesson_id');
            $table->string('alphabet_character', 255);
            $table->string('alphabet_romaji', 255);
            $table->string('alphabet_audio', 255);
            $table->string('alphabet_type', 255);

            $table->foreign('lesson_id')->references('lesson_id')->on('tbl_lesson');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_japanese_alphabet');
    }
};
