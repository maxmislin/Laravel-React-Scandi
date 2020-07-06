<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\deleteRequest;
use App\Models\Product;
use App\Models\ProductAtribute;

class productsController extends Controller
{
    public function allProductData() {
        return view('index', ['productData' => Product::all(), 'atributeData' => ProductAtribute::all()]); 
    }

    public function massDelete(deleteRequest $req) {

        //dd($req);
        

        foreach($req->id as $id){
            $atributes = ProductAtribute::where('product_id', '=', $id)->get();
            Product::find($id)->delete();
            foreach($atributes as $atribute){
                ProductAtribute::find($atribute->id)->delete();
            }
            
        }

        //return redirect()->route('index')->with('success', 'Products deleted');
    }

    public function index() {
        $products = Product::all();
        $atributes = ProductAtribute::all();

        return response()->json(array('productData' => $products, 'atributeData' => $atributes));
    }
}
