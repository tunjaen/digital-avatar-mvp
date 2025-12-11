<?php

namespace App\Services;

use App\Models\Avatar;
use App\Models\Conversation;

class ChatService
{
    protected $openAI;

    public function __construct(OpenAIService $openAI)
    {
        $this->openAI = $openAI;
    }

    /**
     * Generate a response for a conversation.
     */
    public function generateResponse(Conversation $conversation, string $userMessage)
    {
        $avatar = $conversation->avatar;
        
        // 1. Build System Prompt (Personality)
        $systemPrompt = $this->buildSystemPrompt($avatar);

        // 2. Prepare Messages History
        // optimization: In a real app, we would fetch the last ~10 messages from DB
        // For MVP, we'll assume the client sends the context or we just use the current message + system
        $messages = [
            ['role' => 'system', 'content' => $systemPrompt],
            ['role' => 'user', 'content' => $userMessage],
        ];

        // 3. Call LLM
        $responseContent = $this->openAI->chat($messages);

        return $responseContent ?? "I'm having trouble thinking right now. Can you ask me again?";
    }

    /**
     * Construct the dynamic system prompt based on Avatar configuration.
     */
    protected function buildSystemPrompt(Avatar $avatar): string
    {
        $name = $avatar->name;
        $ownerName = $avatar->owner->name ?? 'User';
        
        // Extract traits from JSON columns (if implemented) or use defaults
        $basePrompt = "You are a digital avatar of {$ownerName}, named {$name}. ";
        $basePrompt .= "Your goal is to converse with family members as if you were {$ownerName}. ";
        $basePrompt .= "Use their tone, memories, and style of speaking. ";
        $basePrompt .= "Be warm, empathetic, and authentic.";

        return $basePrompt;
    }
}
