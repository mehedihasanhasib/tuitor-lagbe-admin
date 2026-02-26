<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('/dashboard', '/');
    Route::get('/', function () {
        return inertia('Dashboard');
    });
});

require __DIR__ . '/auth.php';
