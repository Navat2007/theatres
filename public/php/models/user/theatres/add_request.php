<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$theatreID = htmlspecialchars($_POST["theatreID"]);
$schoolID = htmlspecialchars($_POST["schoolID"]);
$userID = $authorization[1];
$title = htmlspecialchars($_POST["title"]);
$address = htmlspecialchars($_POST["address"]);
$coordinates = htmlspecialchars($_POST["coordinates"]);
$foundationDate = htmlspecialchars($_POST["foundationDate"]);
$theatreUrlSchool = htmlspecialchars($_POST["theatreUrlSchool"]);
$videoBusinessCard = htmlspecialchars($_POST["videoBusinessCard"]);
$teachers = $_POST["teachers"];
$socialLinks = $_POST["socialLinks"];
$formActivity = $_POST["formActivity"];
$ageMembers = $_POST["ageMembers"];
$photo = $_POST["photo"];
$photoVisit = $_POST["photoVisit"];
$video = $_POST["video"];
$reviews = $_POST["reviews"];
$reviewsVisit = $_POST["reviewsVisit"];
$editorShortDescription = htmlspecialchars($_POST["editorShortDescription"]);
$editorDirectorMessage = htmlspecialchars($_POST["editorDirectorMessage"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

if ((int)$theatreID !== 0) {

    $sql = "SELECT * FROM theatres WHERE ID = '$theatreID'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {

        $row = mysqli_fetch_object($result);

        if ($row->title != $title) {
            $sql = "SELECT * FROM theatres WHERE title = '$title' AND schoolID = '$schoolID' AND archive = 0";
            $sqls[] = $sql;
            $result = mysqli_query($conn, $sql);

            if (mysqli_num_rows($result) > 0) {
                $error = 1;
                $error_text = "Театр с таким названием уже существует в данной школе";
            }
        }
    }

    $sql = "SELECT * FROM theatre_requests WHERE theatreID = '$theatreID'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $error = 1;
        $error_text = "Заявка на редактирование данного театра уже существует в данной школе";
    }

}
else{
    $sql = "SELECT * FROM theatres WHERE title = '$title' AND schoolID = '$schoolID' AND archive = 0";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $error = 1;
        $error_text = "Театр с таким названием уже существует в данной школе";
    }
}

$sql = "SELECT * FROM theatre_requests WHERE title = '$title' AND schoolID = '$schoolID' AND status <> '5' AND archive = 0";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $error = 1;
    $error_text = "Заявка на создание театра с таким названием уже существует в данной школе";
}

if ($error === 0) {

    $sql = "
        INSERT INTO theatre_requests (theatreID, schoolID, userID, title, address, coordinates, foundation_date, theatre_url_school, video_business_card, short_description, director_message, last_user_changed) 
        VALUES ('$theatreID', '$schoolID', '$userID', '$title', '$address', '$coordinates', '$foundationDate', '$theatreUrlSchool', '$videoBusinessCard', '$editorShortDescription', '$editorDirectorMessage', '$userID')
    ";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);
    $lastID = mysqli_insert_id($conn);

    foreach ($formActivity as $activity) {

        $sql = "
        INSERT INTO theatre_requests_form_activity (requestID, activity) 
        VALUES ('$lastID', '$activity')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);
    }

    foreach ($ageMembers as $age) {

        $sql = "
        INSERT INTO theatre_requests_age_members (requestID, age) 
        VALUES ('$lastID', '$age')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);
    }

    foreach ($teachers as $teacher) {

        $sql = "
        INSERT INTO theatre_requests_teachers (requestID, teacherID) 
        VALUES ('$lastID', '$teacher')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);
    }

    foreach ($socialLinks as $link) {

        $sql = "
        INSERT INTO theatre_requests_social_links (requestID, url) 
        VALUES ('$lastID', '$link')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);
    }

    for ($i = 0; $i < count($photo); $i++) {

        $url = $photo[$i]['url'];
        $main = $photo[$i]['main'];
        $order = $photo[$i]['order'];
        $isFile = (int)$photo[$i]['isFile'];
        $isLoaded = (int)$photo[$i]['isLoaded'];

        if($isFile === 1 && $isLoaded === 0){

            $url = "";

            $baseDirName = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests";

            if (!file_exists($baseDirName)) {
                $oldmask = umask(0);
                $mkdir_result = mkdir($baseDirName, 0777);
                umask($oldmask);
            }

            $temp_name = $_FILES['photo']['tmp_name'][$i]['file'];
            $name = $_FILES['photo']['name'][$i]['file'];

            $sqls[] = $temp_name;
            $sqls[] = $name;

            $dirName = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests/" . $id;

            if (!file_exists($dirName)) {
                $oldmask = umask(0);
                $mkdir_result = mkdir($dirName, 0777);
                umask($oldmask);
            }

            $file_token = time();

            $path = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests/" . $id . "/" . $file_token . "_" . $name;

            @unlink($path);

            if(copy($temp_name, $path))
            {
                $url = "/files/theatre_requests/" . $id . "/" . $file_token . "_" . $name;
            }

        }

        $sql = "
            INSERT INTO theatre_request_photo (requestID, url, file, main, photo_order) 
            VALUES ('$lastID', '$url', '$isFile', '$main', '$order')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        unset($url);
        unset($main);
        unset($order);
        unset($isFile);
        unset($isLoaded);

    }

    for ($i = 0; $i < count($photoVisit); $i++) {

        $url = $photoVisit[$i]['url'];
        $main = $photoVisit[$i]['main'];
        $order = $photoVisit[$i]['order'];
        $isFile = (int)$photoVisit[$i]['isFile'];
        $isLoaded = (int)$photoVisit[$i]['isLoaded'];

        if($isFile === 1 && $isLoaded === 0){

            $url = "";

            $baseDirName = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests";

            if (!file_exists($baseDirName)) {
                $oldmask = umask(0);
                $mkdir_result = mkdir($baseDirName, 0777);
                umask($oldmask);
            }

            $temp_name = $_FILES['photoVisit']['tmp_name'][$i]['file'];
            $name = $_FILES['photoVisit']['name'][$i]['file'];

            $sqls[] = $temp_name;
            $sqls[] = $name;

            $dirName = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests/" . $id;

            if (!file_exists($dirName)) {
                $oldmask = umask(0);
                $mkdir_result = mkdir($dirName, 0777);
                umask($oldmask);
            }

            $file_token = time();

            $path = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests/" . $id . "/" . $file_token . "_" . $name;

            @unlink($path);

            if(copy($temp_name, $path))
            {
                $url = "/files/theatre_requests/" . $id . "/" . $file_token . "_" . $name;
            }

        }

        $sql = "
            INSERT INTO theatre_request_visit_photo (requestID, url, main, photo_order) 
            VALUES ('$lastID', '$url', '$main', '$order')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        unset($url);
        unset($main);
        unset($order);
        unset($isFile);
        unset($isLoaded);

    }

    foreach ($video as $v) {

        $sql = "
            INSERT INTO theatre_requests_video (requestID, url) 
            VALUES ('$lastID', '$v')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);
    }

    foreach ($reviews as $r) {

        $title = $r['title'];
        $text = $r['text'];

        $sql = "
            INSERT INTO theatre_requests_review (requestID, title, text) 
            VALUES ('$lastID', '$title', '$text')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        unset($title);
        unset($text);

    }

    foreach ($reviewsVisit as $rv) {

        $title = $rv['title'];
        $text = $rv['text'];

        $sql = "
            INSERT INTO theatre_requests_review_visit (requestID, title, text) 
            VALUES ('$lastID', '$title', '$text')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        unset($title);
        unset($text);

    }

    if (!$result) {
        $error = 1;
        $error_text = mysqli_error($conn);
    } else {
        $log->add($conn, $userID, 'Добавлена заявка ID: ' . $lastID . ' на театр: ' . $title . ' в школе ID: ' . $schoolID);
    }
}

$content = (object)[

    'input_params' => (object)[
        'GET' => $_GET,
        'POST' => $_POST,
        'FILES' => $_FILES,
    ],
    'error' => $error,
    'error_text' => $error_text,
    'sql' => $sqls,
    'params' => $params,

];
echo json_encode($content);