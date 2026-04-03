<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    /**
     * get all notifications
     * 
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $notifications = $user->notifications()
            ->select('id', 'type', 'data', 'read_at', 'created_at')
            ->get();

        return response()->json([
            'success' => true,
            'notifications' => $notifications
        ]);
    }

    /**
     *  mark  as read
     */
    public function markAsRead($id)
    {
        $notification = auth()->user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        return response()->json(['message' => 'Notification marked as read']);
    }
}
