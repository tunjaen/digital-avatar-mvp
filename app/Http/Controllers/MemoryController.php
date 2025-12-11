<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MemoryController extends Controller
{
    public function store(Request $request, $relationId)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'event_date' => 'nullable|date',
        ]);

        // Generate Embedding with Fallback
        $vectorService = new \App\Services\VectorService();
        $embedding = array_fill(0, 1536, 0.0); // Default zero vector

        try {
            $embedding = $vectorService->generateEmbedding($validated['content']);
        } catch (\Exception $e) {
            // Log error but proceed so user flow isn't broken
            \Illuminate\Support\Facades\Log::warning('Vector embedding failed: ' . $e->getMessage());
        }

        // Store Memory
        $embeddingValue = DB::connection()->getDriverName() === 'pgsql' 
            ? '[' . implode(',', $embedding) . ']' 
            : json_encode($embedding);

        \App\Models\Memory::create([
            'relation_id' => $relationId,
            'content' => $validated['content'],
            'embedding' => $embeddingValue, 
            'event_date' => $validated['event_date'] ?? now(),
            'importance_score' => 3, 
        ]);

        // Explicit redirect to the relation page to avoid blank page issues
        return to_route('family.show', $relationId)->with('message', 'Memory recorded.');
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
