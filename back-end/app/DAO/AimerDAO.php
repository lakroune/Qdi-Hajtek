<?php

namespace App\DAO;

use App\Models\Aimer;

class AimerDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }


    public function aimer(int $serviceId)
    {
        return  Aimer::create(['service_id' => $serviceId, 'user_id' => auth()->user()->id]);
    }
}
