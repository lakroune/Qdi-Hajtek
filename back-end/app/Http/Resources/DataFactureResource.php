<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DataFactureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $artisan = null;
        if ($this->conversable_type === 'App\Models\DemandeDirecte') {
            $artisan = $this->conversable->service->artisan;
        } elseif ($this->conversable_type === 'App\Models\Proposition') {
            $artisan = $this->conversable->artisan;
        }

        return [
            'id' => $this->id,
            'subject' => $this->subject,
            'date_creation' => $this->created_at->format('d/m/Y'),
            

            'paiement' => [
                'id' => $this->paiement->id,
                'reference_stripe' => $this->paiement->stripe_payment_id,
                'montant_total' => $this->paiement->montant_total,
                'devise' => strtoupper($this->paiement->devise),
                'statut' => $this->paiement->statut,
                'date_paiement' => $this->paiement->paid_at ? \Carbon\Carbon::parse($this->paiement->paid_at)->format('d/m/Y H:i') : null,
            ],

            'client' => [
                'nom_complet' => $this->paiement->client->user->firstname . ' ' . $this->paiement->client->user->lastname,
                'email' => $this->paiement->client->user->email,
                'ville' => $this->paiement->client->user->city,
                'cin' => $this->paiement->client->cin,
            ],

            'artisan' => [
                'nom_complet' => $artisan->user->firstname . ' ' . $artisan->user->lastname,
                'email' => $artisan->user->email,
                'ville' => $artisan->user->city,
                'specialite' => $artisan->specialite,
            ],

            'details_service' => [
                'titre' => $this->conversable_type === 'App\Models\DemandeDirecte'
                    ? $this->conversable->service->titre
                    : $this->subject,
                'prix_final' => $this->conversable->prix_final,
                'date_debut' => $this->conversable->date_debut,
                'code_confirmation' => $this->conversable->code_confirmation
            ]
        ];
    }
}
