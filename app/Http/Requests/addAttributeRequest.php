<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Category;

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
        $category = Category::where('name', '=', $this->categoryName)->first();
        
        return [
            'name' => 'required|min:3|max:20|unique:App\Models\Attribute,aName,NULL,id,category_id,'.$category->id,
            'min' => 'nullable|numeric',
            'max' => 'nullable|numeric'
        ];
    }
}
