<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$userID = $authorization[1];
$place = htmlspecialchars($_POST["place"]);
$theatreID = htmlspecialchars($_POST["theatreID"]);
$title = htmlspecialchars($_POST["eventTitle"]);
$date = htmlspecialchars($_POST["eventDate"]);
$review = htmlspecialchars($_POST["editorReview"]);

$photo = $_POST["photo"];
$video = $_POST["video"];

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

switch ($place){

    case "event":

        $type = htmlspecialchars($_POST["eventType"]);

        $sql = "
            INSERT INTO theatre_activity_city_event (theatreID, title, eventType, review, date) 
            VALUES ('$theatreID', '$title', '$type', '$review', '$date')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        for ($i = 0; $i < count($photo); $i++) {

            $file_id = $photo[$i]['ID'];
            $url = $photo[$i]['url'];
            $main = $photo[$i]['main'];
            $order = $photo[$i]['order'];
            $isFile = (int)$photo[$i]['isFile'];
            $isLoaded = (int)$photo[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $url = "";

                $baseDirName = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests";

                if (!file_exists($baseDirName)) {
                    $oldmask = umask(0);
                    $mkdir_result = mkdir($baseDirName, 0777);
                    umask($oldmask);
                }

                $temp_name = $_FILES['photo']['tmp_name'][$i]['file'];
                $name = $_FILES['photo']['name'][$i]['file'];

                $sqls[] = $temp_name;
                $sqls[] = $name;

                $dirName = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests/" . $id;

                if (!file_exists($dirName)) {
                    $oldmask = umask(0);
                    $mkdir_result = mkdir($dirName, 0777);
                    umask($oldmask);
                }

                $file_token = time();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests/" . $id . "/" . $file_token . "_" . $name;

                @unlink($path);

                if(copy($temp_name, $path))
                {
                    $url = "/files/theatre_requests/" . $id . "/" . $file_token . "_" . $name;
                }

                $sql = "INSERT INTO theatre_request_photo (requestID, url, file, main, photo_order) 
                    VALUES ('$id', '$url', '$isFile', '$main', '$order')";
                $sqls[] = $sql;
                mysqli_query($conn, $sql);

            }

            if($isFile === 1 && $isLoaded === 1){
                $sql = "UPDATE theatre_request_photo
                    SET
                        main = '$main',
                        photo_order = '$order'                        
                    WHERE 
                        ID = '$file_id'";
                $sqls[] = $sql;
                mysqli_query($conn, $sql);
            }

            if($isFile === 0){
                $sql = "INSERT INTO theatre_request_photo (requestID, url, file, main, photo_order) 
                    VALUES ('$id', '$url', '$isFile', '$main', '$order')";
                $sqls[] = $sql;
                mysqli_query($conn, $sql);
            }

            unset($file_id);
            unset($url);
            unset($main);
            unset($order);
            unset($isFile);
            unset($isLoaded);

        }

        break;

    case "visit":

        $result = htmlspecialchars($_POST["eventResult"]);

        $sql = "
            INSERT INTO theatre_activity_visit_festival (theatreID, title, review, result, date) 
            VALUES ('$theatreID', '$title', '$review', '$result', '$date')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        break;

    case "own":

        $file = $_POST["eventFile"];

        $sql = "
            INSERT INTO theatre_activity_own_festival (theatreID, title, review, file, date) 
            VALUES ('$theatreID', '$title', '$review', '$file', '$date')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);

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