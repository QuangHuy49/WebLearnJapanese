<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = $this->getUser();
        foreach($users as $user) {
            DB::table('tbl_user')->insert([
                'user_id' => $user[0],
                'user_name' => $user[1],
                'user_email' => $user[2],
                'user_password' => $user[3],
                'user_avatar' => $user[4],
                'user_role_id' => $user[5]
            ]);
        }
    }

    public function getUser() {
        return [
            [1, 'QuangHuy', 'huydq@gmail.com', '1', 'storage/app/public/img/avatar/male-student.png', 1],
            [2, 'HoaiTrang', 'tranght@gmail.com', '1', 'storage/app/public/img/avatar/male-student.png', 1],
            [3, 'QuanHy', 'huydq1@gmail.com', '1', 'storage/app/public/img/avatar/male-student.png', 2],
        ];
    }
}
