import { useState, useEffect, ComponentType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  HardDrive, 
  Terminal, 
  Cpu, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Info
} from 'lucide-react';

import dashboardImg from '../assets/screenshots/dashboard.png';
import detailsImg from '../assets/screenshots/details.png';
import diskpageImg from '../assets/screenshots/diskpage.png';
import terminalImg from '../assets/screenshots/terminal.png';
import apppanelImg from '../assets/screenshots/apppanel.png';

interface ScreenshotTab {
  id: string;
  label: string;
  description: string;
  detailedDescription: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  features: string[];
  image: string;
}

const tabs: ScreenshotTab[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Attention Center answering "what needs my attention today?"',
    detailedDescription: 'The dashboard shows lazy, fail-open attention cards - pending updates, system safety warnings, reclaimable disk space, recent activity, and AUR safety advisories. A command palette (Ctrl+K) lets you jump to any page or action instantly.',
    icon: LayoutDashboard,
    features: ['Attention Center cards', 'Command palette (Ctrl+K)', 'Multi-source grouping', 'Fail-open design'],
    image: dashboardImg,
  },
  {
    id: 'details',
    label: 'Package Details',
    description: 'Dependencies, PKGBUILD viewer, source comparison, trust hints.',
    detailedDescription: 'Deep-dive into any package: a drill-down dependency tree (Requires, Build, Provides, Conflicts), a first-class PKGBUILD viewer with risk scanning and diff-since-build, source-comparison panels for multi-source apps, and "why this source?" trust hints per package type.',
    icon: BookOpen,
    features: ['Dependency drill-down tree', 'PKGBUILD viewer', 'Source comparison', 'Trust hints'],
    image: detailsImg,
  },
  {
    id: 'diskpage',
    label: 'Clean Storage',
    description: 'Free up disk space by pruning cache, translations, and orphans.',
    detailedDescription: 'Scan and safely prune pacman package cache files, unused Flatpak translation files, and orphaned package dependencies. Reclaim gigabytes of system storage space in seconds.',
    icon: HardDrive,
    features: ['Orphan package removal', 'Cache cleanup', 'Flatpak lang pruning', 'Safe-delete flags'],
    image: diskpageImg,
  },
  {
    id: 'terminal',
    label: 'Terminal Output',
    description: 'Live activity line, failure summaries, and outcome-colored progress.',
    detailedDescription: 'Every transaction shows a current-activity line, a collapsible raw log with copy support, a friendly failure summary (auth, PGP, download, conflict, build), an outcome-colored progress bar, and an amber "completed with warnings" state for non-fatal issues.',
    icon: Terminal,
    features: ['Activity line', 'Friendly failure summary', 'Outcome-colored bar', 'Copy full log'],
    image: terminalImg,
  },
  {
    id: 'apppanel',
    label: 'System Health',
    description: 'Arch maintenance cockpit with 10+ system checks.',
    detailedDescription: 'System Health runs 10+ checks - DB-sync age, mirrorlist quality, pacman lock detection, .pacnew config files, orphaned packages, cache size, unused Flatpak runtimes, keyring freshness, and AUR index age. Each check offers a one-click safe action, including a gated "remove stale lock" that refuses while pacman is running.',
    icon: Cpu,
    features: ['Health checks', '.pacnew center', 'Keyring freshness', 'Mirror management'],
    image: apppanelImg,
  },
];

export function ScreenshotShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const activeTab = tabs[activeIdx];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % tabs.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev - 1 + tabs.length) % tabs.length);
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % tabs.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + tabs.length) % tabs.length);
  };

  return (
    <section id="screenshots" className="py-20 border-t border-slate-900/50 bg-[#07090e] relative overflow-hidden select-none">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-red-950/5 pointer-events-none select-none blur-3xl z-0" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-950/5 pointer-events-none select-none blur-3xl z-0" />

      <div className="max-w-6xl mx-auto px-4 space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-rose-950/15 border border-rose-900/30 rounded-full text-[10px] font-mono tracking-wider text-rose-400 mx-auto">
            APPLICATION IN ACTION
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Explore the Atlas Interface
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Take a look at how Atlas streamlines package management through its actual layouts, clean typography, and granular control pages.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Tabs Selector Navigation - Left Column (lg:4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 order-2 lg:order-1">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2.5 lg:pb-0 gap-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {tabs.map((tab, idx) => {
                const Icon = tab.icon;
                const isActive = idx === activeIdx;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-300 shrink-0 lg:shrink cursor-pointer group ${
                      isActive 
                        ? 'bg-[#121622] border-slate-700/80 shadow-lg shadow-black/30' 
                        : 'bg-[#0a0d14]/40 border-slate-900/60 hover:bg-[#0c101b]/60 hover:border-slate-800/80'
                    }`}
                  >
                    <div className={`p-2 rounded-lg border transition-colors ${
                      isActive 
                        ? 'bg-rose-950/30 border-rose-800/50 text-rose-455' 
                        : 'bg-slate-950 border-slate-850 text-slate-500 group-hover:text-slate-350'
                    }`}>
                      <Icon size={16} />
                    </div>

                    <div className="flex flex-col min-w-0 pr-2">
                      <span className={`text-[13px] font-semibold tracking-wide transition-colors ${
                        isActive ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}>
                        {tab.label}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate max-w-[200px] lg:max-w-none mt-0.5">
                        {tab.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Description & Feature highlights details card */}
            <div className="hidden lg:block bg-[#111420]/30 border border-slate-900/85 p-5 rounded-2xl space-y-4 mt-2">
              <div className="flex items-start gap-2.5">
                <Info size={14} className="text-rose-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {activeTab.detailedDescription}
                </p>
              </div>

              <div className="border-t border-slate-900/60 pt-3.5 space-y-2">
                <span className="text-[9px] font-mono font-semibold tracking-wider text-slate-500 block uppercase">
                  Highlights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTab.features.map((feature) => (
                    <span 
                      key={feature} 
                      className="px-2 py-0.5 bg-slate-900 border border-slate-850 text-[9px] font-semibold text-slate-400 rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Screenshot Showcase Frame - Right Column (lg:8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4 order-1 lg:order-2">
            
            {/* macOS / GNOME Styled Window Frame */}
            <div className="relative bg-[#111420] border border-slate-800 rounded-xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col group">
              
              {/* Window Header bar */}
              <div className="bg-[#0c0e16] px-4 py-3 flex items-center justify-between border-b border-slate-900/60 select-none">
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                <div className="text-[10px] font-mono font-bold text-slate-500 tracking-wider uppercase truncate max-w-[200px] sm:max-w-none">
                  Atlas - {activeTab.label}
                </div>

                <button 
                  onClick={() => setLightboxOpen(true)}
                  className="p-1 rounded-md text-slate-500 hover:text-white hover:bg-slate-900/60 transition-all cursor-pointer"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 size={12} />
                </button>
              </div>

              {/* Window Content / Image body */}
              <div 
                className="relative overflow-hidden cursor-zoom-in aspect-[16/10] bg-[#07090e]"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab.id}
                    src={activeTab.image}
                    alt={activeTab.label}
                    initial={{ opacity: 0, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </AnimatePresence>

                {/* Hover overlay with zoom hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-slate-800 rounded-lg flex items-center gap-2 text-xs font-semibold text-white shadow-xl">
                    <Maximize2 size={12} />
                    <span>Expand Screenshot</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile descriptions - only visible on sm/md */}
            <div className="block lg:hidden bg-[#111420]/30 border border-slate-900/80 p-4 rounded-xl space-y-3.5">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {activeTab.detailedDescription}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeTab.features.map((feature) => (
                  <span 
                    key={feature} 
                    className="px-2 py-0.5 bg-slate-900 border border-slate-850 text-[9px] font-semibold text-slate-405 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* --- SCREENSHOT LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 backdrop-blur-sm"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between py-2 px-4 border-b border-slate-900/60 select-none">
              <div className="flex flex-col">
                <span className="text-xs text-rose-500 font-mono font-bold tracking-widest">ATLAS SYSTEM INTERFACE</span>
                <span className="text-[14px] font-bold text-white tracking-wide">{activeTab.label}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[11px] font-mono text-slate-500">
                  {activeIdx + 1} / {tabs.length}
                </span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Lightbox Center Content */}
            <div className="relative flex-1 flex items-center justify-center my-6 group">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-slate-900/70 border border-slate-800 hover:border-slate-700 text-slate-450 hover:text-white transition-colors cursor-pointer z-10 opacity-60 hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Main Expanded Image */}
              <div className="max-w-[90vw] max-h-[75vh] border border-slate-800 rounded-xl overflow-hidden shadow-2xl shadow-black">
                <motion.img
                  key={activeTab.id}
                  src={activeTab.image}
                  alt={activeTab.label}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full object-contain max-h-[75vh]"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-slate-900/70 border border-slate-800 hover:border-slate-700 text-slate-450 hover:text-white transition-colors cursor-pointer z-10 opacity-60 hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Lightbox Footer Captions */}
            <div 
              className="bg-[#0b0e16] border border-slate-850 rounded-2xl max-w-2xl mx-auto p-4 sm:p-5 w-full flex flex-col gap-2 shadow-2xl text-center select-text"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[12px] text-slate-350 leading-relaxed">
                {activeTab.detailedDescription}
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center mt-1 select-none">
                {activeTab.features.map((feature) => (
                  <span 
                    key={feature} 
                    className="px-2 py-0.5 bg-slate-950 border border-slate-900 text-[9px] font-semibold text-slate-400 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
