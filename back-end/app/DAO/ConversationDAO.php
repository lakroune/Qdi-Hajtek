<?php

namespace App\DAO;

use App\Models\Conversation;

class ConversationDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(array $data)
    {
        return Conversation::create($data);
    }

    public function find(int $id)
    {
        return Conversation::find($id);
    }

    public function update(int $id, array $data)
    {
        return Conversation::where('id', $id)->update($data);
    }

    public function delete(int $id)
    {
        return Conversation::where('id', $id)->delete();
    }
    public function getConversationsByUserId(int $userId)
    {
        //   
    }
}
