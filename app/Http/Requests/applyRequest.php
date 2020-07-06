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
        $atributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($atributes as $atribute){
            $atribute->aName = str_replace(" ","_",$atribute->aName);
        }

        $rules = array();
        $rules['sku'] = 'required|min:3|max:20|unique:App\Models\Product,sku';
        $rules['name'] = 'required|min:3|max:30';
        $rules['price'] = 'required|numeric';
        //$rules['Weight'] = 'array';
        
        foreach($atributes as $atribute){
            $rules['productAttributes.'.$atribute->aName.'.value'] = "";
            if ($atribute->required)
                $rules['productAttributes.'.$atribute->aName.'.value'] = $rules['productAttributes.'.$atribute->aName.'.value'].'|required';
            if ($atribute->numeric)
                $rules['productAttributes.'.$atribute->aName.'.value'] = $rules['productAttributes.'.$atribute->aName.'.value'].'|numeric';   
            if ($atribute->unique)
                $rules['productAttributes.'.$atribute->aName.'.value'] = $rules['productAttributes.'.$atribute->aName.'.value'].'|unique:App\Models\ProductAtribute,atribute,'.$atribute->aName;
            if ($atribute->min)
                $rules['productAttributes.'.$atribute->aName.'.value'] = $rules['productAttributes.'.$atribute->aName.'.value'].'|min:'.$atribute->min;
            if ($atribute->max)
                $rules['productAttributes.'.$atribute->aName.'.value'] = $rules['productAttributes.'.$atribute->aName.'.value'].'|max:'.$atribute->max;         
        }
        
        //$rules['productAttributes.Weight.value'] = 'required|numeric';

        //dump($rules);

        return $rules;
    }

    public function messages()
    {

        $category = Category::where('name', '=', $this->categoryName)->first();
        $atributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($atributes as $atribute){
            $atribute->aName = str_replace(" ","_",$atribute->aName);
        }


        
        return[
            'productAttributes.'.$atribute->aName.'.value.required' => 'The '.$atribute->aName.' field is required.',
            'productAttributes.'.$atribute->aName.'.value.numeric' => 'The '.$atribute->aName.' must be a number.',
            'productAttributes.'.$atribute->aName.'.value.unique' => 'The '.$atribute->aName.' has already been taken.',
            'productAttributes.'.$atribute->aName.'.value.min' => 'The '.$atribute->aName.' must be at least :min.',
            'productAttributes.'.$atribute->aName.'.value.max' => 'The '.$atribute->aName.' may not be greater than :max.'
        ];
    }
}
