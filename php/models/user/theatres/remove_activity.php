<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$id = htmlspecialchars($_POST["ID"]);
$place = htmlspecialchars($_POST["place"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

switch ($place){

    case "event":

        $sql = "DELETE FROM theatre_activity_city_event WHERE ID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "DELETE FROM theatre_activity_city_event_video WHERE activityID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "SELECT * FROM theatre_activity_city_event_photo WHERE activityID = '$id'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {

            while ($row = mysqli_fetch_object($result))
            {

                $oldFile = $_SERVER['DOCUMENT_ROOT'] .  $row->url;
                @unlink($oldFile);

            }

        }

        break;

    case "visit":

        $sql = "DELETE FROM theatre_activity_visit_festival WHERE ID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "SELECT * FROM theatre_activity_visit_festival_photo WHERE activityID = '$id'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {

            while ($row = mysqli_fetch_object($result))
            {

                $oldFile = $_SERVER['DOCUMENT_ROOT'] .  $row->url;
                @unlink($oldFile);

            }

        }

        break;

    case "own":

        $sql = "SELECT * FROM theatre_activity_own_festival WHERE ID = '$id'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_object($result);

        $oldFile = $_SERVER['DOCUMENT_ROOT'] .  $row->file;
        @unlink($oldFile);

        $sql = "DELETE FROM theatre_activity_own_festival WHERE ID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "DELETE FROM theatre_activity_own_festival_video WHERE activityID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "SELECT * FROM theatre_activity_own_festival_photo WHERE activityID = '$id'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {

            while ($row = mysqli_fetch_object($result))
            {

                $oldFile = $_SERVER['DOCUMENT_ROOT'] .  $row->url;
                @unlink($oldFile);

            }

        }

        break;

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