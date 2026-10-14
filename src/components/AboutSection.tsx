import React from 'react';
import {
  Award,
  BookOpen,
  GraduationCap,
  Lock,
  School,
  ShieldAlert,
  ShieldCheck,
  Users,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Academic Term Paper
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500">Research Demonstration</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          PhishGuard AI — Intelligent Phishing Detection System
        </h1>

        <p className="text-base font-medium text-slate-700 leading-relaxed max-w-3xl">
          “An Intelligent Phishing Detection System for Emails and Messages Using Artificial Intelligence”
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Institution
            </span>
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <School className="w-3.5 h-3.5 text-blue-600" />
              GMRIT, Andhra Pradesh
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Document Type
            </span>
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              Academic Term Paper
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Primary Domains
            </span>
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              AI, NLP, Cybersecurity
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Prototype Version
            </span>
            <span className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 mt-0.5">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              v1.0 (Interactive Demo)
            </span>
          </div>
        </div>
      </div>

      {/* Project Background & Motivation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            The Cybersecurity Challenge
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Phishing continues to be the primary attack vector for data breaches, account takeover, and financial fraud. Attackers increasingly employ dynamic social engineering, spoofed branding, and urgent emotional triggers to deceive victims into surrendering passwords, session cookies, and one-time passwords (OTPs).
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Traditional signature-based blocklists and keyword filters struggle against newly registered domains and obfuscated SMS phish (smishing). This term paper proposes combining natural language processing (NLP) with machine learning to extract semantic warning signs and deliver actionable, explainable feedback.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Key Research Objectives
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>
                <strong>Cross-Channel Detection: </strong>Analyze both email communications and SMS text messages within a unified linguistic architecture.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>
                <strong>Explainability & Trust: </strong>Move beyond opaque black-box verdicts by surfacing grounded risk indicators with exact quoted evidence.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>
                <strong>Comparative Algorithm Benchmark: </strong>Formulate a structured comparison between Random Forest, SVM, and BERT classifiers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>
                <strong>Responsible UX: </strong>Provide immediate, non-blaming safety checklists to guide users safely toward verification.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Academic Ethics, Data Privacy & Responsible Disclosures */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" />
          Ethics, Data Privacy & Demo Disclosures
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <h4 className="font-bold text-slate-900">Zero Persistent Storage</h4>
            <p className="text-slate-600 leading-relaxed">
              Message contents submitted during the demo session reside only in transient application memory. No raw email or SMS text is written to persistent disks or external logging servers.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <h4 className="font-bold text-slate-900">Safe Sandbox Testing</h4>
            <p className="text-slate-600 leading-relaxed">
              PhishGuard AI analyzes text statically. It strictly refrains from automatically following, visiting, or crawling submitted URLs, preventing unintentional triggering of live malicious payloads.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <h4 className="font-bold text-slate-900">Not a Security Guarantee</h4>
            <p className="text-slate-600 leading-relaxed">
              This application is an educational and research prototype. A low-risk assessment indicates no obvious indicators in the supplied text, but does not certify complete safety or replace enterprise security gateways.
            </p>
          </div>
        </div>
      </div>

      {/* Presentation Guidance for Term Paper Evaluators */}
      <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-xl shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-700" />
          Presentation Walkthrough Guide for Evaluators
        </h3>
        <p className="text-xs text-blue-900 leading-relaxed">
          When presenting to college faculty or evaluators at GMR Institute of Technology:
        </p>
        <ol className="list-decimal list-inside space-y-1.5 text-xs text-blue-950 pl-1">
          <li>
            Navigate to <strong>Demo Examples</strong> to demonstrate how typical phishing tricks (urgency threats, courier customs fees, prize scams, and OTP harvesting) are classified into high-risk bands.
          </li>
          <li>
            Highlight the <strong>Routine Meeting Reminder</strong> scenario to show how benign messages yield low risk without false alarm triggers.
          </li>
          <li>
            Review the <strong>Detection Methodology</strong> section to discuss the 7-stage ML pipeline and the comparative advantages of Random Forest, SVM, and BERT.
          </li>
          <li>
            Review the <strong>Model Evaluation</strong> tab to explain why Recall is the paramount metric in phishing defense and how empirical benchmarks will be tested without data leakage.
          </li>
        </ol>
      </div>
    </div>
  );
};
