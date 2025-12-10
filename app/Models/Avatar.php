<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avatar extends Model
{
    protected $fillable = [
        'owner_id',
        'name',
        'voice_id',
        'expressiveness_level',
        'personality_profiles',
        'style_rules',
    ];

    protected $casts = [
        'personality_profiles' => 'array',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function relations()
    {
        return $this->hasMany(Relation::class);
    }
}
