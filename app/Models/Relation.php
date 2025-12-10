<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Relation extends Model
{
    protected $fillable = [
        'avatar_id',
        'name',
        'context_notes',
    ];

    public function avatar()
    {
        return $this->belongsTo(Avatar::class);
    }

    public function memories()
    {
        return $this->hasMany(Memory::class);
    }
}
