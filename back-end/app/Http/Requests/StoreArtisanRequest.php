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
            "specialite"     => "required|string|max:255",
            "bio"            => "nullable|string",
            "rayon_action"   => "required|numeric|min:1",
            "cin_rec"        => "required|image|mimes:jpg,jpeg,png|max:2048",
            "cin_ver"        => "required|image|mimes:jpg,jpeg,png|max:2048",
            "rib_doc"        => "required|image|mimes:jpg,jpeg,png|max:2048",
            "diplome_doc"    => "nullable|array",
            "diplome_doc.*"  => "image|mimes:jpg,jpeg,png,pdf|max:2048",
            "certificat_doc"   => "nullable|array",
            "certificat_doc.*" => "image|mimes:jpg,jpeg,png,pdf|max:2048",
        ];
    }

    public function messages()
    {

        return [
            "specialite.required" => "specialite is required",
            "bio.required" => "bio is required",
            "rayon_action.required" => "rayon_action is required",
            "cin_rec.required" => "cin_rec is required",
            "cin_ver.required" => "cin_ver is required",
            "rib_doc.required" => "rib_doc is required",
            "diplome_doc.required" => "diplome_doc is required",
            "certificat_doc.required" => "certificat_doc is required",
            "cin_rec.image" => "cin_rec must be an image",
            "cin_ver.image" => "cin_ver must be an image",
            "rib_doc.image" => "rib_doc must be an image",
            "diplome_doc.image" => "diplome_doc must be an image",
            "certificat_doc.image" => "certificat_doc must be an image",
            "diplome_doc.*.image" => "diplome_doc.* must be an image",
            "certificat_doc.*.image" => "certificat_doc.* must be an image",
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
