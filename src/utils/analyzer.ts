import { AnalysisResult, DetectionIndicator, MessageType, RiskCategory } from '../types';

interface HeuristicRule {
  name: string;
  severity: 'high' | 'medium' | 'low';
  regex: RegExp;
  explanation: string;
  scoreImpact: number;
}

const RULES: HeuristicRule[] = [
  {
    name: 'OTP Sharing Request',
    severity: 'high',
    regex: /(?:send|share|provide|text|reply with|enter)\s+(?:your\s+)?(?:otp|one[- ]time\s+password|verification\s+code|security\s+pin)/i,
    explanation: 'Legitimate organizations explicitly state that their personnel will never ask you to share your OTP or PIN.',
    scoreImpact: 45,
  },
  {
    name: 'Account Suspension Threat',
    severity: 'high',
    regex: /(?:account\s+(?:will\s+be\s+)?(?:suspended|blocked|terminated|closed|restricted|locked)|avoid\s+(?:permanent\s+)?closure)/i,
    explanation: 'Threatening abrupt account termination is a hallmark social engineering tactic designed to induce panic.',
    scoreImpact: 35,
  },
  {
    name: 'Coercive Urgency',
    severity: 'medium',
    regex: /(?:urgent|immediately|action\s+required|today|within\s+24\s+hours|act\s+now|without\s+delay|expires?\s+today|immediate\s+action)/i,
    explanation: 'Manufactured time pressure reduces critical thinking and coerces victims into bypassing normal verification steps.',
    scoreImpact: 25,
  },
  {
    name: 'Credential Harvesting Request',
    severity: 'high',
    regex: /(?:verify\s+(?:your\s+)?(?:details|credentials|password|identity|account|login|profile)|submit\s+(?:your\s+)?(?:password|pin|ssn|id))/i,
    explanation: 'Prompts to verify credentials or submit identity information via unauthenticated channels often lead to data theft.',
    scoreImpact: 35,
  },
  {
    name: 'Unsolicited Financial Demand',
    severity: 'high',
    regex: /(?:pay\s+(?:a\s+)?(?:small\s+)?(?:delivery\s+)?fee|wire\s+transfer|send\s+money|payment\s+required|customs\s+clearance\s+fee)/i,
    explanation: 'Demanding immediate payment or delivery clearance fees for unexpected shipments is a prevalent advance-fee scam.',
    scoreImpact: 35,
  },
  {
    name: 'Unsolicited Prize or Lottery Claim',
    severity: 'high',
    regex: /(?:congratulations|you\s+have\s+won|grand\s+winner|claim\s+your\s+reward|special\s+prize|lottery\s+payout)/i,
    explanation: 'Enticing recipients with unearned financial or material rewards to elicit personal information is a classic lure.',
    scoreImpact: 30,
  },
  {
    name: 'Personal/Banking Data Solicitation',
    severity: 'high',
    regex: /(?:bank\s+account\s+information|national\s+id|social\s+security|credit\s+card\s+number|cvv)/i,
    explanation: 'Requests to transmit high-value financial identification details over unverified forms pose acute identity theft risks.',
    scoreImpact: 35,
  },
  {
    name: 'Suspicious or Generic Link Target',
    severity: 'medium',
    regex: /(https?:\/\/[^\s]+)/i,
    explanation: 'The message contains external URLs directing recipients away from trusted applications.',
    scoreImpact: 15,
  },
];

export function runHeuristicAnalysis(
  content: string,
  messageType: MessageType,
  sender?: string,
  subject?: string,
  url?: string
): AnalysisResult {
  const fullText = `${subject ? subject + ' ' : ''}${content} ${url ? url : ''}`;
  const indicators: DetectionIndicator[] = [];
  const highlightPhrases: string[] = [];
  let rawScore = 5; // Base low baseline

  // Evaluate rules
  for (const rule of RULES) {
    const match = fullText.match(rule.regex);
    if (match) {
      const evidence = match[0].trim();
      indicators.push({
        name: rule.name,
        severity: rule.severity,
        evidence: `"${evidence}"`,
        explanation: rule.explanation,
      });
      highlightPhrases.push(evidence);
      rawScore += rule.scoreImpact;
    }
  }

  // Check URL specifics if provided
  const combinedUrl = url || (fullText.match(/https?:\/\/[^\s]+/i)?.[0] ?? '');
  if (combinedUrl) {
    const isExampleOrTest = combinedUrl.includes('example.com') || combinedUrl.includes('test.com');
    if (combinedUrl.includes('@') || /https?:\/\/\d+\.\d+\.\d+\.\d+/.test(combinedUrl)) {
      indicators.push({
        name: 'Deceptive URL Structure',
        severity: 'high',
        evidence: combinedUrl,
        explanation: 'URLs containing IP addresses or embedded credentials are frequently used to obfuscate destination hosts.',
      });
      highlightPhrases.push(combinedUrl);
      rawScore += 25;
    } else if (isExampleOrTest && indicators.length > 0) {
      indicators.push({
        name: 'Supplied Link in Threat Context',
        severity: 'medium',
        evidence: combinedUrl,
        explanation: 'External URL supplied alongside urgent or credential-related language.',
      });
      highlightPhrases.push(combinedUrl);
    }
  }

  // Check sender anomalies
  if (sender) {
    if (/@service-bank|@promo-rewards|@security-verify|AUTH-VERIFY/i.test(sender)) {
      indicators.push({
        name: 'Suspicious Sender Origin',
        severity: 'medium',
        evidence: sender,
        explanation: 'Sender handle mimics an institutional or administrative notification source.',
      });
      highlightPhrases.push(sender);
      rawScore += 15;
    }
  }

  // Clamp risk score to 0 - 100
  const risk_score = Math.min(Math.max(rawScore, 5), indicators.length === 0 ? 15 : 98);

  // Determine category based on PRD bands:
  // 0–29: Likely Legitimate
  // 30–59: Suspicious
  // 60–100: Phishing
  let category: RiskCategory;
  if (risk_score >= 60) {
    category = 'Phishing';
  } else if (risk_score >= 30) {
    category = 'Suspicious';
  } else {
    category = 'Likely Legitimate';
  }

  // Formulate concise explanations and recommendations
  let summary = '';
  let explanation = '';
  const recommendations: string[] = [];

  if (category === 'Phishing') {
    summary = `High estimated risk (${risk_score}/100). The message exhibits critical indicators of social engineering, including coercive urgency and requests for sensitive credentials or payments.`;
    explanation = `The submitted text contains patterns strongly characteristic of a targeted phishing attempt. It leverages psychological triggers—such as imminent penalty or sudden reward—to prompt an immediate, unverified reaction.`;
    recommendations.push('Do not click any embedded links or open attachments in this message.');
    recommendations.push('Never share passwords, OTPs, PINs, or recovery codes with any party.');
    recommendations.push('Verify the alleged alert directly through the official app or by typing the trusted web address manually.');
    recommendations.push('Report this message to your security team or service provider.');
  } else if (category === 'Suspicious') {
    summary = `Moderate estimated risk (${risk_score}/100). The message presents unusual warning signs that warrant careful verification before taking any action.`;
    explanation = `While not conclusively malicious, the text exhibits mild urgency or an unverified external link. Independent confirmation through an established channel is strongly advised.`;
    recommendations.push('Exercise caution before interacting with links or responding to sender requests.');
    recommendations.push('Cross-reference the sender address with official company directories or correspondence.');
    recommendations.push('Contact the organization using an established phone number rather than details from the message.');
  } else {
    summary = `Lower estimated risk (${risk_score}/100). No obvious phishing indicators were detected in the supplied text.`;
    explanation = `The analyzed content does not display aggressive urgency, credential requests, or overt payment demands. However, text-based heuristics cannot inspect sender authentication or destination server telemetry.`;
    recommendations.push('Confirm unexpected calendar invites or file requests with the sender via a known channel.');
    recommendations.push('Maintain standard security hygiene and stay vigilant for unanticipated follow-up requests.');
    recommendations.push('Remember that clean text alone does not constitute a certified guarantee of legitimacy.');
  }

  return {
    id: `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    messageType,
    originalContent: content,
    sender,
    subject,
    url,
    category,
    risk_score,
    summary,
    indicators,
    explanation,
    recommendations,
    limitations:
      'This assessment is an automated academic demonstration estimate based solely on the supplied text. It does not inspect live server logs, SPF/DKIM records, or live URL destinations, and does not provide an infallible security guarantee.',
    highlight_phrases: Array.from(new Set(highlightPhrases)),
    engine: 'heuristic_fallback',
    engineModel: 'PhishGuard Local Rule-Based NLP Analyzer',
  };
}
