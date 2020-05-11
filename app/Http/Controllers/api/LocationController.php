<?php

namespace App\Http\Controllers\api;

use App\Location;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LocationResource;
use Illuminate\Support\Facades\Validator;


class LocationController extends Controller
{
    // mostrar localidades
    public function index()
    {
        $location = Location::all();
        return response([ 'locations' => LocationResource::collection($location), 'message' => 'Entregado correctamente'], 200);
    }

    //crear localidad con nombre unico
    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => 'required|unique:locations',
            ]);
        if($validator->fails()){
            return response(['message'=>'Ya existe una localidad con ese nombre'],422);
        }
        $location = Location::create($data);
        return response([ 'location' => new LocationResource($location), 'message' => 'Creado correctamente'], 200);
    }

    // actualizar localidad
    public function update(Request $request, Location $location)
    {
       $data = $request->all();
        $validator = Validator::make($data, [
            'name' => 'required|unique:locations,name,'.$location->id.",id"
            ]);
        if($validator->fails()){
            return response(['message'=>'Ya existe una localidad con ese nombre'],422);
        }
        $location->update($data);
        return response([ 'location' => new LocationResource($location), 'message' => 'Entregado correctamente'], 200);
    }

    //eliminar localidad si no tiene clientes    
    public function destroy(Location $location)
    {
        if(count($location->clients)){
            return response(['message' => 'No se pudo eliminar, La localidad tiene clientes'],422);
        }
        $location->delete();
        return response(['message' => 'Localidad eliminada']);
    }
}
