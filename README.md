# Phishing Demo - Frontend

Frontend para demonstração educativa de phishing (palestra de conscientização).

## Páginas

- `/` — Login (clone do Google)
- `/apos_login.html` — Página pós-login (CyberAware)
- `/logs` — Painel de capturas (admin)

## Deploy no Render

Este projeto está configurado para deploy automático no Render como Static Site.

### Via render.yaml (recomendado)

1. Conecte o repositório no Render
2. O `render.yaml` será detectado automaticamente
3. O build será: `npm install && npm run build`
4. A pasta `dist/` será servida como site estático

### Manual

- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

## Configuração

A URL da API do backend é definida em `render.yaml` como:
```
VITE_API_URL=https://phishing-backend.onrender.com/api
```

## Desenvolvimento local

```bash
npm install
npm run dev
```

Servidor em http://localhost:5173

## Build local

```bash
npm install
npm run build
```

Arquivos em `dist/`
