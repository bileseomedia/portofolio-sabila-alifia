import React, { useState } from 'react';
import { Plus, Trash2, MoveUp, MoveDown, Image as ImageIcon, Upload } from 'lucide-react';
import { compressMediaFile, uploadMediaToStorage } from '../../lib/storage';
import { useTheme } from '../../context/ThemeContext';

export const ProjectsTab = ({ draftData, onChange, onNotify }) => {
  const { isDark } = useTheme();
  const [uploadingCoverId, setUploadingCoverId] = useState(null);
  const [uploadingGalleryId, setUploadingGalleryId] = useState(null);

  const projectCategories = [
    'E-Commerce Management',
    'Digital Marketing',
    'Social Media Management',
    'Content Creation',
    'Live Commerce',
    'Organization & Event Management',
    'Creative Editing & AI Animation'
  ];

  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: 'Judul Project Baru',
      category: 'Digital Marketing',
      description: 'Deskripsi singkat project yang dikerjakan.',
      role: 'Peran Anda',
      process: 'Langkah atau proses pengerjaan.',
      coverImage: '',
      gallery: []
    };
    onChange({
      ...draftData,
      projects: [newProj, ...(draftData.projects || [])]
    });
    onNotify('Project baru berhasil ditambahkan.');
  };

  const handleDeleteProject = (id) => {
    const filtered = (draftData.projects || []).filter((p) => p.id !== id);
    onChange({ ...draftData, projects: filtered });
    onNotify('Project berhasil dihapus.');
  };

  const handleUploadCover = async (idx, proj, file) => {
    if (!file) return;

    setUploadingCoverId(proj.id);
    try {
      const compressed = await compressMediaFile(file);
      const publicUrl = await uploadMediaToStorage(compressed.file, 'projects/cover');
      const next = [...(draftData.projects || [])];
      next[idx] = { ...proj, coverImage: publicUrl };
      onChange({ ...draftData, projects: next });
      onNotify('Cover project berhasil diperbarui.');
    } catch (err) {
      console.error(err);
      onNotify(err.message || 'Gagal mengunggah cover project.');
    } finally {
      setUploadingCoverId(null);
    }
  };

  const handleUploadProjectGallery = async (idx, proj, fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    setUploadingGalleryId(proj.id);
    try {
      const added = [];
      for (const f of files) {
        const compressed = await compressMediaFile(f);
        const publicUrl = await uploadMediaToStorage(compressed.file, 'projects/gallery');
        added.push({
          id: `proj-gal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          url: publicUrl,
          type: compressed.type,
          caption: f.name.replace(/\.[^/.]+$/, '')
        });
      }
      const next = [...(draftData.projects || [])];
      next[idx] = { ...proj, gallery: [...(proj.gallery || []), ...added] };
      onChange({ ...draftData, projects: next });
      onNotify(`${added.length} dokumentasi ditambahkan ke project.`);
    } catch (err) {
      console.error(err);
      onNotify(err.message || 'Gagal mengunggah dokumentasi.');
    } finally {
      setUploadingGalleryId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h4 className="font-editorial text-2xl font-semibold">Kelola Selected Works (Projects)</h4>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#DCEAF4] text-[#2C2520] hover:bg-[#CFE3F2] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Tambah Project
        </button>
      </div>

      {(draftData.projects || []).map((proj, idx) => (
        <div
          key={proj.id || idx}
          className={`p-5 rounded-2xl border space-y-3 ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFF9F0] border-[#CFE3F2]'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Project #{idx + 1}</span>
            <div className="flex items-center gap-2">
              <button
                disabled={idx === 0}
                onClick={() => {
                  const next = [...draftData.projects];
                  [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                  onChange({ ...draftData, projects: next });
                }}
                title="Naikkan Urutan"
                className="p-1.5 rounded-lg border border-current/20 disabled:opacity-30 hover:bg-black/5"
              >
                <MoveUp className="w-3.5 h-3.5" />
              </button>
              <button
                disabled={idx === draftData.projects.length - 1}
                onClick={() => {
                  const next = [...draftData.projects];
                  [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                  onChange({ ...draftData, projects: next });
                }}
                title="Turunkan Urutan"
                className="p-1.5 rounded-lg border border-current/20 disabled:opacity-30 hover:bg-black/5"
              >
                <MoveDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDeleteProject(proj.id)}
                className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 ml-2"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={proj.title}
              placeholder="Nama Project"
              onChange={(e) => {
                const next = [...draftData.projects];
                next[idx] = { ...proj, title: e.target.value };
                onChange({ ...draftData, projects: next });
              }}
              className={`px-3 py-2 rounded-xl border text-sm ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
            />
            <select
              value={proj.category}
              onChange={(e) => {
                const next = [...draftData.projects];
                next[idx] = { ...proj, category: e.target.value };
                onChange({ ...draftData, projects: next });
              }}
              className={`px-3 py-2 rounded-xl border text-sm ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
            >
              {projectCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              value={proj.role}
              placeholder="Peran Saya (Contoh: Live Host)"
              onChange={(e) => {
                const next = [...draftData.projects];
                next[idx] = { ...proj, role: e.target.value };
                onChange({ ...draftData, projects: next });
              }}
              className={`px-3 py-2 rounded-xl border text-sm ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <textarea
              rows={2}
              value={proj.description}
              placeholder="Deskripsi Project..."
              onChange={(e) => {
                const next = [...draftData.projects];
                next[idx] = { ...proj, description: e.target.value };
                onChange({ ...draftData, projects: next });
              }}
              className={`px-3 py-2 rounded-xl border text-sm ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
            />
            <textarea
              rows={2}
              value={proj.process}
              placeholder="Proses Pengerjaan..."
              onChange={(e) => {
                const next = [...draftData.projects];
                next[idx] = { ...proj, process: e.target.value };
                onChange({ ...draftData, projects: next });
              }}
              className={`px-3 py-2 rounded-xl border text-sm ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
            />
          </div>

          {/* Cover & Multi-Documentation Upload */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#DCEAF4] text-[#2C2520] hover:bg-[#CFE3F2] transition-colors">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>
                {uploadingCoverId === proj.id
                  ? 'Mengunggah...'
                  : proj.coverImage
                    ? 'Ganti Cover Image'
                    : 'Unggah Cover Image'}
              </span>
              <input
                type="file"
                disabled={uploadingCoverId === proj.id}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleUploadCover(idx, proj, e.target.files?.[0])}
              />
            </label>

            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#F3DDE3] text-[#2C2520] hover:bg-[#EBCFD8] transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>
                {uploadingGalleryId === proj.id
                  ? 'Mengunggah...'
                  : `Tambah Dokumentasi (${proj.gallery?.length || 0})`}
              </span>
              <input
                type="file"
                multiple
                disabled={uploadingGalleryId === proj.id}
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                className="hidden"
                onChange={(e) => handleUploadProjectGallery(idx, proj, e.target.files)}
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
