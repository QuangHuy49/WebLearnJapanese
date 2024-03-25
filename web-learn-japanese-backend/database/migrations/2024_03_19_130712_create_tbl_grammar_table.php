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
        Schema::create('tbl_grammar', function (Blueprint $table) {
            $table->increments('grammar_id')->unsigned();
            $table->unsignedInteger('lesson_id')->nullable();
            $table->string('grammar_title', 50); 
            $table->string('grammar_mean', 255)->nullable();
            $table->string('grammar_detail', 255); 
            $table->string('grammar_example', 255)->nullable();
            $table->string('grammar_note', 255)->nullable();
            $table->tinyInteger('grammar_status')->default(0);
            
            $table->foreign('lesson_id')->references('lesson_id')->on('tbl_lesson');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_grammar');
    }
};
