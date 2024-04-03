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
                'user_role_id' => $user[5]
            ]);
        }
    }

    public function getUser() {
        return [
            [1, 'QuangHuy', 'huydq@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 1],
            [2, 'HoaiTrang', 'tranght@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 1],
            [3, 'Đào Quang Huy', 'huydq1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [4, 'Hoài Trang', 'tranght1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [5, 'Thu Hiền', 'thuhien@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [6, 'Trần Phương Thảo', 'thaopt1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [7, 'Thái Thị Anh Trúc', 'tructta1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [8, 'Phương Uyên', 'phuonguyen@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [9, 'Vanh', 'vanh@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [10, 'Phùng Thị Uyên', 'uyenpt@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [11, 'Lang Minh Thư', 'thulm@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [12, 'Nguyễn Thành Đạt', 'nguyenthanhdat@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [13, 'Nguyễn Kiên Thành', 'nguyenkienthanh@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [14, 'Đỗ Quốc Sang', 'doquocsang@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [15, 'Quảng Văn Sương', 'quangvansuong@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [16, 'Trần Đình Minh Nhật', 'minhnhat@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [17, 'Nguyễn Hữu Tài Linh', 'nguyenhuutailinh@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [18, 'Ngọc Trinh', 'ngoctrinh123@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [19, 'Như Quỳnh', 'nhuquynh0989@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [20, 'Nguyễn Thị Hồng Bích', 'hongbich20145@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [21, 'Mai Lê Quốc Trọng', 'trong549851@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [22, 'Lê Anh Khoa', 'leanhkhoa1815@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [23, 'Trần Minh Trí', 'tridl2023@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [24, 'Nguyễn Huỳnh Nhật Tiến', 'nguyenhuynhnhattien428@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [25, 'Bùi Trung Hiếu', 'hieubt295456@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [26, 'Hoàng Khôi', 'khoidl2145@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [27, 'Dương Văn Minh', 'minhdvdl1@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [28, 'Tạ Nhật Nguyên', 'nguyennt65@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [29, 'Bùi Minh Tiến', 'tienmb5482@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
            [30, 'Võ Lâm Uyên', 'lamuyenvo58@gmail.com', '1', 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 2],
        ];
    }
}
