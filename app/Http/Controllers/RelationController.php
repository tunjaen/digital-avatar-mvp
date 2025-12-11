<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RelationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'owner') abort(403);
        
        $avatar = \App\Models\Avatar::firstOrCreate(
            ['owner_id' => $user->id],
            ['name' => $user->name . "'s Avatar"]
        );
        
        // Return Inertia view with data
        return \Inertia\Inertia::render('Family/Index', [
            'relations' => $avatar->relations()->withCount('memories')->get()
        ]);
    }

    public function show($id)
    {
        $relation = \App\Models\Relation::with(['memories' => function ($query) {
            $query->select('id', 'relation_id', 'content', 'type', 'event_date', 'importance_score', 'created_at')
                  ->orderBy('created_at', 'asc'); // Oldest first (chat style)
        }])->findOrFail($id);

        return \Inertia\Inertia::render('Family/Show', [
            'relation' => $relation
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'owner') abort(403);

        $avatar = \App\Models\Avatar::where('owner_id', $user->id)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'context_notes' => 'nullable|string',
        ]);

        $relation = $avatar->relations()->create($validated);

        return back()->with('message', 'Family member added.');
    }
}
