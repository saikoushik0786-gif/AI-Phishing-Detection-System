import React from 'react';
import { DemoExample } from '../types';
import { DEMO_EXAMPLES } from '../data/examples';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface DemoExamplesSectionProps {
  onSelectAndAnalyze: (example: DemoExample) => void;
}

export const DemoExamplesSection: React.FC<DemoExamplesSectionProps> = ({
  onSelectAndAnalyze,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Academic Term Paper Test Suite
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">Synthetic Scenarios</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Curated Phishing & Legitimate Benchmark Scenarios
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            These five safe, synthetic scenarios demonstrate how PhishGuard AI extracts semantic and syntactic warning signs from message text. Select any card to immediately load and evaluate the sample.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_EXAMPLES.map((ex) => {
          const isPhish = ex.expectedCategory === 'Phishing';
          const isLegit = ex.expectedCategory === 'Likely Legitimate';

          return (
            <div
              key={ex.id}
              className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {ex.messageType === 'email' ? (
                          <Mail className="w-3 h-3 text-slate-500" />
                        ) : (
                          <MessageSquare className="w-3 h-3 text-slate-500" />
                        )}
                        <span className="capitalize">{ex.messageType}</span>
                      </span>

                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                          isPhish
                            ? 'text-rose-700 bg-rose-50 border-rose-200'
                            : isLegit
                            ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                            : 'text-amber-700 bg-amber-50 border-amber-200'
                        }`}
                      >
                        Expected: {ex.expectedCategory} ({ex.expectedRiskRange})
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {ex.title}
                    </h3>
                  </div>

                  {isPhish ? (
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-1" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  )}
                </div>

                {/* Scenario summary */}
                <p className="text-xs text-slate-500 font-medium">
                  {ex.scenario}
                </p>

                {/* Content snippet */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 leading-relaxed max-h-28 overflow-y-auto">
                  {ex.content}
                </div>

                {/* Key signals */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Target Threat Signals:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ex.keySignals.map((signal, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-medium text-slate-700 bg-slate-100/90 border border-slate-200 px-2 py-0.5 rounded-md"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Academic Rationale */}
                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                  <span className="font-semibold text-slate-800">Research Rationale: </span>
                  {ex.rationale}
                </p>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectAndAnalyze(ex)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 rounded-lg transition-colors shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Load & Analyze Sample</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
