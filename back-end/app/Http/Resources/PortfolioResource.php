<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $artisanData = $this->artisan;

        $completedDirectMissions = $artisanData->services->flatMap->demandesDirectes
            ->where('is_completed', true)->count();

        $completedPropositions = $artisanData->propositions
            ->where('is_completed', true)->count();

        return [
            'id' => $this->id,
            'full_name' => "{$this->firstname} {$this->lastname}",
            'email' => $this->email,
            'city' => $this->city,
            'avatar' => $this->client->avatar ?? null,

            'profile_details' => [
                'specialite' => $artisanData->specialite,
                'bio' => $artisanData->bio,
                'is_verified' => (bool)$artisanData->is_verified,
                'rating_average' => (float)$artisanData->note,
                'missions_completed_count' => $completedDirectMissions + $completedPropositions,
                'likes' => $artisanData->likes->count(),
                'has_liked'=>  $artisanData->likes->contains( 'client_id', auth('api')->user()->id),
                'location' => [
                    'lat' => $artisanData->latitude,
                    'long' => $artisanData->longitude,
                    'rayon_action' => $artisanData->rayon_action,
                ],
            ],
            'services' => $artisanData->services
                ->filter(function ($service) {
                    if (auth()->check() && auth()->id() === $service->artisan_id) {
                        return true;
                    }

                    return $service->is_active === true && $service->statut === 'approuve';
                })
                ->map(function ($service) {
                    return [
                        'id' => $service->id,
                        'titre' => $service->titre,
                        'tarif' => "{$service->tarif} DH",
                        'type_tarif' => $service->type_tarif,
                        'description' => $service->description,
                        'is_active' => $service->is_active,
                        'statut' => $service->statut,
                        'images' => $service->images->pluck('url'),
                        'stats' => [
                            'total_demandes' => $service->demandesDirectes->count(),
                            'en_attente' => $service->demandesDirectes->where('statut', 'en_attente')->count(),
                        ]
                    ];
                })->values(),
            'reviews' => $this->getArtisanEvaluations($artisanData),

            'documents_status' => $artisanData->documents->map(function ($doc) {
                return [
                    'type' => $doc->type_document,
                    'titre' => $doc->titre_document,
                    'statut' => $doc->statut_verification,
                ];
            }),
        ];
    }

    /**
     * Récupère tous les avis depuis les conversations
     */
    private function getArtisanEvaluations($artisan)
    {
        $evalsDirect = $artisan->services->flatMap(function ($service) {
            return $service->demandesDirectes->map(function ($demande) {
                $eval = $demande->conversation?->evaluation;
                if (!$eval) return null;

                return [
                    'rating' => $eval->rating,
                    'comment' => $eval->comment,
                    'date' => $eval->created_at->format('d/m/Y'),
                    'client_name' => $demande->client->user->firstname . ' ' . $demande->client->user->lastname,
                    'client_avatar' => $demande->client->avatar,
                ];
            });
        })->filter();

        $evalsPropos = $artisan->propositions->map(function ($proposition) {
            $eval = $proposition->conversation?->evaluation;
            if (!$eval) return null;

            $client = $proposition->offreTravail->client;

            return [
                'rating' => $eval->rating,
                'comment' => $eval->comment,
                'date' => $eval->created_at->format('d/m/Y'),
                'client_name' => $client->user->firstname . ' ' . $client->user->lastname,
                'client_avatar' => $client->avatar,
            ];
        })->filter();

        return $evalsDirect->concat($evalsPropos)->values();
    }
}
