<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateServiceRequest extends FormRequest
{
    /**
     * 
     */
    public function authorize(): bool
    {
      return auth('api')->user()->hasEmailVerified() and auth('api')->user()->isActive();
    }

    /**
     * 
     */
    public function rules(): array
    {
        return [
            'titre' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'tarif' => 'sometimes|required|numeric|between:0,999999.99',
            'type_tarif' => 'sometimes|required|string|in:prix_fixe,prix_heure,prix_jour,prix_m2',
            'estimation_duree' => 'sometimes|required|integer',
            'material' => 'nullable|string|max:255',
            'categorie_id' => 'sometimes|required|integer|exists:categories,id',
            'is_active' => 'sometimes|boolean',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpg,jpeg,png|max:1024',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'integer|exists:service_images,id',
        ];
    }

    public function messages()
    {
        return [
            'titre.required' => 'Le titre est requis',
            'description.required' => 'La description est requise',
            'tarif.required' => 'Le tarif est requis',
            'images.*.image' => 'Le fichier doit être une image',
            'images.*.mimes' => 'L\'image doit être au format jpeg, png, jpg',
            'images.*.max' => 'L\'image doit avoir une taille inférieure à 1MB',
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
