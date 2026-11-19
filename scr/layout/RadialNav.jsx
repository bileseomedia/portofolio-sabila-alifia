import React, { useState } from 'react';
import { Compass, X, Sparkles, User, Briefcase, Award, FolderHeart, Layers, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const RadialNav = ({ activeSection, onNavigate }) => {
  const { isDark } = useTheme();
  const [radialOpen, setRadialOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'organization', label: 'Organization', icon: Award },
    { id: 'projects', label: 'Projects', icon: FolderHeart },
    { id: 'skills', label: 'Skills', icon: Layers },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleItemClick = (id) => {
    setRadialOpen(false);
    onNavigate(id);
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
      {/* Backdrop when radial menu is open on mobile/tablet for easy close */}
      {radialOpen && (
        <div
          onClick={() => setRadialOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] -z-10 transition-opacity"
        />
      )}

      <div className="relative flex items-center justify-center">
        {/* Orbiting Circular Menu Nodes */}
        {navItems.map((item, idx) => {
          // Distribute 7 items along a graceful 115-degree arc from Top (-92 deg) to Left (-198 deg)
          const total = navItems.length;
          const startAngle = -92;
          const endAngle = -198;
          const angleDeg = startAngle + ((endAngle - startAngle) / (total - 1)) * idx;
          const angleRad = (angleDeg * Math.PI) / 180;
          const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 132 : 168;
          const x = radialOpen ? Math.cos(angleRad) * radius : 0;
          const y = radialOpen ? Math.sin(angleRad) * radius : 0;
          const isActive = activeSection === item.id;
          const IconComp = item.icon;

          // Light Mode alternating soft pastel pills
          const lightPillColors = [
            'bg-[#DCEAF4] border-[#CFE3F2] text-[#2C2520]',
            'bg-[#F3DDE3] border-[#EBCFD8] text-[#2C2520]',
            'bg-[#F5E9BE] border-[#FAF0D8] text-[#2C2520]',
            'bg-[#FFFCF8] border-[#CFE3F2] text-[#2C2520]'
          ];
          const pillStyle = isDark
            ? isActive
              ? 'bg-[#C5A56A] border-[#D8C49A] text-[#17243A] font-semibold shadow-lg'
              : 'bg-[#202F46] border-[#C5A56A]/45 text-[#E1E5EB] hover:border-[#C5A56A] hover:bg-[#293A52]'
            : isActive
              ? 'bg-[#2C2520] border-[#2C2520] text-[#FFF9F0] font-semibold shadow-lg'
              : `${lightPillColors[idx % lightPillColors.length]} hover:scale-105 shadow-md`;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              style={{
                transform: `translate(${x}px, ${y}px) scale(${radialOpen ? 1 : 0.3})`,
                opacity: radialOpen ? 1 : 0,
                pointerEvents: radialOpen ? 'auto' : 'none',
                transitionDelay: radialOpen ? `${idx * 35}ms` : '0ms'
              }}
              className={`absolute right-0 bottom-0 flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs tracking-wide whitespace-nowrap transition-all duration-500 ease-out ${pillStyle}`}
            >
              <IconComp className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Decorative Orbit Ring when expanded */}
        <div
          className={`pointer-events-none absolute right-2 bottom-2 w-[270px] h-[270px] sm:w-[340px] sm:h-[340px] rounded-full border border-dashed transition-all duration-500 ${
            radialOpen ? 'opacity-45 scale-100' : 'opacity-0 scale-50'
          } ${isDark ? 'border-[#C5A56A]' : 'border-[#2C2520]/35'}`}
          style={{ transformOrigin: 'bottom right' }}
        />

        {/* Central Radial Compass Trigger */}
        <button
          onClick={() => setRadialOpen(!radialOpen)}
          aria-label="Buka atau Tutup Radial Navigation"
          className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center shadow-xl border-2 transition-all duration-500 hover:scale-105 ${
            isDark
              ? 'bg-[#202F46] border-[#C5A56A] text-[#D8C49A]'
              : 'bg-[#DCEAF4] border-[#2C2520]/20 text-[#2C2520]'
          }`}
        >
          {radialOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
          ) : (
            <>
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5" />
              <span className="text-[9px] uppercase tracking-widest font-semibold">Menu</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
