<?php

namespace App\DTO;

class ServiceDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly int $CategorieId,
        public readonly string $titre,
        public readonly string $description,
        public readonly float $tarif,
        public readonly string $typeTarif,
        public readonly int $estimationDuree,
        public readonly string $material,
        public readonly int $artisanId,
        public readonly string $statut,
    ) {
        //
    }

    public  static function fromRequest($request)
    {
        return new self(
            CategorieId: $request->validated('categorie_id'),
            titre: $request->validated('titre'),
            description: $request->validated('description'),
            tarif: $request->validated('tarif'),
            typeTarif: $request->validated('type_tarif'),
            estimationDuree: $request->validated('estimation_duree'),
            material: $request->validated('material'),
            artisanId: $request->user()->id,
            statut: 'approuve'

        );
    }

    public function toArray()
    {
        return [
            'categorie_id' => $this->CategorieId,
            'titre' => $this->titre,
            'description' => $this->description,
            'tarif' => $this->tarif,
            'type_tarif' => $this->typeTarif,
            'estimation_duree' => $this->estimationDuree,
            'material' => $this->material,
            'artisan_id' => $this->artisanId,
            'statut' => $this->statut
        ];
    }
}
