# App Analyzer Backend

Backend Flask para o sistema de análise de aplicativos móveis.

## Funcionalidades

- Integração com API de análise de aplicativos
- Análise de sentimentos com Google Gemini
- Geração automática de backlog
- Criação de issues formatadas para GitHub

## Instalação

```bash
# Criar ambiente virtual
python -m venv venv
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar servidor
python src/main.py
```

## Configuração

Configure as seguintes variáveis de ambiente:
- `GEMINI_API_KEY`: Chave da API do Google Gemini
- `ANALYSIS_API_URL`: URL da API de análise

## Endpoints

- `POST /api/analyze-app`: Analisa um aplicativo
- `POST /api/sentiment-analysis`: Análise de sentimentos
- `POST /api/generate-backlog`: Gera backlog automático
- `POST /api/generate-github-issues`: Gera issues para GitHub
- `GET /api/dashboard-data/<app_id>`: Dados para dashboard

