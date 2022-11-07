<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$error = 0;
$error_text = "";
$sqls = array();
$params = array();

$sql = "SELECT * FROM teachers WHERE archive = '0'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_object($result))
    {

        $types = (object)[

            'ID' => (int)$row->ID,
            'photo' => $row->photo,
            'f' => $row->f,
            'i' => $row->i,
            'o' => $row->o,
            'position' => $row->position,
            'schoolID' => (int)$row->schoolID,
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",

        ];

        $params[] = $types;

    }
}

$content = (object)[

    'input_params' => (object)[

        'POST' => $_POST,

    ],
    'error' => $error,
    'error_text' => $error_text,
    'sql' => $sqls,
    'params' => $params,

];
echo json_encode($content);