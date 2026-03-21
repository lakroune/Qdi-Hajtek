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
            'categorie_id' => 'required|exists:categories,id',
            'titre' => 'required|string',
            'description' => 'required|string',
            'budget_estime' => 'required|numeric',
            'date_limite' => 'required|date',
            'type_remuneration' => 'required|in:prix_fixe,prix_heure',
            'niveau_urgence' => 'required|in:faible,moyen,urgent',
        ];
    }
    public function messages()
    {
        return [
            'service_id.required' => 'Le service est requis.',
            'categorie_id.required' => 'La catégorie est requise.',
            'titre.required' => 'Le titre est requis.',
            'description.required' => 'La description est requise.',
            'budget_estime.required' => 'Le budget estimé est requis.',
            'date_limite.required' => 'La date limite est requise.',
            'type_remuneration.required' => 'Le type de remuneration est requis.',
            'niveau_urgence.required' => 'Le niveau d\'urgence est requis.',
            'service_id.exists' => 'Le service n\'existe pas.',
            'categorie_id.exists' => 'La catégorie n\'existe pas.',
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
