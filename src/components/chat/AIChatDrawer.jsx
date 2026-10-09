import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  FileText,
  ShieldAlert,
  Loader2,
  ExternalLink,
  CornerDownLeft,
  Globe
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';
import { mockInsights } from '../../data/mockData';

export const AIChatDrawer = ({ isOpen, onClose, onViewEvidence, onOpenDocument }) => {
  const { t, currentLanguage, currentLangObj } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello! I am your MedJourney Health Copilot. I have indexed your **12 medical records** for patient **Rajesh V. Sharma**.\n\nYou can ask me about lab trends, previous vs latest report differences, medications, or questions for your doctor.`,
      sources: [
        { name: "October 2026 Blood Report (Dr. Lal PathLabs)", docId: "rep-001" },
        { name: "Apollo Spectra Prescription Slip (15 Sep 2026)", docId: "rep-002" }
      ],
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || isTyping) return;

    const userMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await apiService.askHealthCopilot(query, currentLanguage);
      const botMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: response.reply,
        sources: response.sources,
        canViewEvidence: response.canViewEvidence,
        evidenceParam: response.evidenceParam,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        text: "I encountered a momentary connection issue. Please check your network and try again.",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt) => {
    handleSend(prompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const suggestedPrompts = t.chat?.prompts || [
    "What changed in my latest report?",
    "Explain my latest blood test.",
    "Show my medication history.",
    "What should I discuss with my doctor?",
    "What has changed over the last 6 months?"
  ];

  return (
    <div className="chat-drawer animate-fade-in" role="dialog" aria-modal="true">
      {/* Header */}
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
          }}>
            <Bot size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t.chat?.title || "MedJourney Health Copilot"}
              </h3>
              <span className="badge badge-teal" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                Active
              </span>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              {t.chat?.subtitle || "Ask questions about your health records."}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-ghost"
          onClick={onClose}
          aria-label="Close Chat"
          style={{ padding: '6px' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Regional Language Active Indicator Banner */}
      <div style={{
        padding: '6px 16px',
        background: 'var(--bg-subtle)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.76rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Globe size={13} className="text-primary" />
          <span style={{ fontWeight: 600 }}>{t.chat?.respondingIn || `Responding in ${currentLangObj.native} ${currentLangObj.flag}`}</span>
        </div>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Grounded in Records</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="chat-messages-container">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`chat-message-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}
            >
              <div style={{ whiteSpace: 'pre-line', fontSize: '0.88rem' }}>
                {msg.text}
              </div>

              {/* Source Documents Citation */}
              {msg.sources && msg.sources.length > 0 && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: isUser ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--border-color)',
                  fontSize: '0.76rem'
                }}>
                  <div style={{ fontWeight: 700, marginBottom: '6px', opacity: 0.85 }}>
                    {t.chat?.sources || "Sources & Evidence:"}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {msg.sources.map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => onOpenDocument && onOpenDocument('/images/medical_report_scan.jpg')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          opacity: 0.9,
                          textDecoration: 'underline'
                        }}
                      >
                        <FileText size={12} />
                        <span>📄 {s.name}</span>
                      </div>
                    ))}
                  </div>

                  {msg.canViewEvidence && (
                    <div style={{ marginTop: '8px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const hemInsight = mockInsights[0];
                          if (onViewEvidence) onViewEvidence(hemInsight.evidenceData);
                        }}
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                          border: '1px solid var(--primary-border)'
                        }}
                      >
                        View Longitudinal Evidence →
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div style={{
                textAlign: 'right',
                fontSize: '0.68rem',
                opacity: 0.7,
                marginTop: '6px'
              }}>
                {msg.timestamp}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="chat-message-bubble chat-bubble-assistant" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Loader2 size={16} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Analyzing health records...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div style={{
        padding: '10px 16px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          {t.chat?.suggestedTitle || "Suggested Questions:"}
        </div>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {suggestedPrompts.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              className="badge badge-primary"
              onClick={() => handlePromptClick(prompt)}
              style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.76rem', padding: '5px 10px' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="chat-input-bar">
        <input
          type="text"
          className="chat-text-input"
          placeholder={t.chat?.placeholder || "Ask about your test results, medications, or trends..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSend()}
          disabled={!inputText.trim() || isTyping}
          style={{ width: '42px', height: '42px', padding: 0, borderRadius: 'var(--radius-md)' }}
        >
          <Send size={18} />
        </button>
      </div>

      {/* Persistent Chat Footer Safety Note */}
      <div style={{
        padding: '6px 16px',
        fontSize: '0.68rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)'
      }}>
        Answers synthesized solely from uploaded records. Informational only — not a diagnosis.
      </div>
    </div>
  );
};
