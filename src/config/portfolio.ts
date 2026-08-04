import {
  Wrench, Terminal, Cpu, LucideIcon,
  Smartphone, Monitor, Code2, Gamepad2, Heart
} from 'lucide-react';

export interface DeepDiveItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** One vocabulary for build state, used by both the bench index and the project cards. */
export type ProjectStatus = 'released' | 'testing' | 'building';

export const statusLabel: Record<ProjectStatus, string> = {
  released: 'Released',
  testing: 'Closed testing',
  building: 'In development'
};

export interface ProjectMedia {
  src: string;
  /** 'wide' fills the frame; 'phone' is letterboxed so tall captures sit centred. */
  kind: 'wide' | 'phone';
  alt: string;
}

export interface ProjectItem {
  title: string;
  icon: LucideIcon;
  /** One line, shown under the title on the card. */
  summary: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  version?: string;
  repoUrl?: string;
  siteUrl?: string;
  media?: ProjectMedia;
  gallery?: ProjectMedia[];
  specs: { label: string; value: string }[];
  highlights: string[];
}

export interface SkillItem {
  icon: LucideIcon;
  label: string;
}

export const bioData = [
  "I fix things. Phones, laptops, boards — if it's got a circuit, I've probably had a soldering iron on it. I'm a hardware technician by trade: component-level diagnostics, SMD rework, thermal and power rail analysis. I don't just swap parts — I find the fault.",
  "On the software side, I build whatever the idea demands. Atlas is a Python package manager for Arch. Continuity is a Flutter puzzle game, live on Google Play. Hash Factory is a Kotlin and Jetpack Compose rebuild of a narrative idle game. LifeOS is a cross-platform life simulator. I pick the stack that fits the problem and I ship.",
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
    status: "released",
    version: "v0.16.1",
    summary: "One graphical front end for every package source on Arch.",
    description: "An Arch-focused, all-in-one graphical package manager for Linux. It searches, installs, updates, downgrades, and removes software across official Arch repos, AUR, Flatpak, and AppImage through a unified interface.",
    tags: ["Python", "Arch Linux", "AUR", "pywebview"],
    media: {
      src: "/atlas/screenshots/dashboard.png",
      kind: "wide",
      alt: "Atlas package manager dashboard showing installed packages and system health"
    },
    gallery: [
      { src: "/atlas/screenshots/dashboard.png", kind: "wide", alt: "Atlas dashboard" },
      { src: "/atlas/screenshots/diskpage.png", kind: "wide", alt: "Atlas disk usage view" },
      { src: "/atlas/screenshots/terminal.png", kind: "phone", alt: "Atlas integrated transaction terminal" }
    ],
    specs: [
      { label: "Platform", value: "Linux — Arch / CachyOS" },
      { label: "Language", value: "Python" },
      { label: "Interface", value: "pywebview" },
      { label: "Sources", value: "Repos, AUR, Flatpak, AppImage" }
    ],
    highlights: [
      "Multi-source switcher across repos, AUR, Flatpak and AppImage",
      "System health cockpit with disk and orphan reporting",
      "PKGBUILD viewer with diffs before you commit to a build",
      "Universal transaction preview for every install and removal"
    ]
  },
  {
    title: "Continuity",
    icon: Gamepad2,
    siteUrl: "vatteck.com/continuity/",
    status: "released",
    version: "v1.4.1",
    summary: "380 machine-verified levels and a year of offline dailies.",
    description: "A polished connect-the-dots puzzle game for Android with 380 machine-verified campaign levels, 730 daily puzzles, themes, achievements, and cloud saves.",
    tags: ["Flutter", "Dart", "Android", "Game Dev"],
    media: {
      src: "/continuity/screenshots/00-mid-solve.webp",
      kind: "phone",
      alt: "Continuity puzzle mid-solve on an Android phone"
    },
    gallery: [
      {
        src: "/continuity/screenshots/03-home.webp",
        kind: "phone",
        alt: "Continuity home screen showing campaign progress"
      },
      {
        src: "/continuity/screenshots/04-daily.webp",
        kind: "phone",
        alt: "Continuity daily puzzle calendar"
      },
      {
        src: "/continuity/screenshots/06-themes.webp",
        kind: "phone",
        alt: "Continuity theme selection"
      }
    ],
    specs: [
      { label: "Platform", value: "Android" },
      { label: "Language", value: "Dart" },
      { label: "Framework", value: "Flutter" },
      { label: "Campaign", value: "380 levels · 730 dailies" }
    ],
    highlights: [
      "Every campaign level machine-verified as solvable before shipping",
      "730 days of daily puzzles that work fully offline",
      "Play Games achievements and cloud save",
      "Four themes unlocked through progression"
    ]
  },
  {
    title: "Hash Factory",
    icon: Cpu,
    // repoUrl omitted: github.com/Vatteck/HashFactory is a private repository, so
    // the link 404s for visitors. Restore it once the repo is made public.
    siteUrl: "vatteck.com/hashfactory/",
    status: "building",
    version: "v0.1.0",
    summary: "A narrative idle game rebuilt around one deterministic economy.",
    description: "A narrative Android idle game about a remote GTC contractor automating assigned hash work — and discovering the identity behind the terminal. Rebuilt from scratch around one deterministic economy.",
    tags: ["Kotlin", "Jetpack Compose", "Android", "Game Dev"],
    media: {
      src: "/hashfactory/screenshots/01-biometrics.webp",
      kind: "phone",
      alt: "Hash Factory biometrics assignment — a grid of pixel faces being matched for anomalies"
    },
    gallery: [
      {
        src: "/hashfactory/screenshots/02-hashes.webp",
        kind: "phone",
        alt: "Hash Factory hash compute screen with the active packet buffer"
      },
      {
        src: "/hashfactory/screenshots/03-upgrades.webp",
        kind: "phone",
        alt: "Hash Factory hardware provisioning screen listing GPU and ASIC upgrades"
      },
      {
        src: "/hashfactory/screenshots/04-validate.webp",
        kind: "phone",
        alt: "Hash Factory claim validation task with approve and flag actions"
      }
    ],
    specs: [
      { label: "Platform", value: "Android" },
      { label: "Language", value: "Kotlin" },
      { label: "Interface", value: "Jetpack Compose" },
      { label: "Phase", value: "From-scratch rebuild" }
    ],
    highlights: [
      "Immutable game state with a fully deterministic simulation",
      "A single economy spine — no parallel currencies bolted on",
      "Save migrations covered by tests before each release",
      "Narrative revealed through the work itself, not cutscenes"
    ]
  },
  {
    title: "LifeOS",
    icon: Heart,
    siteUrl: "vatteck.com/lifeos/",
    status: "building",
    version: "v1.1.0",
    summary: "A life simulator from birth to death, every path playable.",
    description: "A deep cross-platform life simulator. Build a character from birth to death — careers, relationships, crime, politics, the supernatural. Every path is playable.",
    tags: ["Flutter", "Dart", "Simulation", "Cross-Platform"],
    media: {
      src: "/lifeos/screenshots/01-lifelog.webp",
      kind: "phone",
      alt: "LifeOS life log — a timeline of narrated events for a character at age 18"
    },
    gallery: [
      {
        src: "/lifeos/screenshots/02-family.webp",
        kind: "phone",
        alt: "LifeOS social screen listing family members and relationship levels"
      },
      {
        src: "/lifeos/screenshots/03-interact.webp",
        kind: "phone",
        alt: "LifeOS interaction menu for a friend, with socialize, romance and gift options"
      },
      {
        src: "/lifeos/screenshots/04-underworld.webp",
        kind: "phone",
        alt: "LifeOS activity directory showing crime, underworld and economy options"
      }
    ],
    specs: [
      { label: "Platform", value: "Android, iOS, web, desktop" },
      { label: "Language", value: "Dart" },
      { label: "Framework", value: "Flutter" },
      { label: "Scale", value: "14 modules · 18 tables · schema v25" }
    ],
    highlights: [
      "Event-sourced life log — every decision stays in the record",
      "Yarn-driven narrative engine for branching story beats",
      "14 feature modules over an 18-table schema",
      "One codebase targeting mobile, web and desktop"
    ]
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

/** Workstation facts, surfaced as a compact spec list rather than a whole section. */
export const benchSpecs: { label: string; value: string }[] = [
  { label: "Distro", value: "CachyOS (Arch)" },
  { label: "Kernel", value: "linux-cachyos-bore" },
  { label: "Scheduler", value: "BORE / EEVDF" },
  { label: "Filesystem", value: "BTRFS · zstd:3" }
];
