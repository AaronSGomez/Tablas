<?php
require_once 'conexion.php';

$id = $_POST["id"];
$sql = "DELETE FROM personas WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "Persona eliminada";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>