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
            ->orderByRaw("FIELD(jour_semaine, 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche')")
            ->get();
    }
}
