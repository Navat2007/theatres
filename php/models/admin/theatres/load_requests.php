<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$error = 0;
$error_text = "";
$sqls = array();
$params = array();

$sql = "SELECT 
            request.ID, request.theatreID, request.title, request.address, request.create_time, request.update_time, request.status
        FROM 
            theatre_requests as request 
        WHERE 
            request.archive = '0'";


$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $types = (object)[

            'ID' => (int)$row->ID,
            'title' => htmlspecialchars_decode($row->title),
            'address' => $row->address,
            'create_time' => $row->create_time,
            'update_time' => $row->update_time,
            'status' => getStatusText($row->status),
            'type' => getTypeText($row->theatreID),

        ];

        $params[] = $types;
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

function getTypeText($theatreID): string
{
    switch ((int)$theatreID) {
        case 0:
            return "Новый театр";
        default:
            return "Редактирование театра ID: " . $theatreID;
    }
}