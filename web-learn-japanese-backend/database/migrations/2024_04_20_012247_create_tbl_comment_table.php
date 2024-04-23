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
        Schema::create('tbl_comment', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('post_id');
            $table->text('comment_content'); 
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('tbl_user');
            $table->foreign('post_id')->references('post_id')->on('tbl_post');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_comment');
    }
};
