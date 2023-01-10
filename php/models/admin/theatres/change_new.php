<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$id = htmlspecialchars($_POST["id"]);
$userID = $authorization[1];

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "UPDATE 
                theatre_requests
            SET
                status = '2',
                last_user_changed = '$userID'
            WHERE 
                ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

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