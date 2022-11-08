<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$id = htmlspecialchars($_POST["id"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "SELECT * FROM teachers WHERE ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) == 0) {

    $error = 1;
    $error_text = "Педагога не существует, обновите страницу";

}

if ($error === 0) {

    $row = mysqli_fetch_object($result);

    $photo_path = $_SERVER['DOCUMENT_ROOT'] . $row->photo;
    @unlink($photo_path);

    $sql = "UPDATE 
                teachers
            SET
                last_user_changed = '$authorization[1]', archive = '1'
            WHERE 
                ID = '$id'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $error = 1;
        $error_text = mysqli_error($conn);
    } else {
        $log->add($conn, $authorization[1], 'Педагог #' . $id . ' школа ID: ' . $row->schoolID . ' отправлен в архив');
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