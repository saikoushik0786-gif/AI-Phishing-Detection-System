import React from 'react';
import {
  Brain,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Scale,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const pipelineSteps = [
    {
      num: '01',
      title: 'Corpus Collection',
      icon: Database,
      desc: 'Aggregating benchmark corpora including the Nazario Phishing Corpus, Enron Email Dataset, SpamAssassin, and the UCI SMS Spam Collection.',
    },
    {
      num: '02',
      title: 'Cleaning & Normalization',
      icon: Layers,
      desc: 'Removing multipart MIME artifacts, de-duplication, stripping raw HTML tags, and isolating textual message bodies and attached URL strings.',
    },
    {
      num: '03',
      title: 'Tokenization & NLP',
      icon: Code2,
      desc: 'Lowercasing, subword WordPiece/BPE tokenization, stopword filtering, and extraction of high-risk semantic stems (e.g., urgency verbs, account terms).',
    },
    {
      num: '04',
      title: 'Feature Engineering',
      icon: Cpu,
      desc: 'Synthesizing syntactic cues (character count, uppercase ratios, URL domain entropy, IP address indicators) alongside dense transformer embeddings.',
    },
    {
      num: '05',
      title: 'Model Training & Tuning',
      icon: Brain,
      desc: 'Training comparative baseline classifiers (Random Forest, SVM) and fine-tuning BERT with stratified 5-fold cross-validation to manage class imbalance.',
    },
    {
      num: '06',
      title: 'Rigorous Evaluation',
      icon: Scale,
      desc: 'Measuring held-out test splits with Accuracy, Precision, Recall, F1-Score, and ROC-AUC curves under identical preprocessing constraints.',
    },
    {
      num: '07',
      title: 'Explainable Inference',
      icon: ShieldCheck,
      desc: 'Extracting grounded indicator rationales and highlighted evidence phrases to make security predictions interpretable to end-users.',
    },
  ];

  const models = [
    {
      name: 'Random Forest Classifier',
      type: 'Ensemble Learning / Bagging',
      badge: 'Proposed Baseline',
      icon: GitBranch,
      description:
        'An ensemble of de-correlated decision trees that aggregates predictions via majority voting. Well-suited for tabular cybersecurity features like URL length, domain age, presence of specific punctuation, and lexical n-gram counts.',
      strengths: [
        'Resistant to overfitting due to bootstrap aggregation',
        'Provides native feature importance rankings (Gini impurity)',
        'Extremely low computational latency during real-time inference',
      ],
      limitations: [
        'Cannot inherently capture deep syntactic word order or long-range textual context',
      ],
      researchRole: 'Acts as the structured-feature baseline for rapid tabular screening.',
    },
    {
      name: 'Support Vector Machine (SVM)',
      type: 'Kernel-Based Classifier',
      badge: 'Proposed Traditional ML',
      icon: Terminal,
      description:
        'Finds the optimal separating hyperplane with maximum margin between phishing and benign vectors in high-dimensional TF-IDF space. Uses linear and Radial Basis Function (RBF) kernels to handle nonlinear boundaries.',
      strengths: [
        'Highly effective in sparse, high-dimensional textual feature spaces',
        'Memory efficient via subset of support vectors',
        'Strong theoretical guarantees on empirical risk minimization',
      ],
      limitations: [
        'Requires manual feature engineering and careful hyperparameter scaling (C, gamma)',
      ],
      researchRole: 'Serves as the high-dimensional sparse text classification baseline.',
    },
    {
      name: 'BERT (Bidirectional Transformers)',
      type: 'Deep Contextual Language Model',
      badge: 'Proposed Deep Learning',
      icon: Cpu,
      description:
        'A 12-layer transformer encoder pre-trained with Masked Language Modeling and Next Sentence Prediction. Fine-tuned with a classification head on message text to capture subtle psychological cues and contextual nuances.',
      strengths: [
        'Understands bidirectional sentence context and semantic subtleties',
        'Recognizes disguised urgency and oblique social engineering',
        'Eliminates the need for hand-crafted regex rules',
      ],
      limitations: [
        'Higher memory footprint and inference latency requiring GPU acceleration',
      ],
      researchRole: 'Proposed state-of-the-art semantic model for conversational phishing analysis.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            GMRIT Academic Term Paper
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500">Methodology Framework</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Proposed Machine Learning & NLP Pipeline
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          The research design outlines a multi-stage architecture spanning dataset synthesis, feature extraction, and comparative model evaluation. This page details the academic pipeline and the three candidate classifier families under investigation.
        </p>

        {/* Disclaimer Note */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900">
          <strong className="font-semibold text-blue-950">Research Transparency: </strong>
          Random Forest, SVM, and BERT are the proposed candidate classifiers formulated in the term paper. In this interactive demonstration, live classifications are generated by the server-side Gemini 3.8 Flash model (or local rule-based fallback). No trained RF/SVM/BERT models are deployed here without empirical verification.
        </div>
      </div>

      {/* 7-Stage Pipeline Flowchart */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            End-to-End Research Pipeline
          </h3>
          <span className="text-xs font-mono text-slate-400">Stages 01 – 07</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-blue-600">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {step.num}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 pt-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Candidate Model Comparison */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Candidate Machine Learning Classifiers
          </h3>
          <span className="text-xs text-slate-500">
            Theoretical foundation & comparative trade-offs
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {models.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {m.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {m.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">
                      {m.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.description}
                  </p>

                  {/* Strengths */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Architectural Strengths
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {m.strengths.map((s, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Known Trade-Offs
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {m.limitations.map((l, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">⚠</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                  <strong className="font-semibold text-slate-900">Term Paper Role: </strong>
                  {m.researchRole}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Feature Matrix */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Comparative Capability Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Classifier</th>
                <th className="py-2.5 px-3">Feature Space</th>
                <th className="py-2.5 px-3">Semantic Depth</th>
                <th className="py-2.5 px-3">Inference Speed</th>
                <th className="py-2.5 px-3">Hardware Requirement</th>
                <th className="py-2.5 px-3">Interpretability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">Random Forest</td>
                <td className="py-3 px-3">Tabular & Statistical</td>
                <td className="py-3 px-3 text-amber-700">Shallow (Word bags)</td>
                <td className="py-3 px-3 text-emerald-700 font-mono">Ultra-fast (&lt;5ms)</td>
                <td className="py-3 px-3">Standard CPU</td>
                <td className="py-3 px-3 text-emerald-700">High (Gini rank)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">Support Vector Machine</td>
                <td className="py-3 px-3">TF-IDF Vector Space</td>
                <td className="py-3 px-3 text-amber-700">Linear / RBF bounds</td>
                <td className="py-3 px-3 text-emerald-700 font-mono">Fast (&lt;10ms)</td>
                <td className="py-3 px-3">Standard CPU</td>
                <td className="py-3 px-3 text-amber-700">Moderate (Weights)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">BERT Fine-Tuned</td>
                <td className="py-3 px-3">768-dim Embeddings</td>
                <td className="py-3 px-3 text-emerald-700 font-semibold">Deep Contextual</td>
                <td className="py-3 px-3 text-slate-600 font-mono">Moderate (40–120ms)</td>
                <td className="py-3 px-3 text-amber-700">GPU / TPU Preferred</td>
                <td className="py-3 px-3 text-amber-700">Attention Maps</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
