<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $table = 'tbl_test';
    protected $primaryKey = 'test_id';
    protected $fillable = ['lesson_id', 'test_name', 'is_complete'];
    public $timestamps = false;

    public function lesson() {
        return $this->belongsTo(Lesson::class, 'lesson_id', 'lesson_id');
    }
}
