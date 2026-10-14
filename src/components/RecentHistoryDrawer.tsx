import React from 'react';
import { AnalysisResult } from '../types';
import {
  Clock,
  ExternalLink,
  Mail,
  MessageSquare,
  ShieldAlert,
  Trash2,
} from 'lucide-react';

interface RecentHistoryDrawerProps {
  history: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
  onClearHistory: () => void;
}

export const RecentHistoryDrawer: React.FC<RecentHistoryDrawerProps> = ({
  history,
  onSelectResult,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return (
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs text-center space-y-2">
        <Clock className="w-8 h-8 text-slate-300 mx-auto" />
        <h4 className="text-sm font-bold text-slate-800">
          No Session Scans Yet
        </h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Analyses executed during your current browsing session will appear here for quick recall and comparison.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Session Scan History ({history.length})
          </h3>
          <p className="text-xs text-slate-500">
            Transient in-memory session records
          </p>
        </div>

        <button
          onClick={onClearHistory}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
        {history.map((item) => {
          const isPhish = item.category === 'Phishing';
          const isSusp = item.category === 'Suspicious';

          return (
            <div
              key={item.id}
              onClick={() => onSelectResult(item)}
              className="py-3 px-2 -mx-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                    {item.messageType === 'email' ? (
                      <Mail className="w-3 h-3 text-slate-400" />
                    ) : (
                      <MessageSquare className="w-3 h-3 text-slate-400" />
                    )}
                    <span className="uppercase text-[10px] font-mono">
                      {item.messageType}
                    </span>
                  </span>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                      isPhish
                        ? 'text-rose-700 bg-rose-50 border-rose-200'
                        : isSusp
                        ? 'text-amber-700 bg-amber-50 border-amber-200'
                        : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-slate-700 font-medium truncate max-w-lg">
                  {item.originalContent}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-slate-900 tabular-nums">
                    {item.risk_score}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">/100</span>
                </div>

                <div className="p-1 text-slate-400 group-hover:text-blue-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
