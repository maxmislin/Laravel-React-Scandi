<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\applyRequest;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use App\Models\ProductAttribute;
use Illuminate\Support\Facades\Validator;

class applyController extends Controller
{
    public function submit(applyRequest $req) {

        $applyProduct = new Product();
        $category = Category::where('name', '=', $req->categoryName)->first();
        $attributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($attributes as $attribute){
            $attribute->aName = str_replace(" ","_",$attribute->aName);
        }

        $applyProduct->category_id = $category->id;
        $applyProduct->sku = $req->input('sku');
        $applyProduct->name = $req->input('name');
        $applyProduct->price = $req->input('price');
        $applyProduct->save();

        foreach($attributes as $attribute){
            if (array_key_exists($attribute->aName, $req->productAttributes)){
                if ($req->productAttributes[$attribute->aName]['value'] != null){
                    $productAttribute = new ProductAttribute();
                    $productAttribute->product_id = $applyProduct->id;
                    $attribute->aName = str_replace("_"," ",$attribute->aName);
                    $productAttribute->attribute = $req->productAttributes[$attribute->aName]['value'];
                    $productAttribute->aName = $attribute->aName;
                    $productAttribute->units = $attribute->units;

                    if ($req->productAttributes[$attribute->aName]['isHidden'] == true)
                        $productAttribute->hidden = true;
                    else
                        $productAttribute->hidden = false;

                    $productAttribute->save();
                }
            }
        }
    }

    public function allAtributeAndCategoryData() {
        $categories = Category::all();
        $atributes = Attribute::all();

        return response()->json(array('categoryData' => $categories, 'atributeData' => $atributes));
    }
}
