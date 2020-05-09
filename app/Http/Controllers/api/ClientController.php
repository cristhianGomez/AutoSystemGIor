<?php

namespace App\Http\Controllers\api;

use App\Client;
use App\Location;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ClientResource;
use Illuminate\Support\Facades\Validator;


class ClientController extends Controller
{

    //logica mostrar todos los clientes de una zona
    public function index($location)
    {
        $clients = Client::all()->where('is_active',1)->where('location_id',$location);
        return response([ 'clients' => ClientResource::collection($clients), 'message' => 'Entregado correctamente'], 200);
    }

    //logica crear cliente
    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => 'required|max:100',
            'lastname' => 'required|max:100',
            'phone' => 'required|max:30',
            'email' => 'required|email|unique:clients',
            'dni' => 'required',
            'address' => 'required',
            'sex' => 'required',
            'location_id' => 'required',
            ]);
            
        if($validator->fails()){
            return response(['message'=>'Error informaciòn no válida','error' => $validator->errors()],422);
        }
        $location= Location::find($data['location_id']);
        if(!$location){
            return response(['message'=>'Error, la localidad no ha sido registrada'],422);
        }
        $client = Client::create($data);
        return response([ 'client' => new ClientResource($client), 'message' => 'Creado correctamente'], 200);

    }

    //lógica mostar cliente dado id
    public function show(Client $client)
    {
        return response([ 'client' => new ClientResource($client), 'message' => 'Entregado correctamente'], 200);
    }

    //logica actualizar cliente
    public function update(Request $request, Client $client)
    {
       $data = $request->all();
        $validator = Validator::make($data, [
            'email' => 'required|email|unique:clients,email,'.$client->id.",id"
            ]);
        if($validator->fails()){
            return response(['message'=>'El email ingresado ya existe'],422);
        }
     
            $client->update($data);
            return response([ 'client' => new ClientResource($client), 'message' => 'Entregado correctamente'], 200);
   
    }

    //Al recibir peticiòn delete se desactivarà el clliente
    public function destroy(Client $client)
    {
        $client->is_active =false;
        $client-> save();

        return response(['message' => 'Eliminado']);
    }
}
