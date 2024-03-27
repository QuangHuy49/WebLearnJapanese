<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function uploadImage(Request $request) {
        if ($request->hasFile('add_image')) {
            $allowedfileExtension = ['pdf', 'jpg', 'png', 'jpeg'];
            $file = $request->file('add_image');

            $extension = $file->getClientOriginalExtension();
            if (in_array($extension, $allowedfileExtension)) {
                $date = date('Ymd_His'); 
                $name = $date . "_" . $file->getClientOriginalName();
                $file->storeAs('upload/img', $name, 'public');
                return response()->json(['success' => 1, 'filename' => $name], 200);
            } else {
                return response()->json(['success' => 0, 'error' => 'File không hợp lệ.'], 400);
            }
        }

        return response()->json(['success' => 0, 'error' => 'Không tìm thấy file để upload.'], 400);
    }

    public function deleteImage(Request $request)
    {
        if ($request->has('imageName')) {
            $imageName = $request->input('imageName');

            Storage::disk('public')->delete('upload/img/' . $imageName);

            return response()->json(['success' => true], 200);
        } else {
            return response()->json(['success' => false, 'message' => 'Tên ảnh không được cung cấp.'], 400);
        }
    }
}
