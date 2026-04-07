<?php

namespace App\Services;

use App\DAO\OffreTravailDAO;
use App\DTO\OffreTravailDTO;
use App\Http\Resources\OffreResource;
use App\Http\Resources\OffreTravailDetailResource;
use App\Http\Resources\OffreTravailResource;
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

    public function updateOffreTravail($id, string $status)
    {
        return $this->offreTravailDAO->update($id, $status);
    }
    public function deleteOffreTravail($id)
    {
        return $this->offreTravailDAO->delete($id);
    }

    public function findOffreTravail($id)
    {
        $offre = $this->offreTravailDAO->find($id);
        return new  OffreTravailDetailResource($offre);
    }

    public function getAllOffreTravail($request)
    {
        return $this->offreTravailDAO->getAll($request);
    }

    public function findByClient($id)
    {
        $offre = $this->offreTravailDAO->findByClient($id);
        return OffreTravailResource::collection($offre);
    }

    // getOffreTravailWithPropositions
    public function getOffreTravailWithPropositions($id)
    {
         $offre = $this->offreTravailDAO->find($id);
        return new OffreTravailDetailResource($offre);
    }
}
