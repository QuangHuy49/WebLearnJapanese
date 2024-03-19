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
        Schema::create('tbl_type', function (Blueprint $table) {
            $table->increments('type_id')->unsigned(); 
            $table->string('type_name', 50)->nullable();
            $table->tinyInteger('type_status')->default(0); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_type');
    }
};
