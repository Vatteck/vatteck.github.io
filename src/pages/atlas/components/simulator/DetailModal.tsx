import React, { useState } from 'react';
import { AppPackage, PackageSource } from '../../types';
import { 
  X, 
  ExternalLink, 
  Shield, 
  Star, 
  Package, 
  FileCode, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  Info,
  GitCommit,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DetailModalProps {
  pkg: AppPackage | null;
  onClose: () => void;
  onInstall: (pkg: AppPackage) => void;
  onUninstall: (pkg: AppPackage) => void;
  onOpenPkgbuild: () => void;
}

type TabType = 'overview' | 'details' | 'dependencies' | 'history';

export const DetailModal: React.FC<DetailModalProps> = ({
  pkg,
  onClose,
  onInstall,
  onUninstall,
  onOpenPkgbuild
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedDeps, setExpandedDeps] = useState<Record<string, boolean>>({
    required: true,
    optional: false,
    build: false
  });

  if (!pkg) return null;

  const toggleDepGroup = (group: string) => {
    setExpandedDeps(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const getSourcePillStyles = (src: PackageSource) => {
    switch (src) {
      case 'Arch': return 'bg-blue-950 text-blue-400 border-blue-900/50';
      case 'AUR': return 'bg-amber-950 text-amber-400 border-amber-900/50';
      case 'Flatpak': return 'bg-purple-950 text-purple-400 border-purple-900/50';
      case 'AppImage': return 'bg-pink-950 text-pink-400 border-pink-900/50';
    }
  };

  const getReputationColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-900/50 bg-emerald-950/20';
    if (score >= 50) return 'text-amber-400 border-amber-900/50 bg-amber-950/20';
    return 'text-rose-400 border-rose-900/50 bg-rose-950/20';
  };

  // Mock details values
  const mockLicense = pkg.license || 'GPL-3.0-or-later';
  const mockUrl = pkg.url || `https://github.com/archlinux/${pkg.name}`;
  const mockSize = pkg.sizeGb ? `${(pkg.sizeGb * 1024).toFixed(0)} MiB` : '42.5 MiB';
  const mockPackager = pkg.packager || 'Arch Build System <pacman@archlinux.org>';
  const mockBuildDate = '2026-06-20 14:32 UTC';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl h-[85vh] bg-[#090b11] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950/20">
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl ${pkg.iconBg} shadow-lg`}>
              {pkg.iconText}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-100">{pkg.name}</h1>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getSourcePillStyles(pkg.selectedSource)}`}>
                  {pkg.selectedSource}
                </span>
                {pkg.repo && (
                  <span className="text-[9px] text-slate-500 font-mono">[{pkg.repo}]</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">{pkg.version}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#111420] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/10">
          {(['overview', 'details', 'dependencies', 'history'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-xs font-bold capitalize transition-colors relative cursor-pointer ${
                activeTab === tab ? 'text-slate-100' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-t" />
              )}
            </button>
          ))}
        </div>

        {/* Modal Content Area */}
        <div className="flex-grow overflow-y-auto p-6 min-h-0 select-text">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {/* 1. Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display select-none">Description</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{pkg.description}</p>
                  </div>

                  {/* Rich Badges Grid */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display select-none">Subsystem Audit</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 select-none">
                      {pkg.selectedSource === 'AUR' ? (
                        <>
                          <div className="bg-[#111420] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">AUR Votes</span>
                            <span className="text-xs font-mono font-bold text-slate-300">▲ {pkg.votes || 114}</span>
                          </div>
                          <div className="bg-[#111420] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Popularity</span>
                            <span className="text-xs font-mono font-bold text-slate-300">{pkg.popularity || 4.2}%</span>
                          </div>
                          <div className="bg-[#111420] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Build Target</span>
                            <span className="text-xs font-bold text-amber-400 capitalize">{pkg.aurBuildType || 'source'}</span>
                          </div>
                        </>
                      ) : pkg.selectedSource === 'Flatpak' ? (
                        <>
                          <div className="bg-[#111420] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Verified Publisher</span>
                            <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-0.5">
                              <CheckCircle className="w-3 h-3 text-emerald-400 inline" />
                              <span>Verified</span>
                            </span>
                          </div>
                          <div className="bg-[#111420] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Source License</span>
                            <span className="text-[10px] font-bold text-slate-300">Proprietary</span>
                          </div>
                          <div className="bg-[#111420] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Runtime Sandbox</span>
                            <span className="text-[10px] font-bold text-purple-400">Sandboxed</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-[#111420] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Repository</span>
                            <span className="text-xs font-mono font-bold text-blue-400">[{pkg.repo}]</span>
                          </div>
                          <div className="bg-[#111420] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Verification</span>
                            <span className="text-[10px] font-bold text-emerald-400">PGP Signed</span>
                          </div>
                          <div className="bg-[#111420] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Packager Trust</span>
                            <span className="text-[10px] font-bold text-slate-300">Trusted Core Dev</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* AUR Reputation / PKGBUILD Button */}
                  {pkg.selectedSource === 'AUR' && (
                    <div className="bg-[#161a29]/40 border border-slate-800 rounded-xl p-4 flex items-center justify-between select-none">
                      <div className="flex items-center space-x-3">
                        <div className={`text-xs font-bold border rounded-lg p-2 flex flex-col items-center justify-center w-12 h-12 ${getReputationColor(72)}`}>
                          <span className="text-[9px] text-slate-500 uppercase font-semibold">Score</span>
                          <span className="text-xs font-mono font-bold mt-0.5">72</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">AUR Maintainer Reputation</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Covers package longevity, update frequency, and risk scans.</p>
                        </div>
                      </div>
                      <button
                        onClick={onOpenPkgbuild}
                        className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <FileCode className="w-3.5 h-3.5" />
                        <span>Review PKGBUILD</span>
                      </button>
                    </div>
                  )}

                  {/* Source Comparison Panel */}
                  {pkg.sources && pkg.sources.length > 1 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display select-none">Available Package Channels</h3>
                      <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-900 select-none">
                        {pkg.sources.map((src) => {
                          const isSelected = pkg.selectedSource === src;
                          let trustText = '';
                          if (src === 'Arch') trustText = 'Official repository, signed packages';
                          if (src === 'AUR') trustText = 'Community-maintained, review PKGBUILD';
                          if (src === 'Flatpak') trustText = 'Sandboxed runtime, Flathub publisher';
                          if (src === 'AppImage') trustText = 'Portable standalone, unconfined';

                          return (
                            <div 
                              key={src} 
                              className={`p-3.5 flex items-center justify-between text-xs transition-colors ${
                                isSelected ? 'bg-[#121626]/40' : 'hover:bg-slate-950/10'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getSourcePillStyles(src)}`}>
                                  {src}
                                </span>
                                <span className="text-[10px] text-slate-400 truncate max-w-[200px] md:max-w-xs">{trustText}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-[10px] font-mono text-slate-500">{pkg.version}</span>
                                {isSelected && (
                                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-900/50 px-1.5 py-0.5 rounded-full select-none">
                                    Active
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Key/Value Grid */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden select-none">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950/35 border-b border-slate-800 text-[10px] text-slate-500 uppercase font-bold">
                          <th className="p-3">Parameter</th>
                          <th className="p-3">System Variable Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-300 font-mono">
                        <tr>
                          <td className="p-3 text-slate-500 font-semibold select-none font-sans">Version</td>
                          <td className="p-3 text-slate-200">{pkg.version}</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-500 font-semibold select-none font-sans">Source Channel</td>
                          <td className="p-3 text-slate-200">{pkg.selectedSource}</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-500 font-semibold select-none font-sans">Architecture</td>
                          <td className="p-3 text-slate-200">x86_64</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-500 font-semibold select-none font-sans">License</td>
                          <td className="p-3 text-slate-200 select-all">{mockLicense}</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-500 font-semibold select-none font-sans">Packager</td>
                          <td className="p-3 text-slate-200">{mockPackager}</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-500 font-semibold select-none font-sans">Source URL</td>
                          <td className="p-3 text-blue-400 truncate max-w-xs md:max-w-md select-all">
                            <a href={mockUrl} target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center space-x-1">
                              <span>{mockUrl}</span>
                              <ExternalLink className="w-3 h-3 text-blue-400 inline" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-500 font-semibold select-none font-sans">Installed Size</td>
                          <td className="p-3 text-slate-200">{mockSize}</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-500 font-semibold select-none font-sans">Build Date</td>
                          <td className="p-3 text-slate-400">{mockBuildDate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Installed Files (Only if installed) */}
                  {pkg.isInstalled && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display select-none">Installed Files (pacman -Ql)</h3>
                      <div className="bg-[#0e111b] border border-slate-900 rounded-xl p-3.5 font-mono text-[10px] text-slate-400 space-y-1.5 max-h-48 overflow-y-auto select-all">
                        <div>/usr/bin/{pkg.id}</div>
                        <div>/usr/share/applications/{pkg.id}.desktop</div>
                        <div>/usr/share/licenses/{pkg.id}/LICENSE</div>
                        <div>/usr/share/man/man1/{pkg.id}.1.gz</div>
                        <div>/usr/share/pixmaps/{pkg.id}.png</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Dependencies Tab */}
              {activeTab === 'dependencies' && (
                <div className="space-y-4 max-w-2xl select-none">
                  {/* Required Dependencies */}
                  <div className="bg-[#111420] border border-slate-800 rounded-xl overflow-hidden">
                    <div
                      onClick={() => toggleDepGroup('required')}
                      className="p-3 bg-slate-950/20 flex items-center justify-between cursor-pointer border-b border-slate-900"
                    >
                      <span className="text-xs font-bold text-slate-200">Required Dependencies (5)</span>
                      <div className="text-slate-500">
                        {expandedDeps.required ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </div>
                    {expandedDeps.required && (
                      <div className="p-4 divide-y divide-slate-900/50 font-mono text-[11px] text-slate-300">
                        <div className="py-2 flex justify-between"><span>glibc</span><span className="text-slate-500">2.39-4</span></div>
                        <div className="py-2 flex justify-between"><span>gcc-libs</span><span className="text-slate-500">14.1.1-1</span></div>
                        <div className="py-2 flex justify-between"><span>qt6-base</span><span className="text-slate-500">6.7.1-2</span></div>
                        <div className="py-2 flex justify-between"><span>libx11</span><span className="text-slate-500">1.8.9-1</span></div>
                        <div className="py-2 flex justify-between"><span>dbus</span><span className="text-slate-500">1.14.10-2</span></div>
                      </div>
                    )}
                  </div>

                  {/* Optional Dependencies */}
                  <div className="bg-[#111420] border border-slate-800 rounded-xl overflow-hidden">
                    <div
                      onClick={() => toggleDepGroup('optional')}
                      className="p-3 bg-slate-950/20 flex items-center justify-between cursor-pointer border-b border-slate-900"
                    >
                      <span className="text-xs font-bold text-slate-200">Optional Dependencies (2)</span>
                      <div className="text-slate-500">
                        {expandedDeps.optional ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </div>
                    {expandedDeps.optional && (
                      <div className="p-4 divide-y divide-slate-900/50 font-mono text-[11px] text-slate-300">
                        <div className="py-2 flex flex-col md:flex-row md:justify-between items-start md:items-center">
                          <span>python-notify2</span>
                          <span className="text-[10px] text-slate-500 font-sans italic">Send host desktop notifications</span>
                        </div>
                        <div className="py-2 flex flex-col md:flex-row md:justify-between items-start md:items-center">
                          <span>xdg-utils</span>
                          <span className="text-[10px] text-slate-500 font-sans italic">For opening default web links</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Build Dependencies (AUR Only) */}
                  {pkg.selectedSource === 'AUR' && (
                    <div className="bg-[#111420] border border-slate-800 rounded-xl overflow-hidden">
                      <div
                        onClick={() => toggleDepGroup('build')}
                        className="p-3 bg-slate-950/20 flex items-center justify-between cursor-pointer border-b border-slate-900"
                      >
                        <span className="text-xs font-bold text-slate-200">Build-time Dependencies (3)</span>
                        <div className="text-slate-500">
                          {expandedDeps.build ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </div>
                      </div>
                      {expandedDeps.build && (
                        <div className="p-4 divide-y divide-slate-900/50 font-mono text-[11px] text-slate-300">
                          <div className="py-2 flex justify-between"><span>cmake</span><span className="text-slate-500">3.29.3-1</span></div>
                          <div className="py-2 flex justify-between"><span>git</span><span className="text-slate-500">2.45.2-1</span></div>
                          <div className="py-2 flex justify-between"><span>nodejs</span><span className="text-slate-500">22.2.0-1</span></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 4. History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-4 max-w-xl select-none">
                  {pkg.isInstalled ? (
                    <div className="relative border-l border-slate-800 pl-6 ml-3 space-y-6 py-2">
                      <div className="relative">
                        <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-emerald-500 shadow shadow-emerald-500" />
                        <div className="text-xs font-bold text-slate-200">Installed on this machine</div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">2026-06-25 10:14 UTC</span>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-slate-700" />
                        <div className="text-xs font-bold text-slate-300">Updated from version v1.2.35 → v1.2.37</div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">2026-06-18 09:12 UTC</span>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-slate-700" />
                        <div className="text-xs font-bold text-slate-300">Initial registration into sandbox keyring</div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">2026-06-12 18:22 UTC</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#111420] border border-slate-800 rounded-xl p-8 text-center space-y-2 select-none">
                      <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                      <h3 className="text-xs font-bold text-slate-300">No Transaction History</h3>
                      <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                        Transaction logs will populate here once you install, remove, or update this package.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 flex justify-end items-center bg-slate-950/20 select-none">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            {pkg.isInstalled ? (
              <button
                onClick={() => {
                  onUninstall(pkg);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-rose-750 hover:bg-rose-650 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Uninstall Package
              </button>
            ) : (
              <button
                onClick={() => {
                  onInstall(pkg);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-650 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Install Package
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
