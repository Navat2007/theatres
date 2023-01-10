<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';

$ID = htmlspecialchars($_POST["id"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "SELECT 
            *
        FROM 
            schools
        WHERE 
            ID = '$ID'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_object($result))
    {

        $params = (object)[

            'ID' => (int)$row->ID,
            'create_time' => $row->create_time,
            'photo' => $row->photo,
            'org_name' => htmlspecialchars_decode($row->org_name),
            'org_short_name' => htmlspecialchars_decode($row->org_short_name),
            'dir_fio' => $row->dir_fio,
            'dir_phone' => $row->dir_phone,
            'dir_email' => $row->dir_email,
            'active' => (int)$row->active,
            'address' => $row->address,

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

function getRole($text): string {

    $result = "Пользователь";

    switch ($text){

        case "superadmin":
            $result = "Главный администратор";
            break;

        case "admin":
            $result = "Администратор";
            break;

    }

    return $result;

}