<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return  auth('api')->user()->hasEmailVerified() and auth('api')->user()->isActive();
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
            'attachment_path' => 'nullable|string'
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

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors(),
            'status' => 422
        ]));
    }
}
