<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
}
