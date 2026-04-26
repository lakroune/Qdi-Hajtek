<?php

namespace App\Http\Controllers\Api;

use App\DTO\Auth\LoginDTO;
use App\DTO\Auth\RegisterDTO;
use App\DTO\Auth\VerifierEmailDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\auth\LoginRequest;
use App\Http\Requests\auth\RegisterRequest;
use App\Http\Requests\auth\VerifierEmailRequest;
use App\Mail\VerificationCodeMail;
use App\Models\User;
use App\Services\AuthService;
use Exception;
use Illuminate\Support\Facades\Mail;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    public function login(LoginRequest $request, AuthService $authService)
    {
        $dto = new LoginDTO($request->validated());

        $result = $authService->login($dto);

        return response()->json([
            'success' => $result['success'] ?? false,
            'message' => $result['message'] ?? null,
            'user' => $result['user'] ?? null,
            'token' => $result['token'] ?? null
        ]);
    }

    public function register(RegisterRequest $request, AuthService $authService)
    {

        $dto = new RegisterDTO(
            $request->validated()
        );
        $result = $authService->register($dto);
        return response()->json([
            'success' => $result['success'],
            'message' => 'Account created successfully',
            'user' => $result['user'],
            'token' => $result['token']
        ], 201);
    }
    public function verifierEmail(VerifierEmailRequest $request, AuthService $authService)
    {
        $dto = new  VerifierEmailDTO($request->validated());
        $result = $authService->verifierEmail($dto);

        return response()->json([
            'success' => $result['success'] ?? false,
            'message' => $result['message'] ?? null,
            'user' => $result['user'] ?? null,
        ]);
    }

    public function generateCode(AuthService $authService)
    {
        if (!auth('api')->user()) {
            return response()->json(
                ['message' => 'unauthenticated'],
                401
            );
        }
        if (auth('api')->user()->email_verified_at) {
            return response()->json(
                ['message' => 'Email already verified'],
                400
            );
        }
        $etat = $authService->generateCode();
        if ($etat) {
            return response()->json([
                'success' => true,
                'message' => 'Code generated successfully'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate code'
            ], 500);
        }
    }
    // forgetPassword
    public function forgetPassword( AuthService $authService)
    {
        $data = request()->validate([
            'email' => 'required|email|exists:users,email',
        ])    ;

        $authService->forgetPassword($data['email']);
        
        return response()->json([
            'success' => true,
            'message' => 'Code generated successfully'
        ], 200);
    }

    public function logout()
    {
        try {
            JWTAuth::parseToken()->invalidate();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to logout',
                'error' => "something went wrong"
            ], 500);
        }
    }
}
