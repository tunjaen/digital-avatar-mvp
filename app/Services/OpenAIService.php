<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAIService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.openai.key');
        $this->baseUrl = 'https://api.openai.com/v1';
    }

    /**
     * Build the System Prompt with Personality and Memories.
     */
    public function generateSessionInstruction(\App\Models\Avatar $avatar, \App\Models\Relation $relation)
    {
        // 1. Base Identity
        $traits = $avatar->personality_profiles ?? [];
        $basic = $traits['basic'] ?? [];
        $systemPrompt = "You are an AI avatar of {$avatar->name}. ";
        $systemPrompt .= "Your voice and tone should match these traits: " . json_encode($basic) . ". ";

        // 2. Relation Specifics
        $systemPrompt .= "You are talking to {$relation->name}. Context: {$relation->context_notes}. ";

        // 3. Episodic Memories (RAG)
        // 3. Episodic Memories (RAG)
        // In a real session, we might search based on the *current topic*, but at the start
        // we load "General Context" or simply the most recent ones.
        // Let's use VectorSearch to find memories relevant to "Who is this person?" (The relation name)
        
        $vectorService = new \App\Services\VectorService();
        $relevantMemories = $vectorService->searchMemories($relation->id, "Memories with " . $relation->name, 5); 

        $memoriesContent = $relevantMemories->pluck('content')->toArray();

        if (!empty($memoriesContent)) {
            $systemPrompt .= "Relevant Memories you recall about this person: " . implode(" | ", $memoriesContent) . ". ";
        } else {
            $systemPrompt .= "You don't have specific past memories recorded with this person yet. ";
        }

        return $systemPrompt;
    }

    /**
     * Relay audio/text to OpenAI (Placeholder for actual WS implementation)
     */
    public function processInput($input)
    {
        // ... Logic to send to OpenAI WSS would go here
        // or via HTTP for Chat Completions fallback
    }
}
