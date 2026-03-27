<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Process;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Artisan::command('start:dev', function () {
    $this->info(' stating all services...');

    $this->comment('Starting Reverb...');
    Process::start('php artisan reverb:start');

    $this->comment('Starting Queue Worker...');
    Process::start('php artisan queue:work');

    $this->comment('Starting Laravel Server: http://127.0.0.1:8000');
    Process::forever()->run('php artisan serve');
})->purpose('Start all development services');
