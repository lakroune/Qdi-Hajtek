<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use App\services\ConversationService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ConversationController extends Controller
{
    public function __construct(
        private   ConversationService $conversationService
    ) {
        // 
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conversations = $this->conversationService->getConversations();
        return ConversationResource::collection($conversations)->response()->setStatusCode(200);
    }

    public function acceptOffer(Request $request, int $id)
    {
        $conversation = Conversation::findOrFail($id);

        Gate::authorize('accepete-offer', $conversation);

        $validated = $request->validate([
            'prix_final' => 'required|numeric|min:1'
        ]);

        try {
            $updatedConversation = $this->conversationService->acceptOffer($id, $validated['prix_final']);



            return response()->json([
                'status' => 'success',
                'message' => 'L\'offre a été acceptée et le prix est fixé.',
                'data' => [
                    'prix_final' => $updatedConversation->prix_final,
                    'status' => $updatedConversation->status
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de l\'acceptation de l\'offre.'
            ], 500);
        }
    }



    public function completeMission(int $id)
    {
        if (!Gate::check('is-artisan-identified')) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $conversation = $this->conversationService->completeMission($id);
        return response()->json([
            'message' => 'Conversation found successfully',
            'data' => $conversation
        ]);
    }

    public function confirmCode(Request $request, int $id)
    {

        if (!Gate::check('is-client-identified')) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $request->validate([
            'code' => 'required|string|min:6'
        ]);
        $conversation = $this->conversationService->confirmCode($id, $request->code);
        return response()->json([
            'message' => 'Conversation found successfully',
            'data' => $conversation
        ]);
    }
}
