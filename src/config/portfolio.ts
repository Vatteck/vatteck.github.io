import {
  Wrench, Terminal, Smartphone, Cpu, Gamepad2, Code2, 
  Layers, Monitor, Info, CheckCircle2, LucideIcon, Mail, Github,
  ExternalLink, MessageSquare
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
  "I operate at the intersection of physical hardware and low-level software. As a professional Hardware Device Technician, I've spent years diagnosing, repairing, and optimizing complex circuitry.",
  "My digital home is built on Arch Linux (specifically CachyOS), where I indulge my obsession with performance and customization. From kernel-tweaking Android devices to rooting and modding everything I own, I believe technology is meant to be mastered, not just used.",
  "When I'm not in the terminal or under the microscope, I'm deeply immersed in gaming and game modding, translating that passion into interactive experiences through game development."
];

export const deepDiveData: DeepDiveItem[] = [
  { icon: Wrench, title: "Hardware Engineering", description: "Specializing in component-level repair, SMD soldering, and diagnostic analysis of mobile and computing devices. I don't just fix devices; I optimize their physical thermal and power delivery systems." },
  { icon: Terminal, title: "Systems Architecture", description: "Building highly-optimized Linux environments from the ground up. Expertise in kernel configuration, filesystem optimization (BTRFS/ZFS), and automated system deployment using custom shell architecture." },
  { icon: Smartphone, title: "Mobile Forensics & Mod", description: "Deep-level Android customization including bootloader unlocking, custom recovery deployment, and building tailored kernel modules for specific hardware acceleration needs." },
  { icon: Cpu, title: "Silicon Optimization", description: "Advanced undervolting and overclocking strategies for modern CPU/GPU architectures. Maximizing performance-per-watt through low-level firmware and kernel-space adjustments." },
  { icon: Code2, title: "Game Engine Logic", description: "Developing custom game mechanics in Unity and C#. Focusing on performance-critical systems like procedural generation, AI pathfinding, and high-frequency physics calculations." },
  { icon: Layers, title: "Substrate Integration", description: "Designing end-to-end solutions that bridge the gap between custom hardware sensors and digital dashboards, utilizing MQTT and low-latency protocols." },
  { icon: Monitor, title: "Legacy Recovery", description: "Specialized data extraction and restoration from vintage hardware. Reviving \"dead\" silicon through custom interface bridges and low-level signal analysis." },
  { icon: Info, title: "Neural Interface Research", description: "Exploring the boundaries of human-machine interaction through EEG signal processing and custom haptic feedback hardware. Mapping digital intent to physical response." },
  { icon: CheckCircle2, title: "Encrypted Comms", description: "Deploying hardened communication nodes using decentralized protocols. Ensuring data integrity and anonymity through hardware-backed cryptographic modules." }
];

export const projectsData: ProjectItem[] = [
  {
    title: "SUBSTRATE: Miner",
    icon: Cpu,
    repoUrl: "https://github.com/Vatteck/SiliconSageAIMiner",
    siteUrl: "vatteck.com/SubstrateMiner",
    description: "An upcoming Android idle-clicker tycoon game where players build and optimize a massive mining operation.",
    details: "[PROJECT_SPECIFICATIONS]\nNAME: SUBSTRATE_MINER\nPLATFORM: ANDROID_OS\nENGINE: UNITY_2023.2\nLANGUAGE: C#_DOTNET_7\n\n# CORE_SYSTEMS\n- PROCEDURAL_RESOURCE_GEN: ACTIVE\n- HARDWARE_INSPIRED_UI: LOADED\n- BACKEND_CALC_ENGINE: OPTIMIZED\n- LOW_LATENCY_INPUT: ENABLED\n\n# STATUS\nCURRENT_PHASE: CLOSED_ALPHA\nFOCUS: PRESTIGE_MECHANICS_BALANCING",
    tags: ["Unity", "C#", "Android", "Game Dev"],
    status: "IN PROGRESS"
  },
  {
    title: "CachyOS Optimization Suite",
    icon: Terminal,
    description: "A collection of scripts and configurations designed to squeeze every ounce of performance out of the Arch-based CachyOS.",
    details: "[OPTIMIZATION_SUITE_V2.0]\nOS_TARGET: ARCH_LINUX_CACHYOS\nARCHITECTURE: ZEN_3_4_OPTIMIZED\n\n# INCLUDED_TOOLS\n- CPU_GOVERNOR_TUNER: ENABLED\n- MEMORY_MANAGEMENT_SCRIPTS: ACTIVE\n- LATENCY_REDUCTION_CONFIGS: LOADED\n- KERNEL_PARAM_OPTIMIZER: READY\n\n# PERFORMANCE_METRICS\n- MICRO_STUTTER_REDUCTION: 15%\n- INPUT_LATENCY_DECREASE: 8ms",
    tags: ["Linux", "Bash", "Kernel", "Performance"],
    status: "PLANNED"
  },
  {
    title: "Kernel-Level Android Firewall",
    icon: Smartphone,
    description: "A planned project to build a low-level network filtering system directly into the Android kernel for maximum security.",
    details: "[SECURITY_PROTOCOL_ALPHA]\nOS_TARGET: ANDROID_KERNEL_6.1+\nSECURITY_LEVEL: HARDWARE_ISOLATION\n\n# PLANNED_FEATURES\n- EBPF_PACKET_FILTERING: RESEARCHING\n- HARDWARE_BACKED_ENCRYPTION: PLANNED\n- SYSCALL_LEVEL_CONTROL: PROTOTYPING\n- REAL_TIME_INSPECTION_HUD: DESIGNING\n\n# GOAL\nBYPASS_STANDARD_API: CONFIRMED",
    tags: ["C", "Android", "Kernel", "Security"],
    status: "PLANNED"
  },
  {
    title: "Substrate Hardware Monitor",
    icon: Monitor,
    description: "A custom hardware monitoring dashboard designed for high-refresh rate displays and low-level sensor polling.",
    details: "[HARDWARE_MONITOR_V1.0]\nINTERFACE: LINUX_SYSFS_HWMON\nACCELERATION: HARDWARE_GPU_RENDERED\n\n# PLANNED_FEATURES\n- ZEN_ARCH_VOLTAGE_TRACKING: ACTIVE\n- PID_LOOP_FAN_CONTROL: TESTING\n- GPU_POWER_DELIVERY_MONITOR: READY\n- HIGH_REFRESH_RATE_UI: 144HZ_SUPPORT\n\n# SENSOR_POLLING\n- FREQUENCY: 1000HZ\n- OVERHEAD: <0.5%_CPU",
    tags: ["Rust", "Linux", "Hardware", "UI"],
    status: "PLANNED"
  }
];

export const skillsData: SkillItem[] = [
  { icon: Wrench, label: "Hardware Diagnostics" },
  { icon: Terminal, label: "Arch Linux Mastery" },
  { icon: Smartphone, label: "Android Modding" },
  { icon: Cpu, label: "Kernel Tweaking" },
  { icon: Gamepad2, label: "Game Development" },
  { icon: Code2, label: "AI Engineering" },
  { icon: Layers, label: "Device Modding" },
  { icon: Monitor, label: "System Optimization" },
  { icon: CheckCircle2, label: "SMD Soldering" },
  { icon: Info, label: "Hardware Forensics" },
  { icon: ExternalLink, label: "Network Security" },
  { icon: Terminal, label: "Bash/Python Scripting" },
  { icon: Cpu, label: "Reverse Engineering" },
  { icon: Layers, label: "PCB Design & Prototyping" },
  { icon: Monitor, label: "KVM/QEMU Virtualization" },
  { icon: Smartphone, label: "Embedded Systems" },
  { icon: Code2, label: "Low-level C/C++" },
  { icon: Wrench, label: "Thermal Management" },
  { icon: CheckCircle2, label: "Logic Analysis" }
];
