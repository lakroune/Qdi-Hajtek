<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreArtisanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            "specialite" => "required|string|max:255",
            "bio" => "nullable|string",
            "rayon_action" => "required|numeric",
            "cin_rec" => "required|file|mimes:jpg,jpeg,png|max:1024",
            "cin_ver" => "required|file|mimes:jpg,jpeg,png|max:1024",
            "rib_doc" => "required|file|mimes:jpg,jpeg,png|max:1024",
            "diplome_doc" => "nullable|array",
            "certificat_doc" => "nullable|array",
        ];
    }

    public function messages()
    {

        return [
            "specialite.required" => "The specialite field is required.",
            "bio.required" => "The bio field is required.",
            "rayon_action.required" => "The rayon_action field is required.",
            "cin_rec.required" => "The cin_rec field is required.",
            "cin_ver.required" => "The cin_ver field is required.",
            "rib_doc.required" => "The rib_doc field is required.",
            "diplome_doc.required" => "The diplome_doc field is required.",
            "certificat_doc.required" => "The certificat_doc field is required.",
            "required" => "The :attribute field is required.",
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
