<?php

namespace App\Services;

use App\DAO\ArtisanDAO;
use App\DAO\EvaluationDAO;
use App\Models\Conversation;
use Exception;
use Illuminate\Support\Facades\DB;

class EvaluationService
{

    public function __construct(private EvaluationDAO $evaluationDAO, private ArtisanDAO $artisanDAO)
    {
        //
    }

    public function storeEvaluation(array $data)
    {
        $conversationId = $data['conversation_id'];

        $conversation = Conversation::with(['conversable'])->findOrFail($conversationId);
        $userId = auth('api')->id();

        $clientId = $conversation->conversable?->client_id ?? $conversation->conversable?->offreTravail?->client_id;
        $artisanId = $conversation->conversable?->artisan_id ?? $conversation->conversable?->service?->artisan_id;
        if ($userId !==(int) $clientId) {
            throw new Exception("Seul le client peut évaluer cette mission.");
        }
        if (!$artisanId) {
            throw new Exception("Artisan introuvable.");
        }
        if ($conversation->evaluation()->exists()) {
            throw new Exception("Cette mission a déjà été évaluée.");
        }

        return DB::transaction(function () use ($data, $artisanId) {
            $evaluation = $this->evaluationDAO->create($data);

            $artisan = $this->artisanDAO->updateRating($artisanId);
            return $evaluation;
        });
    }
}
