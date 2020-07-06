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
    }

    public function allCategoryData() {
        $categories = Category::all();

        return response()->json($categories);
    }
}
