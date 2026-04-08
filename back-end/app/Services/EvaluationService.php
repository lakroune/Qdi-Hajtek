<?php

namespace App\Services;

use App\DAO\EvaluationDAO;
use App\Models\Conversation;
use Exception;
use Illuminate\Support\Facades\DB;

class EvaluationService
{

    public function __construct(private EvaluationDAO $evaluationDAO)
    {
        //
    }

    public function storeEvaluation(array $data)
    {
        $conversationId = $data['conversation_id'];

        $conversation = Conversation::with(['conversable'])->findOrFail($conversationId);
        $userId = auth('api')->id();

        $clientId = $conversation->conversable?->client_id ?? $conversation->conversable?->offre_travail?->client_id;

        if ($userId !== $clientId) {
            throw new Exception("Seul le client peut évaluer cette mission.");
        }

        if ($conversation->evaluation()->exists()) {
            throw new Exception("Cette mission a déjà été évaluée.");
        }

        return DB::transaction(function () use ($data) {
            return $this->evaluationDAO->create($data);
        });
    }
}
