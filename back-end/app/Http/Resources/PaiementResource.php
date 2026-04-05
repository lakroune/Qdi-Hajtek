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
        $conversable = $this->conversation->conversable;

        $artisan = null;
        $serviceTitle = "N/A";

        if ($conversable instanceof Proposition) {
            $artisan = $conversable->artisan;
            $serviceTitle = "Proposition de projet";
        } elseif ($conversable instanceof DemandeDirecte) {
            $artisan = $conversable->service->artisan ?? null;
            $serviceTitle = $conversable->service->titre ?? "Service Direct";
        }

        $total = (float) $this->montant;
        $commission = $total * 0.10;

        return [
            'id' => $this->id,
            'stripe_id' => $this->stripe_payment_id,
            'amountTotal' => $total,
            'adminCommission' => $commission,
            'artisanNet' => $total - $commission,
            'serviceName' => $serviceTitle,
            'paymentStatus' => ($conversable->statut === 'termine') ? 'released' : 'held',
            'date' => $this->created_at->format('Y-m-d'),

            'artisan' => [
                'id' => $artisan ? $artisan->id : null,
                'full_name' => $artisan && $artisan->user ? $artisan->user->firstname . ' ' . $artisan->user->lastname : 'Inconnu',
                'email' => $artisan && $artisan->user ? $artisan->user->email : null,
                'specialite' => $artisan ? $artisan->specialite : null,
            ],

            'client' => [
                'id' => $this->client_id,
                'full_name' => $this->client->user->firstname . ' ' . $this->client->user->lastname,
                'email' => $this->client->user->email
            ]
        ];
    }
}
