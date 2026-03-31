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
            'cin' => 'required|string|max:8|min:8|unique:clients,cin',
            'city' => 'required|string|max:255',  //pour le client
        ];
    }
    public function messages()
    {
        return [
            'firstname.required' => 'firstname is required',
            'lastname.required' => 'lastname is required',
            'email.required' => 'email is required',
            'email.unique' => 'email already exists',
            'password.required' => 'password is required',
            'cin.required' => 'cin is required',
            'cin.unique' => 'cin already exists',
            'city.required' => 'city is required',


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
