<?php

namespace App\DAO;

use App\DTO\ArtisanRegistrationDTO;
use App\Models\Artisan;
use App\Models\Document;
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
}
