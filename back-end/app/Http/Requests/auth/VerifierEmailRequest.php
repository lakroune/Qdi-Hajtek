<?php

namespace App\Http\Requests\auth;

use Illuminate\Foundation\Http\FormRequest;

class VerifierEmailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'token' => 'required',
            'code' => 'required|numeric|digits:4',
        ];
    }
    public function messages()
    {
        return [
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email doit être valide',
            'token.required' => 'Le token est requis',
            'code.required' => 'Le code est requis',
            'code.numeric' => 'Le code doit être numérique',
            'code.digits' => 'Le code doit avoir 4 chiffres',
        ];
    }
}
