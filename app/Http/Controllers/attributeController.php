<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\addAttributeRequest;
use App\Models\Category;
use App\Models\Attribute;

class attributeController extends Controller
{
    public function submitAttributes(addAttributeRequest $req) {
        dd($req);
        $addAttribute = new Attribute();
        $category = Category::where(function ($query) use ($req) {
          $query->where('name_en', '=', $req->categoryName)
                ->orWhere('name_ru', '=', $req->categoryName)
                ->orWhere('name_lv', '=', $req->categoryName);
        })->first();
        $addAttribute->category_id = $category->id;
        $addAttribute->name_en = $req->input('name_en');
        $addAttribute->name_ru = $req->input('name_ru');
        $addAttribute->name_lv = $req->input('name_lv');
        $addAttribute->units = $req->input('units');

        if ($req->required == true)
            $addAttribute->required = true;
        else
            $addAttribute->required = false;

        if ($req->numeric == true)
            $addAttribute->numeric = true;
        else
            $addAttribute->numeric = false;
            
        if ($req->unique == true)
            $addAttribute->unique = true;
        else
            $addAttribute->unique = false;    
        
        $addAttribute->min = $req->input('min');
        $addAttribute->max = $req->input('max');

        $addAttribute->save();
    }

}
