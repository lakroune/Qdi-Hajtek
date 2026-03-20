<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreDisponibiliteRequest extends FormRequest
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
            'horaires' => 'required|array|min:1',
            'horaires.*.jour'  => 'required|string|in:lundi,mardi,mercredi,jeudi,vendredi,samedi,dimanche',
            'horaires.*.debut' => 'required|date_format:H:i',
            'horaires.*.fin'   => 'required|date_format:H:i|after:horaires.*.debut',
        ];
    }

    public function messages()
    {
        return [
            'horaires.*.debut.after' => 'The end time must be after the start time',
            'horaires.*.fin.after' => 'The end time must be after the start time',
        ];
    }


    public  function failedValidation(Validator $validator)
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
