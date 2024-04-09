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
        Schema::create('tbl_answer', function (Blueprint $table) {
            $table->increments('answer_id')->unsigned();
            $table->unsignedInteger('question_id'); 
            $table->string('answer_name', 255); 
            $table->string('answer_img', 255)->nullable();
            $table->string('answer_audio', 255)->nullable();
            $table->boolean('answer_correct');

            $table->foreign('question_id')->references('question_id')->on('tbl_question');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_answer');
    }
};
