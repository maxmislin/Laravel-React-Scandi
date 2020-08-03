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
    $applyProduct = new Product();
    $category = Category::where(function ($query) use ($req) {
      $query->where('name_en', '=', $req->categoryName)
            ->orWhere('name_ru', '=', $req->categoryName)
            ->orWhere('name_lv', '=', $req->categoryName);
    })->first();
    $attributes = Attribute::where('category_id', '=', $category->id)->get();

    foreach($attributes as $attribute){
      $attribute->name_en = str_replace(" ","_",$attribute->name_en);
      $attribute->name_ru = str_replace(" ","_",$attribute->name_ru);
      $attribute->name_lv = str_replace(" ","_",$attribute->name_lv);
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

    switch ($req->language) {
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

    foreach($attributes as $attribute){
      if (array_key_exists($attributeName, $req->productAttributes)){
        if ($req->productAttributes[$attributeName]['value'] != null){
          $productAttribute = new ProductAttribute();
          $productAttribute->product_id = $applyProduct->id;
          $attribute->name_en = str_replace(" ","_",$attribute->name_en);
          $attribute->name_ru = str_replace(" ","_",$attribute->name_ru);
          $attribute->name_lv = str_replace(" ","_",$attribute->name_lv);
          $productAttribute->attribute = $req->productAttributes[$attributeName]['value'];
          $productAttribute->name_en = $attribute->name_en;
          $productAttribute->name_ru = $attribute->name_ru;
          $productAttribute->name_lv = $attribute->name_lv;
          $productAttribute->units = $attribute->units;

          if ($req->productAttributes[$attributeName]['isHidden'] == true)
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
