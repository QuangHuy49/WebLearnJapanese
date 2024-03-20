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
        Schema::create('tbl_vocabulary', function (Blueprint $table) {
            $table->increments('vocabulary_id')->unsigned();
            $table->unsignedInteger('lesson_id')->nullable();
            $table->string('vocabulary_name', 255);
            $table->string('vocabulary_character', 255)->nullable();
            $table->string('vocabulary_yin_han', 255)->nullable();
            $table->string('vocabulary_mean', 255);
            $table->string('vocabulary_audio', 255)->nullable();

            $table->foreign('lesson_id')->references('lesson_id')->on('tbl_lesson');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_vocabulary');
    }
};
