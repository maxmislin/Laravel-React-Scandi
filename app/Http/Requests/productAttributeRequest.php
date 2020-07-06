<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Attribute;
use App\Models\Category;

class productAttributeRequest extends FormRequest
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
            'sku' => 'required|min:3|max:20|unique:App\Models\Product,sku',
            'name' => 'required|min:3|max:30',
            'price' => 'required|numeric'
        ];
    }
}
