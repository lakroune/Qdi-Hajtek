<?php

namespace App\Http\Controllers;

use App\DTO\MessageDTO;
use App\Http\Requests\StoreMessageRequest;
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
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        $dto = MessageDTO::fromRequest($request);

        return $this->messageService->createMessage($dto);
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
