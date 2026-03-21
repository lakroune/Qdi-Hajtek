<?php

namespace App\Notifications;

use App\Models\Proposition;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewPropositionNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private Proposition $proposition)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Nouvelle proposition pour votre offre')
            ->greeting("Bonjour {$this->proposition->artisan->user->lastname},")
            ->line("Un artisan a envoyé une proposition pour votre offre : **{$this->proposition->offreTravail->titre}**.")
            ->line("Prix proposé : **{$this->proposition->prix_propose} DH**")
            ->action('Voir la proposition', url('/offres/' . $this->proposition->offre_id))
            ->line('Merci d\'utiliser notre plateforme !');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'proposition_id' => $this->proposition->id,
            'offre_id' => $this->proposition->offre_id,
            'titre_offre' => $this->proposition->offreTravail->titre,
            'artisan_name' => $this->proposition->artisan->user->firstname . ' ' . $this->proposition->artisan->user->lastname,
            'prix_propose' => $this->proposition->prix_propose,
            'message' => "Nouvelle proposition reçue."
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'id' => $this->id,
            'data' => $this->toArray($notifiable),
        ]);
    }
}
