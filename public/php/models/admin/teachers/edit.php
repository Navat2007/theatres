<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$id = htmlspecialchars($_POST["id"]);
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

$sql = "SELECT * FROM teachers WHERE ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_object($result);

    if($row->f != $f || $row->i != $i || $row->o != $o)
    {
        $sql = "SELECT * FROM teachers WHERE f = '$f' AND i = '$i' AND o = '$o' AND schoolID = '$schoolID' AND archive = 0";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $error = 1;
            $error_text = "Педагог с таким ФИО уже существует в данной школе";
        }
    }

} else {

    $error = 1;
    $error_text = "Педагога не существует, обновите страницу";

}

if ($error === 0) {

    if(isset($_FILES['files']))
    {

        $baseDirName = $_SERVER['DOCUMENT_ROOT'] . "/files/teachers";
        if (!file_exists($baseDirName)) {
            $oldmask = umask(0);
            $mkdir_result = mkdir($baseDirName, 0777);
            umask($oldmask);
        }

        foreach($_FILES['files']['error'] as $key => $error)
        {
            if ($error == UPLOAD_ERR_OK)
            {
                $temp_name = $_FILES['files']['tmp_name'][$key];
                $name = $_FILES['files']['name'][$key];

                $dirName = $_SERVER['DOCUMENT_ROOT'] . "/files/teachers/" . $schoolID;
                if (!file_exists($dirName)) {
                    $oldmask = umask(0);
                    $mkdir_result = mkdir($dirName, 0777);
                    umask($oldmask);
                }

                $file_token = time();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/teachers/" . $schoolID . "/" . $file_token . "_" . $name;

                @unlink($path);

                $sql = "SELECT * FROM teachers WHERE ID = '$id'";
                $sqls[] = $sql;
                $result = mysqli_query($conn, $sql);
                $row = mysqli_fetch_object($result);

                $oldpath = $_SERVER['DOCUMENT_ROOT'] . $row->photo;
                @unlink($oldpath);

                if(copy($temp_name, $path))
                {

                    $file_to_DB = "/files/teachers/" . $schoolID . "/" . $file_token . "_" . $name;

                    $add_sql = "UPDATE 
                                    teachers
                                SET
                                    photo = '$file_to_DB'
                                WHERE 
                                    ID = '$id'";
                    mysqli_query($conn, $add_sql);
                }

            }
            else
            {
                $error = 1;
                $error_text = $error;
            }
        }
    }

    $sql = "UPDATE 
                teachers
            SET
                f = '$f', i = '$i', o = '$o', position = '$position', text = '$text', experience = '$experience', schoolID = '$schoolID', last_user_changed = '$authorization[1]', active = '$active'
            WHERE 
                ID = '$id'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $error = 1;
        $error_text = mysqli_error($conn);
    } else {
        $log->add($conn, $authorization[1], 'Отредактирован педагог ID: ' . $id . ' в школе ID: ' . $schoolID);
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