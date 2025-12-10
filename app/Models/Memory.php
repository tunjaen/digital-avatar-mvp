<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Memory extends Model
{
    protected $fillable = [
        'relation_id',
        'content',
        'embedding',
        'event_date',
        'importance_score',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'embedding' => 'array', // Casting to array for JSON storage in MVP
    ];

    public function relation()
    {
        return $this->belongsTo(Relation::class);
    }
}
