<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

$section = htmlspecialchars($_POST['section']);
$direction = htmlspecialchars($_POST['direction']);
$org = htmlspecialchars($_POST['org']);
$theatre = htmlspecialchars($_POST['theatre']);

if(!empty($section)){

    $to = "Sodruzhestvotheatre@edu.mos.ru";
    $to .= ", navat2007@yandex.ru";
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

        $message .= include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/footer.php';

        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: Support <sport.patriot.service@yandex.ru> \r\n";

        $mail_result = mail($to, $subject, $message, $headers);

    }

    if((int)$section === 2)
    {

        $performance_age = htmlspecialchars($_POST['performance_age']);
        $performance_author = htmlspecialchars($_POST['performance_author']);
        $performance_book = htmlspecialchars($_POST['performance_book']);
        $performance_count = htmlspecialchars($_POST['performance_count']);
        $performance_length = htmlspecialchars($_POST['performance_length']);
        $performance_producer = htmlspecialchars($_POST['performance_producer']);
        $performance_nomination = htmlspecialchars($_POST['performance_nomination']);
        $performance_title = htmlspecialchars($_POST['performance_title']);
        $performance_video = htmlspecialchars($_POST['performance_video']);

        //Get uploaded file data using $_FILES array
        $tmp_name = $_FILES['performance_answer']['tmp_name'][0]; // get the temporary file name of the file on the server
        $name     = $_FILES['performance_answer']['name'][0]; // get the name of the file
        $size     = $_FILES['performance_answer']['size'][0]; // get size of the file for size validation
        $type     = $_FILES['performance_answer']['type'][0]; // get type of the file
        $error     = $_FILES['performance_answer']['error'][0]; // get the error (if any)

        $handle = fopen($tmp_name, "r"); // set the file handle only for reading the file
        $content = fread($handle, $size); // reading the file
        fclose($handle);                 // close upon completion

        $encoded_content = chunk_split(base64_encode($content));
        $boundary = md5("random");
        $eol = "\r\n";

        $headers = 'MIME-Version: 1.0' . $eol;
        $headers .= "Content-Type: multipart/mixed;";
        $headers .= "boundary = $boundary" . $eol;
        $headers .= "From: Support <sport.patriot.service@yandex.ru>" . $eol;

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
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Номинация:
                                        <b style="box-sizing: border-box;">' . $performance_nomination . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Продолжительность спектакля (мин):
                                        <b style="box-sizing: border-box;">' . $performance_length . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Ссылка на видеофрагмент:
                                        <b style="box-sizing: border-box;">' . $performance_video . '</b>
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>';
        $message .= include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/footer.php';

        //plain text
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/html; charset=utf-8\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= chunk_split(base64_encode($message));

        if(count($_FILES) > 0){

            //attachment
            $body .= "--$boundary\r\n";
            $body .="Content-Type: $type; name=".$name."\r\n";
            $body .="Content-Disposition: attachment; filename=".$name."\r\n";
            $body .="Content-Transfer-Encoding: base64\r\n";
            $body .="X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
            $body .= $encoded_content; // Attaching the encoded file with email

            for ($i = 0; $i < count($_FILES['performance_photo']['name']); $i++){

                $tmp_name = $_FILES['performance_photo']['tmp_name'][$i]; // get the temporary file name of the file on the server
                $name     = $_FILES['performance_photo']['name'][$i]; // get the name of the file
                $size     = $_FILES['performance_photo']['size'][$i]; // get size of the file for size validation
                $type     = $_FILES['performance_photo']['type'][$i]; // get type of the file
                $error     = $_FILES['performance_photo']['error'][$i]; // get the error (if any)

                $handle = fopen($tmp_name, "r"); // set the file handle only for reading the file
                $content = fread($handle, $size); // reading the file
                fclose($handle);                 // close upon completion

                $encoded_content = chunk_split(base64_encode($content));

                //attachment
                $body .= "--$boundary\r\n";
                $body .="Content-Type: $type; name=".$name."\r\n";
                $body .="Content-Disposition: attachment; filename=".$name."\r\n";
                $body .="Content-Transfer-Encoding: base64\r\n";
                $body .="X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
                $body .= $encoded_content; // Attaching the encoded file with email

            }

        }


        $mail_result = mail($to, $subject, $body, $headers);

    }

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
    'message' => $message,
];
echo json_encode($content);