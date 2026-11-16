@echo off
chcp 65001 >nul
title Marquez Adviser - Criar Diretorio Publico & Build

echo ========================================================
echo   MARQUEZ ADVISER - GERADOR DE DIRETORIO PUBLICO
echo ========================================================
echo.

REM 1. Cria pasta publica limpa na maquina local (../marquez-adviser-publico)
set PUBLIC_DIR=..\marquez-adviser-publico

echo [1/3] Criando novo diretorio publico em: %PUBLIC_DIR% ...
if not exist "%PUBLIC_DIR%" mkdir "%PUBLIC_DIR%"

REM 2. Copia arquivos do projeto (exceto node_modules e .git antigo)
echo [2/3] Copiando arquivos do projeto para o novo diretorio...
robocopy . "%PUBLIC_DIR%" /E /XD node_modules dist .git /XF .env >nul

REM 3. Gera tambem o build pronto de producao (dist)
echo [3/3] Compilando versao publica de producao (pasta dist)...
call npm install --legacy-peer-deps
call npm run build

if exist "dist\" (
    if not exist "%PUBLIC_DIR%\dist" mkdir "%PUBLIC_DIR%\dist"
    robocopy dist "%PUBLIC_DIR%\dist" /E >nul
)

echo.
echo ========================================================
echo   CONCLUIDO COM SUCESSO!
echo ========================================================
echo   - Novo diretorio criado em: %PUBLIC_DIR%
echo   - Arquivos prontos para servidor publico em: %PUBLIC_DIR%\dist
echo.
pause
