<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['role_name' => 'Admin'],
            ['role_name' => 'Editor'],
            ['role_name' => 'User'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
