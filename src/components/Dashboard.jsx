import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  Search, TrendingUp, TrendingDown, Star, MessageSquare, 
  AlertTriangle, CheckCircle, Clock, Users, Smartphone,
  BarChart3, PieChart as PieChartIcon, Activity, Zap
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function Dashboard() {
  const [appId, setAppId] = useState('com.itau.investimentos');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const fetchDashboardData = async (id) => {
    setLoading(true);
    try {
      // Simular dados para demonstração
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              App Analyzer Dashboard
            </h1>
            <p className="text-slate-600">
              Análise inteligente de aplicativos com IA para insights executivos
            </p>
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="ID do aplicativo (ex: com.itau.investimentos)"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className="w-80"
            />
            <Button onClick={handleAnalyze} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
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

        {dashboardData && (
          <>
            {/* App Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                  <Star className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.app_info.score.toFixed(2)}</div>
                  <p className="text-xs opacity-80">
                    {dashboardData.metrics.total_reviews} avaliações
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sentimento Positivo</CardTitle>
                  <TrendingUp className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.metrics.sentiment_distribution.positivo}%</div>
                  <p className="text-xs opacity-80">
                    Avaliações positivas
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Issues Críticas</CardTitle>
                  <AlertTriangle className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.metrics.severity_distribution.Alta}</div>
                  <p className="text-xs opacity-80">
                    Problemas de alta prioridade
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Versão Atual</CardTitle>
                  <Smartphone className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.app_info.version}</div>
                  <p className="text-xs opacity-80">
                    {dashboardData.app_info.installs} instalações
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="sentiment">Sentimentos</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="trends">Tendências</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5" />
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
                            outerRadius={80}
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

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
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

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Issues Recentes
                    </CardTitle>
                    <CardDescription>
                      Problemas identificados automaticamente pela IA
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recent_tasks.map((task) => (
                        <div key={task.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={task.severity === 'Alta' ? 'destructive' : task.severity === 'Média' ? 'default' : 'secondary'}>
                                {task.severity}
                              </Badge>
                              <span className="text-sm text-slate-600">por {task.user}</span>
                            </div>
                            <p className="text-sm text-slate-800 mb-2">{task.review_text}</p>
                            <p className="text-xs text-slate-500">{task.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sentiment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise Detalhada de Sentimentos</CardTitle>
                    <CardDescription>
                      Análise baseada em IA das avaliações dos usuários
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {dashboardData.metrics.sentiment_distribution.positivo}%
                          </div>
                          <div className="text-sm text-green-700">Positivo</div>
                          <Progress value={dashboardData.metrics.sentiment_distribution.positivo} className="mt-2" />
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {dashboardData.metrics.sentiment_distribution.neutro}%
                          </div>
                          <div className="text-sm text-yellow-700">Neutro</div>
                          <Progress value={dashboardData.metrics.sentiment_distribution.neutro} className="mt-2" />
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {dashboardData.metrics.sentiment_distribution.negativo}%
                          </div>
                          <div className="text-sm text-red-700">Negativo</div>
                          <Progress value={dashboardData.metrics.sentiment_distribution.negativo} className="mt-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="issues" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestão de Issues</CardTitle>
                    <CardDescription>
                      Backlog automático gerado pela IA baseado em feedback negativo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recent_tasks.map((task) => (
                        <div key={task.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={task.severity === 'Alta' ? 'destructive' : task.severity === 'Média' ? 'default' : 'secondary'}>
                              {task.severity}
                            </Badge>
                            <Button size="sm" variant="outline">
                              Criar Issue no GitHub
                            </Button>
                          </div>
                          <h4 className="font-medium mb-2">{task.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">
                            <strong>Usuário:</strong> {task.user}
                          </p>
                          <p className="text-sm text-slate-800">
                            <strong>Feedback:</strong> "{task.review_text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Tendências de Avaliação
                    </CardTitle>
                    <CardDescription>
                      Evolução das avaliações ao longo do tempo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="rating" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

