<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\addAttributeRequest;
use App\Models\Category;
use App\Models\Attribute;

class attributeController extends Controller
{
    public function submitAttributes(addAttributeRequest $req) {

        $addAttribute = new Attribute();
        $category = Category::where('name', '=', $req->categoryName)->first();
        $addAttribute->category_id = $category->id;
        $addAttribute->name = $req->input('name');
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
