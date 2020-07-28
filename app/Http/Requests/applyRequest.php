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
        $category = Category::where(function ($query) {
          $query->where('name_en', '=', $this->categoryName)
                ->orWhere('name_ru', '=', $this->categoryName)
                ->orWhere('name_lv', '=', $this->categoryName);
        })
        ->first();
        $attributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($attributes as $attribute){
          $attribute->name_en = str_replace(" ","_",$attribute->name_en);
          $attribute->name_ru = str_replace(" ","_",$attribute->name_ru);
          $attribute->name_lv = str_replace(" ","_",$attribute->name_lv);
      }
        
      switch ($this->language) {
        case "en":
          $attributeName = $attribute->name_en;
          break;
        case "ru":
          $attributeName = $attribute->name_ru;
          break;
        case "lv":
          $attributeName = $attribute->name_lv;
          break;
      }

        $rules = array();
        $rules['sku'] = 'required|min:3|max:20|unique:App\Models\Product,sku';
        $rules['name'] = 'required|min:3|max:30';
        $rules['price'] = 'required|numeric';
        $rules['image'] = 'required';
        $request = array();


        
        foreach($attributes as $attribute){

            if (array_key_exists($attributeName, $this->productAttributes))
                $request[$attributeName]['value'] = $this->productAttributes[$attributeName]['value'];
            else
                $request[$attributeName]['value'] = null;
            
            if (!($request[$attributeName]['value'] == null &&  $attribute->required == 0)){
                $rules['productAttributes.'.$attributeName.'.value'] = "";
                if ($attribute->required)
                    $rules['productAttributes.'.$attributeName.'.value'] = $rules['productAttributes.'.$attributeName.'.value'].'|required';
                if ($attribute->numeric)
                    $rules['productAttributes.'.$attributeName.'.value'] = $rules['productAttributes.'.$attributeName.'.value'].'|numeric';   
                if ($attribute->unique)
                    $rules['productAttributes.'.$attributeName.'.value'] = $rules['productAttributes.'.$attributeName.'.value'].'|unique:App\Models\ProductAttribute,attribute,NULL,id,name,'.$attributeName;
                if ($attribute->min)
                    $rules['productAttributes.'.$attributeName.'.value'] = $rules['productAttributes.'.$attributeName.'.value'].'|min:'.$attribute->min;
                if ($attribute->max)
                        $rules['productAttributes.'.$attributeName.'.value'] = $rules['productAttributes.'.$attributeName.'.value'].'|max:'.$attribute->max;
            }
        }

        return $rules;
    }

    public function messages()
    {
      $category = Category::where(function ($query) {
        $query->where('name_en', '=', $this->categoryName)
              ->orWhere('name_ru', '=', $this->categoryName)
              ->orWhere('name_lv', '=', $this->categoryName);
      })
      ->first();
      $attributes = Attribute::where('category_id', '=', $category->id)->get();

      foreach($attributes as $attribute){
        $attribute->name_en = str_replace(" ","_",$attribute->name_en);
        $attribute->name_ru = str_replace(" ","_",$attribute->name_ru);
        $attribute->name_lv = str_replace(" ","_",$attribute->name_lv);
    }
      
      switch ($this->language) {
      case "en":
        $attributeName = $attribute->name_en;
        break;
      case "ru":
        $attributeName = $attribute->name_ru;
        break;
      case "lv":
        $attributeName = $attribute->name_lv;
        break;
      }
        switch ($this->language) {
          case "en":
            return[
              'productAttributes.'.$attributeName.'.value.required' => 'The '.$attributeName.' field is required.',
              'productAttributes.'.$attributeName.'.value.numeric' => 'The '.$attributeName.' must be a number.',
              'productAttributes.'.$attributeName.'.value.unique' => 'The '.$attributeName.' has already been taken.',
              'productAttributes.'.$attributeName.'.value.min' => 'The '.$attributeName.' must be at least :min.',
              'productAttributes.'.$attributeName.'.value.max' => 'The '.$attributeName.' may not be greater than :max.'
            ];
            break;
          case "ru":
            return[
              'sku.required' => 'Поле ИТП обязательно.',
              'sku.min' => 'ИТП должно быть не менее :min символов.',
              'sku.max' => 'ИТП не может быть больше :max символов.',
              'sku.unique' => 'ИТП уже занято.',
              'name.required' => 'Поле название обязательно.',
              'name.min' => 'Название должно быть не менее :min символов.',
              'name.max' => 'Название не может быть больше :max символов.',
              'price.required' => 'Поле цена обязательно.',
              'price.numeric' => 'Цена должна быть числом.',
              'image.required' => 'Поле изображение обязательно.',
              'productAttributes.'.$attributeName.'.value.required' => 'Поле '.$attributeName.' обязательно.',
              'productAttributes.'.$attributeName.'.value.numeric' => $attributeName.' должен быть числом.',
              'productAttributes.'.$attributeName.'.value.unique' => 'Название для '.$attributeName.' уже занято.',
              'productAttributes.'.$attributeName.'.value.min' => $attributeName.' должен быть не менее :min.',
              'productAttributes.'.$attributeName.'.value.max' => $attributeName.' должен быть не больше :max.'
            ];
            break;
          case "lv":
            return[
              'sku.required' => 'SKU lauks ir obligāts.',
              'sku.min' => 'SKU jābūt vismaz :min simboliem.',
              'sku.max' => 'SKU nevar būt garāks par :max simboliem.',
              'sku.unique' => 'SKU jau ir aizņemts.',
              'name.required' => 'Lauks nosaukums ir obligāts.',
              'name.min' => 'Nosaukums jābūt vismaz :min simboliem.',
              'name.max' => 'Nosaukums nevar būt garāks par :max simboliem.',
              'price.required' => 'Lauks cena ir obligāts.',
              'price.numeric' => 'Cenai jābūt skaitlim.',
              'image.required' => 'Lauks attēls ir obligāts.',
              'productAttributes.'.$attributeName.'.value.required' => 'Lauks '.$attributeName.' ir obligāts.',
              'productAttributes.'.$attributeName.'.value.numeric' => 'Laukam '.$attributeName.' jābūt skaitliskam.',
              'productAttributes.'.$attributeName.'.value.unique' => $attributeName.' jau ir aizņemts.',
              'productAttributes.'.$attributeName.'.value.min' => $attributeName.' jābūt vismaz :min.',
              'productAttributes.'.$attributeName.'.value.max' => $attributeName.' nevar būt lielāks par :max.'
            ];
            break;
        }
        
    }
  
}
