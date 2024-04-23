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
        Schema::create('tbl_post', function (Blueprint $table) {
            $table->increments('post_id')->unsigned(); 
            $table->unsignedInteger('user_id'); 
            $table->string('post_title', 255); 
            $table->text('post_content'); 
            $table->string('post_img', 255)->nullable();
            $table->integer('post_view')->default(0); 
            $table->integer('post_like')->default(0); 
            $table->integer('post_comment')->default(0); 
            $table->tinyInteger('post_status')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('tbl_user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_post');
    }
};
