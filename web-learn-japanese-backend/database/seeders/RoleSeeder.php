<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = $this->getRole();
        foreach($roles as $role) {
            DB::table('tbl_role')->insert([
                'role_id' => $role[0],
                'role_type' => $role[1]
            ]);
        }
    }

    public function getRole() {
        return [
            [1, 'admin'],
            [2, 'user'],
        ];
    }
}
