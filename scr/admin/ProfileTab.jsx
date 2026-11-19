import React, { useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { EditorialFrame } from '../common/EditorialFrame';
import { compressMediaFile, uploadMediaToStorage } from '../../lib/storage';
import { useTheme } from '../../context/ThemeContext';

export const ProfileTab = ({ draftData, onChange, onNotify }) => {
  const { isDark } = useTheme();
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);

  const handleHeroPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingHero(true);
    try {
      const compressed = await compressMediaFile(file);
      const publicUrl = await uploadMediaToStorage(compressed.file, 'profile');
      onChange({
        ...draftData,
        hero: { ...draftData.hero, profileImage: publicUrl }
      });
      onNotify('Foto profil utama berhasil diunggah.');
    } catch (err) {
      console.error(err);
      onNotify(err.message || 'Gagal mengunggah foto profil.');
    } finally {
      setIsUploadingHero(false);
    }
  };

  const handleAboutPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAbout(true);
    try {
      const compressed = await compressMediaFile(file);
      const publicUrl = await uploadMediaToStorage(compressed.file, 'about');
      onChange({
        ...draftData,
        about: { ...draftData.about, aboutImage: publicUrl }
      });
      onNotify('Foto section About Me berhasil diunggah.');
    } catch (err) {
      console.error(err);
      onNotify(err.message || 'Gagal mengunggah foto About.');
    } finally {
      setIsUploadingAbout(false);
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="font-editorial text-2xl font-semibold">Profil Utama, Tentang Saya & Pendidikan</h4>

      {/* Photo Uploads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Hero Profile Image Upload */}
        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFF9F0] border-[#CFE3F2]'}`}>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
            Foto Profil Utama (Hero)
          </label>
          <div className="mb-3 rounded-xl overflow-hidden h-44">
            <EditorialFrame src={draftData.hero.profileImage} isDark={isDark} aspectClass="h-full" />
          </div>
          <div className="flex items-center gap-2">
            <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-[#DCEAF4] text-[#2C2520] hover:bg-[#CFE3F2] transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploadingHero ? 'Mengunggah...' : 'Unggah / Ganti Foto'}</span>
              <input
                type="file"
                disabled={isUploadingHero}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleHeroPhotoUpload}
              />
            </label>
            {draftData.hero.profileImage && (
              <button
                onClick={() => onChange({ ...draftData, hero: { ...draftData.hero, profileImage: '' } })}
                className="p-2 rounded-xl bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 transition-colors"
                title="Hapus Foto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* About Section Image Upload */}
        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFF9F0] border-[#CFE3F2]'}`}>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
            Foto Section About Me
          </label>
          <div className="mb-3 rounded-xl overflow-hidden h-44">
            <EditorialFrame src={draftData.about.aboutImage} isDark={isDark} aspectClass="h-full" />
          </div>
          <div className="flex items-center gap-2">
            <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-[#F3DDE3] text-[#2C2520] hover:bg-[#EBCFD8] transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploadingAbout ? 'Mengunggah...' : 'Unggah / Ganti Foto'}</span>
              <input
                type="file"
                disabled={isUploadingAbout}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAboutPhotoUpload}
              />
            </label>
            {draftData.about.aboutImage && (
              <button
                onClick={() => onChange({ ...draftData, about: { ...draftData.about, aboutImage: '' } })}
                className="p-2 rounded-xl bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 transition-colors"
                title="Hapus Foto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Text Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Nama Lengkap</label>
          <input
            type="text"
            value={draftData.hero.name}
            onChange={(e) => onChange({ ...draftData, hero: { ...draftData.hero, name: e.target.value } })}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Caption Foto Profil</label>
          <input
            type="text"
            value={draftData.hero.profileCaption}
            onChange={(e) => onChange({ ...draftData, hero: { ...draftData.hero, profileCaption: e.target.value } })}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1">Headline Hero</label>
        <input
          type="text"
          value={draftData.hero.headline}
          onChange={(e) => onChange({ ...draftData, hero: { ...draftData.hero, headline: e.target.value } })}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1">Deskripsi Singkat Hero</label>
        <textarea
          rows={2}
          value={draftData.hero.description}
          onChange={(e) => onChange({ ...draftData, hero: { ...draftData.hero, description: e.target.value } })}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1">Judul Section About Me</label>
        <input
          type="text"
          value={draftData.about.title}
          onChange={(e) => onChange({ ...draftData, about: { ...draftData.about, title: e.target.value } })}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1">Deskripsi Lengkap About Me</label>
        <textarea
          rows={4}
          value={draftData.about.description}
          onChange={(e) => onChange({ ...draftData, about: { ...draftData.about, description: e.target.value } })}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
        />
      </div>

      {/* Education Edit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div>
          <label className="block text-xs font-semibold mb-1">Universitas</label>
          <input
            type="text"
            value={draftData.about.education.university}
            onChange={(e) => onChange({
              ...draftData,
              about: {
                ...draftData.about,
                education: { ...draftData.about.education, university: e.target.value }
              }
            })}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Program Studi</label>
          <input
            type="text"
            value={draftData.about.education.major}
            onChange={(e) => onChange({
              ...draftData,
              about: {
                ...draftData.about,
                education: { ...draftData.about.education, major: e.target.value }
              }
            })}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Periode Studi</label>
          <input
            type="text"
            value={draftData.about.education.period}
            onChange={(e) => onChange({
              ...draftData,
              about: {
                ...draftData.about,
                education: { ...draftData.about.education, period: e.target.value }
              }
            })}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
          />
        </div>
      </div>
    </div>
  );
};
