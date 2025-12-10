<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\DB;
use App\Models\Memory;

class VectorService
{
    /**
     * Generate an embedding for a given text using OpenAI.
     */
    public function generateEmbedding(string $text): array
    {
        // For MVP/Dev without partial API keys, we might mock this
        if (config('app.env') === 'local' && !config('services.openai.key')) {
             return array_fill(0, 1536, 0.0); // Mock zero vector
        }

        $response = OpenAI::embeddings()->create([
            'model' => 'text-embedding-ada-002',
            'input' => $text,
        ]);

        return $response->embeddings[0]->embedding;
    }

    /**
     * Search for memories similar to the query text.
     * Uses pgvector cosine similarity (<=> operator or 1 - (a <=> b)).
     */
    public function searchMemories($relationId, string $queryText, int $limit = 5)
    {
        $embedding = $this->generateEmbedding($queryText);
        
        // If not Postgres, just return latest (MVP fallback)
        if (DB::connection()->getDriverName() !== 'pgsql') {
            return Memory::where('relation_id', $relationId)
                ->latest()
                ->take($limit)
                ->get();
        }

        // Format vector for SQL
        $vectorString = '[' . implode(',', $embedding) . ']';

        return Memory::where('relation_id', $relationId)
            ->orderByRaw("embedding <=> '$vectorString'")
            ->take($limit)
            ->get();
    }
}
