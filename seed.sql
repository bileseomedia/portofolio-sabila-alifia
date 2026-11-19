-- ============================================================================
-- SUPABASE SEED DATA FOR SABILA ALIFIA SUNDAWA PORTFOLIO
-- ============================================================================

-- 1. Insert Profile
INSERT INTO public.portfolio_profile (
    id, name, headline, hero_description, profile_image, profile_caption,
    about_title, about_description, university, major, period, about_image,
    contact_headline, email, whatsapp, linkedin, instagram
) VALUES (
    'main',
    'Sabila Alifia Sundawa',
    'Exploring Business, Digital Creativity & Beyond.',
    'Management student with an interest in business, e-commerce, digital marketing, and creative communication.',
    '',
    'Sabila Alifia Sundawa — S1 Manajemen, Pradita University',
    'A Little About Me',
    'Saya merupakan mahasiswa S1 Manajemen di Pradita University yang memiliki ketertarikan pada bidang bisnis, e-commerce, digital marketing, dan komunikasi. Saya memiliki pengalaman dalam administrasi e-commerce, pembuatan konten promosi, live commerce, pengelolaan media sosial, serta kegiatan organisasi kampus. Saya senang mempelajari hal baru, mencoba pengalaman berbeda, bekerja sama dalam tim, dan mengembangkan kemampuan melalui berbagai project.',
    'Pradita University',
    'S1 Manajemen',
    '2025 – Present',
    '',
    'Let''s Connect and Create Something Meaningful.',
    'sabilatgr06@gmail.com',
    'https://wa.me/6282249803252',
    'https://www.linkedin.com/in/sabila-alifia-sundawa-982aa7360?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    'https://www.instagram.com/sbilalifia_?evlk=NnFzZ3d3aGp4MzN6'
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert Experiences
INSERT INTO public.experiences (id, role, company, period, description, media_url, media_type, sort_order) VALUES
('exp-1', 'E-Commerce Administrator', '[Nama Brand / Perusahaan — Dapat Diedit]', '[Periode — Dapat Diedit]', 'Mengelola administrasi toko online, pengelolaan produk, serta aktivitas operasional pada platform e-commerce.', '', 'image', 1),
('exp-2', 'Live Host', '[TikTok Live & Shopee Live — Dapat Diedit]', '[Periode — Dapat Diedit]', 'Menjadi host TikTok Live dan Shopee Live, memperkenalkan produk, menjelaskan keunggulan produk, serta berinteraksi dengan calon pembeli.', '', 'image', 2),
('exp-3', 'Content Promotion', '[Nama Brand / Project — Dapat Diedit]', '[Periode — Dapat Diedit]', 'Membuat konten promosi untuk kebutuhan pemasaran produk dan media sosial.', '', 'image', 3),
('exp-4', 'Social Media Management', '[Nama Akun / Brand — Dapat Diedit]', '[Periode — Dapat Diedit]', 'Mengelola konten media sosial, menyusun jadwal posting, memperhatikan waktu publikasi, dan memahami strategi engagement.', '', 'image', 4),
('exp-5', 'Article Writer Intern', '[Nama Media / Perusahaan — Dapat Diedit]', '[Periode — Dapat Diedit]', 'Memiliki pengalaman dalam penulisan artikel dan penyusunan konten informatif.', '', 'image', 5),
('exp-6', 'Social Media Analyst', '[Nama Brand / Studio — Dapat Diedit]', '[Periode — Dapat Diedit]', 'Mempelajari performa konten dan interaksi audiens untuk memahami efektivitas media sosial.', '', 'image', 6)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Organizations Master Info
INSERT INTO public.organizations (
    id, himaa_name, himaa_role, himaa_description,
    leadership_title, leadership_theme, leadership_description
) VALUES (
    'main',
    'Himpunan Mahasiswa Manajemen (HIMMA)',
    'Divisi Publikasi dan Dokumentasi',
    'Terlibat dalam pembuatan konten publikasi kegiatan organisasi serta dokumentasi acara.',
    'Ketua Pelaksana PKKMB Program Studi Manajemen',
    'Embrace Your Inner Light, Celebrate Your New Journey.',
    'Memiliki pengalaman dalam mengoordinasikan kegiatan, bekerja sama dengan tim, mengatur pelaksanaan acara, dan memastikan kegiatan berjalan sesuai rencana.'
) ON CONFLICT (id) DO NOTHING;

-- 4. Insert Selected Works Projects
INSERT INTO public.projects (id, title, category, description, role, process, cover_image, sort_order) VALUES
('proj-1', 'Operasional & Katalog E-Commerce', 'E-Commerce Management', 'Pengelolaan struktur katalog produk, administrasi pesanan harian, serta optimalisasi tampilan etalase toko digital.', 'E-Commerce Administrator', 'Melakukan pendataan SKU produk, menyusun deskripsi informatif, serta memantau alur pemrosesan pesanan secara berkala.', '', 1),
('proj-2', 'Sesi Interaktif TikTok & Shopee Live', 'Live Commerce', 'Sesi siaran langsung interaktif untuk mengenalkan detail produk, menjawab pertanyaan audiens secara real-time, dan membangun kedekatan dengan calon pembeli.', 'Live Commerce Host', 'Menyiapkan poin utama keunggulan produk, mengatur alur presentasi siaran langsung, dan berinteraksi aktif dengan penonton.', '', 2),
('proj-3', 'Kampanye Konten & Editorial Media Sosial', 'Social Media Management', 'Perencanaan kalender editorial, pembuatan konten visual promosi, serta penjadwalan publikasi sesuai jam aktif audiens.', 'Social Media & Content Creator', 'Riset ide konten, penyusunan jadwal unggahan terstruktur, pembuatan materi visual, dan evaluasi interaksi audiens.', '', 3),
('proj-4', 'Publikasi & Dokumentasi PKKMB Manajemen', 'Organization & Event Management', 'Koordinasi pelaksanaan acara penyambutan mahasiswa baru bertema "Embrace Your Inner Light, Celebrate Your New Journey." bersama tim kepanitiaan.', 'Ketua Pelaksana PKKMB', 'Perencanaan konsep acara, koordinasi lintas divisi, pengelolaan jadwal kegiatan, serta dokumentasi momen utama.', '', 4),
('proj-5', 'Eksplorasi Visual & AI Creative Editing', 'Creative Editing & AI Animation', 'Eksperimen penyuntingan video pendek dan visual kreatif berbantuan kecerdasan buatan untuk kebutuhan storytelling digital.', 'Creative Editor', 'Konsep visual, penyuntingan transisi video, serta eksplorasi elemen animasi kreatif.', '', 5)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Vertical Showcase Categories
INSERT INTO public.vertical_showcase (id, caption, sort_order) VALUES
('ABOUT ME', 'Dokumentasi personal & keseharian sebagai mahasiswa Manajemen di Pradita University.', 1),
('EXPERIENCE', 'Rangkaian aktivitas profesional dalam administrasi e-commerce, live commerce, dan pengelolaan konten.', 2),
('ORGANIZATION', 'Momen kolaborasi bersama Himpunan Mahasiswa Manajemen (HIMAA) dan kepanitiaan PKKMB.', 3),
('SELECTED WORKS', 'Kurasi dokumentasi proyek pemasaran digital, kampanye sosial media, dan penulisan artikel.', 4),
('CREATIVE SPACE', 'Ruang eksplorasi video editing, desain konten promosi, dan eksperimen AI animation.', 5)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Hard & Soft Skills (No coding/programming skills)
INSERT INTO public.skills (id, type, name, sort_order) VALUES
('skill-h-1', 'hard', 'E-Commerce Administration', 1),
('skill-h-2', 'hard', 'Social Media Management', 2),
('skill-h-3', 'hard', 'Content Planning', 3),
('skill-h-4', 'hard', 'Live Commerce', 4),
('skill-h-5', 'hard', 'Content Writing', 5),
('skill-h-6', 'hard', 'Basic Financial Recording', 6),
('skill-h-7', 'hard', 'Video Editing', 7),
('skill-h-8', 'hard', 'AI-assisted Creative Editing', 8),
('skill-s-1', 'soft', 'Communication', 1),
('skill-s-2', 'soft', 'Teamwork', 2),
('skill-s-3', 'soft', 'Adaptability', 3),
('skill-s-4', 'soft', 'Leadership', 4),
('skill-s-5', 'soft', 'Problem Solving', 5),
('skill-s-6', 'soft', 'Time Management', 6)
ON CONFLICT (id) DO NOTHING;
