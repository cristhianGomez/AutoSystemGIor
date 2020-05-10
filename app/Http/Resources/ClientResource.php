<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    public function toArray($request)
    {
         return [
        'id' => $this->id,
        'name' => $this->name,
        'lastºname' => $this->lastºname,
        'phone' => $this->phone,
        'email' => $this->email,
        'dni' => $this->dni,
        'address' => $this->address,
        'sex' => $this->sex,
        'location' => $this->location->name,
        'updated_at' => $this->updated_at,
    ];
    }
}
