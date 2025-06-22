import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/ui/sidebar'; // Import a nova Sidebar
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  Search, TrendingUp, Star, MessageSquare,
  AlertTriangle, Smartphone,
  BarChart3, PieChart as PieChartIcon, Activity
} from 'lucide-react';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']; // Pode ser removido ou movido se não for mais usado globalmente

function Dashboard() {
  const [appId, setAppId] = useState('com.itau.investimentos');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  // const [analysisData, setAnalysisData] = useState(null); // Removido se não estiver sendo usado
  const [activeView, setActiveView] = useState('overview'); // Estado para controlar a view ativa

  const fetchDashboardData = async (id) => {
    setLoading(true);
    try {
      const mockData = {
        app_info: {
          title: 'Íon Itaú: investir com taxa 0',
          score: 4.675646,
          version: '2.80.0',
          installs: '1M+',
          category: 'Finanças'
        },
        metrics: {
          total_reviews: 1247,
          average_rating: 4.68,
          sentiment_distribution: {
            positivo: 65,
            neutro: 25,
            negativo: 10
          },
          severity_distribution: {
            Alta: 5,
            Média: 15,
            Baixa: 80
          }
        },
        trends: {
          rating_trend: [4.2, 4.3, 4.1, 4.5, 4.7],
          review_volume: [120, 135, 98, 156, 142]
        },
        recent_tasks: [
          {
            id: 1,
            title: '[Severidade: Média] Problema identificado: problema',
            severity: 'Média',
            user: 'Ricardo Dalessandro',
            review_text: 'Resolvi o problema do aplicativo. Se tivesse que esperar por uma solução se VCs estava é ferrado.'
          },
          {
            id: 2,
            title: '[Severidade: Baixa] Revisar feedback neutro',
            severity: 'Baixa',
            user: 'P. Modesto',
            review_text: 'ainda não sei como transferir para a conta da corretora pelo ion'
          }
        ]
      };
      setDashboardData(mockData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(appId);
  }, []);

  const handleAnalyze = () => {
    fetchDashboardData(appId);
  };

  const sentimentData = dashboardData ? [
    { name: 'Positivo', value: dashboardData.metrics.sentiment_distribution.positivo, color: '#00C49F' },
    { name: 'Neutro', value: dashboardData.metrics.sentiment_distribution.neutro, color: '#FFBB28' },
    { name: 'Negativo', value: dashboardData.metrics.sentiment_distribution.negativo, color: '#FF8042' }
  ] : [];

  const severityData = dashboardData ? [
    { name: 'Alta', value: dashboardData.metrics.severity_distribution.Alta, color: '#FF8042' },
    { name: 'Média', value: dashboardData.metrics.severity_distribution.Média, color: '#FFBB28' },
    { name: 'Baixa', value: dashboardData.metrics.severity_distribution.Baixa, color: '#00C49F' }
  ] : [];

  const trendData = dashboardData ? dashboardData.trends.rating_trend.map((rating, index) => ({
    month: `Mês ${index + 1}`,
    rating: rating,
    reviews: dashboardData.trends.review_volume[index]
  })) : [];

  const renderContent = () => {
    if (!dashboardData) return null;

    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* App Info Cards - KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white shadow-lg rounded-xl border border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Avaliação Média</CardTitle>
                  <Star className="h-5 w-5 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">{dashboardData.app_info.score.toFixed(2)}</div>
                  <p className="text-xs text-slate-500">
                    {dashboardData.metrics.total_reviews} avaliações
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg rounded-xl border border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Sentimento Positivo</CardTitle>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">{dashboardData.metrics.sentiment_distribution.positivo}%</div>
                  <p className="text-xs text-slate-500">
                    Avaliações positivas
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg rounded-xl border border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Issues Críticas</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">{dashboardData.metrics.severity_distribution.Alta}</div>
                  <p className="text-xs text-slate-500">
                    Problemas de alta prioridade
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg rounded-xl border border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Versão Atual</CardTitle>
                  <Smartphone className="h-5 w-5 text-sky-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">{dashboardData.app_info.version}</div>
                  <p className="text-xs text-slate-500">
                    {dashboardData.app_info.installs} instalações
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg rounded-xl border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-700">
                    <PieChartIcon className="w-5 h-5 text-blue-500" />
                    Distribuição de Sentimentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg rounded-xl border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-700">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Severidade dos Problemas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={severityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {severityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg rounded-xl border border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  Issues Recentes
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Problemas identificados automaticamente pela IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recent_tasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-100/70 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={task.severity === 'Alta' ? 'destructive' : task.severity === 'Média' ? 'default' : 'secondary'}
                            className={task.severity === 'Média' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                          >
                            {task.severity}
                          </Badge>
                          <span className="text-sm text-slate-500">por {task.user}</span>
                        </div>
                        <p className="text-sm text-slate-700 mb-1">{task.review_text}</p>
                        <p className="text-xs text-slate-500">{task.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'sentiment':
        return (
          <Card className="shadow-lg rounded-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-700">Análise Detalhada de Sentimentos</CardTitle>
              <CardDescription className="text-slate-500">
                Análise baseada em IA das avaliações dos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600">
                      {dashboardData.metrics.sentiment_distribution.positivo}%
                    </div>
                    <div className="text-sm text-green-700 mt-1">Positivo</div>
                    <Progress value={dashboardData.metrics.sentiment_distribution.positivo} className="mt-3 h-2 [&>div]:bg-green-500" />
                  </div>
                  <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl font-bold text-yellow-600">
                      {dashboardData.metrics.sentiment_distribution.neutro}%
                    </div>
                    <div className="text-sm text-yellow-700 mt-1">Neutro</div>
                    <Progress value={dashboardData.metrics.sentiment_distribution.neutro} className="mt-3 h-2 [&>div]:bg-yellow-500" />
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-3xl font-bold text-red-600">
                      {dashboardData.metrics.sentiment_distribution.negativo}%
                    </div>
                    <div className="text-sm text-red-700 mt-1">Negativo</div>
                    <Progress value={dashboardData.metrics.sentiment_distribution.negativo} className="mt-3 h-2 [&>div]:bg-red-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'issues':
        return (
          <Card className="shadow-lg rounded-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-700">Gestão de Issues</CardTitle>
              <CardDescription className="text-slate-500">
                Backlog automático gerado pela IA baseado em feedback negativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recent_tasks.map((task) => (
                  <div key={task.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-100/70 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={task.severity === 'Alta' ? 'destructive' : task.severity === 'Média' ? 'default' : 'secondary'}
                        className={task.severity === 'Média' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                      >
                        {task.severity}
                      </Badge>
                      <Button size="sm" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                        Criar Issue no GitHub
                      </Button>
                    </div>
                    <h4 className="font-semibold text-slate-700 mb-1">{task.title}</h4>
                    <p className="text-sm text-slate-600 mb-1">
                      <strong>Usuário:</strong> {task.user}
                    </p>
                    <p className="text-sm text-slate-700">
                      <strong>Feedback:</strong> "{task.review_text}"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'trends':
        return (
          <Card className="shadow-lg rounded-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <Activity className="w-5 h-5 text-blue-500" />
                Tendências de Avaliação
              </CardTitle>
              <CardDescription className="text-slate-500">
                Evolução das avaliações ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', borderColor: '#e2e8f0' }}
                    labelStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="rating" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRating)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      default:
        return <div>Selecione uma visão</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
        {/* Header da Área de Conteúdo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1).replace('-', ' ')}
            </h1>
            <p className="text-slate-500 text-sm">
              {activeView === 'overview' ? 'Visão geral e métricas chave do aplicativo.' :
               activeView === 'sentiment' ? 'Análise detalhada dos sentimentos dos usuários.' :
               activeView === 'issues' ? 'Backlog de problemas e feedback para ação.' :
               'Evolução das métricas e performance ao longo do tempo.'
              }
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Input
              placeholder="ID do app (ex: com.itau.investimentos)"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className="w-72 text-sm border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <Button onClick={handleAnalyze} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analisando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Analisar
                </div>
              )}
            </Button>
          </div>
        </div>

        {loading && <div className="flex justify-center items-center h-64"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /> <p className="ml-3 text-slate-600">Carregando dados...</p></div>}
        {!loading && renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;

