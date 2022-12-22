<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$error = 0;
$error_text = "";
$sqls = array();
$params = array();

$sql = "SELECT 
        theatre.ID, theatre.title, theatre.active, theatre.last_user_changed,
        school.org_short_name as school_title
    FROM 
         theatres as theatre
    LEFT JOIN 
         schools as school on school.ID = theatre.schoolID
    WHERE 
         theatre.archive = '0'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $types = (object)[

            'ID' => (int)$row->ID,
            'title' => htmlspecialchars_decode($row->title),
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
            'last_user_changed' => (int)$row->last_user_changed,
            'school_title' => htmlspecialchars_decode($row->school_title),
        ];

        $params[] = $types;

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