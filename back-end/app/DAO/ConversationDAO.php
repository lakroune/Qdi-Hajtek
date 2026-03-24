<?php

namespace App\DAO;

use App\Models\Conversation;
use App\Models\DemandeDirecte;
use App\Models\Proposition;

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
        return Conversation::find($id);
    }

    public function update(int $id, array $data)
    {
        return Conversation::where('id', $id)->update($data);
    }

    public function delete(int $id)
    {
        return Conversation::where('id', $id)->delete();
    }
    public function getConversations()
    {
        $userId = auth()->user()->id;

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
        })->with(['messages' => function ($q) {
            $q->latest()->limit(1);
        }, 'conversable'])
            ->orderBy('created_at', 'desc')

            ->get();
    }
}
