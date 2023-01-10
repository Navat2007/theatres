<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$ID = htmlspecialchars($_POST["id"]);
$address = htmlspecialchars($_POST["address"]);
$dir_email = htmlspecialchars($_POST["dir_email"]);
$dir_fio = htmlspecialchars($_POST["dir_fio"]);
$dir_phone = htmlspecialchars($_POST["dir_phone"]);
$org_name = htmlspecialchars($_POST["org_name"]);
$org_short_name = htmlspecialchars($_POST["org_short_name"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

if((int)$ID !== 0 || $ID !== ""){

    $sql = "UPDATE schools SET address = '$address', dir_email = '$dir_email', dir_fio = '$dir_fio', dir_phone = '$dir_phone', org_name = '$org_name', org_short_name = '$org_short_name' WHERE ID = '$ID' AND archive = '0'";
    $sqls[] = $sql;
    mysqli_query($conn, $sql);
    $lastID = mysqli_insert_id($conn);

    $log->add($conn, $authorization[1], 'Школа отредактирована #' . $ID);

}

$content = (object)[

    'input_params' => (object)[
        'POST' => $_POST
    ],
    'error' => $error,
    'error_text' => $error_text,
    'sql' => $sqls,
    'params' => $params,

];
echo json_encode($content);