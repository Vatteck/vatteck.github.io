import {
  Wrench, Terminal, Cpu, LucideIcon, Mail, Github,
  ExternalLink, MessageSquare, Smartphone, Monitor, Code2, Gamepad2, Heart
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
  "I fix things. Phones, laptops, boards — if it's got a circuit, I've probably had a soldering iron on it. I'm a hardware technician by trade: component-level diagnostics, SMD rework, thermal and power rail analysis. I don't just swap parts — I find the fault.",
  "On the software side, I build whatever the idea demands. A graphical Arch package manager in Python? Done. A Flow-style puzzle game in Flutter? Shipped to closed testing. A Unity idle tycoon, a Flutter life sim with 35 database tables — I pick the stack that fits the problem and I ship. AI-assisted tooling is part of the workflow now, and it's let me move faster than any single dev has a right to.",
  "My daily driver is CachyOS (Arch-based) with a BORE-scheduler kernel, tuned to within an inch of its life. I root Androids, mod boot configs, and generally refuse to run anything at stock settings. If a system isn't running exactly how I designed it, I'm not done."
];

export const deepDiveData: DeepDiveItem[] = [
  { 
    icon: Wrench, 
    title: "Hardware Engineering", 
    description: "Component-level diagnostics and repair. SMD soldering, thermal imaging, power rail analysis. I trace faults from symptom to root cause — no board is a mystery, just a puzzle I haven't finished." 
  },
  { 
    icon: Smartphone, 
    title: "Mobile & Kernel Modding", 
    description: "Bootloader unlocks, custom recovery deployment, kernel parameter tuning. I don't run stock — every Android I touch gets optimized for what it actually needs to do, not what the OEM shipped." 
  },
  { 
    icon: Code2, 
    title: "Cross-Platform Development", 
    description: "Flutter, Unity, Python — I don't marry a stack. Atlas is Python+pywebview, Continuity and LifeOS are Flutter, HashFactory is Unity. If it compiles and ships, I'll use it." 
  },
  { 
    icon: Cpu, 
    title: "AI-Assisted Engineering", 
    description: "AI tooling isn't a crutch — it's a force multiplier. I use it to accelerate boilerplate, explore architecture decisions, and iterate faster than solo devs typically can. The ideas are mine; the typing speed is augmented." 
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
  },
  {
    title: "LifeOS",
    icon: Heart,
    repoUrl: "https://github.com/Vatteck/LifeOS",
    siteUrl: "vatteck.com/lifeos/",
    description: "A deep cross-platform life simulator. Build a character from birth to death — careers, relationships, crime, politics, the supernatural. Every path is playable.",
    details: "[PROJECT_SPECIFICATIONS]\nNAME: LIFEOS\nPLATFORM: CROSS_PLATFORM (ANDROID, IOS, WEB, WINDOWS, MACOS, LINUX)\nFRAMEWORK: FLUTTER\nLANGUAGE: DART\n\n# CORE_SYSTEMS\n- SVG_AVATAR_RENDERER: ACTIVE\n- EVENT_SOURCED_LIFELOG: ACTIVE\n- YARN_NARRATIVE_ENGINE: 13_SCRIPTS\n- 21_FEATURE_MODULES: LOADED\n- 35_DATABASE_TABLES: SCHEMA_V65\n\n# STATUS\nCURRENT_PHASE: ACTIVE_DEVELOPMENT\nFOCUS: FEATURE_EXPANSION",
    tags: ["Flutter", "Dart", "Simulation", "Cross-Platform"],
    status: "IN PROGRESS"
  }
];

export const skillsData: SkillItem[] = [
  { icon: Wrench, label: "Hardware Diagnostics" },
  { icon: Wrench, label: "SMD Soldering" },
  { icon: Terminal, label: "Arch Linux / CachyOS" },
  { icon: Smartphone, label: "Android Modding" },
  { icon: Cpu, label: "Kernel Tuning" },
  { icon: Terminal, label: "Python" },
  { icon: Code2, label: "Flutter / Dart" },
  { icon: Gamepad2, label: "Unity / C#" },
  { icon: Monitor, label: "KVM / QEMU" },
  { icon: Cpu, label: "AI-Assisted Dev" }
];
