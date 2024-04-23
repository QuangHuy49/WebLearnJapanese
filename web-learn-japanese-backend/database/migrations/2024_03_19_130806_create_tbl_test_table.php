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
        Schema::create('tbl_test', function (Blueprint $table) {
            $table->increments('test_id')->unsigned();
            $table->unsignedInteger('lesson_id')->nullable();
            $table->string('test_name', 255);
            // $table->unsignedInteger('test_score');
            // $table->tinyInteger('is_complete')->default(0);
            $table->tinyInteger('test_status')->default(1);

            $table->foreign('lesson_id')->references('lesson_id')->on('tbl_lesson');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_test');
    }
};
