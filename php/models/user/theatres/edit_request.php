<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$id = htmlspecialchars($_POST["id"]);
$status = htmlspecialchars($_POST["status"]);
$theatreID = htmlspecialchars($_POST["theatreID"]);
$schoolID = htmlspecialchars($_POST["schoolID"]);
$userID = $authorization[1];
$title = htmlspecialchars($_POST["title"]);
$address = htmlspecialchars($_POST["address"]);
$coordinates = htmlspecialchars($_POST["coordinates"]);
$foundationDate = htmlspecialchars($_POST["foundationDate"]);
$theatreUrlSchool = htmlspecialchars($_POST["theatreUrlSchool"]);
$videoBusinessCard = htmlspecialchars($_POST["videoBusinessCard"]);
$teachers = $_POST["teachers"];
$socialLinks = $_POST["socialLinks"];
$formActivity = $_POST["formActivity"];
$ageMembers = $_POST["ageMembers"];
$photo = $_POST["photo"];
$photoVisit = $_POST["photoVisit"];
$video = $_POST["video"];
$reviews = $_POST["reviews"];
$reviewsVisit = $_POST["reviewsVisit"];
$editorShortDescription = htmlspecialchars($_POST["editorShortDescription"]);
$editorDirectorMessage = htmlspecialchars($_POST["editorDirectorMessage"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

if ((int)$theatreID !== 0) {

    $sql = "SELECT * FROM theatres WHERE ID = '$theatreID'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {

        $row = mysqli_fetch_object($result);

        if ($row->title != $title) {
            $sql = "SELECT * FROM theatres WHERE title = '$title' AND schoolID = '$schoolID' AND archive = 0";
            $sqls[] = $sql;
            $result = mysqli_query($conn, $sql);

            if (mysqli_num_rows($result) > 0) {
                $error = 1;
                $error_text = "Театр с таким названием уже существует в данной школе";
            }
        }
    }

    $sql = "SELECT * FROM theatre_requests WHERE theatreID = '$theatreID'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_object($result);

    if (mysqli_num_rows($result) > 0 && $row->ID != $id) {
        $error = 1;
        $error_text = "Заявка на редактирование данного театра уже существует в данной школе";
    }

}

$sql = "SELECT * FROM theatre_requests WHERE ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_object($result);

    if ($row->title != $title) {
        $sql = "SELECT * FROM theatre_requests WHERE title = '$title' AND schoolID = '$schoolID' AND status <> '5' AND archive = 0";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $error = 1;
            $error_text = "Заявка на создание или редактирование театра с таким названием уже существует в данной школе, отредактируйте существующую заявку в разделе \"Заявки на театры\"";
        }
    }
}

if ($error === 0) {

    $sql = "SELECT * FROM theatre_requests WHERE ID = '$id'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_object($result);

    if ((int)$status === 2) {

        $status = (int)$row->status === 1 ? 1 : 2;

        $sql = "UPDATE 
                theatre_requests
            SET
                status = '$status',
                title = '$title', 
                address = '$address', 
                coordinates = '$coordinates', 
                foundation_date = '$foundationDate', 
                theatre_url_school = '$theatreUrlSchool',
                short_description = '$editorShortDescription',
                director_message = '$editorDirectorMessage',
                video_business_card = '$videoBusinessCard',
                last_user_changed = '$userID'
            WHERE 
                ID = '$id'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);

        $sql = "DELETE FROM theatre_requests_form_activity WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        foreach ($formActivity as $activity) {

            $sql = "
            INSERT INTO theatre_requests_form_activity (requestID, activity) 
            VALUES ('$id', '$activity')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);
        }

        $sql = "DELETE FROM theatre_requests_age_members WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        foreach ($ageMembers as $age) {

            $sql = "
            INSERT INTO theatre_requests_age_members (requestID, age) 
            VALUES ('$id', '$age')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);
        }

        $sql = "DELETE FROM theatre_requests_teachers WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        foreach ($teachers as $teacher) {

            $sql = "
            INSERT INTO theatre_requests_teachers (requestID, teacherID) 
            VALUES ('$id', '$teacher')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);
        }

        $sql = "DELETE FROM theatre_requests_social_links WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        foreach ($socialLinks as $link) {

            $sql = "
            INSERT INTO theatre_requests_social_links (requestID, url) 
            VALUES ('$id', '$link')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);
        }

        $sql = "DELETE FROM theatre_request_photo WHERE requestID = '$id' AND file = '0'";
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

        $sql = "DELETE FROM theatre_request_visit_photo WHERE requestID = '$id' AND file = '0'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        for ($i = 0; $i < count($photoVisit); $i++) {

            $url = $photoVisit[$i]['url'];
            $main = $photoVisit[$i]['main'];
            $order = $photoVisit[$i]['order'];
            $isFile = (int)$photoVisit[$i]['isFile'];
            $isLoaded = (int)$photoVisit[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $url = "";

                $baseDirName = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests";

                if (!file_exists($baseDirName)) {
                    $oldmask = umask(0);
                    $mkdir_result = mkdir($baseDirName, 0777);
                    umask($oldmask);
                }

                $temp_name = $_FILES['photoVisit']['tmp_name'][$i]['file'];
                $name = $_FILES['photoVisit']['name'][$i]['file'];

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

            }

            $sql = "
            INSERT INTO theatre_request_visit_photo (requestID, url, main, photo_order) 
            VALUES ('$id', '$url', '$main', '$order')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);

            unset($url);
            unset($main);
            unset($order);
            unset($isFile);
            unset($isLoaded);

        }

        $sql = "DELETE FROM theatre_requests_video WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        foreach ($video as $v) {

            $sql = "
            INSERT INTO theatre_requests_video (requestID, url) 
            VALUES ('$id', '$v')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);
        }

        $sql = "DELETE FROM theatre_requests_review WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        foreach ($reviews as $r) {

            $title = $r['title'];
            $text = $r['text'];

            $sql = "
            INSERT INTO theatre_requests_review (requestID, title, text) 
            VALUES ('$id', '$title', '$text')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);

            unset($title);
            unset($text);

        }

        $sql = "DELETE FROM theatre_requests_review_visit WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        foreach ($reviewsVisit as $rv) {

            $title = $rv['title'];
            $text = $rv['text'];

            $sql = "
            INSERT INTO theatre_requests_review_visit (requestID, title, text) 
            VALUES ('$id', '$title', '$text')";

            $sqls[] = $sql;
            mysqli_query($conn, $sql);

            unset($title);
            unset($text);

        }
    }

    if ((int)$status === 5) {

        $sql = "DELETE FROM theatre_requests_form_activity WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "DELETE FROM theatre_requests_age_members WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "DELETE FROM theatre_requests_teachers WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "DELETE FROM theatre_requests_social_links WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "SELECT * FROM theatre_request_photo WHERE requestID = '$id' AND file = '1'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {

            while ($row = mysqli_fetch_object($result))
            {

                $oldFilePlace = $_SERVER['DOCUMENT_ROOT'] .  $row->url;
                @unlink($oldFilePlace);

            }

        }

        $sql = "DELETE FROM theatre_request_photo WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "SELECT * FROM theatre_request_visit_photo WHERE requestID = '$id' AND file = '1'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {

            while ($row = mysqli_fetch_object($result))
            {

                $oldFilePlace = $_SERVER['DOCUMENT_ROOT'] .  $row->url;
                @unlink($oldFilePlace);

            }

        }

        $sql = "DELETE FROM theatre_request_visit_photo WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $dirName = $_SERVER['DOCUMENT_ROOT'] . "/files/theatre_requests/" . $id;
        @unlink($dirName);

        $sql = "DELETE FROM theatre_requests_video WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "DELETE FROM theatre_requests_review WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "DELETE FROM theatre_requests_review_visit WHERE requestID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "DELETE FROM 
                theatre_requests
            WHERE 
                ID = '$id'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);
    }

    if (!$result) {
        $error = 1;
        $error_text = "Edit request: " . mysqli_error($conn);
    } else {
        $log->add($conn, $authorization[1], 'Отозвана заявка ID: ' . $id . ' в школе ID: ' . $schoolID);
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