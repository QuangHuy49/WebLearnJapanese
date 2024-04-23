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
        Schema::create('tbl_test_user', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('test_id');
            $table->tinyInteger('is_complete')->default(0);
            $table->unsignedInteger('score')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('tbl_user')->onDelete('cascade');
            $table->foreign('test_id')->references('test_id')->on('tbl_test')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_test_user');
    }
};
