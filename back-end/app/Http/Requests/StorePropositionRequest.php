<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StorePropositionRequest extends FormRequest
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
            'offre_id' => 'required|exists:offre_travails,id',
            'prix_propose' => 'required|numeric|min:0',
            'delai_execution' => 'required|string',
            'message_explicatif' => 'required|string|min:20',
            'date_disponibilite' => 'required|date|after_or_equal:today',
            'conditions_speciales' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'offre_id.required' => 'offre is required',
            'offre_id.exists' => 'offre is not found',
            'prix_propose.required' => 'prix is required',
            'prix_propose.numeric' => 'prix must be a number',
            'prix_propose.min' => 'prix must be at least 0',
            'delai_execution.required' => 'delai_execution is required',
            'delai_execution.string' => 'delai_execution must be a string',
            'message_explicatif.required' => 'message_explicatif is required',
            'message_explicatif.string' => 'message_explicatif must be a string',
            'message_explicatif.min' => 'message_explicatif must be at least 20 characters',
            'date_disponibilite.required' => 'date_disponibilite is required',
            'date_disponibilite.date' => 'date_disponibilite must be a date',
            'date_disponibilite.after_or_equal' => 'date_disponibilite must be after or equal to today',
            'conditions_speciales.string' => 'conditions_speciales must be a string',
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
