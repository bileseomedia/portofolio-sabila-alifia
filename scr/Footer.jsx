import React from 'react';
import { Mail, MessageCircle, Linkedin, Instagram } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Footer = ({ contact, onOpenAdmin }) => {
  const { isDark } = useTheme();

  return (
    <footer
      id="contact"
      className={`py-20 sm:py-28 transition-colors duration-500 ${
        isDark ? 'bg-[#202F46]' : 'bg-[#DCEAF4]/55'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <span className={`text-xs uppercase tracking-[0.25em] font-semibold block mb-4 ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
          07 / Get In Touch
        </span>

        <h2 className={`font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mx-auto mb-6 ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
          {contact?.headline || "Let's Connect and Create Something Meaningful."}
        </h2>

        <p className={`text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-[#C7CED8]' : 'text-[#4A423C]'}`}>
          Terbuka untuk peluang kolaborasi kreatif, manajemen media sosial, e-commerce, live commerce, maupun diskusi seputar bisnis dan komunikasi digital.
        </p>

        {/* Contact Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {contact?.email && (
            <a
              href={`mailto:${contact.email}`}
              className={`flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold border transition-all duration-300 hover:-translate-y-1 shadow-md ${
                isDark
                  ? 'bg-[#C5A56A] border-[#C5A56A] text-[#17243A] hover:bg-[#D8C49A]'
                  : 'bg-[#FFFCF8] border-[#2C2520]/15 text-[#2C2520] hover:bg-[#F5E9BE]'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          )}

          {contact?.whatsapp && (
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold border transition-all duration-300 hover:-translate-y-1 shadow-md ${
                isDark
                  ? 'bg-[#17243A] border-[#C5A56A]/50 text-[#E1E5EB] hover:border-[#C5A56A]'
                  : 'bg-[#DCEAF4] border-[#CFE3F2] text-[#2C2520] hover:bg-[#CFE3F2]'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          )}

          {contact?.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold border transition-all duration-300 hover:-translate-y-1 shadow-md ${
                isDark
                  ? 'bg-[#17243A] border-[#C5A56A]/50 text-[#E1E5EB] hover:border-[#C5A56A]'
                  : 'bg-[#F3DDE3] border-[#EBCFD8] text-[#2C2520] hover:bg-[#EBCFD8]'
              }`}
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}

          {contact?.instagram && (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold border transition-all duration-300 hover:-translate-y-1 shadow-md ${
                isDark
                  ? 'bg-[#17243A] border-[#C5A56A]/50 text-[#E1E5EB] hover:border-[#C5A56A]'
                  : 'bg-[#FAF0D8] border-[#F5E9BE] text-[#2C2520] hover:bg-[#F5E9BE]'
              }`}
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          )}
        </div>

        {/* Editorial Colophon Bottom */}
        <div className="pt-8 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className={`font-editorial italic text-base ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
            Sabila Alifia Sundawa — S1 Manajemen, Pradita University
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className={`underline underline-offset-4 ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}
            >
              Admin Dashboard
            </button>
            <span className={isDark ? 'text-[#C7CED8]' : 'text-[#6E655F]'}>
              © {new Date().getFullYear()} All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
