<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ElevenLabsService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.elevenlabs.io/v1';

    public function __construct()
    {
        $this->apiKey = config('services.elevenlabs.key');
    }

    /**
     * Get available voices
     */
    public function getVoices()
    {
        $response = Http::withHeaders([
            'xi-api-key' => $this->apiKey,
        ])->get("{$this->baseUrl}/voices");

        return $response->json();
    }

    /**
     * Generate speech from text (Streaming)
     */
    public function textToSpeechStream($voiceId, $text)
    {
        // Logic to return a stream resource
        // implementation ...
    }
    
    /**
     * Upload voice sample for cloning
     */
    public function addVoice($name, $files)
    {
        // Multipart upload logic
        // ...
    }
}
