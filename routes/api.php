<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('product', 'productsController@index');
Route::post('delete', 'productsController@massDelete');
Route::post('apply/submit', 'applyController@submit');
Route::get('attributes', 'applyController@allAtributeAndCategoryData');
Route::post('addCategories/submit', 'categoryController@submitCategories');
Route::get('categories', 'categoryController@allCategoryData');
Route::post('addAttributes/submit', 'attributeController@submitAttributes');


