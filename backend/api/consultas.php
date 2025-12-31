<?php
$env = parse_ini_file(__DIR__ . '/../../.env');

$dsn  = "mysql:host=localhost;dbname=cucina_di_mamma;charset=utf8mb4";
$user = $env['DB_USER'] ?? 'root';
$pass = $env['DB_PASS'] ?? '';

try {
  $pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  $stmt = $pdo->query("SELECT id, nombre, email, asunto, mensaje, fecha 
                       FROM consultas
                       ORDER BY fecha DESC");
  $consultas = $stmt->fetchAll();

} catch (Throwable $e) {
  $error = $e->getMessage();
  $consultas = [];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Consultas | Cucina di mamma</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../../assets/css/consultas.css">
</head>
<body>
  <div class="contenedor">
    <h1>Consultas recibidas</h1>

    <?php if (isset($error)): ?>
      <p class="error"> Error: <?= htmlspecialchars($error) ?></p>

    <?php elseif (empty($consultas)): ?>
      <p>No hay consultas cargadas.</p>

    <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Asunto</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
        <?php foreach ($consultas as $c): ?>
          <tr>
            <td><?= htmlspecialchars($c['id']) ?></td>
            <td><?= htmlspecialchars($c['fecha']) ?></td>
            <td><?= htmlspecialchars($c['nombre']) ?></td>
            <td><?= htmlspecialchars($c['email']) ?></td>
            <td><?= htmlspecialchars($c['asunto'] ?? '') ?></td>
            <td class="mensaje"><?= htmlspecialchars($c['mensaje']) ?></td>
            </tr>
        <?php endforeach;?>
        </tbody>
      </table>
    <?php endif; ?>

  </div>
</body>
</html>