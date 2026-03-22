<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('api')->user()->isClient() and auth('api')->user()->hasEmailVerified() and auth('api')->user()->isActive();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'old_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8|confirmed',
            'new_password_confirmation' => 'required|string|min:8',
        ];
    }

    public function messages()
    {
        return [
            'old_password.required' => 'old password is required',
            'old_password.string' => 'old password must be a string',
            'old_password.min' => 'old password must be at least 8 characters',
            'new_password.required' => 'new password is required',
            'new_password.string' => 'new password must be a string',
            'new_password.min' => 'new password must be at least 8 characters',
            'new_password.confirmed' => 'new password must be confirmed',
            'new_password_confirmation.required' => 'new password confirmation is required',
            'new_password_confirmation.string' => 'new password confirmation must be a string',
            'new_password_confirmation.min' => 'new password confirmation must be at least 8 characters',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'data' => $validator->errors()
            ], 422)
        );
    }
}
