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
        Schema::create('tbl_user', function (Blueprint $table) {
            $table->increments('user_id')->unsigned(); 
            $table->string('user_name', 30)->collation('utf8_unicode_ci')->nullable();
            $table->string('user_email', 255)->collation('utf8_unicode_ci')->nullable();
            $table->string('user_password', 60)->collation('utf8_unicode_ci')->nullable();
            $table->string('user_avatar', 255)->nullable();
            $table->unsignedInteger('user_role_id')->nullable();

            $table->foreign('user_role_id')->references('role_id')->on('tbl_role');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_user');
    }
};
