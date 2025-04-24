<?php
$host = "127.0.0.1";
$usuario = "root";
$contrasena = "undefinedroot";
$baseDatos = "personas";
$puerto = 3306;  

$conn = new mysqli($host, $usuario, $contrasena, $baseDatos, $puerto);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>