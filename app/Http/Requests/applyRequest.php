<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Attribute;
use App\Models\Category;

class applyRequest extends FormRequest
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
        $attributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($attributes as $attribute){
            $attribute->aName = str_replace("_"," ",$attribute->aName);
        }

        $rules = array();
        $rules['sku'] = 'required|min:3|max:20|unique:App\Models\Product,sku';
        $rules['name'] = 'required|min:3|max:30';
        $rules['price'] = 'required|numeric';
        
        foreach($attributes as $attribute){
            $rules['productAttributes.'.$attribute->aName.'.value'] = "";
            if ($attribute->required)
                $rules['productAttributes.'.$attribute->aName.'.value'] = $rules['productAttributes.'.$attribute->aName.'.value'].'|required';
            if ($attribute->numeric)
                $rules['productAttributes.'.$attribute->aName.'.value'] = $rules['productAttributes.'.$attribute->aName.'.value'].'|numeric';   
            if ($attribute->unique)
                $rules['productAttributes.'.$attribute->aName.'.value'] = $rules['productAttributes.'.$attribute->aName.'.value'].'|unique:App\Models\ProductAttribute,attribute,'.$attribute->aName;
            if ($attribute->min)
                $rules['productAttributes.'.$attribute->aName.'.value'] = $rules['productAttributes.'.$attribute->aName.'.value'].'|min:'.$attribute->min;
            if ($attribute->max)
                $rules['productAttributes.'.$attribute->aName.'.value'] = $rules['productAttributes.'.$attribute->aName.'.value'].'|max:'.$attribute->max;         
        }

        return $rules;
    }

    public function messages()
    {
        $category = Category::where('name', '=', $this->categoryName)->first();
        $attributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($attributes as $attribute){
            $attribute->aName = str_replace("_"," ",$attribute->aName);
        }

        return[
            'productAttributes.'.$attribute->aName.'.value.required' => 'The '.$attribute->aName.' field is required.',
            'productAttributes.'.$attribute->aName.'.value.numeric' => 'The '.$attribute->aName.' must be a number.',
            'productAttributes.'.$attribute->aName.'.value.unique' => 'The '.$attribute->aName.' has already been taken.',
            'productAttributes.'.$attribute->aName.'.value.min' => 'The '.$attribute->aName.' must be at least :min.',
            'productAttributes.'.$attribute->aName.'.value.max' => 'The '.$attribute->aName.' may not be greater than :max.'
        ];
    }
}
