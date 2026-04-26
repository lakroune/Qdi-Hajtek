<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        $userRoles = auth()->user()->roles->pluck('name')->toArray();

        if (empty(array_intersect($userRoles, $roles))) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        return $next($request);
    }
}
