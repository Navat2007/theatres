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
$events = [];
$visits = [];
$own = [];

$sql = "SELECT 
            event.*
        FROM 
            theatre_activity_city_event as event 
        WHERE 
            event.theatreID = '$theatreID'";

$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    while ($row = mysqli_fetch_object($result)) {

        $types = (object)[

            'ID' => (int)$row->ID,
            'theatreID' => (int)$row->theatreID,
            'title' => htmlspecialchars_decode($row->title),
            'eventType' => htmlspecialchars_decode($row->eventType),
            'review' => htmlspecialchars_decode($row->review),
            'date' => $row->date,

        ];

        $events[] = $types;
    }

}

$sql = "SELECT 
            event.*
        FROM 
            theatre_activity_visit_festival as event 
        WHERE 
            event.theatreID = '$theatreID'";

$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    while ($row = mysqli_fetch_object($result)) {

        $types = (object)[

            'ID' => (int)$row->ID,
            'theatreID' => (int)$row->theatreID,
            'title' => htmlspecialchars_decode($row->title),
            'review' => htmlspecialchars_decode($row->review),
            'result' => htmlspecialchars_decode($row->result),
            'date' => $row->date,

        ];

        $visits[] = $types;
    }

}

$sql = "SELECT 
            event.*
        FROM 
            theatre_activity_own_festival as event 
        WHERE 
            event.theatreID = '$theatreID'";

$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    while ($row = mysqli_fetch_object($result)) {

        $types = (object)[

            'ID' => (int)$row->ID,
            'theatreID' => (int)$row->theatreID,
            'title' => htmlspecialchars_decode($row->title),
            'review' => htmlspecialchars_decode($row->review),
            'file' => $row->file,
            'date' => $row->date,

        ];

        $own[] = $types;
    }

}

$params->events = $events;
$params->visits = $visits;
$params->own = $own;

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