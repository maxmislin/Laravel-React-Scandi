<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\addCategoryRequest;
use App\Models\Category;

class categoryController extends Controller
{
    public function submitCategories(addCategoryRequest $req) {
        
        $addCategory = new Category();
        $addCategory->name = $req->input('name');
        $addCategory->save();

        //return redirect()->route('index')->with('success', 'Category added');
    }

    public function addCategoriesData() {
        return view('addCategories');
    }

    public function allCategoryData() {
        $categories = Category::all();

        return response()->json($categories);
    }
}
