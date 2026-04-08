<?php

namespace App\DAO;

use App\Models\Evaluation;

class EvaluationDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(array $data)
    {
        return Evaluation::create($data);
    }
}
