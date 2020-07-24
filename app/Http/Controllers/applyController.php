<?php

namespace App\Http\Controllers;

use WebPConvert\WebPConvert;
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
        //dd($req);
        $applyProduct = new Product();
        $category = Category::where('name', '=', $req->categoryName)->first();
        $attributes = Attribute::where('category_id', '=', $category->id)->get();

        foreach($attributes as $attribute){
            $attribute->name = str_replace(" ","_",$attribute->name);
        }
        
        $applyProduct->category_id = $category->id;
        $applyProduct->sku = $req->input('sku');
        $applyProduct->name = $req->input('name');
        $applyProduct->price = $req->input('price');
        $image = $req->get('image');
        $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
        \Image::make($req->get('image'))->save(public_path('images/').$name);
        WebPConvert::convert('images/'.$name, 'images/webp/'.$name.'.webp');
        $applyProduct->picture = $name; 
        $applyProduct->save();

        foreach($attributes as $attribute){
            if (array_key_exists($attribute->name, $req->productAttributes)){
                if ($req->productAttributes[$attribute->name]['value'] != null){
                    $productAttribute = new ProductAttribute();
                    $productAttribute->product_id = $applyProduct->id;
                    $attribute->name = str_replace("_"," ",$attribute->name);
                    $productAttribute->attribute = $req->productAttributes[$attribute->name]['value'];
                    $productAttribute->name = $attribute->name;
                    $productAttribute->units = $attribute->units;

                    if ($req->productAttributes[$attribute->name]['isHidden'] == true)
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
