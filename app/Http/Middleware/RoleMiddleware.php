<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Middleware untuk memvalidasi role user admin.
     */
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        if (! $request->user() || $request->user()->role !== $role) {
            return response()->json([
                'message' => 'Akses ditolak. Role tidak sesuai.',
            ], 403);
        }

        return $next($request);
    }
}
