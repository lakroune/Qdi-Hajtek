<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('api')->user()->isClient() and auth('api')->user()->hasEmailVerified();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'city' => 'required|string|max:255',
            'phone' => 'nullable|numeric|digits:10|regex:/^0[1-9](\d{8})$/',
            'address' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:1024',
            'rib' => 'nullable|numeric|digits:16',
        ];
    }

    public function messages()
    {
        return [
            'city.required' => 'city is required',
            'phone.required' => 'phone is required',
            'phone.max' => 'phone must be less than 10 digits',
            'avatar.image' => 'avatar must be an image',
            'avatar.mimes' => 'avatar must be a jpeg, png, jpg',
            'avatar.max' => 'avatar must be less than 1MB',
            'rib.required' => 'rib is required',
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
