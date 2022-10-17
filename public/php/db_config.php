<?php        

$DB_SERVER = "localhost";
$DB_USER = "sport";
$DB_PASSWORD = "EVEonline2007";
$DB_DATABASE = "theatres";

$conn = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_DATABASE);
$conn->set_charset("utf8");

if(!$conn)
{
        die("Connection failed.". mysql_connect_error());
}