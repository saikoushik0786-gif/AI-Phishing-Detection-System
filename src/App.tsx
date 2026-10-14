import React, { useEffect, useState } from 'react';
import { AnalysisResult, DemoExample, MessageType, SessionStats } from './types';
import { Navbar, NavTab } from './components/Navbar';
import { OverviewSection } from './components/OverviewSection';
import { AnalysisForm } from './components/AnalysisForm';
import { ResultsPanel } from './components/ResultsPanel';
import { DemoExamplesSection } from './components/DemoExamplesSection';
import { MethodologySection } from './components/MethodologySection';
import { EvaluationSection } from './components/EvaluationSection';
import { AboutSection } from './components/AboutSection';
import { RecentHistoryDrawer } from './components/RecentHistoryDrawer';
import {
  AlertCircle,
  FileSearch,
  History,
  School,
  Shield,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefillExample, setPrefillExample] = useState<DemoExample | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [engineStatus, setEngineStatus] = useState<{
    hasGeminiKey: boolean;
    model: string;
  }>({
    hasGeminiKey: true,
    model: 'gemini-3.8-flash',
  });

  // Check backend server status
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === 'ok') {
          setEngineStatus({
            hasGeminiKey: !!data.hasGeminiKey,
            model: data.model || 'gemini-3.8-flash',
          });
        }
      })
      .catch((err) => {
        console.warn('Could not contact /api/status endpoint:', err);
      });
  }, []);

  // Compute live session stats from actual history
  const sessionStats: SessionStats = {
    totalAnalyzed: history.length,
    phishingCount: history.filter((r) => r.category === 'Phishing').length,
    suspiciousCount: history.filter((r) => r.category === 'Suspicious').length,
    legitimateCount: history.filter((r) => r.category === 'Likely Legitimate').length,
  };

  const handleAnalyze = async (payload: {
    messageType: MessageType;
    content: string;
    sender?: string;
    subject?: string;
    url?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error ${response.status}`);
      }

      const result: AnalysisResult = await response.json();
      setCurrentResult(result);
      setHistory((prev) => [result, ...prev]);
      setActiveTab('analyze');
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(
        err.message || 'An error occurred while evaluating the message. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDemoExample = (example: DemoExample) => {
    setPrefillExample(example);
    setCurrentResult(null);
    setError(null);
    setActiveTab('analyze');
  };

  const handleSelectAndImmediatelyAnalyze = async (example: DemoExample) => {
    setPrefillExample(example);
    setActiveTab('analyze');
    await handleAnalyze({
      messageType: example.messageType,
      content: example.content,
      sender: example.sender,
      subject: example.subject,
      url: example.url,
    });
  };

  const handleResetAnalysis = () => {
    setCurrentResult(null);
    setPrefillExample(null);
    setError(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setError(null);
        }}
        engineStatus={engineStatus}
      />

      {/* Academic Institutional Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
          <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
            <School className="w-3.5 h-3.5" />
            GMR Institute of Technology (GMRIT)
          </span>
          <span className="text-slate-500 hidden sm:inline">·</span>
          <span className="text-slate-300">
            Academic Term Paper Research Demo — Department of Computer Science & Cybersecurity
          </span>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Error Notification Banner */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-xs text-rose-800 shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="font-semibold text-rose-950">Analysis Notice: </strong>
              {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-500 hover:text-rose-700 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* View Routing */}
        {activeTab === 'overview' && (
          <OverviewSection
            stats={sessionStats}
            recentResults={history}
            onNavigateToAnalyze={() => setActiveTab('analyze')}
            onNavigateToDemoExamples={() => setActiveTab('examples')}
            onNavigateToMethodology={() => setActiveTab('methodology')}
            onSelectResult={(result) => {
              setCurrentResult(result);
              setActiveTab('analyze');
            }}
            onSelectDemoExample={handleSelectAndImmediatelyAnalyze}
          />
        )}

        {activeTab === 'analyze' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <FileSearch className="w-5 h-5 text-blue-600" />
                  Message Analysis Workbench
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Inspect email or text message syntax, extracted URLs, and semantic patterns
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <History className="w-3.5 h-3.5 text-slate-500" />
                  <span>Session History ({history.length})</span>
                </button>
              </div>
            </div>

            {/* Split or conditional layout: form and results */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Workbench */}
              <div
                className={`${
                  currentResult ? 'lg:col-span-5' : 'lg:col-span-12 max-w-4xl mx-auto w-full'
                } p-6 bg-white border border-slate-200 rounded-xl shadow-xs transition-all`}
              >
                <AnalysisForm
                  onAnalyze={handleAnalyze}
                  isLoading={isLoading}
                  prefillExample={prefillExample}
                />
              </div>

              {/* Right Column: Results Screen */}
              {currentResult && (
                <div className="lg:col-span-7 transition-all">
                  <ResultsPanel
                    result={currentResult}
                    onReset={handleResetAnalysis}
                    onViewMethodology={() => setActiveTab('methodology')}
                  />
                </div>
              )}
            </div>

            {/* Session History Drawer if toggled */}
            {showHistory && (
              <RecentHistoryDrawer
                history={history}
                onSelectResult={(item) => {
                  setCurrentResult(item);
                  setShowHistory(false);
                }}
                onClearHistory={handleClearHistory}
              />
            )}
          </div>
        )}

        {activeTab === 'examples' && (
          <DemoExamplesSection
            onSelectAndAnalyze={handleSelectAndImmediatelyAnalyze}
          />
        )}

        {activeTab === 'methodology' && <MethodologySection />}

        {activeTab === 'evaluation' && <EvaluationSection />}

        {activeTab === 'about' && <AboutSection />}
      </main>

      {/* Academic Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white">
                <Shield className="w-3 h-3" />
              </div>
              <span className="font-bold text-slate-800">PhishGuard AI</span>
              <span>·</span>
              <span>GMR Institute of Technology (GMRIT)</span>
            </div>

            <div className="flex items-center gap-4 text-slate-600">
              <button
                onClick={() => setActiveTab('methodology')}
                className="hover:text-blue-600 transition-colors"
              >
                Methodology
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('evaluation')}
                className="hover:text-blue-600 transition-colors"
              >
                Model Evaluation
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-blue-600 transition-colors"
              >
                Academic Context
              </button>
            </div>

            <p className="text-slate-400">
              Academic research demonstration prototype.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
