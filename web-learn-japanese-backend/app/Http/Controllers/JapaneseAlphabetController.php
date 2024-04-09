<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JapaneseAlphabet;
use App\Models\Lesson;

class JapaneseAlphabetController extends Controller
{ 
    // get data hiragana alphabet by lesson_id
    public function getHiraganaAlphabetDataByIdLesson(Request $request, $id) {
        $hiraganaAlphabets = JapaneseAlphabet::where('lesson_id', $id)
                                            ->where('alphabet_type', 'alphabet_hiragana')
                                            ->get();
        
        $lesson = Lesson::find($id);

        return response()->json([
            'hiraganaAlphabets' => $hiraganaAlphabets
        ], 200);
    }

    // get data dakuten_hiragana and handakuten_hiragana alphabet by lesson_id
    public function getDakutenAndHandakutenHiraganaAlphabetDataByIdLesson(Request $request, $id) {
        $hiraganaAlphabets = JapaneseAlphabet::where('lesson_id', $id)
                                            ->where(function($query) {
                                                $query->where('alphabet_type', 'dakuten_hiragana')
                                                      ->orWhere('alphabet_type', 'handakuten_hiragana');
                                            })
                                            ->get();
        
        $lesson = Lesson::find($id);

        return response()->json([
            'hiraganaAlphabets' => $hiraganaAlphabets
        ], 200);
    }

    // get data yoon_hiragana alphabet by lesson_id
    public function getYoonHiraganaAlphabetDataByIdLesson(Request $request, $id) {
        $hiraganaAlphabets = JapaneseAlphabet::where('lesson_id', $id)
                                            ->where('alphabet_type', 'yoon_hiragana')
                                            ->get();
        
        $lesson = Lesson::find($id);

        return response()->json([
            'hiraganaAlphabets' => $hiraganaAlphabets
        ], 200);
    }

    // get data katakana alphabet by lesson_id
    public function getKatakanaAlphabetDataByIdLesson(Request $request, $id) {
        $katakanaAlphabets = JapaneseAlphabet::where('lesson_id', $id)
                                            ->where('alphabet_type', 'alphabet_katakana')
                                            ->get();
        
        $lesson = Lesson::find($id);

        return response()->json([
            'katakanaAlphabets' => $katakanaAlphabets
        ], 200);
    }

    // get data dakuten_katakana and handakuten_katakana alphabet by lesson_id
    public function getDakutenAndHandakutenKatakanaAlphabetDataByIdLesson(Request $request, $id) {
        $katakanaAlphabets = JapaneseAlphabet::where('lesson_id', $id)
                                            ->where(function($query) {
                                                $query->where('alphabet_type', 'dakuten_katakana')
                                                      ->orWhere('alphabet_type', 'handakuten_katakana');
                                            })
                                            ->get();
        
        $lesson = Lesson::find($id);

        return response()->json([
            'katakanaAlphabets' => $katakanaAlphabets
        ], 200);
    }

    // get data yoon_katakana alphabet by lesson_id
    public function getYoonKatakanaAlphabetDataByIdLesson(Request $request, $id) {
        $katakanaAlphabets = JapaneseAlphabet::where('lesson_id', $id)
                                            ->where('alphabet_type', 'yoon_katakana')
                                            ->get();
        
        $lesson = Lesson::find($id);

        return response()->json([
            'katakanaAlphabets' => $katakanaAlphabets
        ], 200);
    }
}
