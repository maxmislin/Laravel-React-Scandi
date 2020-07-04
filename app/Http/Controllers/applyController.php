<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\applyRequest;
use App\Models\Product;
use App\Models\Category;
use App\Models\Atribute;
use App\Models\ProductAtribute;
use Illuminate\Support\Facades\Validator;

class applyController extends Controller
{
    
    public function submit(applyRequest $req) {

        dump($req);

        $applyProduct = new Product();
        $category = Category::where('name', '=', $req->categoryName)->first();
        $atributes = Atribute::where('category_id', '=', $category->id)->get();

        foreach($atributes as $atribute){
            $atribute->aName = str_replace(" ","_",$atribute->aName);
        }

        /*$rules = array();

        foreach($atributes as $atribute){
            $rules[$atribute->aName] = "";
            if ($atribute->required)
                $rules[$atribute->aName] = $rules[$atribute->aName].'|required';
            if ($atribute->numeric)
                $rules[$atribute->aName] = $rules[$atribute->aName].'|numeric';   
            if ($atribute->unique)
                $rules[$atribute->aName] = $rules[$atribute->aName].'|unique:App\Models\ProductAtribute,atribute,'.$atribute->aName;
            if ($atribute->min)
                $rules[$atribute->aName] = $rules[$atribute->aName].'|min:'.$atribute->min;
            if ($atribute->max)
                $rules[$atribute->aName] = $rules[$atribute->aName].'|max:'.$atribute->max;         
        }    

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails()) {
            return redirect('apply')
                        ->withErrors($validator)
                        ->withInput();
        }*/

        $applyProduct->category_id = $category->id;
        $applyProduct->sku = $req->input('sku');
        $applyProduct->name = $req->input('name');
        $applyProduct->price = $req->input('price');
        $applyProduct->save();

        foreach($atributes as $atribute){
            $productAtribute = new ProductAtribute();
            $productAtribute->product_id = $applyProduct->id;
            $productAtribute->atribute = $req->input('value');
            $atribute->aName = str_replace("_"," ",$atribute->aName);
            $productAtribute->aName = $atribute->aName;
            $productAtribute->units = $atribute->units;

            /*if ($req->productAttributes->isHidden == true)
                $productAtribute->hidden = true;
            else
                $productAtribute->hidden = false;*/
            $productAtribute->hidden = false;
            $productAtribute->save();
        }

        //return redirect()->route('index')->with('success', 'Product added');
    }

    public function allAtributeAndCategoryData() {
        $categories = Category::all();
        $atributes = Atribute::all();

        return response()->json(array('categoryData' => $categories, 'atributeData' => $atributes));
    }
}
