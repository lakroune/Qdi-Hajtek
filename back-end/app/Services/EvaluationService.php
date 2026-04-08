<?php

namespace App\Services;

use App\DAO\EvaluationDAO;
use App\Models\Conversation;
use Exception;

class EvaluationService
{
    protected $evaluationDAO;

    public function __construct(EvaluationDAO $evaluationDAO)
    {
        $this->evaluationDAO = $evaluationDAO;
    }

    public function storeEvaluation(int $conversationId, array $data)
    {
        $conversation = Conversation::findOrFail($conversationId);
        $userId = auth('api')->id();

        $clientId = $conversation->conversable?->client_id ?? $conversation->conversable?->offre_travail?->client_id;

        if ($userId !== $clientId) {
            throw new Exception("Seul le client peut évaluer cette prestation.");
        }

        if ($conversation->evaluation()->exists()) {
            throw new Exception("Vous avez déjà évalué cette prestation.");
        }

        $data['conversation_id'] = $conversationId;

        return $this->evaluationDAO->create($data);
    }
}
