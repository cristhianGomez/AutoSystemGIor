<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    //reglas de validacion alamcenar cliente
    public function rules()
    {
    return [
            'name' => 'required|max:100',
            'lastname' => 'required|max:100',
            'email' => 'required|email|unique:clients',
            'phone' => 'required|max:30',
            'location_id' => 'required',
             ];
    }

    //mesajes personalizados
    public function messages()
    {
        return [
            'name.required' => 'Porfavor ingrese su nombre',
            'lastname.required' => 'Porfavor ingrese su apellido',
            'phone.required' => 'Porfavor ingrese su nombre',
            'email.required' => 'Porfavor ingrese su email',
            'location_id.required' => 'Porfavor ingrese su localidad',
            'name.max' => 'La cantidad maxima de caracteres del nombre es 100',
            'lastname.max' => 'La cantidad maxima de caracteres del apellido es 100',
            'phone.max' => 'La cantidad maxima de caracteres del celular es 30',
            'email.unique' => 'EL email ingresado ya está siendo utlizado.',
        ];
    }
}
