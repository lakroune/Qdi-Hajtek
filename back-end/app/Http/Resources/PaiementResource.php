<?php

namespace App\Http\Resources;

use App\Models\DemandeDirecte;
use App\Models\Proposition;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaiementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $conversable = $this->conversation->conversable ?? null;
        $artisan = $this->getArtisan($conversable);

        $total = (float) ($this->montant_total ?? 0);
        $commission = (float) ($this->commission_admin ?? round($total * 0.10, 2));
        $net = (float) ($this->montant_artisan ?? round($total - $commission, 2));

        return [
            'id' => $this->id,
            'reference' => 'PAY-' . str_pad($this->id, 6, '0', STR_PAD_LEFT),
            'stripe_id' => $this->stripe_payment_id,

            'finance' => [
                'total' => $total,
                'commission' => $commission,
                'net_artisan' => $net,
                'currency' => strtoupper($this->devise ?? 'MAD'),
            ],

            'service_info' => [
                'title' => $this->getServiceTitle($conversable),
                'type' => $conversable ? class_basename($conversable) : 'N/A',
                'status' => $conversable->statut ?? 'unknown',
            ],

            'status' => [
                'payment' => $this->statut,
                'payout' => ($conversable && $conversable->is_completed === true) ? 'released' : 'held',
                'paid_at' => $this->paid_at ? $this->paid_at->format('d/m/Y H:i') : null,
            ],

            'dates' => [
                'created_at' => $this->created_at->format('d/m/Y H:i'),
                'human' => $this->created_at->diffForHumans(),
            ],

            'artisan' => [
                'id' => $artisan->id ?? null,
                'name' => $this->getArtisanFullname($artisan),
                'city' => $artisan->user->city ?? null,
                'specialite' => $artisan->specialite ?? null,
            ],

            'client' => [
                'id' => $this->client_id,
                'name' => ($this->client && $this->client->user)
                    ? $this->client->user->firstname . ' ' . $this->client->user->lastname
                    : 'Client inconnu',
                'avatar' => $this->client->avatar ?? null,
            ],

            'links' => [
                'conversation_id' => $this->conversation_id,
            ],
        ];
    }

    protected function getServiceTitle($conversable): string
    {
        if ($conversable instanceof Proposition) {
            return $conversable->projet->titre ?? "Proposition de projet";
        }

        if ($conversable instanceof DemandeDirecte) {
            return $conversable->service->titre ?? "Service Direct";
        }

        return "Prestation de service";
    }

    protected function getArtisan($conversable)
    {
        if ($conversable instanceof Proposition) {
            return $conversable->artisan;
        }

        if ($conversable instanceof DemandeDirecte) {
            return $conversable->service->artisan ?? null;
        }

        return null;
    }

    protected function getArtisanFullname($artisan): string
    {
        if ($artisan && $artisan->user) {
            return $artisan->user->firstname . ' ' . $artisan->user->lastname;
        }
        return 'Artisan non assigné';
    }
}
