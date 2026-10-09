import React from 'react';
import { Home, FileText, TrendingUp, Clock, MessageSquareText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MobileNav = ({ activeTab, onSelectTab, onOpenChat }) => {
  const { t } = useLanguage();

  const items = [
    { id: 'overview', label: "Overview", icon: Home },
    { id: 'records', label: "Records", icon: FileText },
    { id: 'trends', label: "Trends", icon: TrendingUp },
    { id: 'timeline', label: "Timeline", icon: Clock },
    { id: 'copilot', label: "Copilot", icon: MessageSquareText },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (item.id === 'copilot' && onOpenChat) {
                onOpenChat();
              } else {
                onSelectTab(item.id);
              }
            }}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
