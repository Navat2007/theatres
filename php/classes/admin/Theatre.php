<?php

class Theatre
{

    public static function checkTitle($id, $theatreID, $schoolID, $conn){

        $answer = (object)[
            'error' => 0,
            'error_text' => ''
        ];

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
                        $answer->error = 1;
                        $answer->error_text = "Театр с таким названием уже существует в данной школе";
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
                    $answer->error = 1;
                    $answer->error_text = "Заявка на создание или редактирование театра с таким названием уже существует в данной школе";
                }
            }
        }

        return $answer;

    }

}