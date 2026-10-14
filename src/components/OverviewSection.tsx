import React from 'react';
import { AnalysisResult, DemoExample, SessionStats } from '../types';
import { DEMO_EXAMPLES } from '../data/examples';
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  Layers,
  Mail,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface OverviewSectionProps {
  stats: SessionStats;
  recentResults: AnalysisResult[];
  onNavigateToAnalyze: () => void;
  onNavigateToDemoExamples: () => void;
  onNavigateToMethodology: () => void;
  onSelectResult: (result: AnalysisResult) => void;
  onSelectDemoExample: (example: DemoExample) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  stats,
  recentResults,
  onNavigateToAnalyze,
  onNavigateToDemoExamples,
  onNavigateToMethodology,
  onSelectResult,
  onSelectDemoExample,
}) => {
  return (
    <div className="space-y-8">
      {/* Hero Welcome Card */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Academic Term Paper Project · GMRIT
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">Live AI Demonstration</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            AI-Powered Phishing Detection for Emails and Messages
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            PhishGuard AI analyzes the syntactic, semantic, and social-engineering patterns of emails and SMS messages to estimate phishing risk, highlight suspicious language, explain underlying threat factors, and recommend safe verification steps.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateToAnalyze}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <FileSearch className="w-4 h-4" />
              <span>Launch Message Analyzer</span>
            </button>

            <button
              onClick={onNavigateToDemoExamples}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Explore Demo Scenarios</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Session Statistics Strip */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Current Session Scan Metrics
          </h3>
          <span className="text-xs text-slate-400">
            Calculated strictly from live session activity
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Analyses */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Total Messages Analyzed</span>
              <FileSearch className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {stats.totalAnalyzed}
            </div>
            <p className="text-[11px] text-slate-400">Scanned this session</p>
          </div>

          {/* Phishing Detections */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Phishing Intercepted</span>
              <ShieldAlert className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-extrabold text-rose-700 font-mono tabular-nums">
              {stats.phishingCount}
            </div>
            <p className="text-[11px] text-slate-400">Score band: 60 – 100</p>
          </div>

          {/* Suspicious Flags */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Suspicious Warnings</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-amber-700 font-mono tabular-nums">
              {stats.suspiciousCount}
            </div>
            <p className="text-[11px] text-slate-400">Score band: 30 – 59</p>
          </div>

          {/* Likely Legitimate */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Likely Legitimate</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {stats.legitimateCount}
            </div>
            <p className="text-[11px] text-slate-400">Score band: 0 – 29</p>
          </div>
        </div>
      </div>

      {/* How PhishGuard AI Works */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="max-w-2xl">
          <h3 className="text-base font-bold text-slate-900">
            How the Detection Engine Works
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Multi-layered linguistic and semantic evaluation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs font-mono">
              01
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Social Engineering Detection
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detects coercive urgency, account termination threats, fake delivery notices, and unsolicited prize lures designed to bypass rational judgment.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs font-mono">
              02
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Credential & Financial Traps
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Identifies solicitations for sensitive assets including One-Time Passwords (OTPs), PINs, banking credentials, identity numbers, and prepaid fee payments.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs font-mono">
              03
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Explainable Grounded Evidence
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Surfaces exact quoted evidence phrases from the original text, providing transparent justification rather than an ungrounded black-box risk score.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Demo Scenarios Preview */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Featured Academic Term Paper Scenarios
            </h3>
            <p className="text-xs text-slate-500">
              Click any scenario to immediately load and evaluate it
            </p>
          </div>

          <button
            onClick={onNavigateToDemoExamples}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <span>View All 5 Scenarios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DEMO_EXAMPLES.slice(0, 3).map((ex) => (
            <div
              key={ex.id}
              onClick={() => onSelectDemoExample(ex)}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 cursor-pointer shadow-2xs hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-500 uppercase text-[10px]">
                    {ex.messageType}
                  </span>
                  <span
                    className={`font-semibold text-[11px] px-1.5 py-0.5 rounded-sm ${
                      ex.expectedCategory === 'Phishing'
                        ? 'text-rose-700 bg-rose-50'
                        : 'text-emerald-700 bg-emerald-50'
                    }`}
                  >
                    {ex.expectedCategory}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {ex.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {ex.content}
                </p>
              </div>

              <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-1">
                <span>Evaluate Sample</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Methodology Glimpse */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Comparative Machine Learning Methodology
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The research design compares Random Forest, Support Vector Machine (SVM), and BERT language representations across benchmark corpora. Learn more about the planned experimental pipeline.
          </p>
        </div>

        <button
          onClick={onNavigateToMethodology}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors shrink-0"
        >
          <Layers className="w-4 h-4" />
          <span>Read Research Methodology</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
