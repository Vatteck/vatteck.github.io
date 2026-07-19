import React, { useState } from 'react';
import { SidebarTab, PacnewFile } from '../../types';
import { 
  RefreshCw, 
  Radio, 
  Lock, 
  Key, 
  BookOpen, 
  FileText, 
  Puzzle, 
  HardDrive, 
  Package, 
  Wrench, 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HealthViewProps {
  onNavigate: (tab: SidebarTab) => void;
  pacnewFiles: PacnewFile[];
  onResolvePacnew: (path: string, mode: 'discard' | 'apply') => void;
}

export const HealthView: React.FC<HealthViewProps> = ({
  onNavigate,
  pacnewFiles,
  onResolvePacnew
}) => {
  const [viewingPacnews, setViewingPacnews] = useState(false);
  const [expandedChecks, setExpandedChecks] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const toggleCheckDetails = (id: string) => {
    setExpandedChecks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 10 Health Checks Definition
  const healthChecks = [
    {
      id: 'db_sync',
      name: 'Database sync',
      status: 'attention' as const,
      icon: RefreshCw,
      detail: 'Package databases last synced 7d ago. Update from the Updates page (a full upgrade - never a bare sync).',
      actionLabel: 'Open Updates',
      actionHandler: () => onNavigate('updates')
    },
    {
      id: 'mirrors',
      name: 'Mirror list',
      status: 'ok' as const,
      icon: Radio,
      detail: 'Can be refreshed with reflector to use the fastest mirrors.',
      actionLabel: 'Regenerate',
      actionHandler: () => showToast('Mirrorlist regenerated successfully!')
    },
    {
      id: 'pacman_lock',
      name: 'Pacman lock',
      status: 'ok' as const,
      icon: Lock,
      detail: 'No stale database lock (/var/lib/pacman/db.lck).'
    },
    {
      id: 'keyring',
      name: 'Keyring freshness',
      status: 'ok' as const,
      icon: Key,
      detail: 'archlinux-keyring updated 7 days ago. Keyring is automatically verified before package installation.',
      hasDetails: true,
      extraDetails: 'Status: Up to date\nSignature verification: Enabled\nTrust level: Complete'
    },
    {
      id: 'aur_index',
      name: 'AUR index',
      status: 'ok' as const,
      icon: BookOpen,
      detail: 'AUR package index refreshed 0 days ago.',
      hasDetails: true,
      extraDetails: 'Cache size: 3.2 MB\nLast download duration: 1.2s\nTotal AUR package count: 91,482',
      actionLabel: 'Refresh index',
      actionHandler: () => showToast('AUR package index refreshed!')
    },
    {
      id: 'pacnew',
      name: 'Config files (.pacnew)',
      status: pacnewFiles.some(f => !f.resolved) ? ('attention' as const) : ('ok' as const),
      icon: FileText,
      detail: pacnewFiles.some(f => !f.resolved)
        ? `${pacnewFiles.filter(f => !f.resolved).length} config files left by updates need review and merging.`
        : 'All system configuration files are clean and merged.',
      actionLabel: pacnewFiles.some(f => !f.resolved) ? 'Review files' : undefined,
      actionHandler: () => setViewingPacnews(true)
    },
    {
      id: 'orphans',
      name: 'Orphan packages',
      status: 'attention' as const,
      icon: Puzzle,
      detail: '2 packages installed as dependencies but no longer required by anything.',
      actionLabel: 'Review & remove',
      actionHandler: () => showToast('Orphans removed: lib32-gconf, python-notify2')
    },
    {
      id: 'pkg_cache',
      name: 'Package cache',
      status: 'info' as const,
      icon: HardDrive,
      detail: '19.48 GB in the pacman cache. Cleaning keeps the cache for installed packages, so downgrades still work.',
      actionLabel: 'Clean cache',
      actionHandler: () => showToast('Pacman cache cleaned! Freed 14.2 GB.')
    },
    {
      id: 'flatpak_unused',
      name: 'Flatpak runtimes',
      status: 'info' as const,
      icon: Package,
      detail: 'Remove Flatpak runtimes and extensions that no installed app uses.',
      actionLabel: 'Remove unused',
      actionHandler: () => showToast('Removed 2 unused Flatpak runtimes.')
    },
    {
      id: 'chroot',
      name: 'AUR clean-chroot builds',
      status: 'ok' as const,
      icon: Wrench,
      detail: 'AUR packages build in an isolated clean chroot environment.',
      actionLabel: 'Settings',
      actionHandler: () => onNavigate('settings')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 select-none"
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
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!viewingPacnews ? (
          /* Main System Health Dashboard */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-display">System Health</h2>
              <p className="text-slate-400 text-xs mt-1">Review critical subsystem configurations and optimization tasks.</p>
            </div>

            {/* Health Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              {healthChecks.map((check) => {
                const Icon = check.icon;
                const isExpanded = !!expandedChecks[check.id];
                
                let badgeColor = 'bg-emerald-950/45 text-emerald-400 border-emerald-900/50';
                let IconBadgeColor = 'bg-emerald-900/10 text-emerald-400';
                if (check.status === 'attention') {
                  badgeColor = 'bg-amber-950/45 text-amber-400 border-amber-900/50';
                  IconBadgeColor = 'bg-amber-900/10 text-amber-400';
                } else if (check.status === 'info') {
                  badgeColor = 'bg-sky-950/45 text-sky-400 border-sky-900/50';
                  IconBadgeColor = 'bg-sky-900/10 text-sky-400';
                }

                return (
                  <div
                    key={check.id}
                    className="bg-[#111420] border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
                  >
                    {/* Top Row: Icon + Name + Status */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`p-1.5 rounded-lg ${IconBadgeColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${badgeColor}`}>
                          {check.status === 'ok' ? 'OK' : check.status === 'attention' ? 'Attention' : 'Info'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200">{check.name}</h4>
                    </div>

                    {/* Middle Detail Section */}
                    <div className="flex-grow space-y-2">
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {check.detail}
                      </p>

                      {/* Expandable Keyring/AUR details */}
                      {check.hasDetails && (
                        <div className="space-y-1">
                          <button
                            onClick={() => toggleCheckDetails(check.id)}
                            className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center space-x-0.5 font-semibold"
                          >
                            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                            <span>Details</span>
                          </button>
                          {isExpanded && (
                            <pre className="text-[9px] font-mono bg-slate-950 p-2 rounded text-slate-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                              {check.extraDetails}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Button */}
                    {check.actionLabel && (
                      <button
                        onClick={check.actionHandler}
                        className={`w-full py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          check.status === 'attention'
                            ? 'bg-amber-950/20 border-amber-900/50 hover:bg-amber-950/40 text-amber-300 hover:border-amber-700'
                            : 'bg-slate-900 border-slate-800 hover:bg-[#181d30] hover:border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        {check.actionLabel}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Pacnew File Management Sub-View */
          <motion.div
            key="pacnew"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Header / Back */}
            <div className="space-y-2">
              <button
                onClick={() => setViewingPacnews(false)}
                className="flex items-center space-x-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to System Health</span>
              </button>
              <div>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-display">Config Files (.pacnew)</h2>
                <p className="text-slate-400 text-xs mt-1">Review new configuration defaults shipped by package maintainers.</p>
              </div>
            </div>

            {/* List of Pacnew Files */}
            <div className="space-y-4 max-w-3xl">
              {pacnewFiles.filter(f => !f.resolved).length === 0 ? (
                <div className="bg-[#111420] border border-slate-800 rounded-xl p-8 text-center space-y-3">
                  <div className="inline-flex p-3 rounded-full bg-emerald-950/45 text-emerald-400 border border-emerald-900/50">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-200">All Files Resolved</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    You have successfully merged or resolved all outstanding configuration backups.
                  </p>
                </div>
              ) : (
                pacnewFiles.filter(f => !f.resolved).map((file) => {
                  const isMirrorlist = file.path.includes('mirrorlist');
                  return (
                    <div
                      key={file.path}
                      className="bg-[#111420] border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
                    >
                      {/* File Details */}
                      <div className="space-y-2 min-w-0 flex-grow pr-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                            file.risk === 'danger'
                              ? 'bg-rose-950/45 text-rose-400 border-rose-900/50'
                              : 'bg-amber-950/45 text-amber-400 border-amber-900/50'
                          }`}>
                            {file.riskLabel} Risk
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">pkg: {file.package}</span>
                        </div>
                        <div className="text-xs font-mono font-bold text-slate-200 truncate select-all">
                          {file.path}
                        </div>
                        <p className="text-[10px] text-slate-400">
                          {isMirrorlist 
                            ? 'Do not manually overwrite mirrors. Regenerate using reflector instead.'
                            : `Review changes between current config and ${file.path.split('/').pop()}.`
                          }
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
                        <button
                          onClick={() => {
                            onResolvePacnew(file.path, 'discard');
                            showToast(`Discarded backup file: ${file.path}`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-colors"
                        >
                          Discard
                        </button>
                        
                        {!isMirrorlist ? (
                          <button
                            onClick={() => {
                              onResolvePacnew(file.path, 'apply');
                              showToast(`Applied config: ${file.path}`);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-bold shadow transition-colors"
                          >
                            Apply Backup
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-semibold italic px-2">
                            Regenerate instead
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
