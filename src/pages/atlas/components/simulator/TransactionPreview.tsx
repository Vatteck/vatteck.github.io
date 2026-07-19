import React, { useState } from 'react';
import { AppPackage } from '../../types';
import { 
  Shield, 
  AlertTriangle, 
  Terminal, 
  Copy, 
  Check, 
  FileCode, 
  HardDrive, 
  Package, 
  Download,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

interface TransactionPreviewProps {
  pkg: AppPackage | null;
  onCancel: () => void;
  onProceed: () => void;
  onViewPkgbuild: () => void;
}

export const TransactionPreview: React.FC<TransactionPreviewProps> = ({
  pkg,
  onCancel,
  onProceed,
  onViewPkgbuild
}) => {
  const [createSnapshot, setCreateSnapshot] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!pkg) return null;

  // Generate size estimates and equivalent CLI commands based on sources
  const getTransactionDetails = () => {
    switch (pkg.selectedSource) {
      case 'Arch':
        return {
          downloadSize: '18.4 MiB',
          installSize: '62.1 MiB',
          depsCount: 2,
          command: `sudo pacman -S ${pkg.name.toLowerCase()}`
        };
      case 'AUR':
        return {
          downloadSize: '2.1 MiB (src)',
          installSize: '48.9 MiB (built)',
          depsCount: 3,
          command: `yay -S ${pkg.name.toLowerCase()}`
        };
      case 'Flatpak':
        return {
          downloadSize: '82.4 MiB',
          installSize: '241.0 MiB',
          depsCount: 1, // runtimes
          command: `flatpak install flathub ${pkg.id}`
        };
      case 'AppImage':
        return {
          downloadSize: '41.5 MiB',
          installSize: '41.5 MiB',
          depsCount: 0,
          command: `atlas-cli install ${pkg.id}`
        };
    }
  };

  const details = getTransactionDetails();

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(details.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg bg-[#090b11] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/20">
          <div>
            <h1 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-display">Install Action</h1>
            <p className="text-[11px] text-slate-400 mt-1">Review the transaction plan before modifying root filesystems.</p>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded bg-[#111420] border border-slate-800 hover:border-slate-700 text-slate-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          
          {/* Target App Row */}
          <div className="bg-[#111420] border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${pkg.iconBg} shadow`}>
                {pkg.iconText}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">{pkg.name}</div>
                <span className="text-[9px] font-mono text-slate-500">{pkg.version}</span>
              </div>
            </div>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
              pkg.selectedSource === 'Arch'
                ? 'bg-blue-950 text-blue-400 border-blue-900/50'
                : pkg.selectedSource === 'AUR'
                ? 'bg-amber-950 text-amber-400 border-amber-900/50'
                : 'bg-purple-950 text-purple-400 border-purple-900/50'
            }`}>
              {pkg.selectedSource}
            </span>
          </div>

          {/* Transaction Summary Card */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-[#111420] border border-slate-800 rounded-lg p-3 text-center">
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Download</div>
              <div className="text-xs font-mono font-bold text-slate-300 mt-1">{details.downloadSize}</div>
            </div>
            <div className="bg-[#111420] border border-slate-800 rounded-lg p-3 text-center">
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Space Diff</div>
              <div className="text-xs font-mono font-bold text-slate-300 mt-1">+{details.installSize}</div>
            </div>
            <div className="bg-[#111420] border border-slate-800 rounded-lg p-3 text-center">
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Dependencies</div>
              <div className="text-xs font-mono font-bold text-slate-300 mt-1">+{details.depsCount} pkgs</div>
            </div>
          </div>

          {/* AUR Alert / Warning */}
          {pkg.selectedSource === 'AUR' && (
            <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3.5 flex items-start space-x-3 text-amber-400">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="text-[11px] font-bold">Unvetted Community Repository</h4>
                <p className="text-[10px] text-amber-400/80 leading-relaxed mt-0.5">
                  AUR packages build files from user-created PKGBUILD scripts. Review the instructions carefully to prevent execution of malicious code.
                </p>
              </div>
            </div>
          )}

          {/* Timeshift Note */}
          <div className="bg-[#111420] border border-slate-800 rounded-xl p-3 flex items-center space-x-3">
            <input
              type="checkbox"
              id="timeshift-checkbox"
              checked={createSnapshot}
              onChange={(e) => setCreateSnapshot(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <label htmlFor="timeshift-checkbox" className="text-[10.5px] text-slate-400 cursor-pointer font-semibold select-none flex-grow">
              Create system backup snapshot (Timeshift) before installing
            </label>
          </div>

          {/* CLI equivalent preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold px-1">
              <span>CLI System Equivalent</span>
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div className="bg-[#0a0d16] border border-slate-900 p-3 rounded-lg flex items-center justify-between font-mono text-[10.5px] select-text">
              <span className="text-slate-300 truncate pr-2">{details.command}</span>
              <button
                onClick={handleCopyCommand}
                className="p-1 rounded bg-[#111420] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 flex justify-between items-center bg-slate-950/20">
          <div>
            {pkg.selectedSource === 'AUR' ? (
              <button
                onClick={onViewPkgbuild}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5 text-amber-500" />
                <span>Review PKGBUILD</span>
              </button>
            ) : (
              <span className="text-[10px] text-slate-500 font-semibold italic">Official Package Verified</span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onCancel}
              className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onProceed}
              className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
