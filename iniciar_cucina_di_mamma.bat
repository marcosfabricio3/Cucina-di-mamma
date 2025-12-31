@echo off
title Iniciar Cucina di Mamma
cd /d "%~dp0"

echo ==========================================
echo  INICIANDO ENTORNO CUCINA DI MAMMA
echo ==========================================

:: ========= CONFIGURACIÓN ADAPTABLE ==========
:: Nombre del servicio MySQL (ver en services.msc en CMD y buscar como se llama tu MYSQL)
set "MYSQL_SERVICE=MySQL94"

:: Ruta al cliente mysql.exe  (o solo "mysql" si está en el PATH)
set "MYSQL_CLIENT=C:\Program Files\MySQL\MySQL Workbench 8.0 CE\mysql.exe"

:: Usuario y contraseña de MySQL
set "MYSQL_USER="
:: si no tiene contraseña, dejar en blanco:
set "MYSQL_PASS="

:: Comando para PHP (si no está en PATH, poner ruta completa)
set "PHP_CMD=php"
:: ============================================


echo.
echo [1/3] Verificando servicio MySQL...

sc query "%MYSQL_SERVICE%" | find "RUNNING" >nul
if errorlevel 1 (
    echo MySQL no está iniciado. Iniciando servicio "%MYSQL_SERVICE%"...
    net start "%MYSQL_SERVICE%" >nul 2>&1
    if errorlevel 1 (
        echo No se pudo iniciar MySQL. Verificá el nombre del servicio en este archivo.
        pause
        exit /b
    )
    echo MySQL iniciado correctamente.
) else (
    echo MySQL ya estaba en ejecución.
)

echo.
echo [2/3] Cargando base de datos...

:: Construir el comando de contraseña
set "MYSQL_AUTH=-u %MYSQL_USER%"
if defined MYSQL_PASS (
    set "MYSQL_AUTH=%MYSQL_AUTH% -p%MYSQL_PASS%"
) else (
    set "MYSQL_AUTH=%MYSQL_AUTH% --skip-password"
)

"%MYSQL_CLIENT%" -h 127.0.0.1 -P 3306 %MYSQL_AUTH% < "backend\db\schema.sql"
if errorlevel 1 (
    echo Ocurrio un error al aplicar schema.sql
    pause
    exit /b
)
echo Base de datos lista.

echo.
echo [3/3] Iniciando servidor PHP...

start "" cmd /k "cd /d "%~dp0" && %PHP_CMD% -S localhost:8000 -t ."

echo.
echo ==========================================
echo Servidor iniciado en: http://localhost:8000
echo ==========================================
pause