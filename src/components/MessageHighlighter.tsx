import React from 'react';

interface MessageHighlighterProps {
  content: string;
  highlightPhrases: string[];
}

interface Segment {
  text: string;
  isHighlighted: boolean;
}

export const MessageHighlighter: React.FC<MessageHighlighterProps> = ({
  content,
  highlightPhrases,
}) => {
  if (!content) return null;

  // Filter valid phrases
  const validPhrases = highlightPhrases
    .map((p) => p.trim())
    .filter((p) => p.length > 2);

  if (validPhrases.length === 0) {
    return (
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed select-text">
        {content}
      </div>
    );
  }

  // Escape special regex characters in phrases
  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(${validPhrases.map(escapeRegExp).join('|')})`, 'gi');

  const parts = content.split(pattern);

  const segments: Segment[] = parts.map((part) => {
    const isHighlighted = validPhrases.some(
      (phrase) => phrase.toLowerCase() === part.toLowerCase()
    );
    return { text: part, isHighlighted };
  });

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed select-text">
      {segments.map((seg, idx) =>
        seg.isHighlighted ? (
          <mark
            key={idx}
            className="bg-amber-100 text-amber-900 border-b-2 border-amber-500 font-semibold px-1 py-0.5 rounded-xs transition-colors hover:bg-amber-200"
            title="Suspicious or risk-bearing phrase detected"
          >
            {seg.text}
          </mark>
        ) : (
          <span key={idx}>{seg.text}</span>
        )
      )}
    </div>
  );
};
