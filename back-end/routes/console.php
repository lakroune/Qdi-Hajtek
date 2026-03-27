<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Process;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Artisan::command('start:dev', function () {
    $this->info('Starting development services...');

    Process::start('php artisan reverb:start');
    Process::forever()->run('php artisan serve');
})->purpose('Start all development services');
