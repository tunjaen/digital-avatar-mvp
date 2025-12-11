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

        $avatarName = $relation->avatar->name;
        $ownerName = $relation->avatar->owner->name;

        // Smart Display: If the avatar name looks like a default name (contains "Avatar"),
        // we prefer using the current Owner's name to ensure it's up-to-date and correctly capitalized.
        // This fixes issues where the user renames their profile but the avatar name remains stale.
        if (str_contains(strtolower($avatarName), 'avatar')) {
             $avatarName = $ownerName . "'s Avatar";
        }

        return Inertia::render('Guest/Welcome', [
            'relation' => $relation,
            'avatarName' => $avatarName,
            'ownerName' => $ownerName,
            // Pass the signature/url info so we can maintain it during registration/login
            'inviteUrl' => $request->fullUrl(), 
        ]);
    }
}
