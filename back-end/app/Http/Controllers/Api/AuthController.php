<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\auth\LoginRequest;
use App\Http\Requests\auth\RegisterRequest;
use App\Http\Requests\auth\VerifierEmailRequest;
use App\Mail\VerificationCodeMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $dataFormLogin = $request->validated();

        if (!Auth::attempt($dataFormLogin)) {
            return response()->json([
                'message' => 'Identifiant incorrect (Email or Password)'
            ], 401);
        }

        // 3. Generate Token
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = User::create($data);
        $code = str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);
        $user->code_verification = $code;
        $user->save();

        $token = $user->createToken('main')->plainTextToken;
        Mail::to($user->email)->send(new VerificationCodeMail($code, $user));
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function  verifierEmail(VerifierEmailRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non trouvé'
            ], 404);
        }
        $user->email_verified_at = now();
        $user->save();

        return response()->json([
            'message' => 'Email vérifié avec succès'
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
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
