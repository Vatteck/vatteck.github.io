import React, { useState, useEffect, useMemo } from 'react';
import { 
  AppPackage, 
  SidebarTab, 
  DiskItem, 
  ActivityLog, 
  AtlasSettings,
  PackageSource,
  PacnewFile,
  ThemePreset,
  AccentColor
} from '../types';
import { 
  Search, 
  RefreshCw, 
  LayoutDashboard, 
  CheckCircle, 
  Download, 
  HardDrive, 
  Activity, 
  Settings, 
  Sun, 
  HelpCircle, 
  Trash2, 
  Shield, 
  Terminal as TerminalIcon, 
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Pin,
  Lock,
  Cpu,
  Bookmark,
  Newspaper,
  Globe,
  FolderLock,
  FileCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowseView } from './simulator/BrowseView';
import { NewsView } from './simulator/NewsView';
import { HealthView } from './simulator/HealthView';
import { PermissionsView } from './simulator/PermissionsView';
import { DetailModal } from './simulator/DetailModal';
import { TransactionPreview } from './simulator/TransactionPreview';
import { PkgbuildViewer } from './simulator/PkgbuildViewer';

export const AppSimulator: React.FC<{ version?: string }> = ({ version }) => {
  // 1. Core State
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'All' | PackageSource>('All');
  
  // App packages database
  const [packages, setPackages] = useState<AppPackage[]>([
    {
      id: 'steam',
      name: 'steam',
      repo: 'multilib',
      version: 'v1.0.0.85-7',
      description: 'Digital distribution platform for video games. Steam provides DRM, social networking, multiplayer matchmaking, and video streaming.',
      sources: ['Arch', 'Flatpak', 'AppImage'],
      selectedSource: 'Arch',
      isInstalled: false,
      iconText: 'S',
      iconBg: 'bg-sky-600',
    },
    {
      id: 'kodi',
      name: 'kodi',
      repo: 'extra',
      version: 'v21.3-5',
      description: 'A free and open-source media player software application developed by the XBMC Foundation.',
      sources: ['Arch', 'Flatpak'],
      selectedSource: 'Arch',
      isInstalled: false,
      iconText: 'K',
      iconBg: 'bg-blue-600',
    },
    {
      id: 'spotify',
      name: 'Spotify',
      repo: 'flathub',
      version: 'v1.2.89.539.gfb3c63a3',
      description: 'Online proprietary music streaming service offering digital copyright restricted recorded audio, podcasts and video.',
      sources: ['Flatpak', 'AUR'],
      selectedSource: 'Flatpak',
      isInstalled: true,
      installedSource: 'Flatpak',
      iconText: 'S',
      iconBg: 'bg-emerald-600',
    },
    {
      id: 'zoom',
      name: 'Zoom',
      repo: 'flathub',
      version: 'v7.0.5.3034',
      description: 'Video Conferencing, Web Conferencing, Webinars, Screen Sharing and online meeting rooms.',
      sources: ['Flatpak', 'AUR'],
      selectedSource: 'Flatpak',
      isInstalled: false,
      iconText: 'Z',
      iconBg: 'bg-blue-500',
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      repo: 'flathub',
      version: 'v254.4.2518',
      description: 'Access your files securely from any computer or mobile device. Easily share large attachments with friends and colleagues.',
      sources: ['Flatpak', 'AUR'],
      selectedSource: 'Flatpak',
      isInstalled: false,
      iconText: 'D',
      iconBg: 'bg-blue-700',
    },
    {
      id: 'audacity',
      name: 'audacity',
      repo: 'extra',
      version: 'v1:3.7.7-2',
      description: 'No description available for this package. A multi-track audio editor and recorder.',
      sources: ['Arch', 'AppImage', 'Flatpak'],
      selectedSource: 'Arch',
      isInstalled: false,
      iconText: 'A',
      iconBg: 'bg-teal-600',
    },
    {
      id: 'etcher',
      name: 'Etcher',
      repo: 'resin-io',
      version: 'v2.0.0',
      description: 'Flash OS images to SD cards & USB drives, safely and easily. Prevents you from accidentally writing to your hard drives.',
      sources: ['AppImage'],
      selectedSource: 'AppImage',
      isInstalled: false,
      iconText: 'E',
      iconBg: 'bg-lime-600',
    },
    {
      id: 'freetube',
      name: 'FreeTube',
      repo: 'FreeTube',
      version: 'v0.24.0 Beta',
      description: 'An Open Source YouTube app for privacy. Watch your favorite videos and subscribe without any tracking cookies.',
      sources: ['AppImage', 'AUR', 'Flatpak'],
      selectedSource: 'AppImage',
      isInstalled: false,
      iconText: 'F',
      iconBg: 'bg-red-600',
    },
    {
      id: 'heroic',
      name: 'Heroic Games Launcher',
      repo: 'Heroic Games Launcher',
      version: 'v2.22.0',
      description: 'A games launcher for GOG, Epic Games, and Amazon Games on Linux, Windows and macOS using Wine/Proton.',
      sources: ['AppImage', 'Flatpak', 'AUR'],
      selectedSource: 'AppImage',
      isInstalled: false,
      iconText: 'H',
      iconBg: 'bg-indigo-600',
    },
    {
      id: 'joplin',
      name: 'Joplin',
      repo: 'aur',
      version: 'v3.6.14',
      subtext: 'privacy-focused note taking app',
      description: 'Joplin - the privacy-focused note taking app with sync capabilities for Windows, macOS, Linux, Android and iOS.',
      sources: ['AUR', 'Flatpak', 'AppImage'],
      selectedSource: 'AUR',
      isInstalled: false,
      votes: 114,
      aurBuildType: 'binary',
      iconText: 'J',
      iconBg: 'bg-blue-800',
    },
    {
      id: 'vlc',
      name: 'vlc',
      repo: 'extra',
      version: 'v3.0.23_2',
      description: 'Multimedia player and framework that plays most multimedia files as well as DVDs, Audio CDs, VCDs, and various streaming protocols.',
      sources: ['Arch', 'Flatpak', 'AppImage'],
      selectedSource: 'Arch',
      isInstalled: false,
      iconText: 'V',
      iconBg: 'bg-orange-500',
    },
    {
      id: 'obs-studio',
      name: 'obs-studio',
      repo: 'extra',
      version: 'v32.1.2-5',
      description: 'Free and open source software for video recording and live streaming.',
      sources: ['Arch', 'Flatpak', 'AUR'],
      selectedSource: 'Arch',
      isInstalled: false,
      iconText: 'O',
      iconBg: 'bg-blue-600',
    },
    {
      id: 'kdenlive',
      name: 'kdenlive',
      repo: 'extra',
      version: 'v26.04.1-1',
      description: 'Non-linear video editor developed by the KDE community, providing rich effects, timeline management, and multi-track control.',
      sources: ['Arch', 'Flatpak'],
      selectedSource: 'Arch',
      isInstalled: false,
      iconText: 'K',
      iconBg: 'bg-sky-500',
    },
    {
      id: 'gimp',
      name: 'gimp',
      repo: 'extra',
      version: 'v3.2.4-1',
      description: 'GNU Image Manipulation Program. Extremely powerful free graphics editor for photo retouching, image composition and image authoring.',
      sources: ['Arch', 'Flatpak', 'AppImage'],
      selectedSource: 'Arch',
      isInstalled: false,
      iconText: 'G',
      iconBg: 'bg-blue-600',
    },
    {
      id: 'cheese',
      name: 'cheese',
      repo: 'aur',
      version: 'v44.1-7',
      description: 'Take photos and videos with your webcam, with incredibly fun graphical effects and instant filters.',
      sources: ['AUR', 'Arch'],
      selectedSource: 'AUR',
      isInstalled: false,
      votes: 35,
      aurBuildType: 'source',
      isOutOfDate: true,
      iconText: 'C',
      iconBg: 'bg-amber-600',
    },
    {
      id: 'discord',
      name: 'Discord',
      repo: 'flathub',
      version: 'v0.1.0.141',
      description: 'All-in-one voice and text chat for gamers that is free, secure, and works on both your desktop and your phone.',
      sources: ['Flatpak', 'Arch', 'AUR', 'AppImage'],
      selectedSource: 'Flatpak',
      isInstalled: false,
      iconText: 'D',
      iconBg: 'bg-indigo-600',
    }
  ]);

  // Disk space state
  const [diskItems, setDiskItems] = useState<DiskItem[]>([
    { id: 'pacman-cache', name: 'pacman package cache', description: 'Previously downloaded packages keeping stored as pacman updates back-rolls', initialSizeGb: 5.4, currentSizeGb: 5.4, isCleaned: false },
    { id: 'orphans', name: 'Orphaned packages', description: 'Unused dependencies that are no longer requested by any installed package', initialSizeGb: 1.2, currentSizeGb: 1.2, isCleaned: false },
    { id: 'flatpak-runtimes', name: 'Unused Flatpak runtimes', description: 'Redundant runtime runtimes and regional language packs leftover from pruned App installs', initialSizeGb: 3.8, currentSizeGb: 3.8, isCleaned: false }
  ]);
  const [reclaimedDiskMb, setReclaimedDiskMb] = useState(0);

  // Settings state
  const [settings, setSettings] = useState<AtlasSettings>({
    enableTimeshift: true,
    enableAur: true,
    enableFlatpak: true,
    enableAppImage: true,
    flatpakLevel: 'System',
    enableNotifications: true,
    enableSuggestions: true,
    enableSnapsFallback: false,
    enableDebianFallback: false,
    theme: 'dark',
    accent: 'indigo',
    scanPkgbuilds: true,
    cleanChroot: true
  });

  // Pacnew files state
  const [pacnewFiles, setPacnewFiles] = useState<PacnewFile[]>([
    { path: '/etc/pacman.conf.pacnew', risk: 'warn', riskLabel: 'Medium', package: 'pacman', resolved: false },
    { path: '/etc/mkinitcpio.conf.pacnew', risk: 'warn', riskLabel: 'Medium', package: 'mkinitcpio', resolved: false },
    { path: '/etc/pacman.d/mirrorlist.pacnew', risk: 'danger', riskLabel: 'High', package: 'pacman-mirrorlist', resolved: false },
  ]);

  // Logs state
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: 'log-1', timestamp: '10:24:12 AM', action: 'update', pkgName: 'system-security-keys', status: 'success' },
    { id: 'log-2', timestamp: '11:15:45 AM', action: 'install', pkgName: 'spotify', source: 'Flatpak', status: 'success' }
  ]);

  // UI state for operations
  const [selectedPkgForInstall, setSelectedPkgForInstall] = useState<AppPackage | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<AppPackage | null>(null);
  const [showTransactionPreview, setShowTransactionPreview] = useState(false);
  const [showPkgbuildViewer, setShowPkgbuildViewer] = useState(false);
  const [queuedPackages, setQueuedPackages] = useState<string[]>([]);
  
  const [installStep, setInstallStep] = useState<null | 'password' | 'dependencies' | 'terminal' | 'success'>(null);
  const [sudoPassword, setSudoPassword] = useState('');
  const [providerSelection, setProviderSelection] = useState('1');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeshiftCheck, setTimeshiftCheck] = useState(true);
  const [cleaningId, setCleaningId] = useState<string | null>(null);

  // 2. Auxiliary Handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
  };

  // Switcher on app card
  const handleSourceChange = (pkgId: string, source: PackageSource) => {
    setPackages(packages.map(p => {
      if (p.id === pkgId) {
        // Mock a change of version info based on source selected
        let updatedVersion = p.version;
        let updatedRepo = p.repo;
        
        if (source === 'Arch') {
          updatedVersion = p.id === 'steam' ? 'v1.0.0.85-7' : 'v3.0.23_2';
          updatedRepo = 'extra';
        } else if (source === 'AUR') {
          updatedVersion = 'git-r2941.a4cd39';
          updatedRepo = 'aur';
        } else if (source === 'Flatpak') {
          updatedVersion = 'stable-flathub-24';
          updatedRepo = 'flathub';
        } else if (source === 'AppImage') {
          updatedVersion = 'v3.0-appimagehub';
          updatedRepo = 'AppImageHub';
        }

        return { 
          ...p, 
          selectedSource: source,
          version: updatedVersion,
          repo: updatedRepo
        };
      }
      return p;
    }));
  };

  // Launch simulated package installation
  const startInstallFlow = (pkg: AppPackage) => {
    setSelectedPkgForInstall(pkg);
    // Determine step based on settings
    setInstallStep('password');
    setSudoPassword('');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkgForInstall) return;

    if (selectedPkgForInstall.selectedSource === 'AUR') {
      setInstallStep('dependencies');
    } else {
      launchSimulatedTerminal();
    }
  };

  const handleDependenciesSubmit = () => {
    launchSimulatedTerminal();
  };

  const launchSimulatedTerminal = () => {
    setInstallStep('terminal');
    setTerminalOutput([]);
    
    if (!selectedPkgForInstall) return;
    const src = selectedPkgForInstall.selectedSource;
    const name = selectedPkgForInstall.name;
    const ver = selectedPkgForInstall.version;

    // Simulate logs with staggered timer
    const logs: string[] = [];

    const addLog = (text: string, delay: number) => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, text]);
      }, delay);
    };

    if (settings.enableTimeshift && timeshiftCheck) {
      addLog(`[timeshift] Creating automatic pre-transaction system snapshot...`, 100);
      addLog(`[timeshift] Snapshot TS-2026-06-03-01 successfully generated under /timeshift/snapshots/`, 500);
    }

    addLog(`:: Starting execution for pkg: ${name} (${src})`, 800);

    if (src === 'Arch') {
      addLog(`[pacman] synchronizing core, extra, multilib packages repos...`, 1100);
      addLog(`[pacman] resolving system dependencies for ${name}...`, 1400);
      addLog(`[pacman] package found: extra/${name} (version: ${ver})`, 1700);
      addLog(`[pacman] downloading transaction binary... [34.2 MiB]`, 1900);
      addLog(`(1/1) checking keys keyring integrity...`, 2200);
      addLog(`(1/1) checking system file conflicts...`, 2400);
      addLog(`(1/1) installing ${name}... [100%]`, 2700);
      addLog(`:: running post-transaction desktop file registry hooks...`, 3000);
    } else if (src === 'AUR') {
      addLog(`[aur-helper] preparing build directory /tmp/atlaspm@${name}-aur...`, 1100);
      addLog(`[aur-helper] cloning repository: https://aur.archlinux.org/${name}.git`, 1300);
      addLog(`[aur-helper] checking PKGBUILD signature authenticity...`, 1500);
      addLog(`[aur-helper] loading build provider dependencies...`, 1700);
      addLog(`[makepkg] launching GCC compilation compiler thread core...`, 1900);
      addLog(`[makepkg] comp: compile main_loop.c -o build/${name}.o (OK)`, 2200);
      addLog(`[makepkg] comp: packing compiled package binary files into zst...`, 2500);
      addLog(`sudo [pacman] installing compiled binary ${name}-${ver}.pkg.tar.zst...`, 2800);
    } else if (src === 'Flatpak') {
      addLog(`[flatpak] looking up Flathub Registry for ${name}...`, 1100);
      addLog(`[flatpak] requesting runtimes: org.freedesktop.Platform/x86_64/23.08...`, 1400);
      addLog(`[flatpak] pre-fetch download size: 85.1 MiB`, 1700);
      addLog(`[flatpak] transferring files from flathub... [100%]`, 2100);
      addLog(`[flatpak] configuring isolation namespaces...`, 2500);
      addLog(`[flatpak] registered flatpak app: ${name}`, 2800);
    } else {
      addLog(`[appimage] crawling AppImageHub feeds...`, 1100);
      addLog(`[appimage] fetching: https://appimagehub.com/download/${name}.AppImage`, 1400);
      addLog(`[appimage] caching local asset inside ~/.cache/atlaspm/appimages/`, 1800);
      addLog(`[appimage] adding sandbox executable +x permissions...`, 2200);
      addLog(`[appimage] app integrated inside desktop launcher.`, 2700);
    }

    addLog(`:: TRANSACTION TERMINATED SUCCESSFULLY. OK.`, 3300);

    // After compilation finishes: update packages states
    setTimeout(() => {
      setPackages(prev => prev.map(p => {
        if (p.id === selectedPkgForInstall.id) {
          return {
            ...p,
            isInstalled: true,
            installedSource: p.selectedSource
          };
        }
        return p;
      }));

      // Add to logs state
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setActivityLogs(prev => [
        {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          action: 'install',
          pkgName: selectedPkgForInstall.name,
          source: selectedPkgForInstall.selectedSource,
          status: 'success'
        },
        ...prev
      ]);

      setInstallStep('success');
    }, 3600);
  };

  // Uninstall flow (simple instant/quick action to show responsive updates)
  const handleUninstall = (pkg: AppPackage) => {
    // Immediate uninstall log
    setPackages(packages.map(p => {
      if (p.id === pkg.id) {
        return {
          ...p,
          isInstalled: false,
          installedSource: undefined
        };
      }
      return p;
    }));

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setActivityLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        action: 'uninstall',
        pkgName: pkg.name,
        source: pkg.installedSource,
        status: 'success'
      },
      ...prev
    ]);
  };

  // Perform disk item cleanup simulation
  const handleDiskCleanup = (itemId: string, sizeGb: number) => {
    setCleaningId(itemId);
    setTimeout(() => {
      setDiskItems(prev => prev.map(item => {
        if (item.id === itemId) {
          return { ...item, currentSizeGb: 0, isCleaned: true };
        }
        return item;
      }));
      setReclaimedDiskMb(prev => prev + Math.round(sizeGb * 1024));
      setCleaningId(null);

      // Add to logs
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setActivityLogs(prev => [
        {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          action: 'cleanup',
          pkgName: itemId === 'pacman-cache' ? 'Pacman packages cache' : itemId === 'orphans' ? 'Orphans packages list' : 'Unused Flatpak runtimes',
          status: 'success'
        },
        ...prev
      ]);
    }, 1500);
  };

  // Out of date updates flow
  const handleUpdateApp = (pkg: AppPackage) => {
    // Instantly simulate app update completion
    setPackages(packages.map(p => {
      if (p.id === pkg.id) {
        return {
          ...p,
          version: pkg.id === 'cheese' ? 'v44.2.0' : p.version,
          isOutOfDate: false
        };
      }
      return p;
    }));

    // Add to logs
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setActivityLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        action: 'update',
        pkgName: pkg.name,
        source: pkg.installedSource || pkg.selectedSource,
        status: 'success'
      },
      ...prev
    ]);
  };

  // Update Settings Toggles
  const handleSettingChange = <K extends keyof AtlasSettings>(key: K, value: AtlasSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // 3. Memoized Lists based on filters and settings
  const filteredApps = useMemo(() => {
    return packages.filter(pkg => {
      // Filter out AUR apps if AUR disabled in settings
      if (pkg.selectedSource === 'AUR' && !settings.enableAur) return false;
      if (pkg.selectedSource === 'Flatpak' && !settings.enableFlatpak) return false;
      if (pkg.selectedSource === 'AppImage' && !settings.enableAppImage) return false;

      // Filter by Search Query
      const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by top-right dropdown type selection (All, Arch, AUR, Flatpak, AppImage)
      const matchesType = selectedTypeFilter === 'All' || pkg.selectedSource === selectedTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [packages, searchQuery, selectedTypeFilter, settings]);

  const installedApps = useMemo(() => {
    return packages.filter(pkg => pkg.isInstalled);
  }, [packages]);

  const outOfDatePackages = useMemo(() => {
    return packages.filter(pkg => pkg.isOutOfDate);
  }, [packages]);

  const activeOrphansCount = useMemo(() => {
    const orphanItem = diskItems.find(i => i.id === 'orphans');
    return (orphanItem && orphanItem.currentSizeGb > 0) ? 3 : 0;
  }, [diskItems]);

  const totalCurrentSpaceGb = useMemo(() => {
    return diskItems.reduce((acc, item) => acc + item.currentSizeGb, 0).toFixed(1);
  }, [diskItems]);


  // Dynamic theme injection
  const themeStyles = useMemo(() => {
    const accents = {
      indigo: { primary: '#4f46e5', hover: '#6366f1', text: '#e0e7ff', border: 'rgba(79, 70, 229, 0.4)', bg: 'rgba(79, 70, 229, 0.15)', textLight: '#4f46e5' },
      blue: { primary: '#2563eb', hover: '#3b82f6', text: '#dbeafe', border: 'rgba(37, 99, 235, 0.4)', bg: 'rgba(37, 99, 235, 0.15)', textLight: '#2563eb' },
      teal: { primary: '#0d9488', hover: '#14b8a6', text: '#ccfbf1', border: 'rgba(13, 148, 136, 0.4)', bg: 'rgba(13, 148, 136, 0.15)', textLight: '#0d9488' },
      green: { primary: '#16a34a', hover: '#22c55e', text: '#dcfce7', border: 'rgba(22, 163, 74, 0.4)', bg: 'rgba(22, 163, 74, 0.15)', textLight: '#16a34a' },
      rose: { primary: '#e11d48', hover: '#f43f5e', text: '#ffe4e6', border: 'rgba(225, 29, 72, 0.4)', bg: 'rgba(225, 29, 72, 0.15)', textLight: '#e11d48' },
      amber: { primary: '#d97706', hover: '#f59e0b', text: '#fef3c7', border: 'rgba(217, 119, 6, 0.4)', bg: 'rgba(217, 119, 6, 0.15)', textLight: '#d97706' }
    };
    const activeAccent = accents[settings.accent] || accents.indigo;

    switch (settings.theme) {
      case 'light':
        return {
          bg: '#f8fafc',
          sidebarBg: '#f1f5f9',
          topbarBg: '#e2e8f0',
          cardBg: '#ffffff',
          cardBorder: '#e2e8f0',
          text: '#0f172a',
          textMuted: '#475569',
          border: '#e2e8f0',
          accent: activeAccent.primary,
          accentHover: activeAccent.hover,
          accentBorder: activeAccent.border,
          accentBg: activeAccent.bg,
          accentText: '#ffffff',
          textAccent: activeAccent.textLight
        };
      case 'nord':
        return {
          bg: '#2e3440',
          sidebarBg: '#242933',
          topbarBg: '#2e3440',
          cardBg: '#3b4252',
          cardBorder: '#434c5e',
          text: '#eceff4',
          textMuted: '#d8dee9',
          border: '#434c5e',
          accent: '#88c0d0', 
          accentHover: '#8fbcbb',
          accentBorder: 'rgba(136, 192, 208, 0.4)',
          accentBg: 'rgba(136, 192, 208, 0.15)',
          accentText: '#2e3440',
          textAccent: '#88c0d0'
        };
      case 'solarized':
        return {
          bg: '#002b36',
          sidebarBg: '#073642',
          topbarBg: '#002b36',
          cardBg: '#073642',
          cardBorder: '#586e75',
          text: '#93a1a1',
          textMuted: '#839496',
          border: '#586e75',
          accent: '#b58900', 
          accentHover: '#cb4b16',
          accentBorder: 'rgba(181, 137, 0, 0.4)',
          accentBg: 'rgba(181, 137, 0, 0.15)',
          accentText: '#fdf6e3',
          textAccent: '#b58900'
        };
      case 'high-contrast':
        return {
          bg: '#000000',
          sidebarBg: '#000000',
          topbarBg: '#000000',
          cardBg: '#000000',
          cardBorder: '#ffffff',
          text: '#ffffff',
          textMuted: '#ffffff',
          border: '#ffffff',
          accent: '#ffffff',
          accentHover: '#dddddd',
          accentBorder: '#ffffff',
          accentBg: '#111111',
          accentText: '#000000',
          textAccent: '#ffffff'
        };
      case 'dark':
      default:
        return {
          bg: '#090b11',
          sidebarBg: '#06080d',
          topbarBg: '#0d1017',
          cardBg: '#111420',
          cardBorder: '#1e293b',
          text: '#f3f4f6',
          textMuted: '#94a3b8',
          border: '#1e293b',
          accent: activeAccent.primary,
          accentHover: activeAccent.hover,
          accentBorder: activeAccent.border,
          accentBg: activeAccent.bg,
          accentText: '#ffffff',
          textAccent: activeAccent.primary
        };
    }
  }, [settings.theme, settings.accent]);

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl border overflow-hidden shadow-2xl flex md:flex-row flex-col select-none aspect-auto md:aspect-[16/10] text-sm sim-theme-container">
      <style dangerouslySetInnerHTML={{__html: `
        .sim-theme-container {
          background-color: ${themeStyles.bg} !important;
          color: ${themeStyles.text} !important;
          border-color: ${themeStyles.border} !important;
        }
        .sim-theme-sidebar {
          background-color: ${themeStyles.sidebarBg} !important;
          border-color: ${themeStyles.border} !important;
        }
        .sim-theme-topbar {
          background-color: ${themeStyles.topbarBg} !important;
          border-color: ${themeStyles.border} !important;
        }
        .sim-theme-card {
          background-color: ${themeStyles.cardBg} !important;
          border-color: ${themeStyles.cardBorder} !important;
          color: ${themeStyles.text} !important;
        }
        .sim-theme-text-muted {
          color: ${themeStyles.textMuted} !important;
        }
        .sim-theme-accent-btn {
          background-color: ${themeStyles.accent} !important;
          color: ${themeStyles.accentText} !important;
        }
        .sim-theme-accent-btn:hover {
          background-color: ${themeStyles.accentHover} !important;
        }
        .sim-theme-accent-border {
          border-color: ${themeStyles.accentBorder} !important;
        }
        .sim-theme-accent-bg {
          background-color: ${themeStyles.accentBg} !important;
        }
        .sim-theme-accent-text {
          color: ${themeStyles.textAccent} !important;
        }
      `}} />
      
      {/* 🚀 SIMULATOR SIDEBAR */}
      <div className="w-full md:w-56 border-r flex flex-col justify-between p-4 sim-theme-sidebar">
        <div>
          {/* Logo Heading */}
          <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-900 mb-4 select-none">
            {/* Minimal SVG Logo representation */}
            <div className="relative w-6 h-6 rounded-md bg-atlas-red flex items-center justify-center text-white font-mono font-bold text-xs shadow-inner sim-theme-accent-btn">
              A
              <div className="absolute inset-0 bg-red-500/20 rounded-md animate-pulse" />
            </div>
            <span className="font-display font-semibold text-white tracking-widest text-lg sim-theme-text">ATLAS</span>
            <div className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-400 font-mono font-medium border border-emerald-900/50">
              DEMO
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'dashboard' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard size={14} className={activeTab === 'dashboard' ? 'sim-theme-accent-text' : ''} />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('browse')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'browse' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Globe size={14} className={activeTab === 'browse' ? 'sim-theme-accent-text' : ''} />
                <span>Browse</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('installed')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'installed' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle size={14} className={activeTab === 'installed' ? 'sim-theme-accent-text' : ''} />
                <span>Installed</span>
              </div>
              {installedApps.length > 0 && (
                <span className="text-[10px] bg-slate-900 border border-slate-850 text-slate-400 px-1.5 py-0.2 rounded-full font-bold">
                  {installedApps.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('updates')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'updates' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Download size={14} className={activeTab === 'updates' ? 'sim-theme-accent-text' : ''} />
                <span>Updates</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                outOfDatePackages.length > 0 
                  ? 'bg-rose-955 text-rose-400 border border-rose-900/50' 
                  : 'bg-slate-900 border border-slate-850 text-slate-500'
              }`}>
                {outOfDatePackages.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'news' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Newspaper size={14} className={activeTab === 'news' ? 'sim-theme-accent-text' : ''} />
                <span>News</span>
              </div>
              <span className="text-[10px] bg-slate-900 border border-slate-850 text-slate-500 px-1.5 py-0.2 rounded-full font-semibold">
                2
              </span>
            </button>

            <button
              onClick={() => setActiveTab('disk')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'disk' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HardDrive size={14} className={activeTab === 'disk' ? 'sim-theme-accent-text' : ''} />
                <span>Disk space</span>
              </div>
              {parseFloat(totalCurrentSpaceGb) > 0 && (
                <span className="text-[9px] text-slate-400 font-mono font-medium">
                  {totalCurrentSpaceGb}G
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('health')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'health' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Activity size={14} className={activeTab === 'health' ? 'sim-theme-accent-text' : ''} />
                <span>Health</span>
              </div>
              {pacnewFiles.some(f => !f.resolved) && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'activity' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Cpu size={14} className={activeTab === 'activity' ? 'sim-theme-accent-text' : ''} />
                <span>Activity log</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('permissions')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'permissions' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderLock size={14} className={activeTab === 'permissions' ? 'sim-theme-accent-text' : ''} />
                <span>Permissions</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 cursor-pointer ${
                activeTab === 'settings' 
                  ? 'bg-slate-800/40 text-white font-bold border-l-2 sim-theme-accent-border' 
                  : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings size={14} className={activeTab === 'settings' ? 'sim-theme-accent-text' : ''} />
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom items */}
        <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-slate-500 text-xs px-2 select-none">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleSettingChange('theme', settings.theme === 'light' ? 'dark' : 'light')}
              className="hover:text-slate-350 transition-colors cursor-pointer" 
              title="Switch Theme"
            >
              <Sun size={14} />
            </button>
            <button className="hover:text-slate-350 transition-colors cursor-pointer" title="Open Wiki Guidelines">
              <HelpCircle size={14} />
            </button>
          </div>
          <span className="font-mono text-[9px] text-slate-600">{version ?? 'v0.14.0'}</span>
        </div>
      </div>

      {/* 💻 MAIN DEMO CONSOLE FRAME */}
      <div className="flex-1 flex flex-col min-w-0 sim-theme-panel">
        
        {/* TOP FILTER AND ACTION RAIL */}
        <div className="p-3 bg-[#0d1017] border-b border-slate-900/40 flex flex-wrap items-center justify-between gap-3 select-none">
          
          {/* Search box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search for applications (AppImage, Flatpak, AUR, Web)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080a0f] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-atlas-red-bright/50 transition-colors"
            />
          </div>

          {/* Action trigger group */}
          <div className="flex items-center gap-2">
            
            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-1.5 bg-[#141822] cursor-pointer hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-805/50 rounded-lg transition-colors flex items-center justify-center"
              title="Refresh package databases"
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-rose-500' : ''} />
            </button>

            {/* Simulated Cleanup 3 Orphans button */}
            {activeOrphansCount > 0 ? (
              <button
                onClick={() => handleDiskCleanup('orphans', 1.2)}
                className="bg-[#9b1c1c]/10 hover:bg-[#9b1c1c]/20 border border-[#9b1c1c]/60 text-rose-300 cursor-pointer text-xs px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
              >
                <Trash2 size={12} className="text-rose-400" />
                <span>Cleanup {activeOrphansCount} Orphans</span>
              </button>
            ) : null}

            {/* Select mechanism */}
            <button className="bg-[#141822] border border-slate-805/50 hover:bg-slate-800 text-[11px] font-medium text-slate-400 px-2.5 py-1.5 rounded-lg hover:text-slate-200 select-none">
              Select
            </button>

            {/* Type Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedTypeFilter}
                onChange={(e) => setSelectedTypeFilter(e.target.value as any)}
                className="bg-[#141822] border border-slate-805/50 text-[11px] font-medium text-slate-300 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 focus:outline-none appearance-none pr-6 cursor-pointer"
              >
                <option value="All">All Types</option>
                {settings.enableAur && <option value="AUR">AUR Only</option>}
                <option value="Arch">Arch Official</option>
                {settings.enableFlatpak && <option value="Flatpak">Flatpaks</option>}
                {settings.enableAppImage && <option value="AppImage">AppImages</option>}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[8px]">▼</div>
            </div>
          </div>
        </div>

        {/* BOTTOM CONTENT BOX - CONTEXT DEPENDENT */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 select-none"
              >
                {/* Personalized Greeting */}
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                  <div>
                    <h2 className="text-sm font-semibold font-display text-white">
                      Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, Cory
                    </h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">Package databases and keyring signatures validated 3 seconds ago.</p>
                  </div>
                </div>

                {/* Attention Center Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
                  {/* Card 1: Updates */}
                  <div 
                    onClick={() => setActiveTab('updates')}
                    className={`sim-theme-card border rounded-xl p-3 flex flex-col justify-between h-28 cursor-pointer transition-all hover:-translate-y-0.5 ${
                      outOfDatePackages.length > 0 ? 'border-rose-900/60 ring-1 ring-rose-500/10' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-1 rounded bg-rose-500/10 text-rose-450">
                        <Download size={14} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">Updates</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-300">Software Updates</div>
                      <div className={`text-xs font-mono font-bold mt-1 ${outOfDatePackages.length > 0 ? 'text-rose-400' : 'text-slate-500'}`}>
                        {outOfDatePackages.length > 0 ? `${outOfDatePackages.length} pending` : 'Synced'}
                      </div>
                    </div>
                  </div>

                  {/* Card 2: System Safety */}
                  <div 
                    onClick={() => setActiveTab('settings')}
                    className={`sim-theme-card border rounded-xl p-3 flex flex-col justify-between h-28 cursor-pointer transition-all hover:-translate-y-0.5 ${
                      settings.enableTimeshift ? 'border-emerald-900/60' : 'border-amber-900/60'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`p-1 rounded ${settings.enableTimeshift ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        <Shield size={14} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">Safety</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-300">Timeshift Backups</div>
                      <div className={`text-xs font-mono font-bold mt-1 ${settings.enableTimeshift ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {settings.enableTimeshift ? 'Hook Active' : 'Hook Inactive'}
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Reclaim Space */}
                  <div 
                    onClick={() => setActiveTab('disk')}
                    className="sim-theme-card border border-slate-800 rounded-xl p-3 flex flex-col justify-between h-28 cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-1 rounded bg-sky-500/10 text-sky-400">
                        <HardDrive size={14} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">Storage</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-300">Reclaim Space</div>
                      <div className="text-xs font-mono font-bold text-sky-400 mt-1">
                        {totalCurrentSpaceGb} GB footprint
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Recent Activity */}
                  <div 
                    onClick={() => setActiveTab('activity')}
                    className="sim-theme-card border border-slate-800 rounded-xl p-3 flex flex-col justify-between h-28 cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-1 rounded bg-indigo-500/10 text-indigo-400">
                        <Cpu size={14} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">Activity</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-300">Recent Logs</div>
                      <div className="text-xs font-mono font-bold text-indigo-400 mt-1">
                        {activityLogs.length} actions logged
                      </div>
                    </div>
                  </div>

                  {/* Card 5: AUR Safety / pacnew */}
                  <div 
                    onClick={() => setActiveTab('health')}
                    className={`sim-theme-card border rounded-xl p-3 flex flex-col justify-between h-28 cursor-pointer transition-all hover:-translate-y-0.5 ${
                      pacnewFiles.some(f => !f.resolved) ? 'border-amber-900/60 ring-1 ring-amber-500/10' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`p-1 rounded ${pacnewFiles.some(f => !f.resolved) ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        <FileCode size={14} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">AUR & Configs</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-300">Config Backups</div>
                      <div className={`text-xs font-mono font-bold mt-1 ${pacnewFiles.some(f => !f.resolved) ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {pacnewFiles.filter(f => !f.resolved).length > 0 
                          ? `${pacnewFiles.filter(f => !f.resolved).length} .pacnews`
                          : 'Configs clean'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular apps preview grid on Dashboard */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1 select-none">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">System Package Catalog</h3>
                    <button 
                      onClick={() => setActiveTab('browse')}
                      className="text-[10px] text-blue-400 hover:text-blue-300 font-bold hover:underline transition-colors cursor-pointer"
                    >
                      Browse full category index →
                    </button>
                  </div>

                  {/* Grid */}
                  {filteredApps.length === 0 ? (
                    <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-center space-y-2">
                      <Search size={28} className="stroke-[1.5] text-slate-650 block mb-1" />
                      <p className="font-semibold text-slate-400 text-xs">No matching applications found</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredApps.slice(0, 6).map(pkg => (
                        <div 
                          key={pkg.id} 
                          onClick={() => setSelectedPackage(pkg)}
                          className={`p-3 bg-[#111420] border rounded-xl flex flex-col justify-between transition-all duration-200 h-[190px] cursor-pointer hover:-translate-y-0.5 group ${
                            pkg.isInstalled 
                              ? 'border-emerald-950/60 ring-1 ring-emerald-500/20' 
                              : 'border-slate-800 hover:border-slate-700/80'
                          }`}
                        >
                          <div>
                            {/* App icon, name, source version */}
                            <div className="flex items-start justify-between gap-2.5" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className={`w-8 h-8 rounded-lg ${pkg.iconBg} flex items-center justify-center text-white font-display font-semibold shrink-0`}>
                                  {pkg.iconText}
                                </div>
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-white truncate text-xs font-display group-hover:text-emerald-450 transition-colors">{pkg.name}</h3>
                                  <div className="text-[10px] text-slate-500 font-mono truncate">
                                    {pkg.repo} • {pkg.version}
                                  </div>
                                </div>
                              </div>

                              {/* Badge build type metadata if AUR */}
                              {pkg.selectedSource === 'AUR' && pkg.aurBuildType && (
                                <span className="text-[8px] bg-sky-950 border border-sky-900/60 text-sky-400 px-1 py-0.2 rounded font-mono font-bold font-semibold uppercase">
                                  {pkg.aurBuildType}
                                </span>
                              )}
                            </div>

                            {/* App short description */}
                            <p className="text-[11px] text-slate-400 leading-snug tracking-normal mt-2 line-clamp-3 select-none">
                              {pkg.description}
                            </p>
                          </div>

                          {/* Package controls switcher and installation actions */}
                          <div className="mt-3 pt-2.5 border-t border-slate-900/80 flex items-center justify-between gap-1.5" onClick={(e) => e.stopPropagation()}>
                            {/* Unified source switchers */}
                            <div className="flex items-center gap-1">
                              {pkg.sources.map(source => {
                                const active = pkg.selectedSource === source;
                                return (
                                  <button
                                    key={source}
                                    onClick={() => handleSourceChange(pkg.id, source)}
                                    className={`text-[9px] px-1.5 py-0.5 rounded cursor-pointer font-mono font-semibold transition-colors uppercase ${
                                      active 
                                        ? 'bg-atlas-red text-white sim-theme-accent-btn' 
                                        : 'bg-slate-900 text-slate-500 hover:text-slate-350'
                                    }`}
                                    title={`Switch source to ${source}`}
                                  >
                                    {source === 'Arch' ? 'ARCH' : source === 'AUR' ? 'AUR' : source === 'Flatpak' ? 'FLAT' : 'APPIMAGE'}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Install/Uninstall trigger */}
                            <div>
                              {pkg.isInstalled ? (
                                <div className="flex items-center gap-1">
                                  {pkg.installedSource && (
                                    <span className="text-[9px] text-slate-600 font-mono mr-1 lowercase bg-slate-900 px-1 rounded">
                                      via {pkg.installedSource}
                                    </span>
                                  )}
                                  
                                  <button
                                    onClick={() => handleUninstall(pkg)}
                                    className="text-[10px] font-semibold bg-red-955/20 text-rose-450 hover:bg-rose-955/40 border border-rose-900/50 cursor-pointer px-2.5 py-1 rounded transition-colors"
                                  >
                                    Uninstall
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelectedPkgForInstall(pkg);
                                    setShowTransactionPreview(true);
                                  }}
                                  className="text-[10px] font-semibold bg-[#4f46e5] text-white hover:bg-indigo-500 cursor-pointer px-3 py-1 rounded transition-all transform hover:scale-[1.03]"
                                >
                                  Install
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB: BROWSE */}
            {activeTab === 'browse' && (
              <BrowseView
                onNavigate={(tab) => setActiveTab(tab)}
                onSelectPackage={(pkg) => setSelectedPackage(pkg)}
                onInstallPackage={(pkg) => {
                  setSelectedPkgForInstall(pkg);
                  setShowTransactionPreview(true);
                }}
                onQueuePackage={(pkg) => {
                  setQueuedPackages(prev => 
                    prev.includes(pkg.id) ? prev.filter(id => id !== pkg.id) : [...prev, pkg.id]
                  );
                }}
                queuedPackages={queuedPackages}
              />
            )}

            {/* TAB: NEWS */}
            {activeTab === 'news' && (
              <NewsView />
            )}

            {/* TAB: HEALTH */}
            {activeTab === 'health' && (
              <HealthView
                onNavigate={(tab) => setActiveTab(tab)}
                pacnewFiles={pacnewFiles}
                onResolvePacnew={(path, mode) => {
                  setPacnewFiles(prev => 
                    prev.map(f => f.path === path ? { ...f, resolved: true } : f)
                  );
                  // Add log on resolve
                  const now = new Date();
                  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  setActivityLogs(prev => [
                    {
                      id: `log-${Date.now()}`,
                      timestamp: timeStr,
                      action: 'cleanup',
                      pkgName: `Resolved pacnew: ${path.split('/').pop()} (${mode})`,
                      status: 'success'
                    },
                    ...prev
                  ]);
                }}
              />
            )}

            {/* TAB: PERMISSIONS */}
            {activeTab === 'permissions' && (
              <PermissionsView />
            )}

            {/* TAB: INSTALLED */}
            {activeTab === 'installed' && (
              <motion.div
                key="installed-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold font-display text-white">Installed Packages</h2>
                  <span className="text-xs text-slate-505 font-mono bg-[#111420] border border-slate-805/50 px-2 py-0.5 rounded-md">
                    {installedApps.length} Packages tracking total system footprint
                  </span>
                </div>

                {installedApps.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-center space-y-2">
                    <CheckCircle size={32} className="stroke-[1.5] text-slate-600 block mb-1" />
                    <p className="font-semibold text-slate-400">No applications installed inside sandbox</p>
                    <p className="text-xs text-slate-600 max-w-xs">Run install transactions on packages from the Dashboard to see them populate here.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {installedApps.map(pkg => (
                      <div 
                        key={pkg.id}
                        className="p-3 bg-[#111420] border border-emerald-950/50 rounded-xl flex items-center justify-between transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${pkg.iconBg} flex items-center justify-center text-white font-display font-semibold shrink-0`}>
                            {pkg.iconText}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white text-xs">{pkg.name}</h3>
                              <span className="text-[9px] bg-emerald-955 text-emerald-400 px-1.5 py-0.2 rounded font-mono uppercase font-semibold">
                                {pkg.installedSource}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-405 font-mono">
                              repo: {pkg.repo} • installed version: {pkg.version}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="text-[10px] text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-805/40 px-2 py-1 rounded transition-colors flex items-center gap-1">
                            <span>Launch</span>
                            <ExternalLink size={10} />
                          </button>
                          <button
                            onClick={() => handleUninstall(pkg)}
                            className="text-[10px] font-semibold bg-rose-955/20 text-rose-450 hover:bg-rose-955/40 border border-rose-900/50 px-2.5 py-1 rounded transition-colors"
                          >
                            Uninstall
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB: UPDATES */}
            {activeTab === 'updates' && (
              <motion.div
                key="updates-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold font-display text-white">Upgradable Software Packages</h2>
                  <span className="text-xs text-slate-500 font-mono">
                    System synchronizations validated 3 seconds ago
                  </span>
                </div>

                {outOfDatePackages.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-center space-y-2 bg-[#090b11] border border-slate-900 rounded-2xl">
                    <CheckCircle size={32} className="stroke-[1.5] text-emerald-500 block mb-1 animate-pulse" />
                    <p className="font-semibold text-white">All applications are fully up to date!</p>
                    <p className="text-xs text-slate-600 max-w-xs">Arch repositories, AUR packages, Flatpaks, and AppImages are synced completely.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {outOfDatePackages.map(pkg => (
                      <div 
                        key={pkg.id}
                        className="p-3 bg-[#111420] border border-rose-900/20 rounded-xl flex items-center justify-between relative overflow-hidden"
                      >
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-500" />
                        <div className="flex items-center gap-3 pl-1">
                          <div className={`w-8 h-8 rounded-lg ${pkg.iconBg} flex items-center justify-center text-white font-display font-semibold shrink-0`}>
                            {pkg.iconText}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white text-xs">{pkg.name}</h3>
                              <span className="text-[9px] bg-rose-955 text-rose-400 px-1.5 py-0.2 rounded font-mono uppercase font-semibold">
                                {pkg.selectedSource} • flagged out of date
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono">
                              Installed version: <span className="line-through text-slate-550">{pkg.version}</span> • Available: <span className="text-amber-400 font-semibold">v44.2.0</span>
                            </p>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={() => handleUpdateApp(pkg)}
                            className="bg-[#4f46e5] text-white font-semibold text-[11px] px-3 py-1.5 rounded-lg hover:bg-indigo-500 transition-colors cursor-pointer"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB: DISK */}
            {activeTab === 'disk' && (
              <motion.div
                key="disk-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Visual Disk Space Summary ring/row indicator */}
                <div className="p-4 bg-[#111420] border border-slate-800 rounded-xl flex sm:flex-row flex-col items-center gap-5 select-none">
                  <div className="relative w-20 h-20 shrink-0 flex items-center justify-center select-none">
                    {/* SVG ring */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                      <circle 
                        cx="40" 
                        cy="40" 
                        r="32" 
                        stroke="#9b1c1c" 
                        strokeWidth="7" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={(2 * Math.PI * 32) * (1 - (parseFloat(totalCurrentSpaceGb) / 10.4))}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs font-bold font-mono text-white leading-none">{totalCurrentSpaceGb} GB</span>
                      <span className="text-[8px] text-rose-455 font-bold uppercase leading-tight font-mono tracking-wider mt-0.5">Used</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-center sm:text-left">
                    <h2 className="text-white font-semibold font-display text-sm">System Storage footprint Overview</h2>
                    <p className="text-[11px] text-slate-400">Total size of redundant components index currently sitting on disk. Clean caches, orphans, and unused runtimes instantly.</p>
                    {reclaimedDiskMb > 0 && (
                      <div className="inline-block px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-mono rounded border border-emerald-900/60 font-semibold">
                        🎉 Reclaimed Space: +{reclaimedDiskMb} Megabytes Cleaned!
                      </div>
                    )}
                  </div>
                </div>

                {/* Disk items cleanup rows */}
                <div className="space-y-2">
                  {diskItems.map(item => (
                    <div 
                      key={item.id}
                      className="p-3 bg-[#111420] border border-slate-800 rounded-xl flex items-center justify-between transition-colors hover:border-slate-750"
                    >
                      <div className="min-w-0 pr-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white text-xs">{item.name}</h3>
                          <span className={`text-[10px] font-mono font-bold ${
                            item.currentSizeGb > 0 ? 'text-rose-400' : 'text-emerald-400'
                          }`}>
                            {item.currentSizeGb > 0 ? `${item.currentSizeGb} GB` : '0.0 GB (Cleaned)'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>

                      <div>
                        {item.currentSizeGb > 0 ? (
                          <button
                            disabled={cleaningId === item.id}
                            onClick={() => handleDiskCleanup(item.id, item.initialSizeGb)}
                            className="bg-red-950/20 text-rose-400 border border-rose-900/40 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-rose-950/40 cursor-pointer disabled:opacity-50 min-w-[70px] text-center"
                          >
                            {cleaningId === item.id ? 'Pruning...' : 'Prune'}
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-450 font-semibold flex items-center gap-1 py-1.5">
                            <CheckCircle size={12} className="text-emerald-500" />
                            <span>Done</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: ACTIVITY */}
            {activeTab === 'activity' && (
              <motion.div
                key="activity-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold font-display text-white">Execution Activity History</h2>
                  <button 
                    onClick={() => setActivityLogs([])} 
                    className="text-xs text-rose-400 hover:text-rose-300 underline font-mono cursor-pointer"
                  >
                    Clear history
                  </button>
                </div>

                {activityLogs.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-center space-y-2">
                    <Activity size={32} className="stroke-[1.5] text-slate-600 block mb-1" />
                    <p className="font-semibold text-slate-400">Activity logs are empty</p>
                    <p className="text-xs text-slate-600 max-w-xs">All package manager install, upgrade, uninstall and cache transactions will log here in sequence.</p>
                  </div>
                ) : (
                  <div className="bg-[#111420] border border-slate-800 rounded-xl overflow-hidden">
                    <div className="border-b border-slate-900 bg-[#0c0f17] p-2 text-[10px] text-slate-500 font-mono grid grid-cols-4 select-none">
                      <span>TIME</span>
                      <span>TRANSACTION ACTION</span>
                      <span>PACKAGE TARGET</span>
                      <span className="text-right">RE-STATUS</span>
                    </div>
                    <div className="divide-y divide-slate-900 font-mono text-xs">
                      {activityLogs.map((log, index) => (
                        <div key={log.id} className="p-2.5 grid grid-cols-4 items-center">
                          <span className="text-slate-500 text-[11px]">{log.timestamp}</span>
                          <span className={`capitalize font-semibold ${
                            log.action === 'install' 
                              ? 'text-indigo-400' 
                              : log.action === 'uninstall' 
                              ? 'text-rose-400' 
                              : log.action === 'cleanup' ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            {log.action}
                          </span>
                          <span className="text-white truncate">
                            {log.pkgName} {log.source && <span className="opacity-40 text-[10px]">({log.source})</span>}
                          </span>
                          <span className="text-right text-emerald-450 font-semibold text-[11px]">
                            {log.status === 'success' ? '● OK' : '● FAILED'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 text-xs select-none"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold font-display text-white">System Settings</h2>
                  <span className="text-xs text-[#9b1c1c] font-semibold tracking-wider uppercase font-mono">
                    System Core Config
                  </span>
                </div>

                {/* Appearance Settings */}
                <div className="space-y-3 bg-[#111420] border border-slate-800 rounded-xl p-4">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Appearance</h3>
                  
                  {/* Theme Presets */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-900/60">
                    <div>
                      <h4 className="font-medium text-white text-xs">Desktop Theme Preset</h4>
                      <p className="text-[10px] text-slate-505">Select active stylesheet preset for the dashboard display.</p>
                    </div>
                    <div className="flex flex-wrap gap-1 bg-[#0a0c10] border border-slate-900 p-0.5 rounded-lg">
                      {(['dark', 'light', 'nord', 'solarized', 'high-contrast'] as ThemePreset[]).map((themeName) => (
                        <button
                          key={themeName}
                          onClick={() => handleSettingChange('theme', themeName)}
                          className={`px-2 py-1 rounded-md text-[9px] font-semibold uppercase cursor-pointer ${
                            settings.theme === themeName 
                              ? 'bg-[#1b2234] text-white' 
                              : 'text-slate-500 hover:text-slate-350'
                          }`}
                        >
                          {themeName === 'high-contrast' ? 'contrast' : themeName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accent Colors */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <h4 className="font-medium text-white text-xs">Accent Color Highlight</h4>
                      <p className="text-[10px] text-slate-505">Pick highlight and sidebar highlight border indicator color.</p>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      {(['indigo', 'blue', 'teal', 'green', 'rose', 'amber'] as AccentColor[]).map((color) => {
                        const bgClasses = {
                          indigo: 'bg-indigo-600',
                          blue: 'bg-blue-600',
                          teal: 'bg-teal-600',
                          green: 'bg-green-600',
                          rose: 'bg-rose-600',
                          amber: 'bg-amber-600'
                        };
                        return (
                          <button
                            key={color}
                            onClick={() => handleSettingChange('accent', color)}
                            className={`w-4 h-4 rounded-full ${bgClasses[color]} cursor-pointer relative transition-transform hover:scale-110 ${
                              settings.accent === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#111420]' : ''
                            }`}
                            title={color}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Compilation & Packaging settings */}
                <div className="space-y-3 bg-[#111420] border border-slate-800 rounded-xl p-4">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Compilation & Packaging</h3>
                  
                  {/* AUR Toggle */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-900/60">
                    <div>
                      <h4 className="font-medium text-white text-xs">Enable AUR Support</h4>
                      <p className="text-[10px] text-slate-505">Enable searching and compiling packages from Arch User Repository.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.enableAur} 
                        onChange={(e) => handleSettingChange('enableAur', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:bg-atlas-red peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>

                  {/* Timeshift Hook Toggle */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-900/60">
                    <div>
                      <h4 className="font-medium text-white text-xs">Pre-Transaction Timeshift Backup</h4>
                      <p className="text-[10px] text-slate-505">Safeguard systems by backing up active states before package installations.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.enableTimeshift} 
                        onChange={(e) => handleSettingChange('enableTimeshift', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:bg-atlas-red peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>

                  {/* Scan PKGBUILDs Toggle */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-900/60">
                    <div>
                      <h4 className="font-medium text-white text-xs">Scan PKGBUILDs before building</h4>
                      <p className="text-[10px] text-slate-500">Run static security code audits for curl pipes or dangerous root access hooks.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.scanPkgbuilds} 
                        onChange={(e) => handleSettingChange('scanPkgbuilds', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:bg-atlas-red peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>

                  {/* Clean Chroot Toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <h4 className="font-medium text-white text-xs">Build in Clean Chroot environment</h4>
                      <p className="text-[10px] text-slate-500">Compile packages in isolated containers to prevent environment state pollution.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.cleanChroot} 
                        onChange={(e) => handleSettingChange('cleanChroot', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:bg-atlas-red peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>
                </div>

                {/* Sandbox Integrations settings */}
                <div className="space-y-3 bg-[#111420] border border-slate-800 rounded-xl p-4">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Sandboxing</h3>

                  {/* Flatpak Toggle */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-900/60">
                    <div>
                      <h4 className="font-medium text-white text-xs">Flatpak package stream Integration</h4>
                      <p className="text-[10px] text-slate-550">Query sandboxed Flathub package directories alongside Arch official repositories.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.enableFlatpak} 
                        onChange={(e) => handleSettingChange('enableFlatpak', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:bg-atlas-red peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>

                  {/* AppImage Toggle */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-900/60">
                    <div>
                      <h4 className="font-medium text-white text-xs">Enable AppImage Support</h4>
                      <p className="text-[10px] text-slate-550">Integrate executable AppImages inside your catalog easily.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.enableAppImage} 
                        onChange={(e) => handleSettingChange('enableAppImage', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:bg-atlas-red peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>

                  {/* Flatpak Installation level */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <h4 className="font-medium text-white text-xs">Flatpak installation level context</h4>
                      <p className="text-[10px] text-slate-500">Manage Flatpaks with root privileges (System) or within user boundaries (User).</p>
                    </div>
                    <div className="flex gap-1 bg-[#0a0c10] border border-slate-900 p-0.5 rounded-lg select-none">
                      <button
                        onClick={() => handleSettingChange('flatpakLevel', 'System')}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-semibold cursor-pointer ${
                          settings.flatpakLevel === 'System' 
                            ? 'bg-[#1b2234] text-white' 
                            : 'text-slate-500'
                        }`}
                      >
                        System
                      </button>
                      <button
                        onClick={() => handleSettingChange('flatpakLevel', 'User')}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-semibold cursor-pointer ${
                          settings.flatpakLevel === 'User' 
                            ? 'bg-[#1b2234] text-white' 
                            : 'text-slate-500'
                        }`}
                      >
                        User
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/20 border border-slate-900 rounded-xl text-[11px] text-slate-505 flex items-center gap-2">
                  <Shield size={14} className="text-slate-400" />
                  <span>Other package sources (Snap packages, Debian .deb index repositories, standard Webapp Nativefiers) can be re-enabled here if preferred.</span>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* ==================== 🛠 SIMULATION MODALS OVERLAYS ==================== */}
      <AnimatePresence>
        {installStep && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#0e111a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative"
            >
              
              {/* MODAL HEADER */}
              <div className="px-4 py-3 bg-[#121622] border-b border-indigo-950/20 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <Shield size={15} className="text-rose-400" />
                  <span className="font-semibold text-white font-display text-xs">
                    Install {selectedPkgForInstall?.name} (Source: {selectedPkgForInstall?.selectedSource})
                  </span>
                </div>
                <button
                  onClick={() => setInstallStep(null)}
                  className="text-slate-500 hover:text-slate-350 font-mono text-sm cursor-pointer select-none"
                >
                  ✕
                </button>
              </div>

              {/* STEP: PASSWORD */}
              {installStep === 'password' && (
                <form onSubmit={handlePasswordSubmit} className="p-5 space-y-4">
                  <div className="p-3 bg-rose-950/10 border border-rose-900/30 rounded-xl flex items-start gap-2.5 text-[11px] text-rose-350">
                    <Lock size={15} className="text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-rose-300">Authentication Required for Sudo execution</p>
                      <p className="text-rose-400/80 leading-snug">The system package manager requires root privileges to configure software binaries securely on this operating system.</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider font-mono text-slate-500 block">Root password</label>
                    <input
                      required
                      autoFocus
                      type="password"
                      placeholder="Type any password to proceed"
                      value={sudoPassword}
                      onChange={(e) => setSudoPassword(e.target.value)}
                      className="w-full bg-[#07090e] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {settings.enableTimeshift && (
                    <div className="flex items-center gap-2 select-none border-t border-slate-900 pt-3">
                      <input
                        type="checkbox"
                        id="m-timeshift"
                        checked={timeshiftCheck}
                        onChange={(e) => setTimeshiftCheck(e.target.checked)}
                        className="rounded bg-slate-900 border-slate-800 text-rose-500"
                      />
                      <label htmlFor="m-timeshift" className="text-[11px] text-slate-400 cursor-pointer">
                        Trigger automated Timeshift security system restore snapshot first (Recommended)
                      </label>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-900">
                    <button
                      type="button"
                      onClick={() => setInstallStep(false)}
                      className="text-xs px-3.5 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-xs px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-550 font-semibold cursor-pointer"
                    >
                      Authenticate
                    </button>
                  </div>
                </form>
              )}

              {/* STEP: DEPENDENCY/PROVIDER SELECT (FOR AUR LOGIC) */}
              {installStep === 'dependencies' && (
                <div className="p-5 space-y-4">
                  <div className="space-y-1 text-slate-350 select-none">
                    <h4 className="font-semibold text-white text-xs">Choose AUR Provider Dependencies</h4>
                    <p className="text-[11px] text-slate-500">The package requests virtual provider 'jpeg-runtime' for loading graphics. Select version to compile:</p>
                  </div>

                  <div className="space-y-2 bg-[#07090e] border border-slate-850 p-2.5 rounded-xl text-xs font-mono">
                    <label className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-900 cursor-pointer font-mono text-slate-300">
                      <input 
                        type="radio" 
                        name="provider" 
                        value="1" 
                        checked={providerSelection === '1'} 
                        onChange={() => setProviderSelection('1')}
                      />
                      <span>1) extra/libjpeg-turbo (Recommended Default) <span className="text-indigo-400 bg-indigo-950 px-1 py-0.2 rounded text-[10px]">official</span></span>
                    </label>
                    <label className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-900 cursor-pointer font-mono text-slate-300">
                      <input 
                        type="radio" 
                        name="provider" 
                        value="2" 
                        checked={providerSelection === '2'}
                        onChange={() => setProviderSelection('2')}
                      />
                      <span>2) aur/libjpeg-6b-compatibility (Compatibility layers) <span className="text-yellow-400 bg-yellow-950 px-1 py-0.2 rounded text-[10px]">AUR</span></span>
                    </label>
                  </div>

                  <div className="p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-xl text-[11px] text-slate-450 leading-snug">
                    <span className="font-semibold text-white block mb-0.5">Note on Compilation:</span>
                    Building packages from the AUR automatically compiles dependencies on your local machine using multithreading. Out-of-date and orphan checks will be monitored.
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-900 select-none">
                    <button
                      onClick={() => setInstallStep(false)}
                      className="text-xs px-3.5 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDependenciesSubmit}
                      className="text-xs px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-550 font-semibold cursor-pointer"
                    >
                      Proceed to Compilation
                    </button>
                  </div>
                </div>
              )}

              {/* STEP: TERMINAL TRANSACTION OUTPUT SIMULATION */}
              {installStep === 'terminal' && (
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider font-mono select-none">
                    <div className="flex items-center gap-2 text-rose-400">
                      <TerminalIcon size={13} className="text-rose-500 animate-pulse" />
                      <span>Console Logs Output Stream</span>
                    </div>
                    <span>PID: 84321</span>
                  </div>

                  <div className="bg-[#05060a] border border-slate-900 rounded-xl p-3.5 h-64 overflow-y-auto font-mono text-xs text-rose-300/95 leading-relaxed flex flex-col justify-end">
                    <div className="space-y-1">
                      {terminalOutput.map((line, idx) => (
                        <div key={idx} className="font-mono text-[11px]">
                          {line}
                        </div>
                      ))}
                      <div className="w-1.5 h-3.5 bg-rose-400 animate-pulse inline-block" />
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-550 italic leading-snug text-center select-none font-medium">
                    Please do not close this modal until the operation terminates. Local build caches are being resolved.
                  </div>
                </div>
              )}

              {/* STEP: SUCCESS OVERLAY */}
              {installStep === 'success' && (
                <div className="p-6 text-center space-y-4 select-none">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-900 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                    <CheckCircle size={24} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-semibold font-display text-white text-sm">Package Configured Successfully!</h3>
                    <p className="text-xs text-slate-400">
                      {selectedPkgForInstall?.name} has been integrated completely on your Arch Linux sandbox environment via {selectedPkgForInstall?.selectedSource}.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setInstallStep(null);
                      setSelectedPkgForInstall(null);
                    }}
                    className="bg-[#4f46e5] text-white font-semibold text-xs px-4 py-1.5 rounded-lg hover:bg-indigo-500 transition-colors cursor-pointer"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Package Detail Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <DetailModal
            pkg={selectedPackage}
            onClose={() => setSelectedPackage(null)}
            onInstall={(pkg) => {
              setSelectedPkgForInstall(pkg);
              setShowTransactionPreview(true);
            }}
            onUninstall={handleUninstall}
            onOpenPkgbuild={() => setShowPkgbuildViewer(true)}
          />
        )}
      </AnimatePresence>

      {/* Pre-transaction Preview Modal */}
      <AnimatePresence>
        {showTransactionPreview && (
          <TransactionPreview
            pkg={selectedPkgForInstall}
            onCancel={() => {
              setShowTransactionPreview(false);
              setSelectedPkgForInstall(null);
            }}
            onProceed={() => {
              setShowTransactionPreview(false);
              if (selectedPkgForInstall) {
                startInstallFlow(selectedPkgForInstall);
              }
            }}
            onViewPkgbuild={() => setShowPkgbuildViewer(true)}
          />
        )}
      </AnimatePresence>

      {/* PKGBUILD Viewer Modal */}
      <AnimatePresence>
        {showPkgbuildViewer && (
          <PkgbuildViewer
            pkgName={selectedPkgForInstall?.name || selectedPackage?.name || "joplin-appimage"}
            onClose={() => setShowPkgbuildViewer(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
};
