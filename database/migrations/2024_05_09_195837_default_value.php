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
        Schema::table('voter_info', function (Blueprint $table) {
            $table->string('voter_no')->default('0');
            $table->string('division')->default('0');
            $table->string('district')->default('0');
            $table->string('upzila')->default('0');
            $table->string('union')->default('0');
            $table->string('election_area')->default('0');

            //
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
