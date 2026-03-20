<?php

namespace App\DTOs;

class ArtisanRegistrationDTO
{
    public function __construct(
        public int $userId,
        public string $specialite,
        public ?string $bio,
        public float $rayonAction,
    ) {}

    public static function fromRequest($request): self
    {
        return new self(
            userId: auth()->user()->id(),
            specialite: $request->specialite,
            bio: $request->bio,
            rayonAction: (float) $request->rayon_action,
        );
    }
}
