import React, { useState } from 'react';
import { Plus, Trash2, Camera } from 'lucide-react';
import { compressMediaFile, uploadMediaToStorage } from '../../lib/storage';
import { useTheme } from '../../context/ThemeContext';

export const ExperienceTab = ({ draftData, onChange, onNotify }) => {
  const { isDark } = useTheme();
  const [uploadingExpId, setUploadingExpId] = useState(null);

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: 'Posisi Baru',
      company: '[Nama Perusahaan / Brand]',
      period: '[Periode]',
      description: 'Deskripsi peran dan tanggung jawab.',
      mediaUrl: '',
      mediaType: 'image'
    };
    onChange({
      ...draftData,
      experiences: [newExp, ...(draftData.experiences || [])]
    });
    onNotify('Pengalaman baru ditambahkan ke bagian atas.');
  };

  const handleDeleteExperience = (id) => {
    const filtered = (draftData.experiences || []).filter((item) => item.id !== id);
    onChange({ ...draftData, experiences: filtered });
    onNotify('Pengalaman berhasil dihapus.');
  };

  const handleUploadMedia = async (idx, exp, file) => {
    if (!file) return;

    setUploadingExpId(exp.id);
    try {
      const compressed = await compressMediaFile(file);
      const publicUrl = await uploadMediaToStorage(compressed.file, 'experiences');
      const next = [...(draftData.experiences || [])];
      next[idx] = { ...exp, mediaUrl: publicUrl, mediaType: compressed.type };
      onChange({ ...draftData, experiences: next });
      onNotify('Foto dokumentasi pengalaman berhasil diperbarui.');
    } catch (err) {
      console.error(err);
      onNotify(err.message || 'Gagal mengunggah foto.');
    } finally {
      setUploadingExpId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h4 className="font-editorial text-2xl font-semibold">Kelola Pengalaman Kerja</h4>
        <button
          onClick={handleAddExperience}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#DCEAF4] text-[#2C2520] hover:bg-[#CFE3F2] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Tambah Pengalaman
        </button>
      </div>

      {(draftData.experiences || []).map((exp, idx) => (
        <div
          key={exp.id || idx}
          className={`p-5 rounded-2xl border space-y-3 ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFF9F0] border-[#CFE3F2]'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Pengalaman #{idx + 1}</span>
            <button
              onClick={() => handleDeleteExperience(exp.id)}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hapus
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={exp.role}
              placeholder="Posisi / Jabatan"
              onChange={(e) => {
                const next = [...draftData.experiences];
                next[idx] = { ...exp, role: e.target.value };
                onChange({ ...draftData, experiences: next });
              }}
              className={`px-3 py-2 rounded-xl border text-sm ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
            />
            <input
              type="text"
              value={exp.company}
              placeholder="Nama Perusahaan / Brand"
              onChange={(e) => {
                const next = [...draftData.experiences];
                next[idx] = { ...exp, company: e.target.value };
                onChange({ ...draftData, experiences: next });
              }}
              className={`px-3 py-2 rounded-xl border text-sm ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
            />
            <input
              type="text"
              value={exp.period}
              placeholder="Periode (Contoh: 2024 – 2025)"
              onChange={(e) => {
                const next = [...draftData.experiences];
                next[idx] = { ...exp, period: e.target.value };
                onChange({ ...draftData, experiences: next });
              }}
              className={`px-3 py-2 rounded-xl border text-sm ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
            />
          </div>

          <textarea
            rows={2}
            value={exp.description}
            placeholder="Deskripsi peran dan aktivitas praktis..."
            onChange={(e) => {
              const next = [...draftData.experiences];
              next[idx] = { ...exp, description: e.target.value };
              onChange({ ...draftData, experiences: next });
            }}
            className={`w-full px-3 py-2 rounded-xl border text-sm ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
          />

          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#F3DDE3] text-[#2C2520] hover:bg-[#EBCFD8] transition-colors">
              <Camera className="w-3.5 h-3.5" />
              <span>
                {uploadingExpId === exp.id
                  ? 'Mengunggah...'
                  : exp.mediaUrl
                    ? 'Ganti Foto Dokumentasi'
                    : 'Unggah Foto Dokumentasi'}
              </span>
              <input
                type="file"
                disabled={uploadingExpId === exp.id}
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                className="hidden"
                onChange={(e) => handleUploadMedia(idx, exp, e.target.files?.[0])}
              />
            </label>
            {exp.mediaUrl && (
              <button
                onClick={() => {
                  const next = [...draftData.experiences];
                  next[idx] = { ...exp, mediaUrl: '' };
                  onChange({ ...draftData, experiences: next });
                }}
                className="text-xs text-rose-500 underline hover:text-rose-600"
              >
                Hapus Foto
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
