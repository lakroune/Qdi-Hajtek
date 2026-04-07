<?php

namespace App\DAO;

use App\Models\Conversation;
use App\Models\DemandeDirecte;
use App\Models\Proposition;
use Illuminate\Support\Facades\DB;

class ConversationDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(array $data)
    {
        return Conversation::create($data);
    }

    public function find(int $id)
    {
        return Conversation::findOrFail($id);
    }

    public function update(int $id, array $data)
    {
        return Conversation::where('id', $id)->update($data);
    }

    public function delete(int $id)
    {
        return Conversation::where('id', $id)->delete();
    }
    public function getConversations($userId)
    {


        return Conversation::where(function ($query) use ($userId) {

            // clent apartir de demande directe
            $query->where(function ($q1) use ($userId) {
                $q1->where('conversable_type', DemandeDirecte::class)
                    ->whereHasMorph('conversable', DemandeDirecte::class, function ($q2) use ($userId) {
                        $q2->where('client_id', $userId);
                    });
            })
                // client apartir de offre
                ->orWhere(function ($q1) use ($userId) {
                    $q1->where('conversable_type', Proposition::class)
                        ->whereHasMorph('conversable', Proposition::class, function ($q2) use ($userId) {
                            $q2->wherehas('offreTravail', function ($q3) use ($userId) {
                                $q3->where('client_id', $userId);
                            });
                        });
                });
        })->orWhere(function ($query) use ($userId) {

            // artisan apartir de demande directe
            $query->where(function ($q1) use ($userId) {
                $q1->where('conversable_type', DemandeDirecte::class)
                    ->whereHasMorph('conversable', DemandeDirecte::class, function ($q2) use ($userId) {
                        $q2->whereHas('service', function ($q3) use ($userId) {
                            $q3->where('artisan_id', $userId);
                        });
                    });
            })
                // artisan apartir de offre
                ->orWhere(function ($q1) use ($userId) {
                    $q1->where('conversable_type', Proposition::class)
                        ->whereHasMorph('conversable', Proposition::class, function ($q2) use ($userId) {
                            $q2->where('artisan_id', $userId);
                        });
                });
        })->orderBy('updated_at', 'desc')
            ->with(['messages' => function ($q) {
                $q->latest()->limit(1);
            }])

            ->withCount(['messages as unread_count' => function ($q) use ($userId) {
                $q->where('is_read', false)
                    ->where('sender_id', '!=', $userId);
            }])

            ->get();
    }



    // acceptOffer

    public function acceptOffer(int $id, float $prix_final)
    {
        $conversation = Conversation::with('conversable')->find($id);

        $conversation->conversable->update([
            'prix_final' => $prix_final,
            'statut' => 'accepte'
        ]);
        return $conversation;
    }


    public function countMessagesNotRead(int $userId)
    {
        $conversations = $this->getConversations($userId);
        $count = 0;
        foreach ($conversations as $conversation) {
            $messages = $conversation->messages;
            foreach ($messages as $message) {
                if (!$message->is_read && $message->sender_id != $userId) {
                    $count++;
                }
            }
        }
        return $count;
    }

    public  function completeMission(int $id)
    {
        $conversation = Conversation::findOrFail($id);
        $conversation->conversable->update(['statut' => 'termine']);
        return $conversation;
    }

    public function confirmCode(int $id, string $code)
    {
        $conversation = Conversation::with(['paiement', 'conversable'])->findOrFail($id);
        $paiement = $conversation->paiement;
        $item = $conversation->conversable;

        if ($item->code_confirmation === $code && $item->is_completed === false && $item->statut === 'termine') {
            return DB::transaction(function () use ($conversation, $paiement, $item) {
                $item->update([
                    'is_completed' => true,
                    'date_confirmation' => now()
                ]);
                $commission = $paiement->montant_total * 0.025;
                $montant_artisan = $paiement->montant_total - $commission;
                $paiement->update([
                    'statut' => 'released',
                    'montant_artisan' => $montant_artisan,
                    'commission_admin' => $commission,
                    'released_at' => now(),
                ]);
                return true;
            });
        }

        return false;
    }
}
