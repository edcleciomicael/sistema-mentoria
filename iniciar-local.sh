#!/usr/bin/env bash
set -e

echo "========================================================"
echo "  MARQUEZ ADVISER - AMBIENTE DE DESENVOLVIMENTO LOCAL"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null; then
  echo "[ERRO] Node.js não encontrado! Instale em: https://nodejs.org/"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "[1/2] Instalando dependências do projeto..."
  npm install --legacy-peer-deps
  echo ""
fi

echo "[2/2] Iniciando servidor local em http://localhost:3000 ..."
npm run dev
