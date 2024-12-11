<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //   User::create([
        //     'name' => 'mmh',
        //     'email' => 'admin@Gmail.com',
        //     'password' => Hash::make('123456789'),
        //     'role_id' =>1,
        // ]);

        // User::create([
        //     'name' => 'smith',
        //     'email' => 'user@Gmail.com',
        //     'password' => Hash::make('123456789'),
        //     'role_id' =>2,
        // ]);

        $users=[


            [
                   'name' => 'Admin User',
                   'email' => 'admin1@gmail.com',
                   'password' => Hash::make('admin1234'),
                   'role_id' =>1,

            ],

[


    'name' => 'Admin2 User',
    'email' => 'admin2@gmail.com',
     'password' => Hash::make('admin1234'),
     'role_id' =>2,
]

        ];

        foreach($users as $user){
            User::create($user);
        }

    }
}
