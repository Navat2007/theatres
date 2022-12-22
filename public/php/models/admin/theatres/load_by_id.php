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

$sql = "SELECT 
            theatre.*
        FROM 
            theatres as theatre 
        WHERE 
            theatre.ID = '$id'";

$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params = (object)[

            'ID' => (int)$row->ID,
            'schoolID' => (int)$row->schoolID,
            'create_time' => $row->create_time,
            'update_time' => $row->update_time,
            'title' => htmlspecialchars_decode($row->title),
            'address' => $row->address,
            'coordinates' => $row->coordinates,
            'foundation_date' => $row->foundation_date,
            'theatre_url_school' => $row->theatre_url_school,
            'short_description' => html_entity_decode($row->short_description),
            'director_message' => html_entity_decode($row->director_message),
            'video_business_card' => $row->video_business_card,
            'social_links' => getSocialLinks($row->ID),
            'teachers' => getTeachers($row->ID),
            'age_members' => getAgeMembers($row->ID),
            'form_activity' => getFormActivity($row->ID),
            'photo' => getPhoto($row->ID),
            'photoVisit' => getPhotoVisit($row->ID),
            'video' => getVideo($row->ID),
            'reviews' => getReviews($row->ID),
            'reviewsVisit' => getReviewsVisit($row->ID),
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
            'last_user_changed' => (int)$row->last_user_changed,

        ];
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

function getFormActivity($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            fa.activity
        FROM 
            theatres_form_activity as fa 
        WHERE 
            fa.theatreID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object) [
                'activity' => $row->activity
            ];
        }
    }

    return $data;
}

function getAgeMembers($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            am.age
        FROM 
            theatres_age_members as am 
        WHERE 
            am.theatreID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object) [
                'age' => $row->age
            ];
        }
    }

    return $data;
}

function getTeachers($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            t.teacherID, teacher.f, teacher.i, teacher.o
        FROM 
            theatres_teachers as t 
        LEFT JOIN
            teachers as teacher on teacher.ID = t.teacherID
        WHERE 
            t.theatreID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object) [
                'ID' => (int)$row->teacherID,
                'fio' => $row->f . ' ' . $row->i . ' ' . $row->o
            ];
        }
    }

    return $data;
}

function getSocialLinks($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            sl.url
        FROM 
            theatres_social_links as sl 
        WHERE 
            sl.theatreID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = $row->url;
        }
    }

    return $data;
}

function getPhoto($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            theatres_photo as p 
        WHERE 
            p.theatreID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[

                'ID' => (int)$row->ID,
                'url' => $row->url,
                'main' => (int)$row->main,
                'order' => (int)$row->photo_order,
                'isFile' => (int)$row->file,
                'isLoaded' => 1,
                'isTheatre' => 1

            ];
        }
    }

    return $data;
}

function getPhotoVisit($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            theatres_visit_photo as p 
        WHERE 
            p.theatreID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[

                'ID' => (int)$row->ID,
                'url' => $row->url,
                'main' => (int)$row->main,
                'order' => (int)$row->photo_order,
                'isFile' => (int)$row->file,
                'isLoaded' => 1,
                'isTheatre' => 1,
                'isVisit' => 1

            ];

        }
    }

    return $data;
}

function getVideo($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            sl.url
        FROM 
            theatres_video as sl 
        WHERE 
            sl.theatreID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = $row->url;
        }
    }

    return $data;
}

function getReviews($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            theatres_review as p 
        WHERE 
            p.theatreID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[

                'title' => $row->title,
                'text' => $row->text,

            ];

        }
    }

    return $data;
}

function getReviewsVisit($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            theatres_review_visit as p 
        WHERE 
            p.theatreID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[

                'title' => $row->title,
                'text' => $row->text,

            ];

        }
    }

    return $data;
}