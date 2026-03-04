<?php

use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('/dashboard', '/');
    Route::get('/', function () {
        return inertia('Dashboard');
    });

    Route::resource('/subjects', SubjectController::class)->except(['create', 'show', 'edit']);
});

require __DIR__ . '/auth.php';
