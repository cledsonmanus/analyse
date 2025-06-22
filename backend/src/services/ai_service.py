import google.generativeai as genai
import json
import requests
from datetime import datetime
import re
from typing import List, Dict, Any

class AIAnalysisService:
    def __init__(self, api_key: str):
        self.api_key = api_key
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def analyze_app_comprehensive(self, app_data: Dict[str, Any]) -> Dict[str, Any]:
        """Análise abrangente do aplicativo usando IA"""
        try:
            app_info = app_data.get('app', {})
            reviews = app_data.get('reviews', [])
            tasks = app_data.get('tasks', [])
            
            # Prepara dados para análise
            reviews_text = "\n".join([f"- {review.get('text', '')}" for review in reviews[:20]])  # Primeiras 20 reviews
            
            prompt = f"""
            Como especialista em análise de aplicativos móveis, analise os seguintes dados:
            
            INFORMAÇÕES DO APP:
            - Nome: {app_info.get('title', 'N/A')}
            - Avaliação: {app_info.get('score', 'N/A')}
            - Versão: {app_info.get('version', 'N/A')}
            - Categoria: {app_info.get('category', 'N/A')}
            
            AMOSTRA DE AVALIAÇÕES:
            {reviews_text}
            
            TAREFAS IDENTIFICADAS:
            {json.dumps(tasks[:10], indent=2)}
            
            Forneça uma análise executiva detalhada em formato JSON com:
            {{
                "executive_summary": "Resumo executivo em 2-3 frases",
                "strengths": ["força 1", "força 2", "força 3"],
                "weaknesses": ["fraqueza 1", "fraqueza 2", "fraqueza 3"],
                "opportunities": ["oportunidade 1", "oportunidade 2"],
                "threats": ["ameaça 1", "ameaça 2"],
                "priority_actions": [
                    {{"action": "ação", "priority": "Alta|Média|Baixa", "impact": "descrição do impacto"}}
                ],
                "sentiment_insights": {{
                    "overall_sentiment": "positivo|neutro|negativo",
                    "key_themes": ["tema 1", "tema 2"],
                    "user_pain_points": ["dor 1", "dor 2"]
                }},
                "competitive_analysis": {{
                    "market_position": "descrição",
                    "differentiation": "pontos de diferenciação"
                }},
                "recommendations": [
                    {{"category": "UX|Performance|Features|Marketing", "recommendation": "recomendação detalhada"}}
                ]
            }}
            """
            
            response = self.model.generate_content(prompt)
            
            # Tenta extrair JSON da resposta
            json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
            if json_match:
                try:
                    analysis = json.loads(json_match.group())
                    analysis['generated_at'] = datetime.now().isoformat()
                    analysis['confidence_score'] = self._calculate_confidence(app_data)
                    return analysis
                except json.JSONDecodeError:
                    pass
            
            # Fallback se não conseguir parsear JSON
            return self._create_fallback_analysis(app_data)
            
        except Exception as e:
            print(f"Erro na análise abrangente: {e}")
            return self._create_fallback_analysis(app_data)
    
    def generate_smart_backlog(self, negative_reviews: List[str], app_context: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Gera backlog inteligente baseado em reviews negativas"""
        try:
            reviews_text = "\n".join([f"- {review}" for review in negative_reviews[:15]])
            app_name = app_context.get('title', 'Aplicativo')
            
            prompt = f"""
            Como Product Manager experiente, analise as seguintes avaliações negativas do app "{app_name}" e gere um backlog de desenvolvimento estruturado:
            
            AVALIAÇÕES NEGATIVAS:
            {reviews_text}
            
            Gere um backlog em formato JSON com itens priorizados:
            [
                {{
                    "id": "TASK-001",
                    "title": "Título claro e objetivo",
                    "description": "Descrição detalhada do problema e solução proposta",
                    "priority": "Alta|Média|Baixa",
                    "category": "Bug|Feature|UX|Performance|Security",
                    "effort_estimate": "1-5 (story points)",
                    "business_impact": "Alto|Médio|Baixo",
                    "user_stories": ["Como usuário, eu quero...", "Para que eu possa..."],
                    "acceptance_criteria": ["Critério 1", "Critério 2"],
                    "related_reviews": ["review que originou o item"],
                    "technical_notes": "Notas técnicas para implementação"
                }}
            ]
            
            Foque em:
            1. Problemas mais mencionados
            2. Impacto na experiência do usuário
            3. Viabilidade técnica
            4. ROI potencial
            """
            
            response = self.model.generate_content(prompt)
            
            # Tenta extrair JSON da resposta
            json_match = re.search(r'\[.*\]', response.text, re.DOTALL)
            if json_match:
                try:
                    backlog = json.loads(json_match.group())
                    return backlog
                except json.JSONDecodeError:
                    pass
            
            # Fallback
            return self._create_fallback_backlog(negative_reviews)
            
        except Exception as e:
            print(f"Erro na geração de backlog: {e}")
            return self._create_fallback_backlog(negative_reviews)
    
    def analyze_sentiment_advanced(self, reviews: List[str]) -> Dict[str, Any]:
        """Análise avançada de sentimentos com insights detalhados"""
        try:
            # Analisa em lotes para melhor performance
            batch_size = 10
            results = []
            
            for i in range(0, len(reviews), batch_size):
                batch = reviews[i:i+batch_size]
                batch_text = "\n".join([f"{j+1}. {review}" for j, review in enumerate(batch)])
                
                prompt = f"""
                Analise o sentimento das seguintes avaliações de app:
                
                {batch_text}
                
                Para cada avaliação, retorne JSON:
                [
                    {{
                        "index": 1,
                        "sentiment": "positivo|neutro|negativo",
                        "confidence": 0.0-1.0,
                        "emotions": ["alegria", "frustração", "satisfação"],
                        "keywords": ["palavra-chave1", "palavra-chave2"],
                        "category": "usabilidade|performance|features|suporte|bugs",
                        "urgency": "alta|média|baixa",
                        "actionable": true/false
                    }}
                ]
                """
                
                response = self.model.generate_content(prompt)
                
                # Tenta extrair JSON da resposta
                json_match = re.search(r'\[.*\]', response.text, re.DOTALL)
                if json_match:
                    try:
                        batch_results = json.loads(json_match.group())
                        results.extend(batch_results)
                    except json.JSONDecodeError:
                        # Fallback para este lote
                        for j, review in enumerate(batch):
                            results.append({
                                "index": i + j + 1,
                                "sentiment": "neutro",
                                "confidence": 0.5,
                                "emotions": [],
                                "keywords": [],
                                "category": "geral",
                                "urgency": "baixa",
                                "actionable": False
                            })
            
            # Calcula estatísticas agregadas
            total_reviews = len(results)
            positive = sum(1 for r in results if r.get('sentiment') == 'positivo')
            negative = sum(1 for r in results if r.get('sentiment') == 'negativo')
            neutral = total_reviews - positive - negative
            
            # Identifica temas principais
            all_keywords = []
            for result in results:
                all_keywords.extend(result.get('keywords', []))
            
            keyword_freq = {}
            for keyword in all_keywords:
                keyword_freq[keyword] = keyword_freq.get(keyword, 0) + 1
            
            top_keywords = sorted(keyword_freq.items(), key=lambda x: x[1], reverse=True)[:10]
            
            return {
                "summary": {
                    "total_reviews": total_reviews,
                    "positive_percentage": round((positive / total_reviews) * 100, 1) if total_reviews > 0 else 0,
                    "negative_percentage": round((negative / total_reviews) * 100, 1) if total_reviews > 0 else 0,
                    "neutral_percentage": round((neutral / total_reviews) * 100, 1) if total_reviews > 0 else 0
                },
                "detailed_results": results,
                "insights": {
                    "top_keywords": [{"keyword": k, "frequency": v} for k, v in top_keywords],
                    "urgent_issues": [r for r in results if r.get('urgency') == 'alta'],
                    "actionable_feedback": [r for r in results if r.get('actionable', False)]
                },
                "generated_at": datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Erro na análise de sentimentos: {e}")
            return {
                "summary": {"total_reviews": 0, "positive_percentage": 0, "negative_percentage": 0, "neutral_percentage": 0},
                "detailed_results": [],
                "insights": {"top_keywords": [], "urgent_issues": [], "actionable_feedback": []},
                "generated_at": datetime.now().isoformat()
            }
    
    def generate_github_issues(self, backlog_items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Gera issues formatadas para GitHub"""
        github_issues = []
        
        for item in backlog_items:
            issue = {
                "title": f"[{item.get('priority', 'Média')}] {item.get('title', 'Issue sem título')}",
                "body": self._format_github_issue_body(item),
                "labels": self._generate_github_labels(item),
                "assignees": [],
                "milestone": None
            }
            github_issues.append(issue)
        
        return github_issues
    
    def _format_github_issue_body(self, item: Dict[str, Any]) -> str:
        """Formata o corpo da issue para GitHub"""
        body = f"""## Descrição
{item.get('description', 'Sem descrição')}

## Prioridade
{item.get('priority', 'Média')}

## Categoria
{item.get('category', 'Geral')}

## Estimativa de Esforço
{item.get('effort_estimate', 'N/A')} story points

## Impacto no Negócio
{item.get('business_impact', 'Médio')}

## User Stories
"""
        
        for story in item.get('user_stories', []):
            body += f"- {story}\n"
        
        body += "\n## Critérios de Aceitação\n"
        for criteria in item.get('acceptance_criteria', []):
            body += f"- [ ] {criteria}\n"
        
        if item.get('technical_notes'):
            body += f"\n## Notas Técnicas\n{item.get('technical_notes')}\n"
        
        if item.get('related_reviews'):
            body += "\n## Reviews Relacionadas\n"
            for review in item.get('related_reviews', []):
                body += f"> {review}\n\n"
        
        return body
    
    def _generate_github_labels(self, item: Dict[str, Any]) -> List[str]:
        """Gera labels para a issue do GitHub"""
        labels = []
        
        # Label de prioridade
        priority = item.get('priority', 'Média').lower()
        if priority == 'alta':
            labels.append('priority:high')
        elif priority == 'média':
            labels.append('priority:medium')
        else:
            labels.append('priority:low')
        
        # Label de categoria
        category = item.get('category', 'geral').lower()
        category_map = {
            'bug': 'bug',
            'feature': 'enhancement',
            'ux': 'ux/ui',
            'performance': 'performance',
            'security': 'security'
        }
        labels.append(category_map.get(category, 'general'))
        
        # Label de impacto
        impact = item.get('business_impact', 'Médio').lower()
        if impact == 'alto':
            labels.append('impact:high')
        elif impact == 'médio':
            labels.append('impact:medium')
        else:
            labels.append('impact:low')
        
        return labels
    
    def _calculate_confidence(self, app_data: Dict[str, Any]) -> float:
        """Calcula score de confiança da análise"""
        score = 0.5  # Base score
        
        # Mais reviews = maior confiança
        review_count = len(app_data.get('reviews', []))
        if review_count > 100:
            score += 0.3
        elif review_count > 50:
            score += 0.2
        elif review_count > 10:
            score += 0.1
        
        # App com informações completas = maior confiança
        app_info = app_data.get('app', {})
        if app_info.get('score') and app_info.get('version'):
            score += 0.1
        
        # Tarefas identificadas = maior confiança
        if len(app_data.get('tasks', [])) > 0:
            score += 0.1
        
        return min(score, 1.0)
    
    def _create_fallback_analysis(self, app_data: Dict[str, Any]) -> Dict[str, Any]:
        """Cria análise de fallback quando a IA falha"""
        return {
            "executive_summary": "Análise automática do aplicativo baseada em dados disponíveis.",
            "strengths": ["Aplicativo ativo no mercado", "Base de usuários estabelecida"],
            "weaknesses": ["Necessita análise mais detalhada"],
            "opportunities": ["Melhoria baseada em feedback dos usuários"],
            "threats": ["Competição no mercado"],
            "priority_actions": [
                {"action": "Analisar feedback dos usuários", "priority": "Alta", "impact": "Melhoria da experiência"}
            ],
            "sentiment_insights": {
                "overall_sentiment": "neutro",
                "key_themes": ["usabilidade", "performance"],
                "user_pain_points": ["Problemas técnicos reportados"]
            },
            "competitive_analysis": {
                "market_position": "Posição a ser determinada",
                "differentiation": "Características únicas a serem identificadas"
            },
            "recommendations": [
                {"category": "UX", "recommendation": "Revisar interface baseada no feedback"}
            ],
            "generated_at": datetime.now().isoformat(),
            "confidence_score": 0.3
        }
    
    def _create_fallback_backlog(self, negative_reviews: List[str]) -> List[Dict[str, Any]]:
        """Cria backlog de fallback"""
        return [
            {
                "id": "TASK-001",
                "title": "Investigar problemas reportados pelos usuários",
                "description": "Analisar e resolver problemas identificados nas avaliações negativas",
                "priority": "Alta",
                "category": "Bug",
                "effort_estimate": "3",
                "business_impact": "Alto",
                "user_stories": ["Como usuário, eu quero que os problemas sejam resolvidos"],
                "acceptance_criteria": ["Problemas identificados", "Soluções implementadas"],
                "related_reviews": negative_reviews[:3],
                "technical_notes": "Investigação técnica necessária"
            }
        ]

