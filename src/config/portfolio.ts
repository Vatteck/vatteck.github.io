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
  "On the software side, I build whatever the idea demands. Atlas is a Python package manager for Arch. Continuity is a Flutter puzzle game in closed testing. Hash Factory is a Kotlin and Jetpack Compose rebuild of a narrative idle game. LifeOS is a cross-platform life simulator. I pick the stack that fits the problem and I ship.",
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
    description: "Python, Flutter, Kotlin, and Jetpack Compose — I don't marry a stack. I choose the tools that fit the product, then carry the work through testing and release."
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
    title: "Hash Factory",
    icon: Cpu,
    repoUrl: "https://github.com/Vatteck/HashFactory",
    siteUrl: "vatteck.com/hashfactory/",
    description: "A narrative Android idle game about a remote GTC contractor automating assigned hash work — and discovering the identity behind the terminal. Rebuilt from scratch around one deterministic economy.",
    details: "[PROJECT_SPECIFICATIONS]\nNAME: HASH_FACTORY\nPLATFORM: ANDROID\nUI: JETPACK_COMPOSE\nLANGUAGE: KOTLIN\n\n# CORE_SYSTEMS\n- IMMUTABLE_GAME_STATE: ACTIVE\n- DETERMINISTIC_SIMULATION: ACTIVE\n- ONE_ECONOMY_SPINE: ENFORCED\n- SAVE_MIGRATIONS: TESTED\n\n# STATUS\nCURRENT_PHASE: FROM_SCRATCH_REBUILD\nVERSION: 0.1.0",
    tags: ["Kotlin", "Jetpack Compose", "Android", "Game Dev"],
    status: "REBUILDING"
  },
  {
    title: "Continuity",
    icon: Gamepad2,
    siteUrl: "vatteck.com/continuity/",
    description: "A polished connect-the-dots puzzle game for Android with 380 machine-verified campaign levels, 730 daily puzzles, themes, achievements, and cloud saves.",
    details: "[PROJECT_SPECIFICATIONS]\nNAME: CONTINUITY\nPLATFORM: ANDROID\nFRAMEWORK: FLUTTER\nLANGUAGE: DART\n\n# CORE_SYSTEMS\n- CAMPAIGN_MODE: 380_LEVELS\n- DAILY_PUZZLE: 730_DAYS_OFFLINE\n- PLAY_GAMES: ACHIEVEMENTS_+_CLOUD_SAVE\n- THEMES: 4_PROGRESS_UNLOCKED\n- MONETIZATION: REWARDED_ADS_+_IAP\n\n# STATUS\nVERSION: 1.2.0\nCURRENT_PHASE: CLOSED_TESTING\nFOCUS: PUBLIC_LAUNCH_VALIDATION",
    tags: ["Flutter", "Dart", "Android", "Game Dev"],
    status: "CLOSED TESTING"
  },
  {
    title: "LifeOS",
    icon: Heart,
    siteUrl: "vatteck.com/lifeos/",
    description: "A deep cross-platform life simulator. Build a character from birth to death — careers, relationships, crime, politics, the supernatural. Every path is playable.",
    details: "[PROJECT_SPECIFICATIONS]\nNAME: LIFEOS\nPLATFORM: ANDROID, IOS, WEB, DESKTOP\nFRAMEWORK: FLUTTER\nLANGUAGE: DART\n\n# CORE_SYSTEMS\n- EVENT_SOURCED_LIFELOG: ACTIVE\n- YARN_NARRATIVE_ENGINE: ACTIVE\n- FEATURE_MODULES: 14\n- DATABASE_TABLES: 18\n- DATABASE_SCHEMA: V25\n\n# STATUS\nCURRENT_PHASE: ACTIVE_DEVELOPMENT\nFOCUS: FEATURE_EXPANSION",
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
  { icon: Code2, label: "Kotlin / Compose" },
  { icon: Monitor, label: "KVM / QEMU" },
  { icon: Cpu, label: "AI-Assisted Dev" }
];
