<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\applyRequest;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use App\Models\ProductAtribute;
use Illuminate\Support\Facades\Validator;

class applyController extends Controller
{
    
    public function submit(applyRequest $req) {

        //dd($req);

        $applyProduct = new Product();
        $category = Category::where('name', '=', $req->categoryName)->first();
        $atributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($atributes as $atribute){
            $atribute->aName = str_replace(" ","_",$atribute->aName);
        }

        $applyProduct->category_id = $category->id;
        $applyProduct->sku = $req->input('sku');
        $applyProduct->name = $req->input('name');
        $applyProduct->price = $req->input('price');
        $applyProduct->save();

        foreach($atributes as $atribute){
            $productAtribute = new ProductAtribute();
            $productAtribute->product_id = $applyProduct->id;
            $atribute->aName = str_replace("_"," ",$atribute->aName);
            $productAtribute->atribute = $req->productAttributes[$atribute->aName]['value'];
            $productAtribute->aName = $atribute->aName;
            $productAtribute->units = $atribute->units;

            

            if ($req->productAttributes[$atribute->aName]['isHidden'] == true)
                $productAtribute->hidden = true;
            else
                $productAtribute->hidden = false;

            //dd($productAtribute->hidden);

            $productAtribute->save();
        }

        //return redirect()->route('index')->with('success', 'Product added');
    }

    public function allAtributeAndCategoryData() {
        $categories = Category::all();
        $atributes = Attribute::all();

        return response()->json(array('categoryData' => $categories, 'atributeData' => $atributes));
    }
}
