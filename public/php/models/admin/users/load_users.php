<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$search = htmlspecialchars($_POST["search"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = array();

$sql = "SELECT * FROM accounts WHERE archive = '0' AND role = 'school'";
$result = mysqli_query($conn, $sql);
$sqls[] = $sql;

if(mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_object($result))
    {

        $types = (object)[

            'ID' => (int)$row->ID,
            'login' => $row->login,
            'email' => $row->email,
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
            'org_name' => htmlspecialchars_decode($row->org_name),
            'fio' => $row->fio,

        ];

        $params[] = $types;

    }
}

$content = (object)[

    'input_params' => (object)[

        'search' => $search,

    ],
    'error' => $error,
    'error_text' => $error_text,
    'sql' => $sqls,
    'params' => $params,

];
echo json_encode($content);
