<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grammar extends Model
{
    use HasFactory;

    protected $table = 'tbl_grammar';
    protected $primaryKey = 'grammar_id';
    protected $fillable = ['lesson_id', 'grammar_title', 'grammar_mean', 'grammar_detail', 'grammar_example', 'grammar_note'];
    public $timestamps = false;

    public function lesson() {
        return $this->belongsTo(Lesson::class, 'lesson_id');
    }
}
