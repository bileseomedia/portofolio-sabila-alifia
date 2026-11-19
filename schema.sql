/* ============================================================================
   SUPABASE SCHEMA FOR SABILA ALIFIA SUNDAWA PORTFOLIO
   ============================================================================ */
/* 1. Enable UUID Extension */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
/* 2. Profile & Hero & Contact Info Table */
CREATE TABLE IF NOT EXISTS public.portfolio_profile (
    id TEXT PRIMARY KEY DEFAULT 'main',
    name TEXT NOT NULL DEFAULT 'Sabila Alifia Sundawa',
    headline TEXT NOT NULL DEFAULT 'Exploring Business, Digital Creativity & Beyond.',
    hero_description TEXT DEFAULT 'Management student with an interest in business, e-commerce, digital marketing, and creative communication.',
    profile_image TEXT DEFAULT '',
    profile_caption TEXT DEFAULT 'Sabila Alifia Sundawa — S1 Manajemen, Pradita University',
    about_title TEXT DEFAULT 'A Little About Me',
  about_description TEXT DEFAULT 'Saya merupakan mahasiswa S1 Manajemen di Pradita University yang memiliki ketertarikan pada bidang bisnis, e-commerce, digital marketing, dan komunikasi.',
    university TEXT DEFAULT 'Pradita University',
    major TEXT DEFAULT 'S1 Manajemen',
    period TEXT DEFAULT '2025 – Present',
    about_image TEXT DEFAULT '',
    contact_headline TEXT DEFAULT 'Let''s Connect and Create Something Meaningful.',
    email TEXT DEFAULT 'sabilatgr06@gmail.com',
    whatsapp TEXT DEFAULT 'https://wa.me/6282249803252',
    linkedin TEXT DEFAULT 'https://www.linkedin.com/in/sabila-alifia-sundawa-982aa7360?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    instagram TEXT DEFAULT 'https://www.instagram.com/sbilalifia_?evlk=NnFzZ3d3aGp4MzN6',
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

/* 3. Experiences Table */
CREATE TABLE IF NOT EXISTS public.experiences (
    id TEXT PRIMARY KEY DEFAULT 'exp-' || gen_random_uuid()::text,
    role TEXT NOT NULL,
    company TEXT,
    period TEXT,
    description TEXT,
    media_url TEXT DEFAULT '',
    media_type TEXT DEFAULT 'image',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

/* 4. Organization Master Info Table */
CREATE TABLE IF NOT EXISTS public.organizations (
    id TEXT PRIMARY KEY DEFAULT 'main',
    himma_name TEXT DEFAULT 'Himpunan Mahasiswa Manajemen (HIMMA)',
    himma_role TEXT DEFAULT 'Divisi Publikasi dan Dokumentasi',
    himma_description TEXT DEFAULT 'Terlibat dalam pembuatan konten publikasi kegiatan organisasi serta dokumentasi acara.',
    leadership_title TEXT DEFAULT 'Ketua Pelaksana PKKMB Program Studi Manajemen',
    leadership_theme TEXT DEFAULT 'Embrace Your Inner Light, Celebrate Your New Journey.',
    leadership_description TEXT DEFAULT 'Memiliki pengalaman dalam mengoordinasikan kegiatan, bekerja sama dengan tim, mengatur pelaksanaan acara, dan memastikan kegiatan berjalan sesuai rencana.',
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

/* 5. Organization Documentation Gallery */
CREATE TABLE IF NOT EXISTS public.organization_gallery (
    id TEXT PRIMARY KEY DEFAULT 'org-img-' || gen_random_uuid()::text,
    title TEXT,
    caption TEXT,
    media_url TEXT NOT NULL,
    media_type TEXT DEFAULT 'image',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

/* 6. Selected Projects Table */
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY DEFAULT 'proj-' || gen_random_uuid()::text,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    role TEXT,
    process TEXT,
    cover_image TEXT DEFAULT '',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

/* 7. Project Gallery Table */
CREATE TABLE IF NOT EXISTS public.project_gallery (
    id TEXT PRIMARY KEY DEFAULT 'proj-gal-' || gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type TEXT DEFAULT 'image',
    caption TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

/* 8. Vertical Showcase Categories */
CREATE TABLE IF NOT EXISTS public.vertical_showcase (
    id TEXT PRIMARY KEY,
    caption TEXT,
    sort_order INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);
/* 9. Vertical Showcase Media Items */
CREATE TABLE IF NOT EXISTS public.vertical_showcase_items (
    id TEXT PRIMARY KEY DEFAULT 'vt-' || gen_random_uuid()::text,
    category_id TEXT NOT NULL REFERENCES public.vertical_showcase(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type TEXT DEFAULT 'image',
    title TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

/* 10. Skills Table */
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY DEFAULT 'skill-' || gen_random_uuid()::text,
    type TEXT NOT NULL CHECK (type IN ('hard', 'soft')),
    name TEXT NOT NULL,
    sort_order INT DEFAULT 0
);
/* ============================================================================
   ROW LEVEL SECURITY (RLS) POLICIES
   ============================================================================ */

ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vertical_showcase ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vertical_showcase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

/* Public Read Policies */
DROP POLICY IF EXISTS "Public Read Portfolio Profile" ON public.portfolio_profile;
CREATE POLICY "Public Read Portfolio Profile" ON public.portfolio_profile FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Read Experiences" ON public.experiences;
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Read Organizations" ON public.organizations;
CREATE POLICY "Public Read Organizations" ON public.organizations FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Read Organization Gallery" ON public.organization_gallery;
CREATE POLICY "Public Read Organization Gallery" ON public.organization_gallery FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Project Gallery" ON public.project_gallery;
CREATE POLICY "Public Read Project Gallery" ON public.project_gallery FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Read Vertical Showcase" ON public.vertical_showcase;
CREATE POLICY "Public Read Vertical Showcase" ON public.vertical_showcase FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Read Vertical Items" ON public.vertical_showcase_items;
CREATE POLICY "Public Read Vertical Items" ON public.vertical_showcase_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Read Skills" ON public.skills;
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);

/* Admin Mutation Policies */
DROP POLICY IF EXISTS "Admin All Portfolio Profile" ON public.portfolio_profile;
CREATE POLICY "Admin All Portfolio Profile" ON public.portfolio_profile FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Experiences" ON public.experiences;
CREATE POLICY "Admin All Experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Organizations" ON public.organizations;
CREATE POLICY "Admin All Organizations" ON public.organizations FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Organization Gallery" ON public.organization_gallery;
CREATE POLICY "Admin All Organization Gallery" ON public.organization_gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Projects" ON public.projects;
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Project Gallery" ON public.project_gallery;
CREATE POLICY "Admin All Project Gallery" ON public.project_gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Vertical Showcase" ON public.vertical_showcase;
CREATE POLICY "Admin All Vertical Showcase" ON public.vertical_showcase FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Vertical Items" ON public.vertical_showcase_items;
CREATE POLICY "Admin All Vertical Items" ON public.vertical_showcase_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin All Skills" ON public.skills;
CREATE POLICY "Admin All Skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
/* ============================================================================
   STORAGE BUCKET CREATION & STORAGE POLICIES
   ============================================================================ */
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS "Public Read Portfolio Media" ON storage.objects;
CREATE POLICY "Public Read Portfolio Media"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admin Upload Portfolio Media" ON storage.objects;
CREATE POLICY "Admin Upload Portfolio Media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-media');
DROP POLICY IF EXISTS "Admin Update Portfolio Media" ON storage.objects;
CREATE POLICY "Admin Update Portfolio Media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-media');
DROP POLICY IF EXISTS "Admin Delete Portfolio Media" ON storage.objects;
CREATE POLICY "Admin Delete Portfolio Media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-media');
