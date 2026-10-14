import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { RiskMeter } from './RiskMeter';
import { MessageHighlighter } from './MessageHighlighter';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Copy,
  Info,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface ResultsPanelProps {
  result: AnalysisResult;
  onReset: () => void;
  onViewMethodology: () => void;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  result,
  onReset,
  onViewMethodology,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopySummary = () => {
    const text = `PhishGuard AI Risk Report:\nCategory: ${result.category} (Score: ${result.risk_score}/100)\nSummary: ${result.summary}\nIndicators: ${result.indicators.map((i) => i.name).join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return (
          <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
            High Severity
          </span>
        );
      case 'medium':
        return (
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            Medium Severity
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
            Low Severity
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Model/Engine attribution */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Detection Engine:{' '}
            <strong className="text-slate-900 font-semibold">
              {result.engineModel || (result.engine === 'gemini' ? 'Gemini 3.8 Flash' : 'Local Heuristic Analyzer')}
            </strong>
          </span>
          <span className="text-slate-400">·</span>
          <span>
            Type: <span className="uppercase font-mono">{result.messageType}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-2.5 py-1 text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md font-medium transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>{copied ? 'Copied' : 'Copy Report'}</span>
          </button>
        </div>
      </div>

      {/* Primary Risk Gauge */}
      <RiskMeter score={result.risk_score} category={result.category} />

      {/* Summary Box */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          Executive Assessment
        </h4>
        <p className="text-sm font-medium text-slate-800 leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Detected Indicators */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            Detected Risk Indicators ({result.indicators.length})
          </h3>
          <span className="text-xs text-slate-500">
            {result.indicators.length > 0 ? 'Grounded in submitted text' : 'No overt signals'}
          </span>
        </div>

        {result.indicators.length === 0 ? (
          <div className="p-5 bg-white border border-slate-200 rounded-xl text-center">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-900">
              No obvious phishing indicators detected
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              The submitted content does not contain common urgent threats, credential solicitations, or overt scam patterns. However, text heuristics cannot guarantee complete authenticity.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.indicators.map((ind, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {ind.name}
                  </h4>
                  {getSeverityBadge(ind.severity)}
                </div>

                {ind.evidence && (
                  <div className="text-xs font-mono bg-slate-50 border border-slate-200 p-2 rounded-md text-slate-700 italic">
                    {ind.evidence}
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ind.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Evidence Viewer with Highlights */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Analyzed Message Evidence
          </h3>
          <span className="text-xs text-slate-500">
            Highlighted spans mark detected warning signs
          </span>
        </div>

        <MessageHighlighter
          content={result.originalContent}
          highlightPhrases={result.highlight_phrases}
        />

        {/* Message Metadata if available */}
        {(result.sender || result.subject || result.url) && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
            {result.sender && (
              <div>
                <span className="text-slate-400 font-medium">Sender: </span>
                <span className="text-slate-800 font-mono font-medium truncate inline-block max-w-[200px]">
                  {result.sender}
                </span>
              </div>
            )}
            {result.subject && (
              <div>
                <span className="text-slate-400 font-medium">Subject: </span>
                <span className="text-slate-800 font-medium truncate inline-block max-w-[200px]">
                  {result.subject}
                </span>
              </div>
            )}
            {result.url && (
              <div>
                <span className="text-slate-400 font-medium">Supplied Link: </span>
                <span className="text-slate-800 font-mono text-[11px] truncate inline-block max-w-[200px]">
                  {result.url}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Plain Language Explanation */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600" />
          Detailed Reasoning & Context
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          {result.explanation}
        </p>
      </div>

      {/* Practical Safety Checklist */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Recommended Safety Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Check off recommended defensive measures for this scenario
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
            {Object.values(completedSteps).filter(Boolean).length} / {result.recommendations.length} completed
          </span>
        </div>

        <div className="space-y-2">
          {result.recommendations.map((action, idx) => {
            const isDone = !!completedSteps[idx];
            return (
              <label
                key={idx}
                onClick={() => toggleStep(idx)}
                className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-600 line-through'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100/80'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => {}}
                  className="mt-0.5 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="leading-relaxed font-medium">{action}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Mandatory Limitations & Prototype Caveat */}
      <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">
            Academic Research Prototype Limitation
          </p>
          <p className="text-amber-800/90 leading-relaxed">
            {result.limitations} The score and indicators are experimental estimates intended for academic evaluation at GMRIT, not a commercial guarantee. Never rely exclusively on automated software for mission-critical security decisions.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-xs transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Analyze Another Message</span>
        </button>

        <button
          onClick={onViewMethodology}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>View Detection Methodology</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
