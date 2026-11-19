import React, { useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { EditorialFrame } from '../common/EditorialFrame';
import { compressMediaFile, uploadMediaToStorage } from '../../lib/storage';
import { useTheme } from '../../context/ThemeContext';

export const VerticalTab = ({ draftData, onChange, onNotify }) => {
  const { isDark } = useTheme();
  const [uploadingCategory, setUploadingCategory] = useState(null);

  const verticalCategories = ['ABOUT ME', 'EXPERIENCE', 'ORGANIZATION', 'SELECTED WORKS', 'CREATIVE SPACE'];

  const handleUploadCategoryMedia = async (cat, fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    setUploadingCategory(cat);
    try {
      const catData = draftData.verticalShowcase[cat] || { caption: '', items: [] };
      const uploaded = [];

      for (const f of files) {
        const compressed = await compressMediaFile(f);
        const publicUrl = await uploadMediaToStorage(compressed.file, `vertical/${cat.toLowerCase().replace(/\s+/g, '-')}`);
        uploaded.push({
          id: `vt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          url: publicUrl,
          type: compressed.type,
          title: f.name.replace(/\.[^/.]+$/, '')
        });
      }

      onChange({
        ...draftData,
        verticalShowcase: {
          ...draftData.verticalShowcase,
          [cat]: {
            ...catData,
            items: [...(catData.items || []), ...uploaded]
          }
        }
      });
      onNotify(`${uploaded.length} media berhasil ditambahkan ke ${cat}.`);
    } catch (err) {
      console.error(err);
      onNotify(err.message || 'Gagal mengunggah media.');
    } finally {
      setUploadingCategory(null);
    }
  };

  const handleDeleteItem = (cat, itemIdx) => {
    const catData = draftData.verticalShowcase[cat] || { caption: '', items: [] };
    const nextItems = (catData.items || []).filter((_, i) => i !== itemIdx);
    onChange({
      ...draftData,
      verticalShowcase: {
        ...draftData.verticalShowcase,
        [cat]: { ...catData, items: nextItems }
      }
    });
    onNotify('Media berhasil dihapus.');
  };

  return (
    <div className="space-y-6">
      <h4 className="font-editorial text-2xl font-semibold">Kelola Foto Pada Interactive Vertical Typography</h4>

      {verticalCategories.map((cat) => {
        const catData = draftData.verticalShowcase[cat] || { caption: '', items: [] };
        return (
          <div
            key={cat}
            className={`p-5 rounded-2xl border space-y-4 ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFF9F0] border-[#CFE3F2]'}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display-accent text-sm font-bold tracking-wider">{cat}</span>
              <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#DCEAF4] text-[#2C2520] hover:bg-[#CFE3F2] transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingCategory === cat ? 'Mengunggah...' : 'Unggah Foto / Video'}</span>
                <input
                  type="file"
                  multiple
                  disabled={uploadingCategory === cat}
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                  className="hidden"
                  onChange={(e) => handleUploadCategoryMedia(cat, e.target.files)}
                />
              </label>
            </div>

            <input
              type="text"
              value={catData.caption}
              onChange={(e) => onChange({
                ...draftData,
                verticalShowcase: {
                  ...draftData.verticalShowcase,
                  [cat]: { ...catData, caption: e.target.value }
                }
              })}
              placeholder="Caption kategori..."
              className={`w-full px-3 py-2 rounded-xl border text-xs ${isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-white border-[#CFE3F2]'}`}
            />

            {catData.items && catData.items.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {catData.items.map((m, mIdx) => (
                  <div key={m.id || mIdx} className="relative group rounded-xl overflow-hidden border border-current/15">
                    <EditorialFrame src={m.url} mediaType={m.type} isDark={isDark} aspectClass="aspect-square" />
                    <button
                      onClick={() => handleDeleteItem(cat, mIdx)}
                      className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-md"
                      title="Hapus Media"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
