<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$userID = $authorization[1];
$place = htmlspecialchars($_POST["place"]);
$theatreID = htmlspecialchars($_POST["theatreID"]);
$title = htmlspecialchars($_POST["eventTitle"]);
$type = htmlspecialchars($_POST["eventType"]);
$date = htmlspecialchars($_POST["eventDate"]);
$review = htmlspecialchars($_POST["editorReview"]);
$photo = $_POST["photo"];
$video = $_POST["video"];

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

switch ($place){

    case "event":

        $sql = "
            INSERT INTO theatre_activity_city_event (theatreID, title, eventType, review, date) 
            VALUES ('$theatreID', '$title', '$type', '$review', '$date')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        break;

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