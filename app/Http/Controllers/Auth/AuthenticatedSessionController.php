<?php

namespace App\Http\Controllers\Auth;

use App\Constants\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show login page
     */
    public function create()
    {
        return inertia('auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        $user = User::where('email', $request->email)
            ->where('role', UserRole::ADMIN)
            ->first();

        if (! $user) {
            return back()->withErrors([
                'email' => 'Invalid credentials'
            ]);
        }

        if (! Hash::check($request->password, $user->password)) {
            return back()->withErrors([
                'email' => 'Invalid Credentials'
            ]);
        }

        Auth::login($user);

        return inertia()->location('/dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return inertia()->location('/');
    }
}
