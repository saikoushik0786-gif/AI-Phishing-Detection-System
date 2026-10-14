import React, { useState } from 'react';
import { DemoExample, MessageType } from '../types';
import { DEMO_EXAMPLES } from '../data/examples';
import {
  AlertCircle,
  FileText,
  Globe,
  Mail,
  MessageSquare,
  Send,
  ShieldAlert,
  Sparkles,
  Trash2,
  User,
} from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (payload: {
    messageType: MessageType;
    content: string;
    sender?: string;
    subject?: string;
    url?: string;
  }) => Promise<void>;
  isLoading: boolean;
  prefillExample?: DemoExample | null;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  onAnalyze,
  isLoading,
  prefillExample,
}) => {
  const [messageType, setMessageType] = useState<MessageType>(
    prefillExample ? prefillExample.messageType : 'email'
  );
  const [content, setContent] = useState<string>(
    prefillExample ? prefillExample.content : ''
  );
  const [sender, setSender] = useState<string>(
    prefillExample ? prefillExample.sender : ''
  );
  const [subject, setSubject] = useState<string>(
    prefillExample?.subject ? prefillExample.subject : ''
  );
  const [url, setUrl] = useState<string>(
    prefillExample?.url ? prefillExample.url : ''
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  // Synchronize when prefillExample changes
  React.useEffect(() => {
    if (prefillExample) {
      setMessageType(prefillExample.messageType);
      setContent(prefillExample.content);
      setSender(prefillExample.sender);
      setSubject(prefillExample.subject || '');
      setUrl(prefillExample.url || '');
      setValidationError(null);
    }
  }, [prefillExample]);

  const handleClear = () => {
    setContent('');
    setSender('');
    setSubject('');
    setUrl('');
    setValidationError(null);
  };

  const handleSelectExample = (ex: DemoExample) => {
    setMessageType(ex.messageType);
    setContent(ex.content);
    setSender(ex.sender);
    setSubject(ex.subject || '');
    setUrl(ex.url || '');
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || content.trim().length === 0) {
      setValidationError('Please enter or paste the message content before analyzing.');
      return;
    }
    if (content.trim().length < 5) {
      setValidationError('Message content is too short to extract meaningful risk indicators.');
      return;
    }
    setValidationError(null);
    onAnalyze({
      messageType,
      content: content.trim(),
      sender: sender.trim() || undefined,
      subject: messageType === 'email' && subject.trim() ? subject.trim() : undefined,
      url: url.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Privacy Guard Notice */}
      <div className="flex items-start gap-3 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 shadow-2xs">
        <ShieldAlert className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-blue-950">Privacy Notice: </span>
          Do not enter real passwords, live OTPs, active banking credentials, or sensitive personal information. Use fictionalized or anonymized test text.
        </div>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="font-medium">{validationError}</span>
        </div>
      )}

      {/* Quick Example Loader Pills */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
          Quick-Load Demo Scenarios (GMRIT Term Paper Suite)
        </label>
        <div className="flex flex-wrap gap-2">
          {DEMO_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => handleSelectExample(ex)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>{ex.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message Type Segmented Switch */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">
          Message Type
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl max-w-md">
          <button
            type="button"
            onClick={() => setMessageType('email')}
            className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              messageType === 'email'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Message</span>
          </button>
          <button
            type="button"
            onClick={() => setMessageType('sms')}
            className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              messageType === 'sms'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Text Message (SMS)</span>
          </button>
        </div>
      </div>

      {/* Optional Metadata Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sender field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Sender Address or Phone (Optional)</span>
          </label>
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder={
              messageType === 'email'
                ? 'e.g., alerts@bank-security.com'
                : 'e.g., +1 (800) 555-0199 or AUTH-VERIFY'
            }
            className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:font-sans placeholder:text-slate-400"
          />
        </div>

        {/* Attached URL field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Extracted URL / Link (Optional)</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://example.com/account"
            className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:font-sans placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Subject field (only for email) */}
      {messageType === 'email' && (
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Email Subject Line (Optional)</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., URGENT: Your bank account will be suspended today"
            className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
          />
        </div>
      )}

      {/* Message Content Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            Message Body Content <span className="text-rose-500">*</span>
          </label>
          <span className="text-[11px] font-mono tabular-nums text-slate-400">
            {content.length} / 8000 characters
          </span>
        </div>
        <textarea
          rows={6}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (validationError) setValidationError(null);
          }}
          placeholder={
            messageType === 'email'
              ? 'Paste the full body text of the email here...'
              : 'Paste the SMS/chat text message content here...'
          }
          className="w-full text-sm font-mono p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:font-sans placeholder:text-slate-400 leading-relaxed resize-y"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading || (!content && !sender && !subject && !url)}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Clear Form</span>
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg shadow-xs hover:shadow-sm transition-all"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Threat Signals...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Analyze Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
