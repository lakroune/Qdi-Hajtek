<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StroreOffreTravailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('api')->user()->hasEmailVerified() and auth('api')->user()->isActive();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'categorie_id' => 'required|exists:categories,id',
            'titre' => 'required|string',
            'description' => 'required|string',
            'budget_estime' => 'required|numeric',
            'preferred_date' => 'required|date|after_or_equal:today',
            'niveau_urgence' => 'required|in:faible,moyen,urgent',
            'ville' => 'required|string',
            'address' => 'required|string',
            'photos' => 'nullable|array|max:4',
            'photos.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
        ];
    }
    public function messages()
    {
        return [
            'categorie_id.required' => 'category id is required',
            'categorie_id.exists' => 'category id is not found',
            'titre.required' => 'title is required',
            'titre.string' => 'title must be a string',
            'description.required' => 'description is required',
            'description.string' => 'description must be a string',
            'budget_estime.required' => 'budget is required',
            'budget_estime.numeric' => 'budget must be a number',
            'preferred_date.required' => 'date is required',
            'preferred_date.date' => 'date must be a date',
            'niveau_urgence.required' => 'urgency level is required',
            'niveau_urgence.in' => 'urgency level must be faible, moyen or urgent',
            'ville.required' => 'city is required',
            'ville.string' => 'city must be a string',
            'address.required' => 'address is required',
            'address.string' => 'address must be a string',
            'photos.array' => 'photos must be an array',
            'photos.max' => 'photos must have a maximum of 4 elements',
            'photos.*.image' => 'photos must be images',
            'photos.*.mimes' => 'photos must be jpeg, png, jpg, gif',
            'photos.*.max' => 'photos must have a maximum size of 1MB',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
