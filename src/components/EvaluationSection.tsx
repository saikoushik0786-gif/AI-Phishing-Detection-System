import React from 'react';
import {
  AlertTriangle,
  BarChart3,
  Calculator,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  Target,
} from 'lucide-react';

export const EvaluationSection: React.FC = () => {
  const metrics = [
    {
      name: 'Accuracy',
      symbol: 'Acc',
      formula: '(TP + TN) / (TP + TN + FP + FN)',
      plainEnglish:
        'The proportion of all evaluated messages (both phishing and benign) that were classified correctly.',
      cybersecurityContext:
        'Can be misleading in imbalanced datasets where 95% of incoming traffic is benign, as a dummy classifier guessing legitimate would still claim 95% accuracy.',
      benchmarkStatus: 'Pending experimental evaluation',
    },
    {
      name: 'Precision',
      symbol: 'Prec',
      formula: 'TP / (TP + FP)',
      plainEnglish:
        'When the system flags a message as phishing, how often is it truly malicious?',
      cybersecurityContext:
        'High precision minimizes false alarms. Low precision causes alert fatigue, frustrating users who have valid emails quarantined.',
      benchmarkStatus: 'Pending experimental evaluation',
    },
    {
      name: 'Recall (Sensitivity)',
      symbol: 'Rec',
      formula: 'TP / (TP + FN)',
      plainEnglish:
        'Out of all actual phishing attacks circulating, what fraction did the detector successfully intercept?',
      cybersecurityContext:
        'The most critical metric in defensive cybersecurity. A missed attack (False Negative) allows an employee or user to click a hostile payload.',
      benchmarkStatus: 'Pending experimental evaluation',
    },
    {
      name: 'F1-Score',
      symbol: 'F1',
      formula: '2 × (Precision × Recall) / (Precision + Recall)',
      plainEnglish:
        'The harmonic mean of precision and recall, balancing false alarms against missed attacks.',
      cybersecurityContext:
        'Essential for benchmarking phishing detectors across heavily skewed distributions where neither precision nor recall alone tells the whole story.',
      benchmarkStatus: 'Pending experimental evaluation',
    },
    {
      name: 'ROC-AUC',
      symbol: 'AUC',
      formula: 'Area Under True Positive Rate vs False Positive Rate Curve',
      plainEnglish:
        'Measures the model’s discriminatory power across all possible decision probability thresholds (0.0 to 1.0).',
      cybersecurityContext:
        'Demonstrates whether the classifier separates phishing confidence distributions from benign distributions reliably regardless of where the cutoff is placed.',
      benchmarkStatus: 'Pending experimental evaluation',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview & Strict Academic Disclaimer */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Academic Term Paper Rigor
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500">Evaluation Protocol</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Model Evaluation & Statistical Metrics
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          In cybersecurity research, transparent evaluation is paramount. This section outlines the formal mathematical definitions, confusion matrix dynamics, and testing criteria designed for empirical term-paper evaluation.
        </p>

        {/* Mandatory Strict Pending Notice */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950 text-sm">
              Experimental results pending — no validated benchmark results have been supplied.
            </h4>
            <p className="text-amber-800 leading-relaxed">
              In accordance with academic standards at GMRIT, fabricated benchmark scores, mock precision percentages, and unverified ROC-AUC curves are strictly prohibited. Formal metric values will be published only after training and evaluating the Random Forest, SVM, and BERT candidate models on verified test splits.
            </p>
          </div>
        </div>
      </div>

      {/* Confusion Matrix Architecture */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Cybersecurity Confusion Matrix Taxonomy
            </h3>
            <p className="text-xs text-slate-500">
              Understanding the operational risk associated with each quadrant
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Binary Classification (Phishing vs Benign)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* True Positive */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                True Positive (TP)
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Actual Phishing Classified as Phishing
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Cybersecurity Impact: </strong>
              Optimal defensive outcome. Malicious email or SMS is flagged or quarantined, protecting the user from identity theft or credential loss.
            </p>
          </div>

          {/* False Positive */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                False Positive (FP)
              </span>
              <HelpCircle className="w-4 h-4 text-amber-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Benign Message Misclassified as Phishing
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Cybersecurity Impact: </strong>
              Operational friction. Routine academic announcements or legitimate business invoices are held in quarantine, leading to user disruption and alert fatigue.
            </p>
          </div>

          {/* False Negative */}
          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                False Negative (FN) — Critical Threat
              </span>
              <ShieldAlert className="w-4 h-4 text-rose-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Actual Phishing Misclassified as Legitimate
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Cybersecurity Impact: </strong>
              Severe vulnerability. Hostile social engineering bypasses the filter into the recipient’s inbox. The user believes the request is trustworthy and surrenders credentials or OTPs.
            </p>
          </div>

          {/* True Negative */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md">
                True Negative (TN)
              </span>
              <CheckCircle className="w-4 h-4 text-slate-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Benign Message Correctly Cleared
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Cybersecurity Impact: </strong>
              Normal frictionless communication. Routine emails and team messages are delivered without false warnings or artificial delays.
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Formulation & Evaluation Definitions
          </h3>
          <span className="text-xs text-slate-500">Academic standards</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-blue-50 text-blue-700">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{m.name}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {m.symbol}
                  </span>
                </div>

                {/* Mathematical Formula */}
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans font-semibold mb-0.5">
                    Mathematical Formula:
                  </span>
                  {m.formula}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {m.plainEnglish}
                </p>

                <p className="text-xs text-slate-700 bg-slate-50/70 p-2 rounded-md leading-relaxed border border-slate-100">
                  <strong className="font-semibold text-slate-900">Cybersecurity Relevance: </strong>
                  {m.cybersecurityContext}
                </p>
              </div>

              {/* Status pill */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Empirical Status:</span>
                <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {m.benchmarkStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Planned Test Protocol */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Experimental Testing Protocol (Term Paper Methodology)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">
              1. Dataset Partitioning
            </span>
            <p className="text-slate-600 leading-relaxed">
              Stratified 80% Training, 10% Validation, and 10% Test split. Preprocessing parameters and vocabulary filters are fit strictly on training partitions to prevent data leakage.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">
              2. Class Imbalance Handling
            </span>
            <p className="text-slate-600 leading-relaxed">
              Evaluating cost-sensitive learning (class weighting) and SMOTE (Synthetic Minority Over-sampling Technique) to mirror real-world threat prevalence without inducing bias.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">
              3. Adversarial Robustness
            </span>
            <p className="text-slate-600 leading-relaxed">
              Stress-testing models against homoglyph obfuscation, zero-width spaces, and character substitutions to assess resilience against evasion attacks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
