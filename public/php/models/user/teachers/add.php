<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$f = htmlspecialchars($_POST["f"]);
$i = htmlspecialchars($_POST["i"]);
$o = htmlspecialchars($_POST["o"]);
$position = htmlspecialchars($_POST["position"]);
$text = htmlspecialchars($_POST["text"]);
$experience = htmlspecialchars($_POST["experience"]);
$schoolID = htmlspecialchars($_POST["schoolID"]);
$active = htmlspecialchars($_POST["active"]) === "true" ? 1 : 0;

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "SELECT * FROM teachers WHERE f = '$f' AND i = '$i' AND o = '$o' AND schoolID = '$schoolID' AND archive = 0";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0)
{
    $error = 1;
    $error_text = "Педагог с таким ФИО уже существует в данной школе";
}

if($error === 0){

    $sql = "INSERT INTO teachers (f, i, o, position, text, experience, schoolID, active) VALUES ('$f', '$i', '$o', '$position', '$text', '$experience', '$schoolID', '$active')";
    $sqls[] = $sql;
    mysqli_query($conn, $sql);
    $lastID = mysqli_insert_id($conn);

    $log->add($conn, $authorization[1], 'Добавлен педагог #' . $lastID . ' в школу ID: ' . $schoolID);

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