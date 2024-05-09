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
        Schema::create('voter_info', function (Blueprint $table) {
            $table->id();
            $table->string('si');
            $table->string('name');
            $table->string('fathers_or_husband');
            $table->string('mother');
            $table->date('birth_date');
            $table->string('division');
            $table->string('district');
            $table->string('upzila');
            $table->string('union');
            $table->string('election_area');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voter_info');
    }
};
