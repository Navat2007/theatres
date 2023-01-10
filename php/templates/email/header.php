<?php
$test = true;
$site_url = 'https://test.patriot-sport.ru';
if (strpos($_SERVER['DOCUMENT_ROOT'], '/var/www/test.patriot-sport.ru') === false) {
    $test = false;
    $site_url = 'https://patriot-sport.ru';
}

return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #e7edf1; box-sizing: border-box; color: #1d1f20; font-family: Open Sans,Verdana,Geneva,sans-serif; line-height: 150%; text-size-adjust: 100%;">
<head style="box-sizing: border-box;">
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8" style="box-sizing: border-box;">
    <meta http-equiv="X-UA-Compatible" content="ie=edge" style="box-sizing: border-box;">
</head>
<body style="box-sizing: border-box; margin: 0; min-height: 100vh; scroll-behavior: smooth; text-rendering: optimizeSpeed;">
<table border="0"
       cellpadding="0"
       cellspacing="0"
       style="border: 1px solid #9a9fa1; box-sizing: border-box; margin: 1em auto; max-width: 40em; width: 100%;">
    <tbody style="box-sizing: border-box;">
    <tr style="box-sizing: border-box;">
        <td style="box-sizing: border-box;">
            <div class="a-header"
                 style="background-image: linear-gradient(90deg,#fff 50%,#017ab2 0,#017ab2); box-sizing: border-box; text-align: center;">
                <img src="' . $site_url . '/img/logo-email.png"
                     alt="Московский центр Патриот.спорт"
                     style="box-sizing: border-box; display: inline-block; max-width: 100%; width: 360px;"></div>
            <img src="' . $site_url . '/img/line-email.png"
                 style="background-color: #fff; box-sizing: border-box; display: block; max-width: 100%; width: 100%;">
        </td>
    </tr>';
