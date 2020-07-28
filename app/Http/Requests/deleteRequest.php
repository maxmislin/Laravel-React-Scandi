<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class deleteRequest extends FormRequest
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
            'id' => 'array|min:1'
        ];
    }

    public function messages()
    { 
      switch ($this->language) {
        case "en":
          return[
            'id.min' => 'Nothing to delete.'
          ];
          break;
        case "ru":
          return[
            'id.min' => 'Нечего удалять.'
          ];
          break;
        case "lv":
          return[
            'id.min' => 'Nav ko dzēst.'
          ];
          break;
    }
  
  }
}
