<?php

namespace App\Http\Controllers;

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
        return response()->json([
            'message' => 'Conversations found successfully',
            'data' => $conversations
        ]);
    }

    public function  acceptOffer($id)
    {
        $conversation = $this->conversationService->acceptOffer($id);
        return response()->json([
            'message' => 'Conversation found successfully',
            'data' => $conversation
        ]);
    }
}
