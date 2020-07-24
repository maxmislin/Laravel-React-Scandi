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

        //dd($this->request);
        $category = Category::where('name', '=', $this->categoryName)->first();
        $attributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($attributes as $attribute){
            $attribute->name = str_replace("_"," ",$attribute->name);
        }

        $rules = array();
        $rules['sku'] = 'required|min:3|max:20|unique:App\Models\Product,sku';
        $rules['name'] = 'required|min:3|max:30';
        $rules['price'] = 'required|numeric';
        $rules['image'] = 'required';
        $request = array();


        
        foreach($attributes as $attribute){

            if (array_key_exists($attribute->name, $this->productAttributes))
                $request[$attribute->name]['value'] = $this->productAttributes[$attribute->name]['value'];
            else
                $request[$attribute->name]['value'] = null;
            
            if (!($request[$attribute->name]['value'] == null &&  $attribute->required == 0)){
                $rules['productAttributes.'.$attribute->name.'.value'] = "";
                if ($attribute->required)
                    $rules['productAttributes.'.$attribute->name.'.value'] = $rules['productAttributes.'.$attribute->name.'.value'].'|required';
                if ($attribute->numeric)
                    $rules['productAttributes.'.$attribute->name.'.value'] = $rules['productAttributes.'.$attribute->name.'.value'].'|numeric';   
                if ($attribute->unique)
                    $rules['productAttributes.'.$attribute->name.'.value'] = $rules['productAttributes.'.$attribute->name.'.value'].'|unique:App\Models\ProductAttribute,attribute,NULL,id,name,'.$attribute->name;
                if ($attribute->min)
                    $rules['productAttributes.'.$attribute->name.'.value'] = $rules['productAttributes.'.$attribute->name.'.value'].'|min:'.$attribute->min;
                if ($attribute->max)
                        $rules['productAttributes.'.$attribute->name.'.value'] = $rules['productAttributes.'.$attribute->name.'.value'].'|max:'.$attribute->max;
            }
        }

        return $rules;
    }

    public function messages()
    {
        $category = Category::where('name', '=', $this->categoryName)->first();
        $attributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($attributes as $attribute){
            $attribute->name = str_replace("_"," ",$attribute->name);
        }

        return[
            'productAttributes.'.$attribute->name.'.value.required' => 'The '.$attribute->name.' field is required.',
            'productAttributes.'.$attribute->name.'.value.numeric' => 'The '.$attribute->name.' must be a number.',
            'productAttributes.'.$attribute->name.'.value.unique' => 'The '.$attribute->name.' has already been taken.',
            'productAttributes.'.$attribute->name.'.value.min' => 'The '.$attribute->name.' must be at least :min.',
            'productAttributes.'.$attribute->name.'.value.max' => 'The '.$attribute->name.' may not be greater than :max.'
        ];
    }
}
