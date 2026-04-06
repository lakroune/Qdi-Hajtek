<?php

namespace App\Http\Controllers;

use App\DTO\MessageDTO;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\ChatResource;
use App\Services\MessageService;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\HttpCache\Store;

class MessageController extends Controller
{
    public function __construct(private MessageService $messageService)
    {
        // 
    }
    /**
     * Display a listing of the resource.
     */
    public function index($conversationId)
    {
        $messages = $this->messageService->getConversationMessages(
            (int) $conversationId
        );

        return response()->json([
            'status' => 'success',
            'data' => $messages
        ]);
        // $data = $this->messageService->getConversationMessages((int) $conversationId);

        // if ($data) {
        //     return (new ChatResource((object)$data))
        //         ->additional([
        //             'status' => 'success',
        //             'message' => 'Messages retrieved successfully'
        //         ])
        //         ->response()
        //         ->setStatusCode(200);
        // }

        // return response()->json([
        //     'status' => 'error',
        //     'message' => 'Conversation not found'
        // ], 404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        $dto = MessageDTO::fromRequest($request);

        $message = $this->messageService->sendMessage($dto);
        return response()->json([
            'status' => 'success',
            'data' => $message
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
