<?php

namespace App\Jobs;

use App\Models\DemandeDirecte;
use App\Notifications\NewDemandeNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendNewDemandeEmail implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private DemandeDirecte $demandeDirecte)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->demandeDirecte->service->artisan->user->notify(new NewDemandeNotification($this->demandeDirecte));
    }
}
