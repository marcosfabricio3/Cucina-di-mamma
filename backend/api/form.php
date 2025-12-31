<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok'=>false,'msg'=>'Método no permitido']); 
  exit;
}

$env = parse_ini_file(__DIR__ . '/../../.env');

$dsn  = "mysql:host=localhost;dbname=cucina_di_mamma;charset=utf8mb4";
$user = $env['DB_USER'];
$pass = $env['DB_PASS'];

$nombre  = trim($_POST['nombre']  ?? '');
$email   = trim($_POST['email']   ?? '');
$asunto  = trim($_POST['asunto']  ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');

$errors = [];
if (mb_strlen($nombre) < 3 || mb_strlen($nombre) > 50) $errors[]='Nombre inválido';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 100) $errors[]='Email inválido';
if ($asunto !== '' && mb_strlen($asunto) > 100) $errors[]='Asunto muy largo';
if (mb_strlen($mensaje) < 10) $errors[]='Mensaje mínimo 10 caracteres';
if ($errors) {
  http_response_code(422);
  echo json_encode(['ok'=>false,'errors'=>$errors]);
  exit;
}

try {
  $pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC
  ]);

  $stmt = $pdo->prepare("INSERT INTO consultas (nombre,email,asunto,mensaje)
                         VALUES (:n,:e,:a,:m)");
  $stmt->execute([':n'=>$nombre, ':e'=>$email, ':a'=>$asunto ?: null, ':m'=>$mensaje]);
  echo json_encode(['ok'=>true,'id'=>$pdo->lastInsertId()]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'msg'=>'Error: ' . $e->getMessage()]);
}