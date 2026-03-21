<?php

namespace App\Notifications;

use App\Models\Proposition;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PropositionAcceptedNotification extends Notification
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
            ->subject('Félicitations ! Votre proposition a été acceptée')
            ->greeting("Bonjour {$notifiable->firstname},")
            ->line("Bonne nouvelle ! Votre proposition pour l'offre **{$this->proposition->offreTravail->titre}** a été acceptée par le client.")
            ->line("Une nouvelle conversation a été ouverte pour discuter des détails.")
            ->action('Accéder à la conversation', url('/conversations'))
            ->line('Félicitations pour ce nouveau projet !');
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
            'message' => "Félicitations ! Votre offre a été acceptée. Vous pouvez maintenant discuter avec le client.",
            'type' => 'acceptance'
        ];
    }

    public function toBroadcast(object $notifiable)
    {
        return new BroadcastMessage([
            'id' => $this->id,
            'data' => $this->toArray($notifiable),
        ]);
    }
}
