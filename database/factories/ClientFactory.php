<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Client;
use Faker\Generator as Faker;


$factory->define(Client::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'lastname' => $faker->lastName,
        'phone' => $faker->tollFreePhoneNumber ,
        'email' => $faker->unique()->safeEmail,
        'dni' => $faker->ean8,
        'address' => $faker->address,
        'location_id' => $faker-> numberBetween(1,6),
        'sex' => 'M',
     ];
});
