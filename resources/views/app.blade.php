<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{!! config('app.name','Trello Clone') !!}</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{!! mix('css/app.css') !!}">
        <script src="{!! mix('js/app.js') !!}" defer></script>
    </head>
    <body class="h-screen text-gray-800">
       <div id="app" class="h-full">
           <router-view></router-view>
       </div>
    </body>
</html>
