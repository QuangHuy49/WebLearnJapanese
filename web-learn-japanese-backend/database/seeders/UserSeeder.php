<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
                'email' => $user[2],
                'password' => Hash::make($user[3]),
                'user_avatar' => $user[4],
                'user_role_id' => $user[5],
                'created_at' => $user[6],
                'updated_at' => $user[6],
            ]);
        }
    }

    public function getUser() {
        return [
            [1, 'QuangHuy', 'huydq@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 1, '2024-04-04 09:00:00'],
            [2, 'HoaiTrang', 'tranght@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 1, '2024-04-04 09:00:00'],
            [3, 'Đào Quang Huy', 'huydq1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [4, 'Hoài Trang', 'tranght1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [5, 'Thu Hiền', 'thuhien@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [6, 'Trần Phương Thảo', 'thaopt1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [7, 'Thái Thị Anh Trúc', 'tructta1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [8, 'Phương Uyên', 'phuonguyen@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [9, 'Vanh', 'vanh@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [10, 'Phùng Thị Uyên', 'uyenpt@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [11, 'Lang Minh Thư', 'thulm@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [12, 'Nguyễn Thành Đạt', 'nguyenthanhdat@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [13, 'Nguyễn Kiên Thành', 'nguyenkienthanh@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [14, 'Đỗ Quốc Sang', 'doquocsang@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [15, 'Quảng Văn Sương', 'quangvansuong@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [16, 'Trần Đình Minh Nhật', 'minhnhat@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [17, 'Nguyễn Hữu Tài Linh', 'nguyenhuutailinh@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [18, 'Ngọc Trinh', 'ngoctrinh123@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2,'2024-04-04 09:00:00'],
            [19, 'Như Quỳnh', 'nhuquynh0989@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [20, 'Nguyễn Thị Hồng Bích', 'hongbich20145@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [21, 'Mai Lê Quốc Trọng', 'trong549851@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [22, 'Lê Anh Khoa', 'leanhkhoa1815@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [23, 'Trần Minh Trí', 'tridl2023@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [24, 'Nguyễn Huỳnh Nhật Tiến', 'nguyenhuynhnhattien428@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [25, 'Bùi Trung Hiếu', 'hieubt295456@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [26, 'Hoàng Khôi', 'khoidl2145@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [27, 'Dương Văn Minh', 'minhdvdl1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [28, 'Tạ Nhật Nguyên', 'nguyennt65@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [29, 'Bùi Minh Tiến', 'tienmb5482@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
            [30, 'Võ Lâm Uyên', 'lamuyenvo58@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2, '2024-04-04 09:00:00'],
        ];
    }
}
