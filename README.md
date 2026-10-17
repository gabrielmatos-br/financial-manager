# Financial Manager

Sistema de gestão de contas a receber.

## 💻 Como rodar localmente

### Pré-requisitos
- Node.js (v22.12.0+)
- Uma conta no [Neon](https://neon.tech) (ou outro PostgreSQL)

### 1. Instalação
```bash
git clone https://github.com/seu-usuario/financial-manager.git
cd financial-manager
npm install
```
*(O `npm install` já instala automaticamente as dependências do backend e frontend, além de criar o arquivo `server/.env`).*

### 2. Configurar o Banco
1. Copie a Connection String do seu banco no Neon.
2. Abra o arquivo `server/.env` e preencha:
```env
DATABASE_URL=sua-string-de-conexao-aqui
```
3. Vá no **SQL Editor** do Neon, cole e execute o conteúdo dos arquivos nesta ordem:
   - `server/src/sql/schema.sql` (cria as tabelas)
   - `server/src/sql/seed.sql` (popula os dados de teste)

### 3. Rodar
```bash
npm run dev
```
O projeto estará disponível em: **http://localhost:5173**

---

## 🌐 Como fazer o Deploy no Render

Crie um **Web Service** no Render apontando para o seu repositório e preencha as configurações assim:

- **Root Directory:** `server`
- **Build Command:** 
```bash
cd .. && npm install && npm run build --prefix web
```
- **Start Command:** 
```bash
node src/server.ts
```
- **Environment Variables:**
  - `DATABASE_URL`: *Sua string de conexão do Neon.*
  - `NODE_VERSION`: `22.12.0` *(Obrigatório para o Vite funcionar).*