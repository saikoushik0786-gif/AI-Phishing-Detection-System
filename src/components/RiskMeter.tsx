import React from 'react';
import { RiskCategory } from '../types';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RiskMeterProps {
  score: number;
  category: RiskCategory;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score, category }) => {
  // Clamped score
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));

  // Color mappings
  const getCategoryStyles = () => {
    switch (category) {
      case 'Phishing':
        return {
          textColor: 'text-rose-700',
          bgColor: 'bg-rose-50',
          borderColor: 'border-rose-200',
          barColor: 'bg-rose-600',
          icon: ShieldAlert,
          label: 'Phishing Detected',
          badgeText: 'High Estimated Risk',
        };
      case 'Suspicious':
        return {
          textColor: 'text-amber-700',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          barColor: 'bg-amber-500',
          icon: AlertTriangle,
          label: 'Suspicious Content',
          badgeText: 'Moderate Estimated Risk',
        };
      case 'Likely Legitimate':
      default:
        return {
          textColor: 'text-emerald-700',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          barColor: 'bg-emerald-500',
          icon: CheckCircle2,
          label: 'Likely Legitimate',
          badgeText: 'Lower Estimated Risk',
        };
    }
  };

  const style = getCategoryStyles();
  const IconComponent = style.icon;

  return (
    <div className={`p-5 rounded-xl border ${style.borderColor} ${style.bgColor} transition-all`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg bg-white shadow-xs border ${style.borderColor}`}>
            <IconComponent className={`w-6 h-6 ${style.textColor}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold tracking-tight ${style.textColor}`}>
                {style.label}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/80 border border-slate-200 text-slate-700">
                {style.badgeText}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated heuristic & semantic estimation score
            </p>
          </div>
        </div>

        {/* Numeric Score */}
        <div className="flex items-baseline gap-1 sm:text-right">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
            {safeScore}
          </span>
          <span className="text-sm font-semibold text-slate-400 font-mono">/ 100</span>
        </div>
      </div>

      {/* Visual Meter Bar */}
      <div className="space-y-1.5">
        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
          {/* Segment guides */}
          <div
            className={`h-full transition-all duration-700 ease-out rounded-full ${style.barColor}`}
            style={{ width: `${safeScore}%` }}
          />
        </div>

        {/* Scale labels */}
        <div className="flex justify-between text-[11px] font-medium text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            0–29: Likely Legitimate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            30–59: Suspicious
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-600 inline-block"></span>
            60–100: Phishing
          </span>
        </div>
      </div>
    </div>
  );
};
