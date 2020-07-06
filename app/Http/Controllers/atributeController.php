<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\addAtributeRequest;
use App\Models\Category;
use App\Models\Attribute;

class atributeController extends Controller
{
    public function submitAtributes(addAtributeRequest $req) {

        $addAtribute = new Attribute();
        $category = Category::where('name', '=', $req->categoryName)->first();
        $addAtribute->category_id = $category->id;
        $addAtribute->aName = $req->input('name');
        $addAtribute->units = $req->input('units');

        if ($req->required == 'true')
            $addAtribute->required = true;
        else
            $addAtribute->required = false;

        if ($req->numeric == 'true')
            $addAtribute->numeric = true;
        else
            $addAtribute->numeric = false;
            
        if ($req->unique == 'true')
            $addAtribute->unique = true;
        else
            $addAtribute->unique = false;    
        
        $addAtribute->min = $req->input('min');
        $addAtribute->max = $req->input('max');

        $addAtribute->save();
    }

}
