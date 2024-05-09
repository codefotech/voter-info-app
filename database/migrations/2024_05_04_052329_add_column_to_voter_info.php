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
            $table->date('created_at');
            $table->date('updated_at');
            $table->string('created_by');
            $table->string('updated_by');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('voter_info', function (Blueprint $table) {
            //
        });
    }
};
