<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestUser extends Model
{
    use HasFactory;

    protected $table = 'tbl_test_user';

    protected $fillable = [
        'user_id',
        'test_id',
        'is_complete',
        'score'
    ];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function test()
    {
        return $this->belongsTo(Test::class, 'test_id');
    }
}
