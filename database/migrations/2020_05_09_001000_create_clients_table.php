<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name',100);
            $table->string('lastname',100);
            $table->string('phone',30);
            $table->string('email')->unique();
            $table->string('dni');
            $table->string('address');
            $table->enum('sex',['M','F']);
            $table->boolean('is_active')->default(true);
            $table->unsignedBigInteger('location_id');
            $table->foreign('location_id')->references('id')->on('locations')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
