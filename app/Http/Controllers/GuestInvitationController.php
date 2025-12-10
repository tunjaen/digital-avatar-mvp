<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use App\Models\Relation;

class GuestInvitationController extends Controller
{
    /**
     * Generate a signed URL for a specific relation.
     */
    public function create(Request $request, Relation $relation)
    {
        $user = $request->user();
        // Ensure owner owns this relation
        if ($relation->avatar->owner_id !== $user->id) {
            abort(403);
        }

        // Generate URL valid for 7 days
        $url = URL::temporarySignedRoute(
            'guest.invite',
            now()->addDays(7),
            ['relation' => $relation->id]
        );

        return response()->json(['url' => $url]);
    }

    /**
     * Handle the guest landing on the invite link.
     */
    public function show(Request $request, $relationId)
    {
        if (! $request->hasValidSignature()) {
            abort(403, 'This invitation link has expired or is invalid.');
        }

        $relation = Relation::with('avatar.owner')->findOrFail($relationId);

        return Inertia::render('Guest/Welcome', [
            'relation' => $relation,
            'avatarName' => $relation->avatar->name,
            'ownerName' => $relation->avatar->owner->name,
            // Pass the signature/url info so we can maintain it during registration/login
            'inviteUrl' => $request->fullUrl(), 
        ]);
    }
}
