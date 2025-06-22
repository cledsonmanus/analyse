from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import requests
import json
from datetime import datetime
import os
from src.services.ai_service import AIAnalysisService

analyzer_bp = Blueprint('analyzer', __name__)

# Configuração da API do Gemini
GEMINI_API_KEY = 'AIzaSyA_dmMQb9pOglYE-O5325CdIqmoCloVSLI'
ai_service = AIAnalysisService(GEMINI_API_KEY)

# URL da API de análise
ANALYSIS_API_URL = 'https://y0h0i3cyljom.manus.space/analyze'

@analyzer_bp.route('/analyze-app', methods=['POST'])
@cross_origin()
def analyze_app():
    """Analisa um aplicativo usando a API externa e IA avançada"""
    try:
        data = request.get_json()
        app_id = data.get('appId')
        
        if not app_id:
            return jsonify({'error': 'appId é obrigatório'}), 400
        
        # Chama a API externa
        response = requests.post(ANALYSIS_API_URL, 
                               json={'appId': app_id},
                               headers={'Content-Type': 'application/json'})
        
        if response.status_code != 200:
            return jsonify({'error': 'Erro ao chamar API de análise'}), 500
        
        analysis_data = response.json()
        
        # Processa os dados com IA avançada
        enhanced_analysis = ai_service.analyze_app_comprehensive(analysis_data)
        analysis_data['ai_insights'] = enhanced_analysis
        
        return jsonify(analysis_data)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@analyzer_bp.route('/sentiment-analysis', methods=['POST'])
@cross_origin()
def sentiment_analysis():
    """Análise avançada de sentimentos usando IA"""
    try:
        data = request.get_json()
        reviews = data.get('reviews', [])
        
        if not reviews:
            return jsonify({'error': 'Reviews são obrigatórios'}), 400
        
        # Análise avançada de sentimentos com IA
        sentiment_results = ai_service.analyze_sentiment_advanced(reviews)
        
        return jsonify(sentiment_results)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@analyzer_bp.route('/generate-backlog', methods=['POST'])
@cross_origin()
def generate_backlog():
    """Gera backlog inteligente baseado em avaliações negativas"""
    try:
        data = request.get_json()
        negative_reviews = data.get('negativeReviews', [])
        app_context = data.get('appContext', {})
        
        if not negative_reviews:
            return jsonify({'error': 'Avaliações negativas são obrigatórias'}), 400
        
        # Gera backlog inteligente com IA
        backlog_items = ai_service.generate_smart_backlog(negative_reviews, app_context)
        
        return jsonify({'backlog': backlog_items})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@analyzer_bp.route('/generate-github-issues', methods=['POST'])
@cross_origin()
def generate_github_issues():
    """Gera issues formatadas para GitHub"""
    try:
        data = request.get_json()
        backlog_items = data.get('backlogItems', [])
        
        if not backlog_items:
            return jsonify({'error': 'Itens de backlog são obrigatórios'}), 400
        
        # Gera issues formatadas para GitHub
        github_issues = ai_service.generate_github_issues(backlog_items)
        
        return jsonify({'issues': github_issues})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@analyzer_bp.route('/dashboard-data/<app_id>', methods=['GET'])
@cross_origin()
def get_dashboard_data(app_id):
    """Retorna dados formatados para o dashboard"""
    try:
        # Chama a API de análise
        response = requests.post(ANALYSIS_API_URL, 
                               json={'appId': app_id},
                               headers={'Content-Type': 'application/json'})
        
        if response.status_code != 200:
            return jsonify({'error': 'Erro ao obter dados do app'}), 500
        
        analysis_data = response.json()
        
        # Processa dados para dashboard
        dashboard_data = process_dashboard_data(analysis_data)
        
        return jsonify(dashboard_data)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def process_dashboard_data(analysis_data):
    """Processa dados para o dashboard executivo"""
    try:
        app_info = analysis_data.get('app', {})
        reviews = analysis_data.get('reviews', [])
        tasks = analysis_data.get('tasks', [])
        
        # Calcula métricas
        total_reviews = len(reviews)
        avg_rating = app_info.get('score', 0)
        
        # Distribui sentimentos
        sentiment_distribution = {
            'positivo': 0,
            'neutro': 0,
            'negativo': 0
        }
        
        severity_distribution = {
            'Alta': 0,
            'Média': 0,
            'Baixa': 0
        }
        
        for task in tasks:
            severity = task.get('severity', 'Baixa')
            if severity in severity_distribution:
                severity_distribution[severity] += 1
        
        # Tendências temporais (simulado)
        trends = {
            'rating_trend': [4.2, 4.3, 4.1, 4.5, 4.7],
            'review_volume': [120, 135, 98, 156, 142]
        }
        
        return {
            'app_info': app_info,
            'metrics': {
                'total_reviews': total_reviews,
                'average_rating': avg_rating,
                'sentiment_distribution': sentiment_distribution,
                'severity_distribution': severity_distribution
            },
            'trends': trends,
            'recent_tasks': tasks[:10],  # Últimas 10 tarefas
            'generated_at': datetime.now().isoformat()
        }
        
    except Exception as e:
        print(f"Erro no processamento de dados: {e}")
        return {}

