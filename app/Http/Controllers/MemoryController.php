<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MemoryController extends Controller
{
    public function store(Request $request, $relationId)
    {
        // The original ownership check was removed in the provided change.
        // If it was intended to be kept, it should be re-added here.
        // For now, following the provided change which starts directly with validation.

        $validated = $request->validate([
            'content' => 'required|string',
            'event_date' => 'nullable|date',
        ]);

        // Generate Embedding
        $vectorService = new \App\Services\VectorService();
        $embedding = $vectorService->generateEmbedding($validated['content']);

        // Store Memory
        // Note: ensuring $casts = ['embedding' => 'array'] in Model if storing as JSON in SQLite
        // If Postgres/Vector, Laravel might need raw insert or a custom caster, 
        // but for now we pass the array and let Laravel/Driver handle it (or json_encode if fallback)
        
        $embeddingValue = DB::connection()->getDriverName() === 'pgsql' 
            ? '[' . implode(',', $embedding) . ']' // pgvector format string
            : json_encode($embedding); // SQLite fallback

        \App\Models\Memory::create([
            'relation_id' => $relationId,
            'content' => $validated['content'],
            'embedding' => $embeddingValue, 
            'event_date' => $validated['event_date'] ?? now(),
            'importance_score' => 3, // Default for now
        ]);

        return back()->with('message', 'Memory recorded.');
    }

    public function update(Request $request, $id)
    {
        $memory = \App\Models\Memory::findOrFail($id);
        
        // Basic Validation
        $validated = $request->validate([
             'content' => 'required|string',
        ]);

        // Re-generate Embedding
        $vectorService = new \App\Services\VectorService();
        $embedding = $vectorService->generateEmbedding($validated['content']);
        
        $embeddingValue = DB::connection()->getDriverName() === 'pgsql' 
             ? '[' . implode(',', $embedding) . ']' 
             : json_encode($embedding);

        $memory->update([
             'content' => $validated['content'],
             'embedding' => $embeddingValue
        ]);

        return back()->with('message', 'Memory updated.');
    }
}
