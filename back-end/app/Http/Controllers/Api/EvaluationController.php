<?php

namespace App\Http\Controllers\Api;

use App\DTO\EvaluationDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\EvaluationRequest;
use App\Services\EvaluationService;
use Exception;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{

    public function __construct(private EvaluationService $evaluationService)
    {
        //
    }

    public function store(EvaluationRequest $request, $conversationId)
    {
        $dto = EvaluationDTO::fromRequest($request, $conversationId);

        try {
            $evaluation = $this->evaluationService->storeEvaluation($dto->toArray());

            return response()->json([
                'message' => 'Evaluation enregistrée avec succès',
                'data' => $evaluation
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 403);
        }
    }
}
