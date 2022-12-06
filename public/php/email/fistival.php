<?php

$direction = "";
$text = "";
$fio = "";
$org = "Школа";
$email = "";

//$to = "Sodruzhestvotheatre@edu.mos.ru";
$to = "navat2007@yandex.ru";
$subject = 'Новая заявка на фестиваль. Направление: ' . $direction;
$message = include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/header.php';

$message .= '<tr style="box-sizing: border-box;">
                        <td style="box-sizing: border-box;">
                            <div class="a-page" style="background-color: #fff; box-sizing: border-box; padding: 1em 1.5em 1.5em;">
                                <p class="title"
                                   style="box-sizing: border-box; font-weight: 600; margin: 0; margin-bottom: 1em; text-align: center;">
                                    Здравствуйте!</p>
                                <p class="text" style="box-sizing: border-box; margin: 0; margin-bottom: 1.5em;">' . $text . '</p>
                                <div class="data" style="box-sizing: border-box; margin-bottom: 1.5em;">
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">ФИО:
                                        <b style="box-sizing: border-box;">' . $fio . '</b></p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Организация:
                                        <b style="box-sizing: border-box;">' . $org . '</b></p>
                                        <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Почта для ответа:
                                        <b style="box-sizing: border-box;">' . $email . '</b></p>
                                </div>
                            </div>
                        </td>
                    </tr>';

$message .= include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/footer.php';

$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Support <sport.patriot.service@yandex.ru> \r\n";
//$headers .= "Reply-To: support@patriot-sport.ru";

$mail_result = mail($to, $subject, $message, $headers);

echo (object)[
    'to' => $to,
    'subject' => $subject,
    'mail_result' => $mail_result,
];

$content = (object)[

    'input_params' => (object)[
        'POST' => $_POST,
        'GET' => $_GET,
    ],
    'to' => $to,
    'subject' => $subject,
    'mail_result' => $mail_result,
];
echo json_encode($content);