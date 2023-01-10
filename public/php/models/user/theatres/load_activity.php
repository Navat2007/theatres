<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$userID = $authorization[1];
$theatreID = htmlspecialchars($_POST["theatreID"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = (object)[];

$sql = "SELECT 
            event.*
        FROM 
            theatre_activity_city_event as event 
        WHERE 
            event.theatreID = '$theatreID'";


$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    $events = [];

    while ($row = mysqli_fetch_object($result)) {

        $types = (object)[

            'ID' => (int)$row->ID,
            'theatreID' => (int)$row->theatreID,
            'title' => $row->title,
            'eventType' => $row->eventType,
            'review' => $row->review,
            'date' => $row->date,

        ];

        $events[] = $types;
    }

    $params->events = $events;

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