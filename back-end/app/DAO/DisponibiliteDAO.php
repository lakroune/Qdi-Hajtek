<?php

namespace App\DAO;

use App\Models\Disponibilite;
use Illuminate\Support\Facades\DB;

class DisponibiliteDAO
{
    /**
     * createMany  
     */
    public function createMany(int $artisanId, array $data)
    {
        return DB::transaction(function () use ($artisanId, $data) {
            $disponibilites = [];

            foreach ($data as $item) {
                $disponibilites[] = [
                    'artisan_id'   => $artisanId,
                    'jour_semaine' => $item['jour'],
                    'heure_debut'  => $item['debut'],
                    'heure_fin'    => $item['fin']
                ];
            }

            $disponibilites = Disponibilite::insert($disponibilites);

            return $disponibilites;
        });
    }

    /**
     * update
     */
    public function update(int $id, array $data)
    {
        $disponibilite = Disponibilite::findOrFail($id);
        return $disponibilite->update($data);
    }

    /**
     *  delete all disponibilites
     */
    public function deleteAllByArtisan(int $artisanId)
    {
        return Disponibilite::where('artisan_id', $artisanId)->delete();
    }

    /**
     * get all disponibilites
     */
    public function getAllByArtisan(int $artisanId)
    {
        return Disponibilite::where('artisan_id', $artisanId)
            ->orderByRaw("
            CASE jour_semaine
                WHEN 'lundi' THEN 1
                WHEN 'mardi' THEN 2
                WHEN 'mercredi' THEN 3
                WHEN 'jeudi' THEN 4
                WHEN 'vendredi' THEN 5
                WHEN 'samedi' THEN 6
                WHEN 'dimanche' THEN 7
                ELSE 8
            END
        ")->get();
    }
}
