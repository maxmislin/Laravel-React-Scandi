<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAtributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id');
            $table->string('name_en');
            $table->string('name_ru');
            $table->string('name_lv');
            $table->string('units')->nullable();
            $table->boolean('required');
            $table->boolean('numeric');
            $table->boolean('unique');
            $table->integer('min')->nullable();
            $table->integer('max')->nullable();
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
        Schema::dropIfExists('atributes');
    }
}
