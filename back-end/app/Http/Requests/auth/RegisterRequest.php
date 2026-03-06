<?php

namespace App\Http\Requests\auth;

use Illuminate\Foundation\Http\FormRequest;

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
            'nom' => '|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'telephone' => 'required|string|unique:users,telephone',
            'ville' => 'required|string|max:255',
        ];
    }
    public function messages()
    {
        return [
            'nom.required' => 'Le nom est requis',
            'prenom.required' => 'Le prénom est requis',
            'email.required' => 'L\'email est requis',
            'password.required' => 'Le mot de passe est requis',
            'telephone.required' => 'Le téléphone est requis',
            'password.confirmed' => 'Les mots de passe ne correspondent pas',
            'email.unique' => 'Cet email est déjà utilisé',
            'telephone.unique' => 'Ce numéro de téléphone est déjà utilisé',
            'password.min' => 'Le mot de passe doit avoir au moins 8 caractères',
            'email.email' => 'L\'email doit être valide',
            'prenom.string' => 'Le prénom doit être une chaîne de caractères',
            'nom.string' => 'Le nom doit être une chaîne de caractères',
            'telephone.string' => 'Le téléphone doit être une chaîne de caractères',
            'ville.string' => 'La ville doit être une chaîne de caractères',

        ];
    }
}
