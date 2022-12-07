<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

$section = htmlspecialchars($_POST['section']);
$direction = htmlspecialchars($_POST['direction']);
$org = htmlspecialchars($_POST['org']);
$theatre = htmlspecialchars($_POST['theatre']);

if(!empty($section)){

    //$to = "Sodruzhestvotheatre@edu.mos.ru";
    $to = "navat2007@yandex.ru";
    $subject = 'Новая заявка на фестиваль. Направление: ' . $direction;
    $message = include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/header.php';

    if((int)$section === 1)
    {

        $count = htmlspecialchars($_POST['count']);

        $message .= '<tr style="box-sizing: border-box;">
                        <td style="box-sizing: border-box;">
                            <div class="a-page" style="background-color: #fff; box-sizing: border-box; padding: 1em 1.5em 1.5em;">
                                <p class="title" style="box-sizing: border-box; font-weight: 600; margin: 0; margin-bottom: 1em; text-align: center;">
                                    Здравствуйте!
                                </p>
                                <div class="data" style="box-sizing: border-box; margin-bottom: 1.5em;">
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Организация:
                                        <b style="box-sizing: border-box;">' . $org . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Название театра:
                                        <b style="box-sizing: border-box;">' . $theatre . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Направление:
                                        <b style="box-sizing: border-box;">' . $direction . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Количество участников творческого коллектива:
                                        <b style="box-sizing: border-box;">' . $count . '</b>
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>';
    }

    if((int)$section === 2)
    {

        $performance_age = htmlspecialchars($_POST['performance_age']);
        $performance_answer = htmlspecialchars($_POST['performance_answer']);
        $performance_author = htmlspecialchars($_POST['performance_author']);
        $performance_book = htmlspecialchars($_POST['performance_book']);
        $performance_count = htmlspecialchars($_POST['performance_count']);
        $performance_length = htmlspecialchars($_POST['performance_length']);
        $performance_photo = htmlspecialchars($_POST['performance_photo']);
        $performance_producer = htmlspecialchars($_POST['performance_producer']);
        $performance_title = htmlspecialchars($_POST['performance_title']);
        $performance_video = htmlspecialchars($_POST['performance_video']);

        $message .= '<tr style="box-sizing: border-box;">
                        <td style="box-sizing: border-box;">
                            <div class="a-page" style="background-color: #fff; box-sizing: border-box; padding: 1em 1.5em 1.5em;">
                                <p class="title" style="box-sizing: border-box; font-weight: 600; margin: 0; margin-bottom: 1em; text-align: center;">
                                    Здравствуйте!
                                </p>
                                <div class="data" style="box-sizing: border-box; margin-bottom: 1.5em;">
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Организация:
                                        <b style="box-sizing: border-box;">' . $org . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Название театра:
                                        <b style="box-sizing: border-box;">' . $theatre . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Направление:
                                        <b style="box-sizing: border-box;">' . $direction . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Название спектакля:
                                        <b style="box-sizing: border-box;">' . $performance_title . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Автор:
                                        <b style="box-sizing: border-box;">' . $performance_author . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Название литературного материала:
                                        <b style="box-sizing: border-box;">' . $performance_book . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">ФИО режиссера-постановщика:
                                        <b style="box-sizing: border-box;">' . $performance_producer . '</b>
                                    </p>                                    
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Количество участников творческого коллектива:
                                        <b style="box-sizing: border-box;">' . $performance_count . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Возрастная категория:
                                        <b style="box-sizing: border-box;">' . $performance_age . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Продолжительность спектакля (мин):
                                        <b style="box-sizing: border-box;">' . $performance_length . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Афиша спектакля:
                                        <b style="box-sizing: border-box;"></b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Ссылка на видеофрагмент:
                                        <b style="box-sizing: border-box;">' . $performance_video . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Ответы на вопросы:
                                        <b style="box-sizing: border-box;"></b>
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>';
    }

    $message .= include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/footer.php';

    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Support <sport.patriot.service@yandex.ru> \r\n";
    //$headers .= "Reply-To: support@patriot-sport.ru";

    $mail_result = mail($to, $subject, $message, $headers);

}

$content = (object)[

    'input_params' => (object)[
        'POST' => $_POST,
        'GET' => $_GET,
        'FILES' => $_FILES,
    ],
    'to' => $to,
    'subject' => $subject,
    'mail_result' => $mail_result,
];
echo json_encode($content);