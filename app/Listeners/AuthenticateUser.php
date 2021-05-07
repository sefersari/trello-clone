<?php

namespace App\Listeners;


use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class AuthenticateUser
{

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $guard = Auth::guard(config('sanctum.guard','web'));

        $guard->login($event->user);
    }
}
