<?php

namespace App\Http\Resources;

use App\Models\DemandeDirecte;
use App\Models\Proposition;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaiementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $conversable = $this->conversation->conversable ?? null;

        $total = (float) $this->montant;
        $commission = round($total * 0.10, 2);
        $net = round($total - $commission, 2);

        return [
            'id' => $this->id,
            'reference' => 'PAY-' . str_pad($this->id, 6, '0', STR_PAD_LEFT),
            'stripe_id' => $this->stripe_payment_id,

            'finance' => [
                'total' => $total,
                'commission' => $commission,
                'net_artisan' => $net,
                'currency' => strtoupper($this->devise),
            ],

            'service' => [
                'title' => $this->getServiceTitle($conversable),
                'type' => class_basename($conversable),
            ],

            'status' => [
                'payment' => $this->statut,
                'payout' => ($conversable && $conversable->statut === 'termine') ? 'released' : 'held',
            ],

            'dates' => [
                'created_at' => $this->created_at->format('d/m/Y H:i'),
                'human' => $this->created_at->diffForHumans(),
            ],

            'artisan' => [
                'id' => $this->getArtisan($conversable)->id ?? null,
                'name' => $this->getArtisanName($conversable),
                'city' => $this->getArtisan($conversable)->user->city ?? null,
            ],

            'client' => [
                'id' => $this->client_id,
                'name' => $this->client->user->firstname . ' ' . $this->client->user->lastname,
                'avatar' => $this->client->user->avatar_url ?? null,
            ],

            'conversation' => [
                'id' => $this->conversation_id,
            ],
        ];
    }

    protected function getServiceTitle($conversable): string
    {
        if ($conversable instanceof \App\Models\Proposition) {
            return $conversable->projet->titre ?? "Proposition de projet";
        }

        if ($conversable instanceof \App\Models\DemandeDirecte) {
            return $conversable->service->titre ?? "Service Direct";
        }

        return "Prestation de service";
    }

    /**
     * Helper pour récupérer l'artisan de manière sécurisée
     */
    protected function getArtisan($conversable)
    {
        if ($conversable instanceof \App\Models\Proposition) {
            return $conversable->artisan;
        }

        if ($conversable instanceof \App\Models\DemandeDirecte) {
            return $conversable->service->artisan ?? null;
        }

        return null;
    }

    public function getArtisanName($conversable)
    {
        if ($conversable instanceof DemandeDirecte) {
            return $conversable->service->artisan->user->firstname . ' ' . $conversable->service->artisan->user->lastname;
        } elseif ($conversable instanceof Proposition) {
            return $conversable->artisan->user->firstname . ' ' . $conversable->artisan->user->lastname;
        }
    }
}
