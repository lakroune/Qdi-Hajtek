<?php

namespace App\Http\Requests\auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|unique:users,phone',
            'city' => 'required|string|max:255',
        ];
    }
    public function messages()
    {
        return [
            'firstname.required' => 'Le prénom est requis',
            'lastname.required' => 'Le nom est requis',
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email doit être valide',
            'email.unique' => 'L\'email est deja utilise',
            'password.required' => 'Le mot de passe est requis',
            'password.min' => 'Le mot de passe doit avoir au moins 8 caractères',
            'password.confirmed' => 'Les mots de passe ne correspondent pas',
            'phone.required' => 'Le numéro de telephone est requis',
            'phone.unique' => 'Le numéro de telephone est deja utilise',
            'city.required' => 'La ville est requise',

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
