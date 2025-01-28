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

        // Schema::create('roles', function (Blueprint $table) {
        //     $table->bigIncrements('role_id'); // Primary key with auto-increment
        //     $table->string('role_name', 30)->unique(); // Role name must be unique
        //     $table->string('role_slug', 30)->nullable(); // Slug, can be null
        //     $table->integer('role_status')->default(1); // Status with a default value of 1
        //     $table->timestamps(); // Created at and updated at columns
        // });
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // $table->unsignedBigInteger('role_id');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            // // Foreign key constraint with cascadeOnUpdate and restrictOnDelete
            // $table->foreign('role_id')
            //       ->references('role_id')
            //       ->on('roles')
            //       ->cascadeOnUpdate()
            //       ->restrictOnDelete();
        });


        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
