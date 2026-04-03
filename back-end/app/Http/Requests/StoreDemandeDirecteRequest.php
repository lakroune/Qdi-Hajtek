<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreDemandeDirecteRequest extends FormRequest
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
            'service_id' => 'required|exists:services,id',
            'date_debut' => 'required|date|after_or_equal:today',
            'description_specifique' => 'nullable|string',
            'adresse' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return  [
            'service_id.required' => 'service is required',
            'service_id.exists' => 'service is not found',
            'date_debut.required' => 'date_debut is required',
            'date_debut.date_format' => 'date_debut must be a date',
            'date_fin.required' => 'date_fin is required',
            'date_fin.date_format' => 'date_fin must be a date',
            'date_fin.after' => 'date_fin must be after date_debut',
            'description_specifique.max' => 'description_specifique must be less than 255 characters',
            'adresse.required' => 'adresse is required',
            'adresse.max' => 'adresse must be less than 255 characters',
            'date_debut.after_or_equal' => 'date_debut must be equal or after today',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors()
        ]));
    }
}
