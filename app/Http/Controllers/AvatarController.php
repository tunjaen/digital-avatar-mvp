<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AvatarController extends Controller
{
    public function config(Request $request)
    {
        $user = $request->user();
        return \Inertia\Inertia::render('Avatar/Config', [
             // data if needed
        ]);
    }

    public function editPersonality(Request $request)
    {
        return \Inertia\Inertia::render('Avatar/Edit/Personality');
    }

    public function edit(Request $request)
    {
        $user = $request->user();
        $avatar = \App\Models\Avatar::where('owner_id', $user->id)->first();

        return \Inertia\Inertia::render('Avatar/Edit', [
            'avatar' => $avatar,
        ]);
    }
    
    public function update(Request $request)
    {
        $user = $request->user();
        
        // Ensure user is an owner
        if ($user->role !== 'owner') {
            abort(403, 'Only owners can configure avatars.');
        }

        $avatar = \App\Models\Avatar::firstOrCreate(
            ['owner_id' => $user->id],
            ['name' => $user->name . "'s Avatar"]
        );

        $step = $request->input('step');

        $rules = [
            'step' => 'required|string|in:basic,intermediate,advanced',
            'data' => 'nullable|array', // The JSON blob for personality
        ];

        if ($step === 'basic') {
            $rules['name'] = 'required|string|max:255';
            $rules['voice_id'] = 'nullable|string';
            $rules['expressiveness_level'] = 'nullable|string';
            $rules['voice_sample'] = 'nullable|file|mimes:mp3,wav,m4a|max:10240'; // 10MB limit
        } elseif ($step === 'intermediate') {
            // Add intermediate specific rules if any
        } elseif ($step === 'advanced') {
            // Add advanced specific rules if any
        }

        $validated = $request->validate($rules);

        // Handle File Upload
        if ($request->hasFile('voice_sample')) {
            $path = $request->file('voice_sample')->store('voice_samples', 'public');
            // In real app: Call ElevenLabsService::addVoice($avatar->name, $path)
            // For MVP: we just store the path or a mock ID
            $avatar->voice_id = 'cloned_voice_' . uniqid(); 
        }

        // Updating fields based on step
        if ($step === 'basic') {
            if (isset($validated['name'])) $avatar->name = $validated['name'];
            if (isset($validated['voice_id'])) $avatar->voice_id = $validated['voice_id'];
            if (isset($validated['expressiveness_level'])) $avatar->expressiveness_level = $validated['expressiveness_level'];
            
            // Merge basic traits into personality_profiles
            $profiles = $avatar->personality_profiles ?? [];
            $profiles['basic'] = $validated['data'] ?? [];
            $avatar->personality_profiles = $profiles;
        }

        if ($validated['step'] === 'intermediate') {
            $profiles = $avatar->personality_profiles ?? [];
            $profiles['intermediate'] = $validated['data'] ?? [];
            $avatar->personality_profiles = $profiles;
        }

        if ($validated['step'] === 'advanced') {
            $profiles = $avatar->personality_profiles ?? [];
            $profiles['advanced'] = $validated['data'] ?? [];
            $avatar->personality_profiles = $profiles;
        }

        $avatar->save();

        return back()->with('message', 'Avatar updated successfully.');
    }
}
