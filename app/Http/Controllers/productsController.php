<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Requests\deleteRequest;
use App\Models\Product;
use App\Models\ProductAttribute;

class productsController extends Controller
{
  public function massDelete(deleteRequest $req) {

    foreach($req->id as $id){
      $attributes = ProductAttribute::where('product_id', '=', $id)->get();
      $product = Product::find($id);
      File::delete('images/'.$product->picture);
      File::delete('images/webp/'.$product->picture.'.webp');
      $product->delete();

      foreach($attributes as $attribute){
        ProductAttribute::find($attribute->id)->delete();
      }
    }
  }

  public function index() {
    $products = Product::all();
    $attributes = ProductAttribute::all();

    return response()->json(array('productData' => $products, 'atributeData' => $attributes));
  }
}
