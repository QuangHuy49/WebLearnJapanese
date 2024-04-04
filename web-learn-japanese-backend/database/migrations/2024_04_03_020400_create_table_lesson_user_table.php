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
        Schema::create('tbl_lesson_user', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->unsignedInteger('lesson_id')->nullable();
            $table->unsignedInteger('user_id')->nullable();

            $table->foreign('lesson_id')->references('lesson_id')->on('tbl_lesson');
            $table->foreign('user_id')->references('user_id')->on('tbl_user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_lesson_user');
    }
};
