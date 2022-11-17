<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$schoolID = htmlspecialchars($_POST["schoolID"]);
$userID = $authorization[1];
$title = htmlspecialchars($_POST["title"]);
$address = htmlspecialchars($_POST["address"]);
$foundationDate = htmlspecialchars($_POST["foundationDate"]);
$theatreUrlSchool = htmlspecialchars($_POST["theatreUrlSchool"]);
$videoBusinessCard = htmlspecialchars($_POST["videoBusinessCard"]);
$teachers = $_POST["teachers"];
$socialLinks = $_POST["socialLinks"];
$formActivity = $_POST["formActivity"];
$ageMembers = $_POST["ageMembers"];
$editorShortDescription = htmlspecialchars($_POST["editorShortDescription"]);
$editorDirectorMessage = htmlspecialchars($_POST["editorDirectorMessage"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "SELECT * FROM theatres WHERE title = '$title' AND schoolID = '$schoolID' AND archive = 0";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $error = 1;
    $error_text = "Театр с таким названием уже существует в данной школе";
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
        INSERT INTO theatre_requests (schoolID, userID, title, address, foundation_date, theatre_url_school, video_business_card, short_description, director_message, last_user_changed) 
        VALUES ('$schoolID', '$userID', '$title', '$address', '$foundationDate', '$theatreUrlSchool', '$videoBusinessCard', '$editorShortDescription', '$editorDirectorMessage', '$userID')
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