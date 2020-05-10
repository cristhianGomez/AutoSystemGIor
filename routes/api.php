<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//rutas para autenticacion, registro no fue requisito por lo que se deshabilitó?
// Route::post('/register', 'api\AuthController@register');
Route::post('/login', 'api\AuthController@login');

//rutas autenticadas
Route::group(['middleware' => 'auth:api'], function ($router) {
    Route::post('/logout', 'api\AuthController@logout');
    Route::apiResource('/clients', 'api\ClientController')->except([
      'index'
      ]);
    Route::get('clients/location/{location}','api\ClientController@index');
    Route::apiResource('/locations', 'api\LocationController')->except([
      'show'
      ]);
  });

  
