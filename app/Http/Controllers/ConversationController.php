<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function show($avatarId)
    {
        $avatar = \App\Models\Avatar::findOrFail($avatarId);
        
        // In real app, check Guest permission here
        // $user = request()->user();
        // check GuestAccess...

        return \Inertia\Inertia::render('Chat/Room', [
            'avatar' => $avatar,
        ]);
    }

    public function start(Request $request, $avatarId) 
    {
        $user = $request->user();
        $avatar = \App\Models\Avatar::findOrFail($avatarId);

        // 1. Check Usage Limits (if User is a Guest)
        if ($user->role === 'guest') {
            $access = \App\Models\GuestAccess::where('user_id', $user->id)
                ->where('avatar_id', $avatarId)
                ->first(); // Should filter by Relation too in full implementation

            if (!$access) {
                // Return 403 but creating a default 'trial' access for MVP testing if missing
                // In production, this strictly fails.
                $access = \App\Models\GuestAccess::create([
                    'user_id' => $user->id,
                    'avatar_id' => $avatarId,
                    'monthly_minutes_limit' => 5, // 5 min trial
                    'minutes_used_this_month' => 0
                ]);
            }

            if ($access->minutes_used_this_month >= $access->monthly_minutes_limit) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Monthly limit reached. Please contact the owner to increase your limit.'
                ], 403);
            }
        }

        // Placeholder: resolving 'Daughter' or 'Guest' dynamically based on user
        // For MVP manual test, we pick the first relation of this avatar
        $relation = $avatar->relations()->first();

        // 2. Create Conversation record
        $conversation = \App\Models\Conversation::create([
            'relation_id' => $relation ? $relation->id : 0, 
            'started_at' => now(),
        ]);

        // 3. Generate OpenAI System Instruction (Context)
        $aiService = new \App\Services\OpenAIService();
        $systemInstruction = $relation 
            ? $aiService->generateSessionInstruction($avatar, $relation)
            : "You are {$avatar->name}. You are talking to a guest.";

        return response()->json([
            'status' => 'started',
            'conversation_id' => $conversation->id,
            'connection_token' => 'mock_token_for_openai_realtime', // In PROD: fetch ephemeral token from OpenAI
            'system_instruction' => $systemInstruction, // Frontend will use this to initialize context
        ]);
    }

    public function end(Request $request, $conversationId)
    {
        $conversation = \App\Models\Conversation::findOrFail($conversationId);
        
        // Calculate duration safely
        $now = now();
        $durationSeconds = $now->diffInSeconds($conversation->started_at);
        $durationMinutes = ceil($durationSeconds / 60);

        // Update Conversation
        $conversation->update([
            'duration_seconds' => $durationSeconds
        ]);

        // Update Guest Access Usage
        $user = $request->user();
        if ($user && $user->role === 'guest') {
            // Find the relevant access record. 
            // In a robust app, we'd link Conversation -> Relation -> GuestAccess
            // For MVP, likely just querying by user/avatar
            
            // We need to know which Avatar this conversation belonged to. 
            // Currently Relation -> Avatar.
            $relation = \App\Models\Relation::find($conversation->relation_id);
            if ($relation) {
                $access = \App\Models\GuestAccess::where('user_id', $user->id)
                    ->where('avatar_id', $relation->avatar_id)
                    ->first();

                if ($access) {
                    $access->increment('minutes_used_this_month', $durationMinutes);
                }
            }
        }

        return response()->json(['status' => 'ended', 'duration' => $durationSeconds]);
    }
}
