<?php

use Illuminate\Support\Facades\Route;


/*Route::post('/delete', 'applyController@massDelete')->name('delete-form');
//Route::get('/{path?}', 'applyController@allProductData')->name('index');
//Route::get('/{path?}', 'applyController@allCategoryData')->name('apply');
Route::post('/apply/submit', 'applyController@submit')->name('apply-form');
Route::get('/addCategories', 'applyController@addCategoriesData')->name('addCategories');
Route::post('/addCategories/submit', 'applyController@submitCategories')->name('addCategories-form');
Route::get('/addAtributes', 'applyController@addAtributesData')->name('addAtributes');
Route::post('/addAtributes/submit', 'applyController@submitAtributes')->name('addAtributes-form');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');*/


Route::get('/{path?}', [
    'uses' => 'ReactController@show',
    'as' => 'react',
    'where' => ['path' => '.*']
])->name('react');