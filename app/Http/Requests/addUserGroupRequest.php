<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class addUserGroupRequest extends FormRequest
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
            'name_en' => 'required|min:3|max:20|unique:App\Models\UserGroup,name_en',
            'name_ru' => 'required|min:3|max:20|unique:App\Models\UserGroup,name_ru',
            'name_lv' => 'required|min:3|max:20|unique:App\Models\UserGroup,name_lv'
        ];
    }

    public function messages()
    { 
      switch ($this->language) {
        case "en":
          return[];
          break;
        case "ru":
          return[
            'name_en.unique' => 'Название на английском уже занято.',
            'name_en.required' => 'Поле название на английском обязательно.',
            'name_en.min' => 'Название на английском должно быть не менее :min символов.',
            'name_en.max' => 'Название на английском не может быть больше :max символов.',
            'name_ru.unique' => 'Название на русском уже занято.',
            'name_ru.required' => 'Поле название на русском обязательно.',
            'name_ru.min' => 'Название на русском должно быть не менее :min символов.',
            'name_ru.max' => 'Название на русском не может быть больше :max символов.',
            'name_lv.unique' => 'Название на латышском уже занято.',
            'name_lv.required' => 'Поле название на латышском обязательно.',
            'name_lv.min' => 'Название на латышском должно быть не менее :min символов.',
            'name_lv.max' => 'Название на латышском не может быть больше :max символов.'
          ];
          break;
        case "lv":
          return[
            'name_en.unique' => 'Nosaukums angļu valodā jau ir aizņemts.',
            'name_en.required' => 'Lauks nosaukums angļu valodā ir obligāts.',
            'name_en.min' => 'Nosaukums angļu valodā jābūt vismaz :min simboliem.',
            'name_en.max' => 'Nosaukums angļu valodā nevar būt garāks par :max simboliem.',
            'name_ru.unique' => 'Nosaukums krievu valodā jau ir aizņemts.',
            'name_ru.required' => 'Lauks nosaukums krievu valodā ir obligāts.',
            'name_ru.min' => 'Nosaukums krievu valodā jābūt vismaz :min simboliem.',
            'name_ru.max' => 'Nosaukums krievu valodā nevar būt garāks par :max simboliem.',
            'name_lv.unique' => 'Nosaukums latviešu valodā jau ir aizņemts.',
            'name_lv.required' => 'Lauks nosaukums latviešu valodā ir obligāts.',
            'name_lv.min' => 'Nosaukums latviešu valodā jābūt vismaz :min simboliem.',
            'name_lv.max' => 'Nosaukums latviešu valodā nevar būt garāks par :max simboliem.',
          ];
          break;
    }
  }
}
