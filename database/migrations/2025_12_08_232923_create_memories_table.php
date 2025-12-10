<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('memories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('relation_id')->constrained('relations')->onDelete('cascade');
            $table->text('content');
            $table->timestamp('event_date')->nullable();
            $table->integer('importance_score')->default(3);
            $table->timestamps();
        });

        // Add vector column via raw SQL for Postgres
        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE memories ADD COLUMN embedding vector(1536)');
        } else {
            Schema::table('memories', function (Blueprint $table) {
                $table->text('embedding')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memories');
    }
};
