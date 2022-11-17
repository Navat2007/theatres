<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';

$id = htmlspecialchars($_POST["id"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "SELECT 
            theatre.*
        FROM 
            theatres as theatre
        WHERE 
            theatre.ID = '$id'";


$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params = (object)[

            'ID' => (int)$row->ID,
            'schoolID' => $row->schoolID,
            'userID' => $row->userID,
            'create_time' => $row->create_time,
            'update_time' => $row->update_time,
            'title' => $row->title,
            'address' => $row->address,
            'foundation_date' => $row->foundation_date,
            'theatre_url_school' => $row->theatre_url_school,
            'short_description' => html_entity_decode($row->short_description),
            'director_message' => html_entity_decode($row->director_message),
            'video_business_card' => $row->video_business_card,
            'social_links' => $row->url,
            'last_user_changed' => $row->last_user_changed,

        ];
    }
} else
    $params = null;

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