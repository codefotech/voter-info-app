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
        Schema::table('voter_info', function (Blueprint $table) 
        {
            $table->string('fathers_or_husband')->default('0')->change();
            $table->string('mother')->default('0')->change();
            $table->string('birth_date')->default('0')->change();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
