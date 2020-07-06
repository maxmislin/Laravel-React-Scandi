<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class addAttributeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:3|max:20|unique:App\Models\Attribute,aName,category_id',
            'min' => 'nullable|numeric',
            'max' => 'nullable|numeric'
        ];
    }
}
