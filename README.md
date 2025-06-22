# App Analyzer - Dashboard Executivo

Um sistema completo de análise de aplicativos móveis com IA para insights executivos e geração automática de backlog.

## 🚀 Funcionalidades

### Dashboard Executivo
- **Visão Geral Completa**: Métricas principais, avaliação média, sentimentos e issues críticas
- **Análise de Sentimentos**: Distribuição detalhada de sentimentos com insights de IA
- **Gestão de Issues**: Backlog automático gerado pela IA baseado em feedback negativo
- **Tendências**: Evolução das avaliações ao longo do tempo

### Inteligência Artificial
- **Análise Abrangente**: Análise SWOT automática com insights executivos
- **Sentimentos Avançados**: Análise de emoções, palavras-chave e categorização
- **Backlog Inteligente**: Geração automática de user stories e critérios de aceitação
- **Issues GitHub**: Formatação automática para criação de issues no GitHub

### Integração
- **API de Análise**: Integração com API externa para dados de aplicativos
- **Google Gemini**: IA avançada para análise e insights
- **GitHub Integration**: Geração automática de issues formatadas

## 🛠️ Tecnologias

### Frontend
- **React 18** com Vite
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes
- **Recharts** para visualizações
- **Lucide React** para ícones

### Backend
- **Flask** com Python
- **Google Generative AI** (Gemini)
- **SQLAlchemy** para banco de dados
- **Flask-CORS** para integração frontend/backend

## 📦 Instalação e Uso

### Frontend
```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

### Backend
```bash
# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Executar servidor
python src/main.py
```

## 🔧 Configuração

### Variáveis de Ambiente
- `GEMINI_API_KEY`: Chave da API do Google Gemini
- `ANALYSIS_API_URL`: URL da API de análise de aplicativos

### APIs Utilizadas
- **Google Gemini**: Para análise de IA e geração de insights
- **Manus Analysis API**: Para dados de aplicativos da Google Play Store

## 📊 Como Usar

1. **Acesse o Dashboard**: Abra a aplicação no navegador
2. **Digite o App ID**: Insira o ID do aplicativo (ex: com.itau.investimentos)
3. **Clique em Analisar**: O sistema irá buscar dados e gerar insights
4. **Explore as Abas**:
   - **Visão Geral**: Métricas principais e gráficos
   - **Sentimentos**: Análise detalhada de sentimentos
   - **Issues**: Backlog gerado automaticamente
   - **Tendências**: Evolução temporal das métricas

## 🎯 Funcionalidades Avançadas

### Análise Executiva com IA
- Resumo executivo automático
- Análise SWOT (Forças, Fraquezas, Oportunidades, Ameaças)
- Recomendações prioritárias
- Score de confiança da análise

### Geração de Backlog
- User stories automáticas
- Critérios de aceitação
- Priorização inteligente
- Estimativas de esforço
- Categorização por tipo (Bug, Feature, UX, Performance)

### Integração GitHub
- Issues formatadas automaticamente
- Labels inteligentes
- Descrições detalhadas
- Referências às avaliações originais

## 🚀 Deploy

### GitHub Pages
O projeto está configurado para deploy automático no GitHub Pages:

1. Push para a branch `main`
2. GitHub Actions irá fazer o build automaticamente
3. Deploy será feito na branch `gh-pages`

### Configuração Manual
```bash
# Build do projeto
pnpm run build

# Deploy para GitHub Pages
pnpm run deploy
```

## 📈 Métricas e Analytics

O dashboard fornece insights executivos incluindo:

- **KPIs Principais**: Avaliação média, volume de reviews, sentimento geral
- **Distribuição de Sentimentos**: Percentuais de feedback positivo, neutro e negativo
- **Severidade de Issues**: Classificação de problemas por prioridade
- **Tendências Temporais**: Evolução das métricas ao longo do tempo
- **Análise Competitiva**: Posicionamento no mercado e diferenciação

## 🤖 IA e Machine Learning

### Capacidades da IA
- **Processamento de Linguagem Natural**: Análise semântica de reviews
- **Classificação de Sentimentos**: Detecção de emoções e intenções
- **Extração de Insights**: Identificação automática de padrões
- **Geração de Conteúdo**: Criação de user stories e documentação

### Modelos Utilizados
- **Google Gemini Pro**: Para análise de texto e geração de insights
- **Análise Semântica**: Para categorização e priorização
- **Detecção de Padrões**: Para identificação de problemas recorrentes

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter pull requests.

## 📞 Suporte

Para suporte e dúvidas, abra uma issue no GitHub ou entre em contato através dos canais oficiais.

---

**Desenvolvido com ❤️ para análise inteligente de aplicativos móveis**

