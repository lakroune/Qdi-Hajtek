<?php

namespace App\DTO;

class ArtisanRegistrationDTO
{
    public function __construct(
        public int $userId,
        public string $specialite,
        public ?string $bio,
        public float $rayonAction,
        public float $latitude,
        public float $longitude
    ) {}

    public static function fromRequest($request): self
    {
        return new self(
            userId: auth()->user()->id,
            specialite: $request->specialite,
            bio: $request->bio,
            rayonAction: (float) $request->rayon_action,
            latitude: $request->latitude,
            longitude: $request->longitude
        );
    }

    public function toArray(): array
    {
        return [
            'userId' => $this->userId,
            'specialite' => $this->specialite,
            'bio' => $this->bio,
            'rayonAction' => $this->rayonAction,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude
        ];
    }
}
