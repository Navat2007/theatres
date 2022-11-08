<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);
require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';

$ID = htmlspecialchars($_POST["userID"]);
$text = htmlspecialchars($_POST["text"]);
$email = htmlspecialchars($_POST["email"]);
$fio = "";
$org_short_name = "";

$error = "";
$error_text = "";

try {
    $sql = "INSERT INTO support (userID, email, text) VALUES ('$ID', '$email', '$text')";
    mysqli_query($conn, $sql);
}
catch (Exception $exception){}

$sql = "SELECT * FROM accounts WHERE ID = '$ID'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_object($result);
    $fio = $row->fio;

    if((int)$row->schoolID == 0){
        $org_short_name = htmlspecialchars_decode($row->org_name);
    }
    else
    {
        $sql = "SELECT * FROM schools WHERE ID = '$row->schoolID'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_object($result);
        $org_short_name = htmlspecialchars_decode($row->org_short_name);
    }

}

$params = $helper->sendSupportEmail('Театры патриот-спорт', $email, $text, $fio, $org_short_name);

$content = (object)[

    'entry' => (object)[
        'POST' => $_POST,
    ],
    'error' => $error,
    'error_text' => $error_text,
    'params' => $params,

];

echo json_encode($content);