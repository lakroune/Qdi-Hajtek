<?php

namespace App\Notifications;

use App\Models\DemandeDirecte;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewDemandeNotification extends Notification implements ShouldQueue, ShouldBroadcast
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public DemandeDirecte $demandeDirecte)
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
            ->subject('Nouvelle Demande de Service - Qdi Hajtek')
            ->greeting('Bonjour ' . $notifiable->name . '!')
            ->line("Vous avez reçu une nouvelle demande directe pour l'un de vos services.")
            ->action('Voir la demande', url('/demandes/' . $this->demandeDirecte->conversation->id))
            ->line('Merci de répondre à votre client dans les plus brefs délais.')
            ->salutation('Cordialement, L\'équipe Qdi Hajtek');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'demande_directe_id' => $this->demandeDirecte->id,
            'contenu' => "Une nouvelle demande vient d'être créée",
        ];
    }
    public function toDatabase(object $notifiable)
    {
        return [
            'demande_directe_id' => $this->demandeDirecte->id,
            'contenu' => "Une nouvelle demande vient d'être créée",
            'type_data' => 'notification',
        ];
    }

    public function toBroadcast(object $notifiable)
    {
        return [
            'message' => "Une nouvelle demande vient d'être créée",
        ];
    }
    public function broadcastAs(): string
    {
        return 'new-notification';
    }
}
