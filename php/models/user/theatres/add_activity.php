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
        $updateID = mysqli_insert_id($conn);

        for ($i = 0; $i < count($photo); $i++) {

            $url = $photo[$i]['url'];
            $main = $photo[$i]['main'];
            $order = $photo[$i]['order'];
            $isFile = (int)$photo[$i]['isFile'];
            $isLoaded = (int)$photo[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $url = "";

                $temp_name = $_FILES['photo']['tmp_name'][$i]['file'];
                $name = $_FILES['photo']['name'][$i]['file'];
                $file_token = time();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre/" . $theatreID . "/" . $file_token . "_" . $name;

                @unlink($path);

                if(copy($temp_name, $path))
                {
                    $url = "/files/theatre/" . $theatreID . "/" . $file_token . "_" . $name;
                }

                $sql = "INSERT INTO theatre_activity_city_event_photo (activityID, url, main, photo_order) 
                    VALUES ('$updateID', '$url', '$main', '$order')";
                $sqls[] = $sql;
                mysqli_query($conn, $sql);

            }

            unset($url);
            unset($main);
            unset($order);
            unset($isFile);
            unset($isLoaded);

        }

        foreach ($video as $v) {

            $sql = "
            INSERT INTO theatre_activity_city_event_video (activityID, url) 
            VALUES ('$updateID', '$v')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);

        }

        break;

    case "visit":

        $result = htmlspecialchars($_POST["eventResult"]);

        $sql = "
            INSERT INTO theatre_activity_visit_festival (theatreID, title, review, result, date) 
            VALUES ('$theatreID', '$title', '$review', '$result', '$date')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);
        $updateID = mysqli_insert_id($conn);

        for ($i = 0; $i < count($photo); $i++) {

            $url = $photo[$i]['url'];
            $main = $photo[$i]['main'];
            $order = $photo[$i]['order'];
            $isFile = (int)$photo[$i]['isFile'];
            $isLoaded = (int)$photo[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $url = "";

                $temp_name = $_FILES['photo']['tmp_name'][$i]['file'];
                $name = $_FILES['photo']['name'][$i]['file'];
                $file_token = time();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre/" . $theatreID . "/" . $file_token . "_" . $name;

                @unlink($path);

                if(copy($temp_name, $path))
                {
                    $url = "/files/theatre/" . $theatreID . "/" . $file_token . "_" . $name;
                }

                $sql = "INSERT INTO theatre_activity_visit_festival_photo (activityID, url, main, photo_order) 
                    VALUES ('$updateID', '$url', '$main', '$order')";
                $sqls[] = $sql;
                mysqli_query($conn, $sql);

            }

            unset($url);
            unset($main);
            unset($order);
            unset($isFile);
            unset($isLoaded);

        }

        break;

    case "own":

        $file = $_POST["ownFile"];

        $sql = "
            INSERT INTO theatre_activity_own_festival (theatreID, title, review, file, date) 
            VALUES ('$theatreID', '$title', '$review', '$file', '$date')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);
        $updateID = mysqli_insert_id($conn);

        $temp_name = $_FILES['ownFile']['tmp_name'][0];
        $name = $_FILES['photo']['name'][0];
        $file_token = time();

        $path = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre/" . $theatreID . "/" . $file_token . "_" . $name;

        @unlink($path);

        if(copy($temp_name, $path))
        {
            $url = "/files/theatre/" . $theatreID . "/" . $file_token . "_" . $name;

            $add_sql = "UPDATE 
                            theatre_activity_own_festival
                        SET
                            file = '$url'
                        WHERE 
                            ID = '$updateID'";
            mysqli_query($conn, $add_sql);
        }

        for ($i = 0; $i < count($photo); $i++) {

            $url = $photo[$i]['url'];
            $main = $photo[$i]['main'];
            $order = $photo[$i]['order'];
            $isFile = (int)$photo[$i]['isFile'];
            $isLoaded = (int)$photo[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $url = "";

                $temp_name = $_FILES['photo']['tmp_name'][$i]['file'];
                $name = $_FILES['photo']['name'][$i]['file'];
                $file_token = time();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre/" . $theatreID . "/" . $file_token . "_" . $name;

                @unlink($path);

                if(copy($temp_name, $path))
                {
                    $url = "/files/theatre/" . $theatreID . "/" . $file_token . "_" . $name;
                }

                $sql = "INSERT INTO theatre_activity_own_festival_photo (activityID, url, main, photo_order) 
                    VALUES ('$updateID', '$url', '$main', '$order')";
                $sqls[] = $sql;
                mysqli_query($conn, $sql);

            }

            unset($url);
            unset($main);
            unset($order);
            unset($isFile);
            unset($isLoaded);

        }

        foreach ($video as $v) {

            $sql = "
            INSERT INTO theatre_activity_own_festival_video (activityID, url) 
            VALUES ('$updateID', '$v')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);

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