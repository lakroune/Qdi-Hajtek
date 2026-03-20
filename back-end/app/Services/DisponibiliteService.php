<?php

namespace App\Services;

use App\DAO\DisponibiliteDAO;
use Illuminate\Support\Facades\Log;

class DisponibiliteService
{
    protected $dispoDAO;

    public function __construct(DisponibiliteDAO $dispoDAO)
    {
        $this->dispoDAO = $dispoDAO;
    }

    /**
     *  sazv
     */
    public function saveHoraire(int $artisanId, array $data)
    {
        // hasni trans ba3d
        try {
            $this->dispoDAO->deleteAllByArtisan($artisanId);

            return $this->dispoDAO->createMany($artisanId, $data);
        } catch (\Exception $e) {
            Log::error("Error in DisponibiliteService: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     *  get all disponibilites shhhh
     */
    public function getFormattedDisponibilites(int $artisanId)
    {
        return $this->dispoDAO->getAllByArtisan($artisanId);
    }
}
