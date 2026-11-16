# Marquez Adviser - Plataforma Executiva

Projeto de aceleração empresarial, mentoria executiva 1-on-1, agendamento de consultas, sistema de pagamentos e portal VIP para alunos de Marquez Adviser.

---

## 🚀 Como subir este projeto para o seu GitHub Privado (`projeto-marquez`)

Como o ambiente do AI Studio não possui acesso direto às suas credenciais pessoais do GitHub ou cPanel da HostGator por motivos de segurança, siga estes passos simples para subir o repositório e ativar o deploy contínuo:

### 1. Criar o Repositório no GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Nome do repositório: `projeto-marquez`.
3. Marque a opção **Private** (Privado).
4. Não adicione README ou .gitignore (eles já estão prontos aqui).
5. Clique em **Create repository**.

### 2. Inicializar o Git e Enviar os Arquivos
No terminal da sua máquina com os arquivos do projeto:

```bash
git init
git add .
git commit -m "feat: lancamento oficial da plataforma Marquez Adviser"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/projeto-marquez.git
git push -u origin main
```

Para criar a branch de preview para homologação:
```bash
git checkout -b preview
git push -u origin preview
```

---

## 🌐 Configuração na HostGator (cPanel)

### 1. Configurar os Domínios no cPanel da HostGator
1. **Domínio Principal**: `www.marquezadviser.com`
   - O diretório raiz padrão no cPanel é: `public_html`
2. **Subdomínio de Preview**: `preview.marquezadviser.com`
   - No cPanel, vá em **Domínios** > **Subdomínios**.
   - Crie o subdomínio: `preview` para o domínio `marquezadviser.com`.
   - Raiz do documento (Document Root): `preview.marquezadviser.com` (ou `public_html/preview`).

### 2. Criar Conta de FTP no cPanel
1. No cPanel da HostGator, vá em **Contas de FTP** > **Adicionar Conta de FTP**.
2. **Login**: `deploy@marquezadviser.com`
3. **Senha**: Gere uma senha forte.
4. **Diretório**: Deixe como a raiz `/` da sua conta (para que o script acesse tanto o `public_html` quanto a pasta de `preview`).
5. **Cota**: Ilimitada.

### 3. Configurar os Secrets no Repositório do GitHub
No seu repositório no GitHub:
1. Vá em **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
2. Adicione as 3 variáveis:
   - `HOSTGATOR_FTP_SERVER`: Ex: `ftp.marquezadviser.com` (ou o IP do seu servidor HostGator).
   - `HOSTGATOR_FTP_USERNAME`: O usuário de FTP criado no cPanel (ex: `deploy@marquezadviser.com` ou o seu usuário do cPanel).
   - `HOSTGATOR_FTP_PASSWORD`: A senha configurada para o FTP.

---

## 🔄 Como funciona o Deploy Automatizado (GitHub Actions)

O arquivo `.github/workflows/deploy.yml` já está configurado:
- Qualquer `git push origin preview`: Faz o build e sobe automaticamente para a pasta do subdomínio **`preview.marquezadviser.com`**.
- Qualquer `git push origin main`: Faz o build e sobe automaticamente para o domínio oficial **`www.marquezadviser.com`** (`public_html`).
- Também é possível rodar o deploy manualmente pela aba **Actions** no GitHub escolhendo o ambiente de destino.

---

## ⚙️ Regras do Servidor Web (.htaccess para React SPA)
O arquivo `public/.htaccess` já foi criado com as regras de reescrita para garantir que todas as rotas do React funcionem perfeitamente no Apache da HostGator sem dar erro 404 ao recarregar a página.
