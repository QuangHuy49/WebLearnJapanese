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
        Schema::create('tbl_lesson', function (Blueprint $table) {
            $table->increments('lesson_id')->unsigned();
            $table->unsignedInteger('user_id')->nullable();
            $table->unsignedInteger('type_id')->nullable();
            $table->string('lesson_name', 255)->nullable();
            $table->string('lesson_img', 255)->nullable();
            $table->tinyInteger('lesson_status')->default(0);

            $table->foreign('user_id')->references('user_id')->on('tbl_user');
            $table->foreign('type_id')->references('type_id')->on('tbl_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_lesson');
    }
};
