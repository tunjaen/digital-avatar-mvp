<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Avatar Configuration
    Route::get('/avatar/config', [\App\Http\Controllers\AvatarController::class, 'config'])->name('avatar.config');
    Route::get('/avatar/edit/personality', [\App\Http\Controllers\AvatarController::class, 'editPersonality'])->name('avatar.personality');

    // Legacy/Previous routes (keep for compatibility if needed, or remove)
    Route::get('/avatar', [\App\Http\Controllers\AvatarController::class, 'edit'])->name('avatar.edit');
    Route::post('/avatar', [\App\Http\Controllers\AvatarController::class, 'update'])->name('avatar.update');

    // Chat Interface
    Route::get('/chat/{avatar}', [\App\Http\Controllers\ConversationController::class, 'show'])->name('chat.show');
    Route::post('/chat/{avatar}/start', [\App\Http\Controllers\ConversationController::class, 'start'])->name('chat.start');
    Route::post('/conversation/{conversation}/end', [\App\Http\Controllers\ConversationController::class, 'end'])->name('chat.end');
    Route::post('/conversation/{conversation}/message', [\App\Http\Controllers\ConversationController::class, 'message'])->name('chat.message');

    // Relations & Memories
    Route::get('/family', [\App\Http\Controllers\RelationController::class, 'index'])->name('family.index');
    Route::get('/family/{id}', [\App\Http\Controllers\RelationController::class, 'show'])->name('family.show');
    Route::post('/family', [\App\Http\Controllers\RelationController::class, 'store'])->name('family.store');
    Route::post('/family/{relation}/memories', [\App\Http\Controllers\MemoryController::class, 'store'])->name('memories.store');
    Route::patch('/memories/{id}', [\App\Http\Controllers\MemoryController::class, 'update'])->name('memories.update');
    
    // Generate Invite (Owner only)
    Route::get('/share', function (Illuminate\Http\Request $request) {
        $user = $request->user();
        $avatar = \App\Models\Avatar::where('owner_id', $user->id)->firstOrFail();

        return \Inertia\Inertia::render('Share/Invite', [
             'relations' => $avatar->relations
        ]);
    })->name('share.index');
    
    Route::post('/relations/{relation}/invite', [\App\Http\Controllers\GuestInvitationController::class, 'create'])->name('relations.invite');
});

// Public Signed Routes (Guest Access)
Route::get('/invite/{relation}', [\App\Http\Controllers\GuestInvitationController::class, 'show'])
    ->name('guest.invite')
    ->middleware('signed');

require __DIR__.'/auth.php';
