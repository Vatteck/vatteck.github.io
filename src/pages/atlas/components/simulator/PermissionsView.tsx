import React, { useState } from 'react';
import { 
  Shield, 
  Network, 
  Monitor, 
  HardDrive, 
  FolderOpen, 
  Variable, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PermissionsViewProps {}

interface PermissionItem {
  id: string;
  label: string;
  detail: string;
  enabled: boolean;
}

interface PermissionCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  items: PermissionItem[];
}

export const PermissionsView: React.FC<PermissionsViewProps> = () => {
  const [categories, setCategories] = useState<PermissionCategory[]>([
    {
      id: 'share',
      name: 'Share',
      icon: Network,
      items: [
        { id: 'network', label: 'Network Access', detail: 'Allow application to connect to local and internet networks', enabled: true },
        { id: 'ipc', label: 'IPC (Inter-Process)', detail: 'Share inter-process communications with host system services', enabled: true }
      ]
    },
    {
      id: 'socket',
      name: 'Socket',
      icon: Monitor,
      items: [
        { id: 'x11', label: 'X11 Window System', detail: 'Allow displaying GUI under X11 legacy windows', enabled: true },
        { id: 'wayland', label: 'Wayland Compositor', detail: 'Allow drawing screens using Wayland native protocols', enabled: true },
        { id: 'pulseaudio', label: 'PulseAudio / PipeWire', detail: 'Enable microphone and speaker audio streaming sockets', enabled: true },
        { id: 'session-bus', label: 'D-Bus Session Bus', detail: 'Access session-level messaging bus of host services', enabled: false }
      ]
    },
    {
      id: 'device',
      name: 'Device',
      icon: Shield,
      items: [
        { id: 'dri', label: 'DRI (Direct Rendering)', detail: 'Direct access to graphics hardware acceleration (GPU)', enabled: true },
        { id: 'devices', label: 'All Host Devices', detail: 'Raw access to hardware devices like webcams, controllers', enabled: false }
      ]
    },
    {
      id: 'filesystem',
      name: 'Filesystem',
      icon: FolderOpen,
      items: [
        { id: 'music', label: 'xdg-music:ro', detail: 'Read-only access to your default Music folder', enabled: true },
        { id: 'download', label: 'xdg-download', detail: 'Read-write access to your default Downloads folder', enabled: false },
        { id: 'config-spotify', label: '~/.config/spotify', detail: 'Isolated folder to save user cache and credentials', enabled: true }
      ]
    },
    {
      id: 'environment',
      name: 'Environment',
      icon: Variable,
      items: [
        { id: 'display', label: 'DISPLAY', detail: 'Pass environment variable for GUI socket mapping', enabled: true },
        { id: 'dbus', label: 'DBUS_SESSION_BUS_ADDRESS', detail: 'Locate session bus address inside container', enabled: true }
      ]
    }
  ]);

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    share: true,
    socket: true,
    filesystem: true
  });

  const [copied, setCopied] = useState(false);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTogglePermission = (catId: string, permId: string) => {
    setCategories(prevCats => 
      prevCats.map(cat => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          items: cat.items.map(item => 
            item.id === permId ? { ...item, enabled: !item.enabled } : item
          )
        };
      })
    );
  };

  const handleCopyCommand = () => {
    // Generate command based on state
    const overrides: string[] = [];
    categories.forEach(cat => {
      cat.items.forEach(item => {
        if (item.enabled) {
          if (item.id === 'network') overrides.push('--share=network');
          if (item.id === 'ipc') overrides.push('--share=ipc');
          if (item.id === 'x11') overrides.push('--socket=x11');
          if (item.id === 'wayland') overrides.push('--socket=wayland');
          if (item.id === 'pulseaudio') overrides.push('--socket=pulseaudio');
          if (item.id === 'session-bus') overrides.push('--socket=session-bus');
          if (item.id === 'dri') overrides.push('--device=dri');
          if (item.id === 'devices') overrides.push('--device=all');
          if (item.id === 'music') overrides.push('--filesystem=xdg-music:ro');
          if (item.id === 'download') overrides.push('--filesystem=xdg-download');
          if (item.id === 'config-spotify') overrides.push('--filesystem=~/.config/spotify');
        } else {
          if (item.id === 'network') overrides.push('--unshare=network');
          if (item.id === 'ipc') overrides.push('--unshare=ipc');
          if (item.id === 'x11') overrides.push('--nosocket=x11');
          if (item.id === 'wayland') overrides.push('--nosocket=wayland');
          if (item.id === 'pulseaudio') overrides.push('--nosocket=pulseaudio');
          if (item.id === 'session-bus') overrides.push('--nosocket=session-bus');
          if (item.id === 'dri') overrides.push('--nodevice=dri');
          if (item.id === 'devices') overrides.push('--nodevice=all');
          if (item.id === 'music') overrides.push('--nofilesystem=xdg-music:ro');
          if (item.id === 'download') overrides.push('--nofilesystem=xdg-download');
          if (item.id === 'config-spotify') overrides.push('--nofilesystem=~/.config/spotify');
        }
      });
    });

    const command = `flatpak override --user com.spotify.Client ${overrides.join(' ')}`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 select-none"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-display">Flatpak Sandbox Permissions</h2>
          <p className="text-slate-400 text-xs mt-1">Configure and override container sandbox rules dynamically.</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-teal-400 bg-teal-950/40 border border-teal-900/50 px-2 py-0.5 rounded-full font-bold flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-teal-400" />
            <span>Standard Sandboxing</span>
          </span>
        </div>
      </div>

      {/* Target App Row */}
      <div className="bg-[#111420] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-md">
            S
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-200">Spotify</span>
              <span className="text-[9px] font-mono text-slate-500">com.spotify.Client</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Online proprietary music streaming service.</p>
          </div>
        </div>
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-950/50 text-purple-400 border border-purple-900/50 uppercase tracking-wider">
          Flatpak
        </span>
      </div>

      {/* Categories List */}
      <div className="space-y-4 max-w-3xl">
        {categories.map((cat) => {
          const CatIcon = cat.icon;
          const isExpanded = !!expandedCategories[cat.id];
          
          return (
            <div 
              key={cat.id} 
              className="bg-[#111420] border border-slate-800 rounded-xl overflow-hidden"
            >
              {/* Category Header */}
              <div 
                onClick={() => toggleCategory(cat.id)}
                className="p-3.5 bg-slate-950/20 flex items-center justify-between cursor-pointer border-b border-slate-900"
              >
                <div className="flex items-center space-x-2">
                  <CatIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-200">{cat.name}</span>
                </div>
                <div className="text-slate-500">
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </div>

              {/* Items List */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-[#111420]"
                  >
                    <div className="divide-y divide-slate-900">
                      {cat.items.map((item) => (
                        <div 
                          key={item.id} 
                          className="p-4 flex items-center justify-between space-x-4 hover:bg-slate-950/10 transition-colors"
                        >
                          <div className="min-w-0 space-y-1">
                            <span className="text-xs font-bold text-slate-300">{item.label}</span>
                            <p className="text-[10px] text-slate-500 leading-relaxed font-mono truncate max-w-lg md:max-w-xl">
                              {item.detail}
                            </p>
                          </div>

                          {/* Toggle Switch */}
                          <div 
                            onClick={() => handleTogglePermission(cat.id, item.id)}
                            className={`w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors duration-200 flex-shrink-0 relative ${
                              item.enabled ? 'bg-emerald-600' : 'bg-slate-800'
                            }`}
                          >
                            <div 
                              className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                item.enabled ? 'translate-x-4' : 'translate-x-0'
                              }`} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Info and Actions */}
      <div className="bg-[#161a29]/40 border border-blue-950 p-4 rounded-xl max-w-3xl flex items-start space-x-3">
        <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-3 min-w-0 flex-grow">
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Overrides are saved to <code className="font-mono text-slate-200 font-semibold px-1 py-0.5 bg-slate-950 rounded">~/.local/share/flatpak/overrides/com.spotify.Client</code>. You can copy the generated CLI override command to apply permissions manually.
          </p>
          <button
            onClick={handleCopyCommand}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[10px] shadow transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied Override Command!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white" />
                <span>Copy Override Command</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
