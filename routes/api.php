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
Route::post('/delete', 'productsController@massDelete')->name('delete-form');
//Route::get('/{path?}', 'applyController@allProductData')->name('index');
//Route::get('/{path?}', 'applyController@allCategoryData')->name('apply');
Route::post('/apply/submit', 'applyController@submit')->name('apply-form');
Route::get('atributes', 'applyController@allAtributeAndCategoryData');
Route::post('/addCategories/submit', 'categoryController@submitCategories')->name('addCategories-form');
Route::get('categories', 'categoryController@allCategoryData')->name('addAtributes');
Route::post('/addAtributes/submit', 'atributeController@submitAtributes')->name('addAtributes-form');


