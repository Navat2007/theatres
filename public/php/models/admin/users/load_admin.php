<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$ID = htmlspecialchars($_POST["id"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "SELECT * FROM accounts WHERE ID = '$ID'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_object($result))
    {

        $params = (object)[

            'ID' => (int)$row->ID,
            'login' => $row->login,
            'email' => $row->email,
            'photo' => $row->photo,
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
            'role' => $row->role == "superadmin" ? "Главный администратор":"Администратор",
            'fio' => $row->fio,
            'phone' => $row->phone,
            'org_name' => $row->org_name,

        ];

    }
}

$content = (object)[

    'input_params' => (object)[

    ],
    'error' => $error,
    'error_text' => $error_text,
    'sql' => $sqls,
    'params' => $params,

];
echo json_encode($content);