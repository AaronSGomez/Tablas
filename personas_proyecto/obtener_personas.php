<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'conexion.php';

$sql = "SELECT id, nombre, edad, ocupacion, genero FROM personas";
$result = $conn->query($sql);

$personas = [];
while ($row = $result->fetch_assoc()) {
    $personas[] = $row;
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($personas);
?>