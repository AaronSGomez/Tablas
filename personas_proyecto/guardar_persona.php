<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = $_POST["nombre"];
    $edad = $_POST["edad"];
    $ocupacion = $_POST["ocupacion"];
    $genero = $_POST["genero"];

    $sql = "INSERT INTO personas (nombre, edad, ocupacion, genero) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("siss", $nombre, $edad, $ocupacion, $genero);

    if ($stmt->execute()) {
        echo $conn->insert_id;
    } else {
        http_response_code(500);
        echo "Error al insertar: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo "Método no permitido";
}
?>