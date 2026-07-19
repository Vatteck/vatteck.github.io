import React, { useState } from 'react';
import { Terminal, Copy, Check, ChevronRight, BookOpen, GitBranch, ShieldAlert } from 'lucide-react';

interface InstallMethod {
  id: string;
  name: string;
  badge: string;
  description: string;
  commands: string[];
}

export const InstallGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('aur');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const installationMethods: InstallMethod[] = [
    {
      id: 'aur',
      name: 'AUR Helper (Arch & CachyOS)',
      badge: 'Recommended',
      description: 'The standard and fastest way. Install the stable release using an AUR helper such as yay or paru. Prefer atlas-pm (versioned releases); atlas-pm-git tracks HEAD for bleeding-edge builds.',
      commands: [
        'yay -S atlas-pm',
        '# or for the latest development build:',
        'yay -S atlas-pm-git',
        '# launch the graphical client',
        'atlas'
      ]
    },
    {
      id: 'binary',
      name: 'PKGBUILD Local Build',
      badge: 'Advanced',
      description: 'Clone the PKGBUILD script directly from the Atlas repository and launch makepkg to compile it locally using official tools.',
      commands: [
        'git clone https://github.com/Vatteck/atlas.git',
        'cd atlas/linux_dist/arch',
        '# build and install with pacman dependencies',
        'makepkg -si',
        '# launch the client',
        'atlas'
      ]
    },
    {
      id: 'source',
      name: 'Run from Source (Development)',
      badge: 'Hackers',
      description: 'Requires Python 3.10+, GTK3, and WebKit2Gtk system libraries. Excellent if you want to inspect Python codes or write custom gems.',
      commands: [
        '# 1. Install Arch system prerequisites',
        'sudo pacman -S --needed python python-pip gtk3 webkit2gtk python-gobject git',
        '# 2. Get code & enter virtual environment',
        'git clone https://github.com/Vatteck/atlas.git && cd atlas',
        'python -m venv venv && source venv/bin/activate',
        '# 3. Pip install dependencies and editable local build',
        'pip install -r requirements.txt',
        'pip install -e .',
        '# 4. Launch with detailed debug logging',
        'atlas --logs'
      ]
    }
  ];

  const handleCopy = (commandsArray: string[], index: number) => {
    // Stringify commands excluding comments
    const cleanCommands = commandsArray
      .filter(line => !line.trim().startsWith('#'))
      .join('\n');
    
    navigator.clipboard.writeText(cleanCommands);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };

  const currentMethod = installationMethods.find(m => m.id === activeTab) || installationMethods[0];

  return (
    <div className="w-full bg-[#111420] border border-slate-800 rounded-2xl overflow-hidden select-none">
      {/* Tab selectors */}
      <div className="flex border-b border-slate-900 bg-[#0c0f17]">
        {installationMethods.map(method => (
          <button
            key={method.id}
            onClick={() => setActiveTab(method.id)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 font-display ${
              activeTab === method.id 
                ? 'border-atlas-red-bright text-white bg-[#111420]' 
                : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'
            }`}
          >
            <span>{method.name.split(' (')[0]}</span>
            <span className={`hidden sm:inline-block text-[9px] px-1.5 py-0.2 rounded font-mono ${
              method.id === 'aur' 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' 
                : 'bg-slate-800 text-slate-400'
            }`}>
              {method.badge}
            </span>
          </button>
        ))}
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <p className="text-slate-250 font-medium text-xs sm:text-sm">{currentMethod.name}</p>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">{currentMethod.description}</p>
        </div>

        {/* Code shell container */}
        <div className="relative rounded-xl border border-slate-900 bg-[#05060b] overflow-hidden group">
          
          {/* Header row mockup */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-900 bg-[#090b10] text-[10px] uppercase font-bold tracking-wider font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <Terminal size={12} className="text-rose-550" />
              <span>Shell Console Container</span>
            </div>
            
            <button
              onClick={() => handleCopy(currentMethod.commands, 0)}
              className="flex items-center gap-1 hover:text-slate-300 cursor-pointer transition-colors text-slate-500 bg-[#0f131d] px-2 py-0.5 rounded border border-slate-800"
              title="Copy active clean script commands"
            >
              {copiedIndex === 0 ? (
                <>
                  <Check size={11} className="text-emerald-400" />
                  <span className="text-emerald-400 font-mono text-[9px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span className="font-mono text-[9px]">Copy block</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal output */}
          <div className="p-4 font-mono text-xs text-slate-300 select-all overflow-x-auto space-y-1">
            {currentMethod.commands.map((cmd, idx) => {
              const isComment = cmd.trim().startsWith('#');
              return (
                <div key={idx} className="flex min-w-max font-mono">
                  {!isComment ? (
                    <span className="text-[#e2e8f0]/40 mr-3 select-none pointer-events-none font-mono">$</span>
                  ) : (
                    <span className="mr-3 select-none pointer-events-none font-mono"> </span>
                  )}
                  <span className={`font-mono font-medium ${isComment ? 'text-slate-500 italic' : 'text-rose-300/90'}`}>
                    {cmd}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* System info warnings and guidelines */}
        {activeTab === 'source' && (
          <div className="p-3.5 bg-rose-950/10 border border-rose-900/40 rounded-xl flex items-start gap-2.5 text-xs text-rose-350 leading-relaxed font-sans mt-2">
            <ShieldAlert size={16} className="text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1 text-slate-400">
              <span className="text-rose-400 font-bold font-display select-none">System Dependencies Warning:</span>
              <p>Atlas uses a pywebview graphical UI which bridges system GTK3 and WebKit2Gtk libraries. If you observe WebKit connection crashes, ensure your GPU drivers are configured correctly and run <code className="font-mono text-[11px] text-indigo-400 bg-slate-900 px-1 py-0.2 rounded font-semibold select-all">atlas --logs</code> to enable the WebKit inspector for debugging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
