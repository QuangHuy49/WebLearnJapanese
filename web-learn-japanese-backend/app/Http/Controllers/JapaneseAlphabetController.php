<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class JapaneseAlphabetController extends Controller
{
    // get hiragana alphabet
    public function getHiraganaAlphabet() {
        $hiraganaAlphabet = [
            ['hiragana' => 'あ', 'romaji' => 'a', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/a/a.mp3'],
            ['hiragana' => 'い', 'romaji' => 'i', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/a/i.mp3'],
            ['hiragana' => 'う', 'romaji' => 'u', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/a/u.mp3'],
            ['hiragana' => 'え', 'romaji' => 'e', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/a/e.mp3'],
            ['hiragana' => 'お', 'romaji' => 'o', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/a/o.mp3'],

            ['hiragana' => 'か', 'romaji' => 'ka', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ka/ka.mp3'],
            ['hiragana' => 'き', 'romaji' => 'ki', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ka/ki.mp3'],
            ['hiragana' => 'く', 'romaji' => 'ku', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ka/ku.mp3'],
            ['hiragana' => 'け', 'romaji' => 'ke', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ka/ke.mp3'],
            ['hiragana' => 'こ', 'romaji' => 'ko', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ka/ko.mp3'],

            ['hiragana' => 'さ', 'romaji' => 'sa', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/sa/sa.mp3'],
            ['hiragana' => 'し', 'romaji' => 'shi', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/sa/shi.mp3'],
            ['hiragana' => 'す', 'romaji' => 'su', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/sa/su.mp3'],
            ['hiragana' => 'せ', 'romaji' => 'se', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/sa/se.mp3'],
            ['hiragana' => 'そ', 'romaji' => 'so', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/sa/so.mp3'],

            ['hiragana' => 'た', 'romaji' => 'ta', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ta/ta.mp3'],
            ['hiragana' => 'ち', 'romaji' => 'chi', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ta/chi.mp3'],
            ['hiragana' => 'つ', 'romaji' => 'tsu', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ta/tsu.mp3'],
            ['hiragana' => 'て', 'romaji' => 'te', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ta/te.mp3'],
            ['hiragana' => 'と', 'romaji' => 'to', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ta/to.mp3'],

            ['hiragana' => 'な', 'romaji' => 'na', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/na/na.mp3'],
            ['hiragana' => 'に', 'romaji' => 'ni', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/na/ni.mp3'],
            ['hiragana' => 'ぬ', 'romaji' => 'nu', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/na/nu.mp3'],
            ['hiragana' => 'ね', 'romaji' => 'ne', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/na/ne.mp3'],
            ['hiragana' => 'の', 'romaji' => 'no', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/na/no.mp3'],

            ['hiragana' => 'は', 'romaji' => 'ha', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ha/ha.mp3'],
            ['hiragana' => 'ひ', 'romaji' => 'hi', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ha/hi.mp3'],
            ['hiragana' => 'ふ', 'romaji' => 'hu', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ha/hu.mp3'],
            ['hiragana' => 'へ', 'romaji' => 'he', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ha/he.mp3'],
            ['hiragana' => 'ほ', 'romaji' => 'ho', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ha/ho.mp3'],

            ['hiragana' => 'ま', 'romaji' => 'ma', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ma/ma.mp3'],
            ['hiragana' => 'み', 'romaji' => 'mi', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ma/mi.mp3'],
            ['hiragana' => 'む', 'romaji' => 'mu', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ma/mu.mp3'],
            ['hiragana' => 'め', 'romaji' => 'me', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ma/me.mp3'],
            ['hiragana' => 'も', 'romaji' => 'mo', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ma/mo.mp3'],
            
            ['hiragana' => 'や', 'romaji' => 'ya', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ya/ya.mp3'],
            ['hiragana' => '', 'romaji' => '', 'audio_url' => ''],
            ['hiragana' => 'ゆ', 'romaji' => 'yu', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ya/yu.mp3'],
            ['hiragana' => '', 'romaji' => '', 'audio_url' => ''],
            ['hiragana' => 'よ', 'romaji' => 'yo', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ya/yo.mp3'],

            ['hiragana' => 'ら', 'romaji' => 'ra', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ra/ra.mp3'],
            ['hiragana' => 'り', 'romaji' => 'ri', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ra/ri.mp3'],
            ['hiragana' => 'る', 'romaji' => 'ru', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ra/ru.mp3'],
            ['hiragana' => 'れ', 'romaji' => 're', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ra/re.mp3'],
            ['hiragana' => 'ろ', 'romaji' => 'ro', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/ra/ro.mp3'],

            ['hiragana' => 'わ', 'romaji' => 'wa', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/wa/wa.mp3'],
            ['hiragana' => '', 'romaji' => '', 'audio_url' => ''],
            ['hiragana' => '', 'romaji' => '', 'audio_url' => ''],
            ['hiragana' => '', 'romaji' => '', 'audio_url' => ''],
            ['hiragana' => 'を', 'romaji' => 'wo', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/wa/wo.mp3'],

            ['hiragana' => 'ん', 'romaji' => 'n', 'audio_url' => 'http://127.0.0.1:8000/storage/audio/alphabet/wa/n.mp3'],
            ['hiragana' => '', 'romaji' => '', 'audio_url' => ''],
            ['hiragana' => '', 'romaji' => '', 'audio_url' => ''],
            ['hiragana' => '', 'romaji' => '', 'audio_url' => ''],
            ['hiragana' => '', 'romaji' => '', 'audio_url' => ''],
        ];

        return response()->json($hiraganaAlphabet);
    }
}
