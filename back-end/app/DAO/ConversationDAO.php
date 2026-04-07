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
            $this->applyUserFilters($query, $userId);
        })
            ->orderBy('updated_at', 'desc')
            ->with(['messages' => function ($q) {
                $q->latest()->limit(1);
            }])
            ->withCount(['messages as unread_count' => function ($q) use ($userId) {
                $q->where('is_read', false)
                    ->where('sender_id', '!=', $userId);
            }])
            ->get();
    }

    public function countMessagesNotRead(int $userId)
    {
        return Conversation::where(function ($query) use ($userId) {
            $this->applyUserFilters($query, $userId);
        })
            ->whereHas('messages', function ($q) use ($userId) {
                $q->where('is_read', false)
                    ->where('sender_id', '!=', $userId);
            })
            ->count();
    }

    private function applyUserFilters($query, $userId)
    {
        $query->where(function ($q) use ($userId) {
            $q->where(function ($inner) use ($userId) {
                $inner->whereHasMorph('conversable', [DemandeDirecte::class], function ($q2) use ($userId) {
                    $q2->where('client_id', $userId);
                })->orWhereHasMorph('conversable', [Proposition::class], function ($q2) use ($userId) {
                    $q2->whereHas('offreTravail', function ($q3) use ($userId) {
                        $q3->where('client_id', $userId);
                    });
                });
            })
                ->orWhere(function ($inner) use ($userId) {
                    $inner->whereHasMorph('conversable', [DemandeDirecte::class], function ($q2) use ($userId) {
                        $q2->whereHas('service', function ($q3) use ($userId) {
                            $q3->where('artisan_id', $userId);
                        });
                    })->orWhereHasMorph('conversable', [Proposition::class], function ($q2) use ($userId) {
                        $q2->where('artisan_id', $userId);
                    });
                });
        });
    }
    public function getAutreParticipant(Conversation $conversation, int $currentUserId)
    {
        $item = $conversation->conversable;

        if ($conversation->conversable_type === DemandeDirecte::class) {
            if ($item->client_id === $currentUserId) {
                return $item->service->artisan->user;
            }
            return $item->client->user;
        }

        if ($conversation->conversable_type === Proposition::class) {
            if ($item->artisan_id === $currentUserId) {
                return $item->offreTravail->client->user;
            }
            return $item->artisan->user;
        }

        return null;
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
