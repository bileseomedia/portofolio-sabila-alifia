import React, { useState } from 'react';
import { Sun, Moon, Lock, Unlock, Menu, X, Sparkles, User, Briefcase, Award, FolderHeart, Layers, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const Header = ({ activeSection, onNavigate, onOpenAdmin }) => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'organization', label: 'Organization', icon: Award },
    { id: 'projects', label: 'Projects', icon: FolderHeart },
    { id: 'skills', label: 'Skills', icon: Layers },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-500 ${
        isDark
          ? 'bg-[#17243A]/90 border-[#293A52]'
          : 'bg-[#FFFCF8]/90 border-[#EBCFD8]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 py-3.5 flex items-center justify-between">
        {/* Editorial Brand Monogram */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-editorial italic text-xl font-semibold transition-transform duration-300 group-hover:scale-105 ${
              isDark
                ? 'bg-[#202F46] text-[#C5A56A] border border-[#C5A56A]/50'
                : 'bg-[#DCEAF4] text-[#2C2520] border border-[#2C2520]/10'
            }`}
          >
            S.
          </div>
          <div>
            <span className={`block font-editorial text-lg font-semibold leading-none tracking-tight ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
              Sabila Alifia
            </span>
            <span className={`block text-[11px] uppercase tracking-[0.2em] mt-1 ${isDark ? 'text-[#C7CED8]' : 'text-[#7A7069]'}`}>
              Creative Portfolio
            </span>
          </div>
        </button>

        {/* Desktop Clean Horizontal Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Navigasi Utama">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? isDark ? 'text-[#C5A56A]' : 'text-[#2C2520] font-semibold'
                    : isDark ? 'text-[#C7CED8] hover:text-[#E1E5EB]' : 'text-[#6E655F] hover:text-[#2C2520]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                      isDark ? 'bg-[#C5A56A]' : 'bg-[#5B7C99]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Theme Toggle, Admin Studio Button, Mobile Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Prominent Light / Dark Mode Switch */}
          <button
            onClick={toggleTheme}
            aria-label="Ganti Tema Light atau Dark Mode"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-[#202F46] border-[#C5A56A]/50 text-[#D8C49A] hover:bg-[#293A52]'
                : 'bg-[#F5E9BE] border-[#2C2520]/15 text-[#2C2520] hover:bg-[#FAF0D8]'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-[#C5A56A]" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#2C2520]" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          {/* Admin Studio Access Button */}
          <button
            onClick={onOpenAdmin}
            aria-label="Buka Admin Dashboard"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
              isDark
                ? 'bg-[#293A52] border-[#C7CED8]/25 text-[#E1E5EB] hover:border-[#C5A56A]'
                : 'bg-[#F3DDE3] border-[#EBCFD8] text-[#2C2520] hover:bg-[#EBCFD8]'
            }`}
          >
            {isAuthenticated ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">Studio Admin</span>
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu Navigasi"
            className={`lg:hidden p-2.5 rounded-full border ${
              isDark
                ? 'bg-[#202F46] border-[#293A52] text-[#E1E5EB]'
                : 'bg-[#DCEAF4] border-[#CFE3F2] text-[#2C2520]'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-6 py-5 border-t space-y-2 transition-all ${
            isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFFCF8] border-[#EBCFD8]'
          }`}
        >
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors ${
                  activeSection === item.id
                    ? isDark
                      ? 'bg-[#293A52] text-[#C5A56A] border border-[#C5A56A]/40'
                      : 'bg-[#DCEAF4] text-[#2C2520]'
                    : isDark
                      ? 'text-[#C7CED8] hover:bg-[#17243A]'
                      : 'text-[#4A423C] hover:bg-[#FAF0D8]'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
