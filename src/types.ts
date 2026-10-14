export type MessageType = 'email' | 'sms';

export type RiskCategory = 'Phishing' | 'Suspicious' | 'Likely Legitimate';

export type IndicatorSeverity = 'high' | 'medium' | 'low';

export interface DetectionIndicator {
  name: string;
  severity: IndicatorSeverity;
  evidence: string;
  explanation: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  messageType: MessageType;
  originalContent: string;
  sender?: string;
  subject?: string;
  url?: string;
  category: RiskCategory;
  risk_score: number; // 0 to 100
  summary: string;
  indicators: DetectionIndicator[];
  explanation: string;
  recommendations: string[];
  limitations: string;
  highlight_phrases: string[];
  engine: 'gemini' | 'heuristic_fallback';
  engineModel?: string;
}

export interface DemoExample {
  id: string;
  title: string;
  scenario: string;
  messageType: MessageType;
  sender: string;
  subject?: string;
  url?: string;
  content: string;
  expectedCategory: RiskCategory;
  expectedRiskRange: string;
  rationale: string;
  keySignals: string[];
}

export interface SessionStats {
  totalAnalyzed: number;
  phishingCount: number;
  suspiciousCount: number;
  legitimateCount: number;
}
