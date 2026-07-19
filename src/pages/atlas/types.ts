export type PackageSource = 'Arch' | 'AUR' | 'Flatpak' | 'AppImage';

export interface AppPackage {
  id: string;
  name: string;
  repo: string;
  version: string;
  description: string;
  sources: PackageSource[];
  selectedSource: PackageSource;
  isInstalled: boolean;
  installedSource?: PackageSource;
  iconText: string;
  iconBg: string;
  votes?: number;
  popularity?: number;
  aurBuildType?: 'source' | 'binary' | 'git';
  isOutOfDate?: boolean;
  subtext?: string;
  sizeGb?: number;
  license?: string;
  url?: string;
  packager?: string;
  category?: string;
}

export type SidebarTab =
  | 'dashboard'
  | 'browse'
  | 'installed'
  | 'updates'
  | 'news'
  | 'disk'
  | 'health'
  | 'activity'
  | 'permissions'
  | 'settings';

export interface DiskItem {
  id: string;
  name: string;
  description: string;
  initialSizeGb: number;
  currentSizeGb: number;
  isCleaned: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: 'install' | 'uninstall' | 'update' | 'cleanup' | 'update_all';
  pkgName: string;
  source?: PackageSource;
  status: 'success' | 'running' | 'failed';
  count?: number;
}

export interface AtlasSettings {
  enableTimeshift: boolean;
  enableAur: boolean;
  enableFlatpak: boolean;
  enableAppImage: boolean;
  flatpakLevel: 'System' | 'User';
  enableNotifications: boolean;
  enableSuggestions: boolean;
  enableSnapsFallback: boolean;
  enableDebianFallback: boolean;
  theme: ThemePreset;
  accent: AccentColor;
  scanPkgbuilds: boolean;
  cleanChroot: boolean;
}

export type ThemePreset = 'dark' | 'light' | 'nord' | 'solarized' | 'high-contrast';
export type AccentColor = 'indigo' | 'blue' | 'teal' | 'green' | 'rose' | 'amber';

export interface BrowseCategory {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
}

export interface AurBucket {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface HealthCheck {
  id: string;
  name: string;
  icon: string;
  status: 'ok' | 'attention' | 'info';
  detail: string;
  actionLabel?: string;
  actionTab?: SidebarTab;
}

export interface PacnewFile {
  path: string;
  risk: 'danger' | 'warn' | 'info';
  riskLabel: string;
  package: string;
  resolved: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  isRead: boolean;
}

export interface FlatpakPermCategory {
  name: string;
  items: FlatpakPermItem[];
}

export interface FlatpakPermItem {
  key: string;
  label: string;
  enabled: boolean;
  editable?: boolean;
}
