<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $hasPivot = isset($this->pivot);

        return [
            'reporter' => [
                'id' => $this->id,
                'full_name' => $this -> user->firstname . ' ' . $this -> user->lastname,
                'avatar' => $this->avatar ? asset('storage/' . $this->avatar) : null,
                'cin' => $this->cin,
            ],
            'details' => [
                'raison'      => $hasPivot ? $this->pivot->raison : null,
                'subject'     => $hasPivot ? ($this->pivot->subject ?? $this->pivot->raison) : null,
                'description' => $hasPivot ? $this->pivot->description : null,
                'status'      => $hasPivot ? ($this->pivot->status ?? 'pending') : 'pending',
                'priority'    => $hasPivot ? ($this->pivot->priority ?? 'medium') : 'medium',
                'created_at'  => ($hasPivot && $this->pivot->created_at)
                    ? $this->pivot->created_at->format('d/m/Y H:i')
                    : null,
            ],
        ];
    }
}
