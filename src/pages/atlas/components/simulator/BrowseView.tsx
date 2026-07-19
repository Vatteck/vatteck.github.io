import React, { useState } from 'react';
import { SidebarTab, AppPackage } from '../../types';
import { 
  Gamepad2, 
  Globe, 
  Music, 
  Palette, 
  Code, 
  FileText, 
  Wrench, 
  Monitor,
  Flame,
  Zap,
  GitBranch,
  Box,
  Plus,
  Check,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BrowseViewProps {
  onNavigate: (tab: SidebarTab) => void;
  onSelectPackage: (pkg: AppPackage) => void;
  onInstallPackage: (pkg: AppPackage) => void;
  onQueuePackage: (pkg: AppPackage) => void;
  queuedPackages: string[];
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  onNavigate,
  onSelectPackage,
  onInstallPackage,
  onQueuePackage,
  queuedPackages
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const categories = [
    { id: 'games', name: 'Games', subtitle: 'Games, emulators & launchers', color: 'rose-600', icon: Gamepad2 },
    { id: 'internet', name: 'Internet', subtitle: 'Browsers, chat, torrents & network tools', color: 'blue-600', icon: Globe },
    { id: 'audio-video', name: 'Audio & Video', subtitle: 'Players, editors & audio tools', color: 'purple-600', icon: Music },
    { id: 'graphics', name: 'Graphics', subtitle: 'Image editors, viewers & design', color: 'pink-600', icon: Palette },
    { id: 'development', name: 'Development', subtitle: 'Editors, languages & dev tools', color: 'emerald-600', icon: Code },
    { id: 'office', name: 'Office', subtitle: 'Documents, spreadsheets & productivity', color: 'amber-600', icon: FileText },
    { id: 'utilities', name: 'Utilities', subtitle: 'Handy small tools & accessories', color: 'cyan-600', icon: Wrench },
    { id: 'system', name: 'System', subtitle: 'System, settings & desktop integration', color: 'slate-600', icon: Monitor },
  ];

  const aurBuckets = [
    { id: 'popular', name: 'Popular', detail: '🔥 60 packages', color: 'rose-700', icon: Flame },
    { id: 'recent', name: 'Recently updated', detail: '⚡ 60 packages', color: 'amber-700', icon: Zap },
    { id: 'vcs', name: 'VCS (-git)', detail: '🔀 60 packages', color: 'teal-700', icon: GitBranch },
    { id: 'bin', name: 'Binary (-bin)', detail: '📦 60 packages', color: 'indigo-700', icon: Box },
  ];

  const suggestedPackages: AppPackage[] = [
    {
      id: 'visual-studio-code-bin',
      name: 'visual-studio-code-bin',
      repo: 'aur',
      version: '1.91.0-1',
      description: 'Visual Studio Code - Open Source (Code - OSS) release with proprietary brandings.',
      sources: ['AUR', 'Flatpak'],
      selectedSource: 'AUR',
      isInstalled: false,
      iconText: 'C',
      iconBg: 'bg-blue-600',
      votes: 3512,
      popularity: 42.8,
      aurBuildType: 'binary',
      license: 'custom:proprietary',
      url: 'https://code.visualstudio.com'
    },
    {
      id: 'firefox',
      name: 'firefox',
      repo: 'extra',
      version: '127.0.2-1',
      description: 'Standalone web browser from Mozilla Project.',
      sources: ['Arch', 'Flatpak'],
      selectedSource: 'Arch',
      isInstalled: false,
      iconText: 'F',
      iconBg: 'bg-orange-600',
      license: 'MPL-2.0',
      url: 'https://www.mozilla.org/firefox'
    },
    {
      id: 'kodi',
      name: 'kodi',
      repo: 'extra',
      version: '21.0-4',
      description: 'Media player software application developed by the XBMC Foundation.',
      sources: ['Arch', 'Flatpak'],
      selectedSource: 'Arch',
      isInstalled: false,
      iconText: 'K',
      iconBg: 'bg-blue-800',
      license: 'GPL-2.0',
      url: 'https://kodi.tv'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      repo: 'flathub',
      version: '1.2.37.701',
      description: 'Music streaming client with DRM-restricted library.',
      sources: ['Flatpak', 'AUR'],
      selectedSource: 'Flatpak',
      isInstalled: false,
      iconText: 'S',
      iconBg: 'bg-emerald-600',
      license: 'custom:proprietary',
      url: 'https://spotify.com'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 select-none"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-[#161b2e] border border-slate-700 text-slate-200 px-4 py-3 rounded-lg shadow-xl flex items-center space-x-2 text-sm"
          >
            <span className="text-amber-500 font-bold">ℹ️</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-display">Browse Packages</h2>
        <p className="text-slate-400 text-xs mt-1">Discover software across all configured repositories.</p>
      </div>

      {/* Categories Section */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-slate-800 pb-2">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Browse by Category</h3>
          <span className="text-[10px] text-slate-500">official repos & Flatpak</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => showToast(`Category browsing ("${cat.name}") is available in the full app`)}
                className="bg-[#111420] border border-slate-800 hover:border-slate-700 rounded-xl p-3 flex items-center space-x-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className={`p-2 rounded-lg bg-${cat.color}/10 text-${cat.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{cat.name}</div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{cat.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AUR Section */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-slate-800 pb-2">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Discover on the AUR</h3>
          <span className="text-[10px] text-emerald-500 font-medium">community-maintained</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {aurBuckets.map((bucket) => {
            const Icon = bucket.icon;
            return (
              <div
                key={bucket.id}
                onClick={() => showToast(`AUR filter ("${bucket.name}") is available in the full app`)}
                className="bg-[#111420] border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between h-24 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className="flex justify-between items-start">
                  <div className={`p-1.5 rounded-lg bg-${bucket.color}/10 text-${bucket.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400">Buckets</span>
                </div>
                <div className="mt-2">
                  <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{bucket.name}</div>
                  <div className="text-[10px] font-semibold text-emerald-500 mt-0.5">{bucket.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Section */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-slate-800 pb-2">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Suggested for You</h3>
          <span className="text-[10px] text-slate-500">customized software recommendations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedPackages.map((pkg) => {
            const isQueued = queuedPackages.includes(pkg.id);
            return (
              <div
                key={pkg.id}
                className="bg-[#111420] border border-slate-800 rounded-xl p-4 flex items-start space-x-4 hover:border-slate-700 transition-colors cursor-pointer group"
                onClick={() => onSelectPackage(pkg)}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-base ${pkg.iconBg} flex-shrink-0 shadow-md`}>
                  {pkg.iconText}
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate">{pkg.name}</span>
                    <span className="text-[9px] font-mono text-slate-500 truncate">{pkg.version}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{pkg.description}</p>
                  
                  <div className="flex items-center space-x-2 mt-3" onClick={(e) => e.stopPropagation()}>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      pkg.selectedSource === 'AUR' 
                        ? 'bg-amber-950 text-amber-400 border border-amber-900/50' 
                        : pkg.selectedSource === 'Flatpak' 
                        ? 'bg-purple-950/50 text-purple-400 border border-purple-900/50' 
                        : 'bg-blue-950 text-blue-400 border border-blue-900/50'
                    }`}>
                      {pkg.selectedSource}
                    </span>
                    {pkg.selectedSource === 'AUR' && pkg.votes && (
                      <span className="text-[9px] font-mono text-slate-500">
                        ▲ {pkg.votes}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onQueuePackage(pkg)}
                    className={`p-1.5 rounded-lg border text-[10px] font-semibold transition-colors flex items-center justify-center space-x-1 ${
                      isQueued
                        ? 'bg-emerald-950/45 text-emerald-400 border-emerald-900/50 hover:bg-emerald-900/20'
                        : 'bg-[#181d30] border-slate-700 text-slate-300 hover:bg-[#202740] hover:text-white'
                    }`}
                    title={isQueued ? "Remove from Queue" : "Add to Transaction Queue"}
                  >
                    {isQueued ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span className="sr-only">{isQueued ? "Queued" : "Queue"}</span>
                  </button>
                  <button
                    onClick={() => onInstallPackage(pkg)}
                    className="p-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-[10px] flex items-center justify-center space-x-1 shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
