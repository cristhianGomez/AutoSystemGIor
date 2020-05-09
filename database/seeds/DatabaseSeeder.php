<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       App\User::create([
        'name' => 'Cristhian',
        'email' =>	'cristhian@company.com',
        'phone' => '957067468',
        'password' => bcrypt('cristhian_admin')
        ]);

       App\Location::create([
        'name' => 'Arequipa',
        ]);

        factory(App\Location::class, 5)->create();
        factory(App\Client::class, 50)->create();
       // $this->call(UserSeeder::class);
    }
}
