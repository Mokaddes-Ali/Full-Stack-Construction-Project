<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin1@gmail.com',
                'password' => Hash::make('12345678'),
            ],

            [
                'name' => 'Admin2 User',
                'email' => 'admin2@gmail.com',
                'password' => Hash::make('12345678'),
            ],

        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
