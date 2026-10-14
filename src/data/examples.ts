import { DemoExample } from '../types';

export const DEMO_EXAMPLES: DemoExample[] = [
  {
    id: 'bank-alert',
    title: 'Suspicious Bank Alert',
    scenario: 'Urgent account suspension threat with credential verification link',
    messageType: 'email',
    sender: 'security-alerts@service-bank-verification.com',
    subject: 'URGENT: Immediate Action Required - Account Suspension Alert',
    url: 'https://example.com/account',
    content:
      'URGENT: Your bank account will be suspended today due to irregular activity. Verify your details immediately using this link: https://example.com/account to avoid permanent closure of your banking profile.',
    expectedCategory: 'Phishing',
    expectedRiskRange: '75 – 95',
    rationale:
      'Uses artificial urgency, severe threats of account closure, and requests credential verification via an unverified link.',
    keySignals: ['Artificial Urgency', 'Account Closure Threat', 'Credential Harvesting Link'],
  },
  {
    id: 'delivery-scam',
    title: 'Delivery Fee Scam',
    scenario: 'Unexpected package hold demanding immediate fee payment',
    messageType: 'sms',
    sender: '+1 (800) 555-0199',
    url: 'https://example.com/delivery',
    content:
      'Your package is on hold due to unpaid customs clearance. Pay a small delivery fee immediately at https://example.com/delivery to receive your parcel today.',
    expectedCategory: 'Phishing',
    expectedRiskRange: '70 – 90',
    rationale:
      'Common courier impersonation tactic relying on unexpected delivery claims and urgent payment demands.',
    keySignals: ['Unexpected Delivery Notice', 'Urgent Payment Demand', 'Suspicious URL'],
  },
  {
    id: 'prize-scam',
    title: 'Prize & Lottery Scam',
    scenario: 'Unsolicited reward requiring submission of sensitive personal data',
    messageType: 'email',
    sender: 'winner-claims@promo-rewards-center.org',
    subject: 'CONGRATULATIONS: You have been selected as the grand winner!',
    content:
      'Congratulations! You have won a special prize worth $5,000. Submit your personal details, national ID, and bank account information immediately to claim your reward before the deadline expires.',
    expectedCategory: 'Phishing',
    expectedRiskRange: '75 – 95',
    rationale:
      'Promises unearned financial windfall while demanding highly sensitive personal and banking identification details.',
    keySignals: ['Unsolicited Financial Prize', 'Demands Personal & Banking Info', 'Deadline Pressure'],
  },
  {
    id: 'meeting-reminder',
    title: 'Routine Meeting Reminder',
    scenario: 'Internal team calendar reminder with no sensitive requests',
    messageType: 'email',
    sender: 'priya.sharma@gmrit.edu.in',
    subject: 'Project Sync: Term Paper Review Meeting',
    content:
      'Hello, our project meeting is scheduled for tomorrow at 10 AM in the conference room. Please review the agenda before attending. Let me know if you need any adjustments to the schedule.',
    expectedCategory: 'Likely Legitimate',
    expectedRiskRange: '5 – 20',
    rationale:
      'Lacks urgency threats, payment requests, credential harvesting, or suspicious links. Typical internal academic communication.',
    keySignals: ['No Coercive Urgency', 'No Credential/Financial Demands', 'Realistic Context'],
  },
  {
    id: 'otp-request',
    title: 'OTP Verification Request',
    scenario: 'Impersonation asking recipient to share a One-Time Password',
    messageType: 'sms',
    sender: 'AUTH-VERIFY',
    content:
      'Your account requires verification. Send your OTP to our support representative immediately to avoid account restrictions.',
    expectedCategory: 'Phishing',
    expectedRiskRange: '85 – 100',
    rationale:
      'Directly requests sharing of an OTP (One-Time Password). Legitimate institutions explicitly state they never ask for OTPs or PINs.',
    keySignals: ['Direct OTP Request', 'Support Impersonation', 'Account Restriction Threat'],
  },
];
