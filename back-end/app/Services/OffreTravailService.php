<?php

namespace App\Services;

use App\DAO\OffreTravailDAO;
use App\DTO\OffreTravailDTO;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class OffreTravailService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private OffreTravailDAO $offreTravailDAO)
    {
        //
    }

    public function  createOffreTravail(OffreTravailDTO $offreTravailDTO, array $images = [])
    {
        try {
            $imageUrls = [];
            if (!empty($images)) {
                foreach ($images as $image) {
                    $path = $image->store('offreTravails', 'public');
                    $imageUrls[] = $path;
                }
            }
            return $this->offreTravailDAO->create($offreTravailDTO->toArray(), $imageUrls);
        } catch (Exception $e) {
            Log::error("Error creating offre travail: " . $e->getMessage());
            if (!empty($imageUrls)) {
                foreach ($imageUrls as $url) {
                    Storage::disk('public')->delete($url);
                }
            }
            throw $e;
        }
    }

    public function updateOffreTravail($id, OffreTravailDTO $offreTravailDTO)
    {
        return $this->offreTravailDAO->update($id, $offreTravailDTO->toArray());
    }
    public function deleteOffreTravail($id)
    {
        return $this->offreTravailDAO->delete($id);
    }

    public function findOffreTravail($id)
    {
        return $this->offreTravailDAO->find($id);
    }

    public function findAllOffreTravail()
    {
        return $this->offreTravailDAO->findAll();
    }

    public function findByClient($id)
    {
        return $this->offreTravailDAO->findByClient($id);
    }
}
