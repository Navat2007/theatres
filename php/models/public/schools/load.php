<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';

$search = htmlspecialchars($_POST["search"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = array();

$sql = "SELECT * FROM schools WHERE archive = '0'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_object($result))
    {

        $types = (object)[

            'ID' => (int)$row->ID,
            'org_short_name' => htmlspecialchars_decode($row->org_short_name),
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
            'msrd' => (int)$row->msrd,
            'ekis' => (int)$row->ekis,
            'sport_school' => (int)$row->sport_school,
            'address' => $row->address,
            'photo' => $row->photo,
            'hsk_score' => (int)$row->hsk_score,
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