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
        Schema::create('tbl_kaiwa', function (Blueprint $table) {
            $table->increments('kaiwa_id')->unsigned();
            $table->unsignedInteger('lesson_id')->nullable();
            $table->string('kaiwa_name', 255)->nullable();
            $table->string('kaiwa_mean', 255)->nullable();
            $table->string('kaiwa_audio', 255)->nullable();
            
            $table->foreign('lesson_id')->references('lesson_id')->on('tbl_lesson');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_kaiwa');
    }
};
