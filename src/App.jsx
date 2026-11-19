import React, { useState, useEffect } from 'react';
import { INITIAL_PORTFOLIO_DATA } from './types/initialData';
import { fetchPortfolioData, subscribeToPortfolioUpdates } from './lib/api';
import { useTheme } from './context/ThemeContext';
import { Toast } from './components/common/Toast';
import { Lightbox } from './components/common/Lightbox';
import { Header } from './components/layout/Header';
import { RadialNav } from './components/layout/RadialNav';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { OrganizationSection } from './components/sections/OrganizationSection';
import { VerticalShowcaseSection } from './components/sections/VerticalShowcaseSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ProjectModal } from './components/sections/ProjectModal';
import { SkillsSection } from './components/sections/SkillsSection';
import { AdminModal } from './components/admin/AdminModal';

export default function App() {
  const { isDark } = useTheme();
  // Master Portfolio Data state
  const [portfolioData, setPortfolioData] = useState(INITIAL_PORTFOLIO_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  // Navigation & Interactive UI State
  const [activeSection, setActiveSection] = useState('home');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [lightboxMedia, setLightboxMedia] = useState(null);

// Admin Studio State
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState('profile');
  const notify = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };
  // 1. Load Data from Supabase / Local Cache on Mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();

      // 2. Realtime Subscription from Supabase
    const unsubscribe = subscribeToPortfolioUpdates(async () => {
      try {
        const freshData = await fetchPortfolioData();
        setPortfolioData(freshData);
      } catch (e) {
        console.warn('Realtime refresh error:', e);
      }
    });
    return () => unsubscribe();
  }, []);

// 3. Scroll Spy for Section Indicator
  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'organization', 'projects', 'showcase', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const handleOpenAdminWithTab = (tab = 'profile') => {
    setAdminInitialTab(tab);
    setAdminOpen(true);
  };
  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-[#CFE3F2] selection:text-[#2C2520] ${
        isDark ? 'bg-[#17243A] text-[#E1E5EB]' : 'bg-[#FFF9F0] text-[#4A423C]'
      }`}
    >

       {/* Toast Notification */}
      <Toast message={toastMessage} isDark={isDark} />
      {/* Top Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAdmin={() => handleOpenAdminWithTab('profile')}
      />
      {/* Hero Section */}
      <HeroSection
        hero={portfolioData.hero}
        onExploreClick={() => scrollToSection('projects')}
        onConnectClick={() => scrollToSection('contact')}
      />
      {/* About Section */}
      <AboutSection
        about={portfolioData.about}
        fallbackImage={portfolioData.hero.profileImage}
      />

       {/* Experience Section */}
      <ExperienceSection
        experiences={portfolioData.experiences}
        onMediaClick={(media) => setLightboxMedia(media)}
      />
      {/* Organization Section */}
      <OrganizationSection
        organizations={portfolioData.organizations}
        onManageGallery={() => handleOpenAdminWithTab('organization')}
        onMediaClick={(media) => setLightboxMedia(media)}
      />
      {/* Interactive Vertical Typography Archive */}
      <VerticalShowcaseSection
        verticalShowcase={portfolioData.verticalShowcase}
        onManageCategory={(cat) => handleOpenAdminWithTab('vertical')}
        onMediaClick={(media) => setLightboxMedia(media)}
      />

      {/* Selected Works Projects Section */}
      <ProjectsSection
        projects={portfolioData.projects}
        onProjectSelect={(proj) => setActiveProjectModal(proj)}
      />
      {/* Capabilities & Skills Section */}
      <SkillsSection skills={portfolioData.skills} />
      {/* Footer & Contact */}
      <Footer
        contact={portfolioData.contact}
        onOpenAdmin={() => handleOpenAdminWithTab('profile')}
      />
      {/* Circular Radial Orbit Navigation */}
      <RadialNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

     {/* Project Detail Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
      {/* Fullscreen Media Lightbox */}
      {lightboxMedia && (
        <Lightbox
          media={lightboxMedia}
          onClose={() => setLightboxMedia(null)}
        />
      )}
      {/* Admin Dashboard Studio Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        portfolioData={portfolioData}
        initialTab={adminInitialTab}
        onUpdatePortfolio={(updated) => setPortfolioData(updated)}
        onNotify={notify}
      />
    </div>
  );
}  
