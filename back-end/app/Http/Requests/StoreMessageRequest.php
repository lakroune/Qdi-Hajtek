<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
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
            'conversation_id' => 'required|exists:conversations,id',
            'contenu_message' => 'required|string',
            'attachment_path' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'conversation_id.required' => 'conversation id is required',
            'conversation_id.exists' => 'conversation id is not found',
            'contenu_message.required' => 'message is required',
            'contenu_message.string' => 'message must be a string',
            'attachment_path.string' => 'attachment path must be a string',
        ];
    }

    
}
