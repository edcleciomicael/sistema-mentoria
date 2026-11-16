@echo off
chcp 65001 >nul
title Marquez Adviser - Servidor Local (localhost:3000)

echo ========================================================
echo   MARQUEZ ADVISER - AMBIENTE DE DESENVOLVIMENTO LOCAL
echo ========================================================
echo.

REM Verifica se o Node.js esta instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Baixe e instale o Node.js LTS em: https://nodejs.org/
    pause
    exit /b 1
)

REM Instala as dependencias se a pasta node_modules nao existir
if not exist "node_modules\" (
    echo [1/2] Instalando dependencias do projeto...
    call npm install --legacy-peer-deps
    echo.
)

echo [2/2] Iniciando servidor local em http://localhost:3000 ...
echo Pressione CTRL+C para encerrar o servidor quando desejar.
echo.

start http://localhost:3000
call npm run dev
pause
