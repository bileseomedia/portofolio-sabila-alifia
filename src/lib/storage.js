import { supabase, isSupabaseConfigured } from './supabase';

const BUCKET_NAME = 'portfolio-media';

/**
 * Compresses an image or verifies video size before uploading.
 * Returns { file: Blob|File, previewUrl: string, type: 'image'|'video' }
 */
export const compressMediaFile = (file) => {
  return new Promise((resolve, reject) => {
    if (file.type.startsWith('video/')) {
      if (file.size > 15 * 1024 * 1024) {
        reject(new Error('Ukuran video maksimal 15MB. Gunakan klip pendek untuk performa optimal.'));
        return;
      }
      resolve({ file, previewUrl: URL.createObjectURL(file), type: 'video' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1600;
        let width = img.width;
        let height = img.height;

        if (width > height && width > MAX_DIM) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Gagal mengompres gambar.'));
              return;
            }
            const previewUrl = URL.createObjectURL(blob);
            resolve({ file: blob, previewUrl, type: 'image' });
          },
          'image/webp',
          0.85
        );
      };
      img.onerror = () => reject(new Error('Format file gambar tidak valid.'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file.'));
    reader.readAsDataURL(file);
  });
};

/**
 * Uploads media to Supabase Storage bucket 'portfolio-media'.
 * Falls back to local data URL if Supabase is not configured yet.
 */
export const uploadMediaToStorage = async (file, folder = 'general') => {
  // If Supabase is not connected, convert to data URL so the user can test the UI immediately
  if (!isSupabaseConfigured() || !supabase) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.type?.includes('webp') ? 'webp' : file.name ? file.name.split('.').pop() : 'jpg';
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase Storage upload error:', error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Storage upload failed:', err);
    throw new Error('Gagal mengunggah media ke Supabase Storage. Pastikan bucket "portfolio-media" telah dibuat.');
  }
};

/**
 * Deletes media from Supabase Storage bucket given its full URL.
 */
export const deleteMediaFromStorage = async (mediaUrl) => {
  if (!isSupabaseConfigured() || !supabase || !mediaUrl || !mediaUrl.includes(BUCKET_NAME)) {
    return;
  }

  try {
    const urlParts = mediaUrl.split(`${BUCKET_NAME}/`);
    if (urlParts.length > 1) {
      const filePath = urlParts[1];
      await supabase.storage.from(BUCKET_NAME).remove([filePath]);
    }
  } catch (err) {
    console.warn('Gagal menghapus file dari storage:', err);
  }
};
