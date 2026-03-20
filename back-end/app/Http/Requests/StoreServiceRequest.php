<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreServiceRequest extends FormRequest
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
            'title' => 'required|string',
            'description' => 'required|string|max:255',
            'tarif' => 'required|numeric',
            'type_tarif' => 'nullable|string|in:prix_fixe,prix_heure,prix_jour,prix_m2',
            'estimation_duree' => 'nullable|numeric',
            'material' => 'nullable|string|max:255',
            'categorie_id' => 'required|numeric',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpg,jpeg,png|max:1024',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'title is required',
            'description.required' => 'description is required',
            'tarif.required' => 'tarif is required',
            'images.*.image' => 'image must be an image',
            'images.*.mimes' => 'image must be a jpeg, png, jpg',
            'images.*.max' => 'image must be less than 1MB',
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
