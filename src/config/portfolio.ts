import {
  Wrench, Terminal, Cpu, LucideIcon, Mail, Github,
  ExternalLink, MessageSquare, Smartphone, Monitor, Code2, Gamepad2
} from 'lucide-react';

export interface DeepDiveItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  icon: LucideIcon;
  description: string;
  details: string;
  tags: string[];
  status: string;
  repoUrl?: string;
  siteUrl?: string;
}

export interface SkillItem {
  icon: LucideIcon;
  label: string;
}

export const bioData = [
  "I operate at the intersection of physical hardware and low-level software. As a Hardware Device Technician, I diagnose, repair, and optimize system hardware and device circuitry.",
  "My primary workspace is built on Arch Linux (CachyOS), where I maintain and tweak configurations for performance and optimization. From rooting and modding Android systems to customizing boot configurations, I focus on building systems that run efficiently and exactly how I design them.",
  "When I'm not in the terminal or working on physical boards, I'm analyzing game systems and modding. I leverage AI tools to help code, iterate, and build projects like game utilities and package managers."
];

export const deepDiveData: DeepDiveItem[] = [
  { 
    icon: Wrench, 
    title: "Hardware Engineering", 
    description: "Component-level repair, SMD soldering, and diagnostic analysis of mobile and computing devices. I work on physical boards, assessing thermal conditions, power lines, and circuit faults." 
  },
  { 
    icon: Smartphone, 
    title: "Mobile Forensics & Mod", 
    description: "Deep-level Android customization including bootloader unlocking, custom recovery deployment, and modifying kernel structures or configurations for hardware acceleration." 
  }
];

export const projectsData: ProjectItem[] = [
  {
    title: "Atlas Package Manager",
    icon: Terminal,
    repoUrl: "https://github.com/Vatteck/atlas",
    siteUrl: "vatteck.com/atlas/",
    description: "An Arch-focused, all-in-one graphical package manager for Linux. It searches, installs, updates, downgrades, and removes software across official Arch repos, AUR, Flatpak, and AppImage through a unified interface.",
    details: "[PROJECT_SPECIFICATIONS]\nNAME: ATLAS_PACKAGE_MANAGER\nPLATFORM: LINUX_OS (ARCH/CACHYOS)\nFRAMEWORK: PYWEBVIEW_GUI\nLANGUAGE: PYTHON\n\n# CORE_SYSTEMS\n- MULTI_SOURCE_SWITCHER: ACTIVE\n- SYSTEM_HEALTH_COCKPIT: LOADED\n- PKGBUILD_VIEWER_DIFFS: ENABLED\n- UNIVERSAL_PREVIEW: READY\n\n# STATUS\nCURRENT_PHASE: ACTIVE_DEVELOPMENT\nFOCUS: PERFORMANCE_POLISH_AND_GUI",
    tags: ["Python", "Arch Linux", "AUR", "pywebview"],
    status: "IN PROGRESS"
  },
  {
    title: "HashFactory (formerly Substrate: Miner)",
    icon: Cpu,
    repoUrl: "https://github.com/Vatteck/hashfactory",
    siteUrl: "vatteck.com/substrateminer/",
    description: "An Android idle-clicker tycoon game where players build and optimize a hardware-inspired mining operation.",
    details: "[PROJECT_SPECIFICATIONS]\nNAME: HASHFACTORY\nPLATFORM: ANDROID_OS\nENGINE: UNITY_2023.2\nLANGUAGE: C#_DOTNET_7\n\n# CORE_SYSTEMS\n- PROCEDURAL_RESOURCE_GEN: ACTIVE\n- HARDWARE_INSPIRED_UI: LOADED\n- BACKEND_CALC_ENGINE: OPTIMIZED\n- LOW_LATENCY_INPUT: ENABLED\n\n# STATUS\nCURRENT_PHASE: IN_PROGRESS\nFOCUS: PRESTIGE_BALANCING_REBRAND",
    tags: ["Unity", "C#", "Android", "Game Dev"],
    status: "IN PROGRESS"
  },
  {
    title: "Continuity",
    icon: Gamepad2,
    repoUrl: "https://github.com/Vatteck/Continuity",
    siteUrl: "vatteck.com/continuity/",
    description: "A polished Flow-style connect-the-dots puzzle game for Android. 300 levels, daily challenges, themes, and achievements. Built in Flutter.",
    details: "[PROJECT_SPECIFICATIONS]\nNAME: CONTINUITY\nPLATFORM: ANDROID_OS\nFRAMEWORK: FLUTTER\nLANGUAGE: DART\n\n# CORE_SYSTEMS\n- CAMPAIGN_MODE: 300_LEVELS\n- DAILY_PUZZLE: 730_DAYS_OFFLINE\n- PLAY_GAMES: ACHIEVEMENTS_+_CLOUD_SAVE\n- THEMES: 4_PROGRESS_UNLOCKED\n- MONETIZATION: REWARDED_ADS_+_IAP\n\n# STATUS\nCURRENT_PHASE: CLOSED_TESTING\nFOCUS: PRE_LAUNCH_VALIDATION",
    tags: ["Flutter", "Dart", "Android", "Game Dev"],
    status: "CLOSED TESTING"
  }
];

export const skillsData: SkillItem[] = [
  { icon: Wrench, label: "Hardware Diagnostics" },
  { icon: Terminal, label: "Arch Linux / CachyOS" },
  { icon: Smartphone, label: "Android Modding" },
  { icon: Cpu, label: "Kernel Tweaking" },
  { icon: Wrench, label: "SMD Soldering" },
  { icon: Terminal, label: "Python Development" },
  { icon: Monitor, label: "KVM/QEMU Virtualization" },
  { icon: Code2, label: "Web Development" },
  { icon: Cpu, label: "Linux Package Management" },
  { icon: Monitor, label: "AI/ML Engineering" }
];
