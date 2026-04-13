<?php

namespace App\DAO;

use App\DTO\ArtisanRegistrationDTO;
use App\Models\Artisan;
use App\Models\DemandeDirecte;
use App\Models\Document;
use App\Models\Evaluation;
use App\Models\Proposition;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ArtisanDAO
{
    public function createDommnde(ArtisanRegistrationDTO $dto, array $filePaths): Artisan
    {
        return DB::transaction(function () use ($dto, $filePaths) {

            $artisan = Artisan::create([
                'id' => $dto->userId,
                'specialite' => $dto->specialite,
                'bio' => $dto->bio, 
                'latitude' => $dto->latitude,
                'longitude' => $dto->longitude,
                'rayon_action' => $dto->rayonAction,
            ]);

            $this->saveDocument($artisan->id, 'cin', 'CIN Front', $filePaths['cin_rec']);
            $this->saveDocument($artisan->id, 'cin', 'CIN Back', $filePaths['cin_ver']);
            $this->saveDocument($artisan->id, 'autre', 'RIB Document', $filePaths['rib_doc']);

            if (!empty($filePaths['diplomes'])) {
                foreach ($filePaths['diplomes'] as $path) {
                    $this->saveDocument($artisan->id, 'diplome', 'Diplôme', $path);
                }
            }

            if (!empty($filePaths['certificats'])) {
                foreach ($filePaths['certificats'] as $path) {

                    $this->saveDocument($artisan->id, 'certificat', 'Certificat', $path);
                }
            }

            return $artisan;
        });
    }

    private function saveDocument($artisanId, $type, $title, $path)
    {
        return Document::create([
            'artisan_id' => $artisanId,
            'type_document' => $type,
            'titre_document' => $title,
            'file_path' => $path
        ]);
    }

    public function getArtisan(int $artisanId)
    {
        return User::with('artisan.services.images', 'client')->where('id', $artisanId)->get();
    }

    public function getArtisans()
    {
        return User::with('artisan.documents', 'client')->whereHas('artisan')->get();
    }

    public function approveArtisan(int $artisanId)
    {
        return    DB::transaction(function () use ($artisanId) {
            $user =  User::where('id', $artisanId)->first();
            $user->assignRole('artisan');
            return $user->artisan->update(['is_verified' => true]);
        });
    }

    public function rejectArtisan(int $artisanId)
    {
        return  DB::transaction(function () use ($artisanId) {
            $user =  User::where('id', $artisanId)->first();
            $user->removeRole('artisan');
            return $user->artisan->delete();
        });
    }
    public function artisanEvaluations(int $artisanId)
    {
        return Evaluation::whereHas('conversation', function ($query) use ($artisanId) {
            $query->whereHasMorph(
                'conversable',
                [DemandeDirecte::class, Proposition::class],
                function ($subQuery, $type) use ($artisanId) {
                    if ($type === DemandeDirecte::class) {
                        $subQuery->whereHas('service', function ($q) use ($artisanId) {
                            $q->where('artisan_id', $artisanId);
                        });
                    } elseif ($type === Proposition::class) {
                        $subQuery->where('artisan_id', $artisanId);
                    }
                }
            );
        });
    }
    public function averageRating(int $artisanId)
    {
        return $this->artisanEvaluations($artisanId)->avg('rating') ?? 0;
    }

    public function updateRating(int $artisanId)
    {
        $artisan = Artisan::where('id', $artisanId)->first();
        return $artisan->update(['note' => $this->averageRating($artisanId)]);
    }
}
