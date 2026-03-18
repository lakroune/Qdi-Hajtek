<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\auth\LoginRequest;
use App\Http\Requests\auth\RegisterRequest;
use App\Http\Requests\auth\VerifierEmailRequest;
use App\Mail\VerificationCodeMail;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();
        if ($user) {
            if ($user->email_verified_at) {
                if (password_verify($data['password'], $user->password)) {
                    if (!$user->email_verified_at) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Email not verified'
                        ], 401);
                    }
                    $token = JWTAuth::fromUser($user);
                    return response()->json([
                        'success' => true,
                        'message' => 'Logged in successfully',
                        'user' => $user,
                        'token' => $token
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid password'
                    ], 401);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Email not verified'
                ], 401);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);

        $role = Role::where('name', 'client')->first();
        if ($role) {
            $role->users()->attach($user->id);
        } else {
            return response()->json([
                'message' => 'something went wrong'
            ], 404);
        }

        $code = random_int(100000, 999999);
        $user->code_verification = $code;
        $user->save();

        $token = JWTAuth::fromUser($user);

        Mail::to($user->email)->send(new VerificationCodeMail($user->code_verification, $user));

        return response()->json([
            'success' => true,
            'message' => 'Account created successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function verifierEmail(VerifierEmailRequest $request)
    {
        $data = $request->validated();

        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        if ($user->code_verification != $data['code_verification']) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification code'
            ], 400);
        }

        $user->email_verified_at = now();
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully',
            'user' => $user
        ], 200);
    }

    public function gererRenvoi(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user->email_verified_at) {
            return response()->json(['message' => 'Cet email est déjà vérifié'], 400);
        }

        $nouveauCode = str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);

        $user->code_verification = $nouveauCode;
        $user->save();

        try {
            Mail::to($user->email)->send(new VerificationCodeMail($nouveauCode, $user));
            return response()->json(['message' => 'Nouveau code envoyé avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de l\'envoi de l\'email'], 500);
        }
    }
    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        $user->tokens()->delete();
        return response()->json([
            'message' => 'Déconnecté avec succès'
        ], 200);
    }
}
