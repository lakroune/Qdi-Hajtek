<?php

namespace App\Providers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('access-conversation', function (User $user, Conversation $conversation) {
            $clientId = $conversation->conversable?->client_id
                ?? $conversation->conversable?->offreTravail?->client_id;

            $artisanId = $conversation->conversable?->artisan_id
                ?? $conversation->conversable?->service?->artisan_id;

            return $user->id === $clientId || $user->id === $artisanId;
        });


        Gate::define('accepete-offer', function (User $user, Conversation $conversation) {
            $artisanId = $conversation->conversable?->artisan_id
                ?? $conversation->conversable?->service?->artisan_id;
            return $user->id === $artisanId;
        });


        Gate::define('pay-conversation', function (User $user, Conversation $conversation) {
            $clientId = $conversation->conversable?->client_id
                ?? $conversation->conversable?->offreTravail?->client_id;
            return $user->id === $clientId;
        });

        Gate::define('is-identified', function (User $user) {
            return $user->hasEmailVerified() && $user->isActive();
        });
        Gate::define('is-artisan-identified', function (User $user) {
            return $user->isArtisan() && $user->hasEmailVerified() && $user->isActive();
        });
    }
}
