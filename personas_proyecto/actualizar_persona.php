<?php
require_once 'conexion.php';

$id = $_POST["id"];
$nombre = $_POST["nombre"];
$edad = $_POST["edad"];
$ocupacion = $_POST["ocupacion"];
$genero = $_POST["genero"];

$sql = "UPDATE personas SET nombre=?, edad=?, ocupacion=?, genero=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sissi", $nombre, $edad, $ocupacion, $genero, $id);

if ($stmt->execute()) {
    echo "Persona actualizada";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>