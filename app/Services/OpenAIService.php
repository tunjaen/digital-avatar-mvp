<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Log;

class OpenAIService
{
    /**
     * Generate a chat completion.
     *
     * @param array $messages
     * @param float $temperature
     * @return string|null
     */
    public function chat(array $messages, float $temperature = 0.7): ?string
    {
        try {
            $response = OpenAI::chat()->create([
                'model' => 'gpt-4o',
                'messages' => $messages,
                'temperature' => $temperature,
                'max_tokens' => 500,
            ]);

            return $response->choices[0]->message->content ?? null;
        } catch (\Exception $e) {
            Log::error('OpenAI Chat Error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Generate an embedding for a given text.
     *
     * @param string $text
     * @return array|null
     */
    public function embed(string $text): ?array
    {
        try {
            $response = OpenAI::embeddings()->create([
                'model' => 'text-embedding-3-small',
                'input' => $text,
            ]);

            return $response->embeddings[0]->embedding ?? null;
        } catch (\Exception $e) {
            Log::error('OpenAI Embedding Error: ' . $e->getMessage());
            return null;
        }
    }
}
