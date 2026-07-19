import React, { useState } from 'react';
import { 
  Newspaper, 
  ChevronDown, 
  ChevronRight, 
  Circle,
  CheckCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsViewProps {}

interface MockNewsItem {
  id: string;
  title: string;
  date: string;
  unread: boolean;
  summary: string;
}

export const NewsView: React.FC<NewsViewProps> = () => {
  const [news, setNews] = useState<MockNewsItem[]>([
    {
      id: 'news-1',
      title: 'grub 2:2.12-5 requires manual intervention during upgrade',
      date: 'June 24, 2026',
      unread: true,
      summary: 'The latest grub package update requires users to run grub-install and grub-mkconfig manually if booting on EFI systems. Stale bootloaders in EFI system partitions might fail to boot with the new grub modules. Run: `grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB` followed by `grub-mkconfig -o /boot/grub/grub.cfg` before rebooting.'
    },
    {
      id: 'news-2',
      title: 'OpenSSL 3.5 update - manual config migration required',
      date: 'June 18, 2026',
      unread: true,
      summary: 'OpenSSL has been updated to version 3.5. Legacy engine configuration files at /etc/ssl/engines.cnf.d/ are no longer autoloaded by default. Users utilizing custom cryptographic engines must migrate their settings to the main openssl.cnf file under the engines section. Consult the official migration guide on the Arch wiki.'
    },
    {
      id: 'news-3',
      title: 'Python 3.14 is now available in [extra]',
      date: 'June 10, 2026',
      unread: false,
      summary: 'Python 3.14 has landed in the official repos. As a result, all python packages in the official repositories have been rebuilt. Users with custom Python packages installed from the AUR should rebuild them against the new Python interpreter using their AUR helper of choice (e.g., `yay -S --rebuild <aur-package>`).'
    }
  ]);

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'news-1': true // First one expanded by default
  });

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

    // Mark as read when expanded
    setNews(prevNews => 
      prevNews.map(item => 
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  const markAllRead = () => {
    setNews(prevNews => 
      prevNews.map(item => ({ ...item, unread: false }))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-display">Arch Linux News</h2>
          <p className="text-slate-400 text-xs mt-1">Official announcements and upgrade alerts.</p>
        </div>
        <button
          onClick={markAllRead}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#111420] border border-slate-800 hover:border-slate-700 text-[10px] font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* News List */}
      <div className="space-y-3">
        {news.map((item) => {
          const isExpanded = !!expandedItems[item.id];
          return (
            <div
              key={item.id}
              className={`bg-[#111420] border transition-colors duration-200 rounded-xl overflow-hidden ${
                item.unread ? 'border-blue-900/50 hover:border-blue-800/50' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header (clickable) */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-4 flex items-start space-x-3 cursor-pointer justify-between"
              >
                <div className="flex items-start space-x-3 min-w-0">
                  {/* Unread indicator */}
                  <div className="mt-1 flex-shrink-0 w-3 h-3 flex items-center justify-center">
                    {item.unread ? (
                      <Circle className="w-2.5 h-2.5 text-blue-500 fill-blue-500" />
                    ) : (
                      <Circle className="w-2 h-2 text-slate-700 fill-transparent" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className={`text-xs font-bold truncate leading-relaxed ${
                      item.unread ? 'text-slate-100' : 'text-slate-300'
                    }`}>
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 block mt-1">{item.date}</span>
                  </div>
                </div>

                <div className="text-slate-500 pl-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </div>

              {/* Expandable Body */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-slate-900 text-[11px] text-slate-400 leading-relaxed font-mono whitespace-pre-wrap bg-[#0e111b] select-text">
                      {item.summary}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
