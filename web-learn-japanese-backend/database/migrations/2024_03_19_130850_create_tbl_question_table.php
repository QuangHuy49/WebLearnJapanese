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
        Schema::create('tbl_question', function (Blueprint $table) {
            $table->increments('question_id')->unsigned();
            $table->unsignedInteger('test_id'); 
            $table->string('question_name', 255); 
            $table->string('question_img', 255)->nullable();
            $table->string('question_audio', 255)->nullable();
            $table->tinyInteger('question_status')->default(1);

            $table->foreign('test_id')->references('test_id')->on('tbl_test');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_question');
    }
};
