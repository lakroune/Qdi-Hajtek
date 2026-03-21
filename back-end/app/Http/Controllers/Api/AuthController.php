<?php

namespace App\Http\Controllers\Api;

use App\DTO\Auth\LoginDTO;
use App\DTO\Auth\RegisterDTO;
use App\DTO\Auth\VerifierEmailDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\auth\LoginRequest;
use App\Http\Requests\auth\RegisterRequest;
use App\Http\Requests\auth\VerifierEmailRequest;
use App\Http\Requests\GenerateCodeRequest;
use App\Mail\VerificationCodeMail;
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
            'success' => $result['success']??false,
            'message' => $result['message']??null,
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

    // public function generateCode(GenerateCodeRequest $request)
    // {
    //     $data = $request->validated();

    //     $user = User::where('email', $data['email'])->first();
    //     if (!$user) {
    //         return response()->json(
    //             ['message' => 'invalid email'],
    //             404
    //         );
    //     }

    //     if ($user->email_verified_at) {
    //         return response()->json(
    //             ['message' => 'email already verified'],
    //             400
    //         );
    //     }

    //     $new_code = random_int(100000, 999999);
    //     $user->code_verification = $new_code;
    //     $user->save();


    //     try {
    //         Mail::to($user->email)->send(new VerificationCodeMail($user->code_verification, $user));
    //         return response()->json([
    //             'message' => 'email sent successfully',
    //             'user' => $user
    //         ], 200);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'message' => 'something went wrong'
    //         ], 500);
    //     }
    // }

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
