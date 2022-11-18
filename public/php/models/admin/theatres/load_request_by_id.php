<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$id = htmlspecialchars($_POST["id"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = (object)[];

$sql = "SELECT 
            request.*, 
            school.org_short_name as school_title, school.msrd as school_msrd, school.photo as school_photo,
            school.dir_fio as school_dir_fio, school.dir_phone as school_dir_phone, school.dir_email as school_dir_email, 
            account.email as user_email, account.fio as user_fio, account.phone as user_phone, account.photo as user_photo
        FROM 
            theatre_requests as request 
        LEFT JOIN 
            schools as school on school.ID = request.schoolID
        LEFT JOIN 
            accounts as account on account.ID = request.userID
        WHERE 
            request.ID = '$id'";

$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params = (object)[

            'ID' => (int)$row->ID,
            'theatreID' => (int)$row->theatreID,
            'schoolID' => (int)$row->schoolID,
            'userID' => (int)$row->userID,
            'create_time' => $row->create_time,
            'update_time' => $row->update_time,
            'title' => $row->title,
            'address' => $row->address,
            'status' => getStatusText($row->status),
            'decline_text' => $row->decline_text,
            'foundation_date' => $row->foundation_date,
            'theatre_url_school' => $row->theatre_url_school,
            'short_description' => html_entity_decode($row->short_description),
            'director_message' => html_entity_decode($row->director_message),
            'video_business_card' => $row->video_business_card,
            'social_links' => getSocialLinks($row->ID),
            'teachers' => getTeachers($row->ID),
            'age_members' => getAgeMembers($row->ID),
            'form_activity' => getFormActivity($row->ID),
            'last_user_changed' => (int)$row->last_user_changed,
            'school' => (object)[

                'title' => $row->school_title,
                'msrd' => $row->school_msrd,
                'photo' => $row->school_photo,
                'dir_fio' => $row->school_dir_fio,
                'dir_phone' => $row->school_dir_phone,
                'dir_email' => $row->school_dir_email,

            ],
            'user' => (object)[

                'fio' => $row->user_fio,
                'email' => $row->user_email,
                'phone' => $row->user_phone,
                'photo' => $row->user_photo,

            ]

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

function getStatusText($statusIndex)
{
    switch ((int)$statusIndex) {
        case 1:
            return "Новая";
        case 2:
            return "Рассмотрение";
        case 3:
            return "Принята";
        case 4:
            return "Отклонена";
        case 5:
            return "Отозвана";
    }
}

function getFormActivity($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            fa.activity
        FROM 
            theatre_requests_form_activity as fa 
        WHERE 
            fa.requestID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[
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
            theatre_requests_age_members as am 
        WHERE 
            am.requestID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[
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
            theatre_requests_teachers as t 
        LEFT JOIN
            teachers as teacher on teacher.ID = t.teacherID
        WHERE 
            t.requestID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[
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
            theatre_requests_social_links as sl 
        WHERE 
            sl.requestID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = $row->url;
        }
    }

    return $data;
}