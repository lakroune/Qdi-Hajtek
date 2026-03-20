<?php

namespace App\DTO;

use Illuminate\Http\Request;

class CategorieDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly string $nom_categorie,
        public readonly ?string $description,
        public readonly mixed $icon = null,
        public readonly bool $is_active = true
    ) {}
    public static function fromRequest(Request $request): self
    {
        return new self(
            nom_categorie: $request->validated('nom_categorie'),
            description: $request->validated('description'),
            icon: $request->validated('icon'),
            is_active: $request->boolean('is_active', true)
        );
    }
    public function toArray(): array
    {
        return [
            'nom_categorie' => $this->nom_categorie,
            'description'   => $this->description,
            'icon'          => $this->icon,
            'is_active'     => $this->is_active,
        ];
    }
}
