# Marquez Adviser - Documentação Técnica & Engenharia de Software
**Plataforma de Alta Performance & Aceleração Empresarial**  
**Versão:** 1.0.0 (Release de Produção)  
**Domínios:** `marquezadviser.com` | `preview.marquezadviser.com`  
**Data:** Outubro de 2026  

---

## 1. Visão Geral da Arquitetura

A plataforma **Marquez Adviser** é uma **Single Page Application (SPA)** corporativa de alta performance, desenvolvida com React 19, TypeScript e Vite 8. Toda a renderização acontece no lado do cliente com tempo de carregamento imediato, persistência de preferências de governança (tema escuro/claro, moeda e idioma) e desacoplamento modular de componentes.

### Camadas da Solução:
1. **Apresentação (Front-End SPA):**
   - React 19.0.1 com TypeScript 7.0.
   - Tailwind CSS v4 para estilização sem CSS obsoleto ou seletores lentos.
   - Lucide React para iconografia vetorial executiva.
   - Motion para animações táteis suaves de transição.
2. **Camada de Estado & Contexto (React Context API):**
   - `AppContext.tsx` gerencia estados globais de agendamentos (`bookings`), transações financeiras (`transactions`), leads e funil de e-mail marketing (`leads`), chat inteligente e autenticação com MFA.
3. **Servidor Web & Hospedagem (HostGator Linux Apache):**
   - Servidor Apache com cPanel 134.0.63.
   - Certificado SSL TLS com HTTPS forçado.
   - Módulo `mod_rewrite` com regras SPA no arquivo `.htaccess`.
4. **Integração & Entrega Contínua (CI/CD):**
   - GitHub Actions automatizado via SSH/FTPS no workflow `.github/workflows/deploy.yml`.

---

## 2. Especificação Técnica da Stack

| Componente | Tecnologia | Versão | Função / Responsabilidade |
| :--- | :--- | :--- | :--- |
| **Framework Base** | React | 19.0.1 | Renderização orientada a componentes modulares |
| **Linguagem** | TypeScript | 7.0.2 | Tipagem forte estática e eliminação de bugs em tempo de compilação |
| **Bundler & Build Tool**| Vite | 8.3.0 | Hot Module Reloading e compilação otimizada em bundle Rollup |
| **Engine de Estilos** | Tailwind CSS | 4.3.3 | Utilitários CSS, sistema de cores executivo e tema escuro |
| **Animações** | Motion | 12.23.24 | Feedback tátil e transições suaves de abertura de modais |
| **Ícones** | Lucide React | 0.546.0 | Conjunto de ícones vetoriais modernos |
| **Servidor de Produção**| Apache / Linux | cPanel 134 | Servidor compartilhado HostGator (br1094.hostgator.com.br) |

---

## 3. Infraestrutura & Servidor (HostGator cPanel)

- **Servidor Físico / Hostname:** `br1094.hostgator.com.br`
- **Endereço IP Dedicado:** `162.241.203.126`
- **Porta FTP:** `21` (com suporte a TLS explícito)
- **Nameservers:** `ns1094.hostgator.com.br` e `ns1095.hostgator.com.br`

### Estrutura de Diretórios no Servidor:
- **Produção Oficial:** `/home3/ingri024/marquezadviser.com/`
- **Homologação / Preview:** `/home3/ingri024/preview.marquezadviser.com/`

---

## 4. Roteamento Apache & Arquivo `.htaccess`

Para evitar erros 404 ao recarregar rotas ou subpáginas em uma Single Page Application, o arquivo `.htaccess` na raiz direciona todas as requisições não estáticas para o `index.html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Forçar conexão segura HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Manter arquivos e diretórios existentes
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Redirecionar todas as rotas para o entrypoint da SPA
  RewriteRule ^ index.html [L]
</IfModule>

# Compressão Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

---

## 5. Pipeline de CI/CD (GitHub Actions)

O pipeline em `.github/workflows/deploy.yml` orquestra o deploy contínuo:
1. Faz checkout do código fonte da branch selecionada.
2. Prepara o runtime Node.js 20.x.
3. Instala dependências de forma idempotente via `npm install --legacy-peer-deps`.
4. Executa o build de produção via `npm run build` gerando a pasta `dist/`.
5. Transfere os arquivos compilados via FTP para o servidor HostGator usando os segredos criptografados (`Secrets`).

---

## 6. Governança de Segredos (GitHub Secrets)

- `HOSTGATOR_FTP_SERVER`: Endereço estável do servidor (`br1094.hostgator.com.br`).
- `HOSTGATOR_FTP_USERNAME`: Conta de serviço de FTP (ex: `preview@marquezadviser.com`).
- `HOSTGATOR_FTP_PASSWORD`: Chave criptografada de acesso ao diretório do site.
