<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin1@gmail.com',
                'password' => Hash::make('12345678'),
                'role_id' => 1, // Admin role_id
            ],
            [
                'name' => 'Editor User',
                'email' => 'editor1@gmail.com',
                'password' => Hash::make('12345678'),
                'role_id' => 2, // Editor role_id
            ],
            [
                'name' => 'Regular User',
                'email' => 'user1@gmail.com',
                'password' => Hash::make('12345678'),
                'role_id' => 3, // User role_id
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
