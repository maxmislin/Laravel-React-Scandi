<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\addCategoryRequest;
use App\Models\Category;

class categoryController extends Controller
{
    public function submitCategories(addCategoryRequest $req) {
        $addCategory = new Category();
        $addCategory->name_en = $req->input('name_en');
        $addCategory->name_ru = $req->input('name_ru');
        $addCategory->name_lv = $req->input('name_lv');

        $addCategory->save();
    }

    public function allCategoryData() {
        $categories = Category::all();

        return response()->json($categories);
    }
}
