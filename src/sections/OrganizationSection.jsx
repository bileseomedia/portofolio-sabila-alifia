import React from 'react';
import { Award } from 'lucide-react';
import { EditorialFrame } from '../common/EditorialFrame';
import { useTheme } from '../../context/ThemeContext';

export const OrganizationSection = ({ organizations, onManageGallery, onMediaClick }) => {
  const { isDark } = useTheme();

  return (
    <section
      id="organization"
      className={`py-20 sm:py-28 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFF9F0] border-[#EBCFD8]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-14">
          <span className={`text-xs uppercase tracking-[0.25em] font-semibold block mb-3 ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
            03 / Campus Involvement & Leadership
          </span>
          <h2 className={`font-editorial text-4xl sm:text-5xl font-semibold ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
            Beyond the Classroom
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Special Featured Spotlight Card: Leadership Experience (PKKMB) */}
          <div
            className={`lg:col-span-7 rounded-3xl p-8 sm:p-10 border relative overflow-hidden flex flex-col justify-between transition-colors duration-500 ${
              isDark
                ? 'bg-[#17243A] border-[#C5A56A]/60'
                : 'bg-[#F3DDE3] border-[#EBCFD8]'
            }`}
          >
            {/* Decorative Corner Emblem */}
            <div
              className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-40 pointer-events-none ${
                isDark ? 'bg-[#293A52]' : 'bg-[#F5E9BE]'
              }`}
            />

            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-current/15 bg-white/40 dark:bg-black/20">
                <Award className={`w-4 h-4 ${isDark ? 'text-[#C5A56A]' : 'text-[#2C2520]'}`} />
                <span className={isDark ? 'text-[#D8C49A]' : 'text-[#2C2520]'}>Leadership Spotlight</span>
              </div>

              <h3 className={`font-editorial text-3xl sm:text-4xl font-semibold leading-tight ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                {organizations?.leadership?.title}
              </h3>

              {/* Theme Quote Block */}
              <blockquote
                className={`p-5 rounded-2xl border-l-4 ${
                  isDark
                    ? 'bg-[#202F46] border-[#C5A56A] text-[#D8C49A]'
                    : 'bg-[#FFFCF8] border-[#5B7C99] text-[#2C2520]'
                }`}
              >
                <span className="text-[11px] uppercase tracking-[0.2em] block opacity-75 mb-1">
                  Tema Kegiatan
                </span>
                <p className="font-editorial italic text-xl sm:text-2xl font-medium">
                  “{organizations?.leadership?.theme}”
                </p>
              </blockquote>

              <p className={`text-base leading-relaxed ${isDark ? 'text-[#C7CED8]' : 'text-[#4A423C]'}`}>
                {organizations?.leadership?.description}
              </p>
            </div>

            <div className="relative z-10 pt-8 mt-8 border-t border-current/10 flex flex-wrap gap-3">
              {['Koordinasi Tim', 'Manajemen Acara', 'Perencanaan Eksekusi', 'Komunikasi Lintas Divisi'].map((skill) => (
                <span
                  key={skill}
                  className={`text-xs px-3.5 py-1.5 rounded-full ${
                    isDark
                      ? 'bg-[#293A52] text-[#E1E5EB]'
                      : 'bg-[#FFF9F0] text-[#2C2520]'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Organization Card: HIMAA */}
          <div
            className={`lg:col-span-5 rounded-3xl p-8 sm:p-10 border flex flex-col justify-between transition-colors duration-500 ${
              isDark
                ? 'bg-[#293A52] border-[#C7CED8]/25'
                : 'bg-[#FAF0D8] border-[#F5E9BE]'
            }`}
          >
            <div className="space-y-5">
              <span
                className={`inline-block text-xs uppercase tracking-[0.2em] font-semibold px-3.5 py-1.5 rounded-full ${
                  isDark ? 'bg-[#17243A] text-[#C5A56A]' : 'bg-[#DCEAF4] text-[#2C2520]'
                }`}
              >
                Organization
              </span>

              <h3 className={`font-editorial text-3xl font-semibold leading-snug ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                {organizations?.himaa?.name}
              </h3>

              <p className={`font-editorial italic text-xl ${isDark ? 'text-[#D8C49A]' : 'text-[#5B7C99]'}`}>
                {organizations?.himaa?.role}
              </p>

              <p className={`text-base leading-relaxed ${isDark ? 'text-[#C7CED8]' : 'text-[#4A423C]'}`}>
                {organizations?.himaa?.description}
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-current/10">
              <p className={`text-xs italic ${isDark ? 'text-[#C7CED8]' : 'text-[#6E655F]'}`}>
                Publikasi visual, desain informasi kegiatan, dan dokumentasi arsip acara program studi.
              </p>
            </div>
          </div>
        </div>

        {/* Organization & Leadership Documentation Gallery */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className={`font-editorial text-2xl font-semibold ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
              Galeri Dokumentasi Kegiatan Organisasi & Kepemimpinan
            </h4>
            <button
              onClick={onManageGallery}
              className={`text-xs font-medium px-4 py-2 rounded-full border transition-colors ${
                isDark
                  ? 'border-[#C5A56A]/50 text-[#D8C49A] hover:bg-[#17243A]'
                  : 'border-[#2C2520]/20 text-[#2C2520] hover:bg-[#DCEAF4]'
              }`}
            >
              + Kelola Galeri
            </button>
          </div>

          {organizations?.gallery && organizations.gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {organizations.gallery.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => onMediaClick(item)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden border p-2.5 transition-all duration-300 hover:-translate-y-1 ${
                    isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-[#FFFCF8] border-[#CFE3F2]'
                  }`}
                >
                  <EditorialFrame
                    src={item.url}
                    mediaType={item.type || 'image'}
                    alt={item.title}
                    isDark={isDark}
                    aspectClass="aspect-[4/3]"
                    className="rounded-xl"
                  />
                  {(item.title || item.caption) && (
                    <div className="pt-3 px-1">
                      <p className={`font-editorial text-base font-semibold ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                        {item.title}
                      </p>
                      {item.caption && (
                        <p className={`text-xs mt-0.5 line-clamp-2 ${isDark ? 'text-[#C7CED8]' : 'text-[#6E655F]'}`}>
                          {item.caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <EditorialFrame
                label="Dokumentasi PKKMB Manajemen"
                sublabel="Unggah foto kegiatan kepemimpinan melalui Studio Admin"
                isDark={isDark}
                aspectClass="aspect-[16/10]"
                className="rounded-2xl"
              />
              <EditorialFrame
                label="Publikasi HIMAA"
                sublabel="Unggah poster publikasi atau dokumentasi acara HIMAA"
                isDark={isDark}
                aspectClass="aspect-[16/10]"
                className="rounded-2xl"
              />
              <EditorialFrame
                label="Kolaborasi Tim Kepanitiaan"
                sublabel="Tambahkan beberapa foto sekaligus di dashboard admin"
                isDark={isDark}
                aspectClass="aspect-[16/10]"
                className="rounded-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
