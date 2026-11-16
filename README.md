# Marquez Adviser — Plataforma Executiva & Business Cockpit

Plataforma executiva de aceleração empresarial, diagnóstico 360°, programas de mentoria 1-on-1, agendamento de sessão estratégica, checkout integrado e Portal VIP do Aluno + Painel Administrativo.

---

## 💻 PARTE 1: Como Clonar e Rodar o Projeto Localmente no seu Computador

### Pré-requisitos
- **Node.js** (versão 18 ou 20 LTS recomendada) — [Baixar em nodejs.org](https://nodejs.org/)
- **Git** instalado na máquina — [Baixar em git-scm.com](https://git-scm.com/)

### Passo a Passo para Clonar na sua Máquina
Abra o **Terminal** (ou **Prompt de Comando / PowerShell / Git Bash** no Windows) na pasta onde deseja salvar o projeto (ex: `Documentos` ou `Área de Trabalho`) e execute:

```bash
# 1. Clonar o repositório para a sua máquina local
git clone https://github.com/edcleciomicael/projeto-marquez.git

# 2. Entrar na pasta do projeto
cd projeto-marquez

# 3. Instalar todas as dependências (o arquivo .npmrc já configura tudo automaticamente)
npm install

# 4. Iniciar o servidor local de desenvolvimento
npm run dev
```

Assim que rodar `npm run dev`, abra o navegador em:
👉 **`http://localhost:3000`**

> **Atalho Rápido no Windows:** Depois de clonar ou baixar a pasta, basta dar **duplo clique** no arquivo **`iniciar-local.bat`** na raiz do projeto. Ele instala as dependências automaticamente (se necessário) e já abre o navegador em `http://localhost:3000`.

---

## 🌍 PARTE 2: Como Criar um Novo Diretório Público para o Projeto

Você pode disponibilizar o projeto publicamente de **duas formas** (no GitHub em um novo repositório público e/ou em um novo diretório público na HostGator):

### Opção A: Criar um Novo Diretório / Repositório Público no GitHub (`marquez-adviser-publico`)

Se você quer manter o `projeto-marquez` original e criar um **novo diretório/repositório público separado**:

1. **Na sua máquina local**, dê duplo clique em **`publicar-diretorio-publico.bat`** (ou rode os comandos abaixo no terminal):
   ```bash
   # Cria uma cópia limpa em uma nova pasta chamada marquez-adviser-publico
   cd ..
   git clone https://github.com/edcleciomicael/projeto-marquez.git marquez-adviser-publico
   cd marquez-adviser-publico
   ```
2. Crie um novo repositório no GitHub em [github.com/new](https://github.com/new):
   - **Repository name:** `marquez-adviser-publico` (ou `marquez-adviser`)
   - **Visibilidade:** Marque **Public** (Público)
   - Clique em **Create repository**.
3. Conecte o novo diretório local ao repositório público recém-criado e envie os arquivos:
   ```bash
   git remote set-url origin https://github.com/edcleciomicael/marquez-adviser-publico.git
   git branch -M main
   git push -u origin main
   ```

---

### Opção B: Criar / Publicar em um Novo Diretório Público no Servidor (HostGator)

Atualmente o seu ambiente de testes roda em `preview.marquezadviser.com`. Para colocar o projeto em um **novo diretório público de produção** (por exemplo, no domínio principal `https://marquezadviser.com` ou em uma nova pasta pública):

#### 1. No cPanel da HostGator (`br1094.hostgator.com.br`)
1. Acesse **Domínios** no cPanel.
2. Verifique o diretório raiz (Document Root) do domínio público principal `marquezadviser.com` (geralmente é `public_html` ou `marquezadviser.com`).
3. Caso queira criar uma conta FTP dedicada para o diretório público:
   - Vá em **Contas de FTP** > Crie um usuário apontando para a pasta pública desejada (ex: `/public_html` ou `/marquezadviser.com`).

#### 2. Publicação Automática ou Manual para o Diretório Público
- **Via GitHub Actions (Automático):**
  - Se você adicionar nos Secrets do GitHub a variável opcional `HOSTGATOR_FTP_DIR_PUBLIC` (ou `HOSTGATOR_FTP_USERNAME_PUBLIC`), ao rodar o workflow selecionando **`production`**, ele enviará o build diretamente para o diretório público sem afetar o `preview.marquezadviser.com`.
- **Via Upload Direto do Build (`dist/`):**
  - No seu computador local, rode:
    ```bash
    npm run build
    ```
  - Isso criará a pasta **`dist/`** contendo todos os arquivos otimizados + o `.htaccess` configurado. Basta enviar o conteúdo de dentro da pasta `dist/` para o novo diretório público no Gerenciador de Arquivos do cPanel.

---

## 🔐 Credenciais de Demonstração (Acesso Local e Público)

- **Portal do Aluno VIP:**
  - **E-mail:** `carlos@techcorp.com.br` (ou clique em *"Acesso Rápido Demo (1-Click)"*)
- **Painel Administrativo (Gestão Executiva):**
  - **E-mail:** `admin@marquezadviser.com`
  - **Senha:** `admin123` (ou clique em *"Acesso Admin Demo (1-Click)"*)
- **Central de Documentação & Exportação PDF:**
  - Disponível no rodapé do site em **"Documentação & Manuais (PDF)"**.
