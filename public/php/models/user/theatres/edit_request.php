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
$foundationDate = htmlspecialchars($_POST["foundationDate"]);
$theatreUrlSchool = htmlspecialchars($_POST["theatreUrlSchool"]);
$videoBusinessCard = htmlspecialchars($_POST["videoBusinessCard"]);
$teachers = $_POST["teachers"];
$socialLinks = $_POST["socialLinks"];
$formActivity = $_POST["formActivity"];
$ageMembers = $_POST["ageMembers"];
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
            $error_text = "Заявка на создание или редактирование театра с таким названием уже существует в данной школе";
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
                status = $status,
                title = '$title', 
                address = '$address', 
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
    }

    if ((int)$status === 5) {
        $sql = "UPDATE 
                theatre_requests
            SET
                status = 5,
                last_user_changed = '$userID'
            WHERE 
                ID = '$id'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);
    }

    if (!$result) {
        $error = 1;
        $error_text = mysqli_error($conn);
    } else {
        $log->add($conn, $authorization[1], 'Отредактирована заявка ID: ' . $id . ' в школе ID: ' . $schoolID);
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