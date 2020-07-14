<?php

use Illuminate\Support\Facades\Route;

Route::get('/{path?}', [
    'uses' => 'ReactController@show',
    'as' => 'react',
    'where' => ['path' => '.*']
])->name('react');