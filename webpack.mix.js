let mix = require('laravel-mix');
mix
    .sass('src/css/master.scss', 'assets/css/')
    .options({
        processCssUrls: false
    });