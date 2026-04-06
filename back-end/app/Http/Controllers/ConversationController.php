<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\services\ConversationService;
use Illuminate\Http\Request;

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
        return ConversationResource::collection($conversations) ->response()->setStatusCode(200);
    }

    public function  acceptOffer(Request $request, int $id)
    {
        $request->validate([
            'prix_final' => 'required|numeric|min:0'
        ]);
        $conversation = $this->conversationService->acceptOffer($id, $request->prix_final);
        return response()->json([
            'message' => 'Conversation found successfully',
            'data' => $conversation
        ]);
    }



    public function completeMission(int $id)
    {
        $conversation = $this->conversationService->completeMission($id);
        return response()->json([
            'message' => 'Conversation found successfully',
            'data' => $conversation
        ]);
    }

    public function confirmCode(Request $request, int $id)
    {
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
