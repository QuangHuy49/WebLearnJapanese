<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'tbl_post';
    protected $primaryKey = 'post_id';
    protected $fillable = ['post_id', 'user_id', 'post_title', 'post_content', 'post_img', 'post_view', 'post_like', 'post_comment', 'post_status'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id', 'post_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'post_id');
    }
}
