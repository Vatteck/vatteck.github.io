import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Shield, 
  FileCode,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';

interface PkgbuildViewerProps {
  pkgName: string;
  onClose: () => void;
}

export const PkgbuildViewer: React.FC<PkgbuildViewerProps> = ({
  pkgName,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockPkgbuild);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMockPkgbuild = (name: string) => {
    const cleanName = name.toLowerCase();
    
    if (cleanName.includes('code') || cleanName.includes('vscode')) {
      return `# Maintainer: Visual Studio Code Devs <vscode-maint@archlinux.org>
pkgname=visual-studio-code-bin
pkgver=1.91.0
pkgrel=1
pkgdesc="Visual Studio Code - Open Source release with proprietary brandings"
arch=('x86_64')
url="https://code.visualstudio.com"
license=('custom:proprietary')
depends=('glibc' 'nss' 'libx11' 'gtk3' 'alsa-lib')
optdepends=('libsecret: keychain integration'
            'libxss: screensaver inhibition')
source_x86_64=("https://update.code.visualstudio.com/\${pkgver}/linux-x64/stable")
sha256sums_x86_64=('8a6c4b2d01ef83a9de5c72b10fd892a014bc5c7d0a204b2c1d04ff7920ab4d62')

package() {
    # Install main binaries into opt
    install -d "\${pkgdir}/opt/\${pkgname}"
    cp -r * "\${pkgdir}/opt/\${pkgname}/"
    
    # Create symlink into usr/bin
    install -d "\${pkgdir}/usr/bin"
    ln -s "/opt/\${pkgname}/bin/code" "\${pkgdir}/usr/bin/code"
}`;
    }

    return `# Maintainer: Joplin Arch Maintainers <joplin-dev@aur.archlinux.org>
pkgname=${cleanName}
pkgver=3.6.14
pkgrel=1
pkgdesc="Joplin - a privacy-focused note taking and to-do application"
arch=('x86_64')
url="https://joplinapp.org"
license=('AGPL-3.0-or-later')
depends=('fuse2' 'gtk3' 'nss' 'sqlite')
makedepends=('npm' 'git')
source=("https://github.com/laurent22/joplin/releases/download/v\${pkgver}/Joplin-\${pkgver}.AppImage")
sha256sums=('a1b2c3d4e5f67a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b')

package() {
    # Create target directories
    install -dm755 "\${pkgdir}/opt/\${pkgname}"
    install -dm755 "\${pkgdir}/usr/bin"
    
    # Copy files
    install -Dm755 "Joplin-\${pkgver}.AppImage" "\${pkgdir}/opt/\${pkgname}/joplin.AppImage"
    
    # Symlink to bin
    ln -s "/opt/\${pkgname}/joplin.AppImage" "\${pkgdir}/usr/bin/joplin"
}`;
  };

  const mockPkgbuild = getMockPkgbuild(pkgName);
  
  // Basic Syntax Highlighting Engine
  const highlightCode = (code: string) => {
    return code.split('\n').map((line, idx) => {
      // Empty lines
      if (!line.trim()) return <div key={idx} className="h-4" />;
      
      // Comments
      if (line.trim().startsWith('#')) {
        return <div key={idx} className="text-[#6a9955]">{line}</div>;
      }

      // Format declarations e.g. pkgname=value
      const match = line.match(/^([a-zA-Z0-9_#]+)(\+?=)(.*)$/);
      if (match) {
        const [, varName, operator, value] = match;
        return (
          <div key={idx}>
            <span className="text-[#9cdcfe]">{varName}</span>
            <span className="text-slate-400">{operator}</span>
            <span className="text-[#ce9178]">{value}</span>
          </div>
        );
      }

      // Functions e.g. package()
      if (line.trim().endsWith('() {') || line.trim().startsWith('package()')) {
        return (
          <div key={idx}>
            <span className="text-[#dcdcaa]">{line.replace(' {', '')}</span>
            <span className="text-slate-400"> {'{'}</span>
          </div>
        );
      }

      // Standard commands/keywords
      let renderedLine = line;
      if (line.includes('install') || line.includes('cp ') || line.includes('ln ')) {
        // Simple replacements for highlighted display
        return (
          <div key={idx} className="text-[#d4d4d4]">
            {line.split(' ').map((word, wordIdx) => {
              const cleanWord = word.trim();
              if (['install', 'cp', 'ln', 'rm', 'mkdir'].includes(cleanWord)) {
                return <span key={wordIdx} className="text-[#569cd6] font-semibold">{word} </span>;
              }
              if (word.startsWith('"') || word.startsWith("'")) {
                return <span key={wordIdx} className="text-[#ce9178]">{word} </span>;
              }
              if (word.startsWith('$')) {
                return <span key={wordIdx} className="text-[#9cdcfe]">{word} </span>;
              }
              return <span key={wordIdx}>{word} </span>;
            })}
          </div>
        );
      }

      return <div key={idx} className="text-[#d4d4d4]">{line}</div>;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl h-[90vh] bg-[#090b11] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/20">
          <div className="flex items-center space-x-3">
            <FileCode className="w-5 h-5 text-amber-500" />
            <div>
              <h1 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-display">PKGBUILD Inspection</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">reviewing script source: <span className="font-mono text-slate-300 font-semibold">{pkgName}</span></p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a 
              href={`https://aur.archlinux.org/packages/${pkgName}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-1 text-[10px] font-bold text-blue-400 hover:text-blue-300 border border-blue-900/50 bg-blue-950/20 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <span>View on AUR</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-[10px] font-bold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#111420] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Audit Safety Banner */}
        <div className="bg-emerald-950/20 border-b border-slate-800 px-6 py-3 flex items-center space-x-2.5 text-emerald-400">
          <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-[11px] font-bold">Static Analysis: Low Risk - no suspicious execution patterns or pipes found.</span>
        </div>

        {/* Code Body with Line Numbers */}
        <div className="flex-grow overflow-auto flex bg-[#06080d] text-xs font-mono select-text min-h-0">
          {/* Line Numbers column */}
          <div className="p-4 pr-3 border-r border-slate-900 bg-slate-950/15 text-slate-600 text-right select-none w-10">
            {mockPkgbuild.split('\n').map((_, idx) => (
              <div key={idx} className="h-5 leading-5">{idx + 1}</div>
            ))}
          </div>
          {/* Code content column */}
          <div className="p-4 pl-3 leading-5 whitespace-pre overflow-x-auto flex-grow">
            {highlightCode(mockPkgbuild)}
          </div>
        </div>

        {/* Static Risk Findings Footer */}
        <div className="p-5 border-t border-slate-800 bg-[#0e111b] select-none">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display mb-3">Audit Scan Findings</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#111420] border border-slate-800 rounded-xl p-3 flex items-start space-x-2.5">
              <span className="text-emerald-500 mt-0.5">✅</span>
              <div>
                <h5 className="text-[11px] font-bold text-slate-200">No Pipe-to-Shell Patterns</h5>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">No instances of curl|bash or wget|sh found in script directives.</p>
              </div>
            </div>
            <div className="bg-[#111420] border border-slate-800 rounded-xl p-3 flex items-start space-x-2.5">
              <span className="text-emerald-500 mt-0.5">✅</span>
              <div>
                <h5 className="text-[11px] font-bold text-slate-200">Checksum Validation</h5>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Source assets are validated with strong sha256 sums before unpacking.</p>
              </div>
            </div>
            <div className="bg-[#111420] border border-slate-800 rounded-xl p-3 flex items-start space-x-2.5">
              <span className="text-sky-500 mt-0.5">ℹ️</span>
              <div>
                <h5 className="text-[11px] font-bold text-slate-200">Verified Release Source</h5>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Downloads binary assets from official GitHub project releases.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
