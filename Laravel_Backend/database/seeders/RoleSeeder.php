<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


public function run()
{
    // Create roles
    $admin = Role::create(['name' => 'Admin']);
    $editor = Role::create(['name' => 'Editor']);

    // Create permissions
    $permissions = ['create post', 'edit post', 'delete post', 'view post'];

    foreach ($permissions as $permission) {
        Permission::create(['name' => $permission]);
    }

    // Assign permissions to roles
    $admin->givePermissionTo($permissions);
    $editor->givePermissionTo(['create post', 'edit post']);
}

}
