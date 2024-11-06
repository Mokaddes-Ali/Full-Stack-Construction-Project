<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin One',
            'email' => 'admin1@example.com',
            'password' => bcrypt('123456789'), // Password পরিবর্তন করতে পারেন
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Admin Two',
            'email' => 'admin2@example.com',
            'password' => bcrypt('123456789'), // Password পরিবর্তন করতে পারেন
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Admin Three',
            'email' => 'admin3@example.com',
            'password' => bcrypt('123456789'), // Password পরিবর্তন করতে পারেন
            'role' => 'admin',
        ]);
    }
}
