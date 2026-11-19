import { supabase, isSupabaseConfigured } from './supabase';
import { INITIAL_PORTFOLIO_DATA } from '../types/initialData';

const LOCAL_STORAGE_KEY = 'sabila_portfolio_offline_cache';

/**
 * Loads entire portfolio data from Supabase.
 * Returns structured object matching INITIAL_PORTFOLIO_DATA.
 */
export const fetchPortfolioData = async () => {
  if (!isSupabaseConfigured() || !supabase) {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.warn('Failed to parse cached data:', e);
      }
    }
    return INITIAL_PORTFOLIO_DATA;
  }

  try {
    // Fetch all related entities in parallel
    const [
      profileRes,
      expRes,
      orgRes,
      orgGalleryRes,
      projectsRes,
      projectGalleryRes,
      verticalCatRes,
      verticalItemsRes,
      skillsRes
    ] = await Promise.all([
      supabase.from('portfolio_profile').select('*').eq('id', 'main').maybeSingle(),
      supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
      supabase.from('organizations').select('*').eq('id', 'main').maybeSingle(),
      supabase.from('organization_gallery').select('*').order('sort_order', { ascending: true }),
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('project_gallery').select('*').order('sort_order', { ascending: true }),
      supabase.from('vertical_showcase').select('*').order('sort_order', { ascending: true }),
      supabase.from('vertical_showcase_items').select('*').order('sort_order', { ascending: true }),
      supabase.from('skills').select('*').order('sort_order', { ascending: true }),
    ]);

    // Handle initial state if database tables are empty
    if (!profileRes.data && (!projectsRes.data || projectsRes.data.length === 0)) {
      return INITIAL_PORTFOLIO_DATA;
    }

    const p = profileRes.data || {};
    const o = orgRes.data || {};

    // Group project gallery by project_id
    const projectGalleriesMap = {};
    (projectGalleryRes.data || []).forEach((item) => {
      if (!projectGalleriesMap[item.project_id]) {
        projectGalleriesMap[item.project_id] = [];
      }
      projectGalleriesMap[item.project_id].push({
        id: item.id,
        url: item.media_url,
        type: item.media_type,
        caption: item.caption
      });
    });

    const projects = (projectsRes.data || []).map((proj) => ({
      id: proj.id,
      title: proj.title,
      category: proj.category,
      description: proj.description,
      role: proj.role,
      process: proj.process,
      coverImage: proj.cover_image,
      gallery: projectGalleriesMap[proj.id] || []
    }));

    // Group vertical showcase items
    const verticalItemsMap = {};
    (verticalItemsRes.data || []).forEach((item) => {
      if (!verticalItemsMap[item.category_id]) {
        verticalItemsMap[item.category_id] = [];
      }
      verticalItemsMap[item.category_id].push({
        id: item.id,
        url: item.media_url,
        type: item.media_type,
        title: item.title
      });
    });

    const verticalShowcase = { ...INITIAL_PORTFOLIO_DATA.verticalShowcase };
    (verticalCatRes.data || []).forEach((cat) => {
      verticalShowcase[cat.id] = {
        caption: cat.caption || '',
        items: verticalItemsMap[cat.id] || []
      };
    });

    const hardSkills = (skillsRes.data || [])
      .filter((s) => s.type === 'hard')
      .map((s) => s.name);

    const softSkills = (skillsRes.data || [])
      .filter((s) => s.type === 'soft')
      .map((s) => s.name);

    const formattedData = {
      hero: {
        name: p.name || INITIAL_PORTFOLIO_DATA.hero.name,
        headline: p.headline || INITIAL_PORTFOLIO_DATA.hero.headline,
        description: p.hero_description || INITIAL_PORTFOLIO_DATA.hero.description,
        profileImage: p.profile_image || '',
        profileCaption: p.profile_caption || INITIAL_PORTFOLIO_DATA.hero.profileCaption
      },
      about: {
        title: p.about_title || INITIAL_PORTFOLIO_DATA.about.title,
        description: p.about_description || INITIAL_PORTFOLIO_DATA.about.description,
        education: {
          university: p.university || INITIAL_PORTFOLIO_DATA.about.education.university,
          major: p.major || INITIAL_PORTFOLIO_DATA.about.education.major,
          period: p.period || INITIAL_PORTFOLIO_DATA.about.education.period
        },
        aboutImage: p.about_image || ''
      },
      experiences: (expRes.data && expRes.data.length > 0)
        ? expRes.data.map((e) => ({
            id: e.id,
            role: e.role,
            company: e.company,
            period: e.period,
            description: e.description,
            mediaUrl: e.media_url,
            mediaType: e.media_type
          }))
        : INITIAL_PORTFOLIO_DATA.experiences,
      organizations: {
        himaa: {
          name: o.himaa_name || INITIAL_PORTFOLIO_DATA.organizations.himaa.name,
          role: o.himaa_role || INITIAL_PORTFOLIO_DATA.organizations.himaa.role,
          description: o.himaa_description || INITIAL_PORTFOLIO_DATA.organizations.himaa.description
        },
        leadership: {
          title: o.leadership_title || INITIAL_PORTFOLIO_DATA.organizations.leadership.title,
          theme: o.leadership_theme || INITIAL_PORTFOLIO_DATA.organizations.leadership.theme,
          description: o.leadership_description || INITIAL_PORTFOLIO_DATA.organizations.leadership.description
        },
        gallery: (orgGalleryRes.data || []).map((g) => ({
          id: g.id,
          title: g.title,
          caption: g.caption,
          url: g.media_url,
          type: g.media_type
        }))
      },
      projects: projects.length > 0 ? projects : INITIAL_PORTFOLIO_DATA.projects,
      verticalShowcase,
      skills: {
        hard: hardSkills.length > 0 ? hardSkills : INITIAL_PORTFOLIO_DATA.skills.hard,
        soft: softSkills.length > 0 ? softSkills : INITIAL_PORTFOLIO_DATA.skills.soft
      },
      contact: {
        headline: p.contact_headline || INITIAL_PORTFOLIO_DATA.contact.headline,
        email: p.email || INITIAL_PORTFOLIO_DATA.contact.email,
        whatsapp: p.whatsapp || INITIAL_PORTFOLIO_DATA.contact.whatsapp,
        linkedin: p.linkedin || INITIAL_PORTFOLIO_DATA.contact.linkedin,
        instagram: p.instagram || INITIAL_PORTFOLIO_DATA.contact.instagram
      }
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formattedData));
    return formattedData;
  } catch (err) {
    console.error('Error fetching Supabase data, falling back to cache/default:', err);
    return INITIAL_PORTFOLIO_DATA;
  }
};

/**
 * Saves entire portfolio data to Supabase (Requires Authenticated Admin session).
 */
export const savePortfolioData = async (data) => {
  // Always update localStorage cache
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

  if (!isSupabaseConfigured() || !supabase) {
    return { success: true, message: 'Disimpan di Local Storage (Supabase belum dihubungkan)' };
  }

  try {
    // 1. Upsert Profile
    const { error: profileErr } = await supabase.from('portfolio_profile').upsert({
      id: 'main',
      name: data.hero.name,
      headline: data.hero.headline,
      hero_description: data.hero.description,
      profile_image: data.hero.profileImage,
      profile_caption: data.hero.profileCaption,
      about_title: data.about.title,
      about_description: data.about.description,
      university: data.about.education.university,
      major: data.about.education.major,
      period: data.about.education.period,
      about_image: data.about.aboutImage,
      contact_headline: data.contact.headline,
      email: data.contact.email,
      whatsapp: data.contact.whatsapp,
      linkedin: data.contact.linkedin,
      instagram: data.contact.instagram,
      updated_at: new Date().toISOString()
    });
    if (profileErr) throw profileErr;

    // 2. Upsert Organizations Info
    const { error: orgErr } = await supabase.from('organizations').upsert({
      id: 'main',
      himaa_name: data.organizations.himaa.name,
      himaa_role: data.organizations.himaa.role,
      himaa_description: data.organizations.himaa.description,
      leadership_title: data.organizations.leadership.title,
      leadership_theme: data.organizations.leadership.theme,
      leadership_description: data.organizations.leadership.description,
      updated_at: new Date().toISOString()
    });
    if (orgErr) throw orgErr;

    // 3. Sync Experiences (Replace or Upsert)
    if (data.experiences && data.experiences.length > 0) {
      await supabase.from('experiences').delete().neq('id', 'placeholder_keep');
      const expRows = data.experiences.map((exp, idx) => ({
        id: exp.id || `exp-${Date.now()}-${idx}`,
        role: exp.role,
        company: exp.company,
        period: exp.period,
        description: exp.description,
        media_url: exp.mediaUrl || '',
        media_type: exp.mediaType || 'image',
        sort_order: idx + 1
      }));
      const { error: expErr } = await supabase.from('experiences').insert(expRows);
      if (expErr) throw expErr;
    }

    // 4. Sync Organization Gallery
    await supabase.from('organization_gallery').delete().neq('id', 'placeholder_keep');
    if (data.organizations.gallery && data.organizations.gallery.length > 0) {
      const orgGalleryRows = data.organizations.gallery.map((item, idx) => ({
        id: item.id || `org-img-${Date.now()}-${idx}`,
        title: item.title || '',
        caption: item.caption || '',
        media_url: item.url,
        media_type: item.type || 'image',
        sort_order: idx + 1
      }));
      const { error: galErr } = await supabase.from('organization_gallery').insert(orgGalleryRows);
      if (galErr) throw galErr;
    }

    // 5. Sync Projects & Project Gallery
    await supabase.from('projects').delete().neq('id', 'placeholder_keep');
    if (data.projects && data.projects.length > 0) {
      const projectRows = data.projects.map((p, idx) => ({
        id: p.id || `proj-${Date.now()}-${idx}`,
        title: p.title,
        category: p.category,
        description: p.description,
        role: p.role,
        process: p.process,
        cover_image: p.coverImage || '',
        sort_order: idx + 1
      }));
      const { error: projErr } = await supabase.from('projects').insert(projectRows);
      if (projErr) throw projErr;

      // Flatten gallery items
      const galleryRows = [];
      data.projects.forEach((p) => {
        if (p.gallery && p.gallery.length > 0) {
          p.gallery.forEach((g, gIdx) => {
            galleryRows.push({
              id: g.id || `proj-gal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              project_id: p.id,
              media_url: g.url,
              media_type: g.type || 'image',
              caption: g.caption || '',
              sort_order: gIdx + 1
            });
          });
        }
      });
      if (galleryRows.length > 0) {
        await supabase.from('project_gallery').delete().neq('id', 'placeholder_keep');
        const { error: projGalErr } = await supabase.from('project_gallery').insert(galleryRows);
        if (projGalErr) throw projGalErr;
      }
    }

    // 6. Sync Vertical Showcase
    const catKeys = Object.keys(data.verticalShowcase || {});
    for (let i = 0; i < catKeys.length; i++) {
      const catKey = catKeys[i];
      const catVal = data.verticalShowcase[catKey];
      await supabase.from('vertical_showcase').upsert({
        id: catKey,
        caption: catVal.caption || '',
        sort_order: i + 1,
        updated_at: new Date().toISOString()
      });

      // Clear & insert items for this category
      await supabase.from('vertical_showcase_items').delete().eq('category_id', catKey);
      if (catVal.items && catVal.items.length > 0) {
        const itemRows = catVal.items.map((item, idx) => ({
          id: item.id || `vt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          category_id: catKey,
          media_url: item.url,
          media_type: item.type || 'image',
          title: item.title || '',
          sort_order: idx + 1
        }));
        await supabase.from('vertical_showcase_items').insert(itemRows);
      }
    }

    return { success: true, message: 'Berhasil disinkronisasi ke Supabase!' };
  } catch (err) {
    console.error('Supabase save error:', err);
    throw err;
  }
};

/**
 * Realtime subscription to any portfolio changes.
 */
export const subscribeToPortfolioUpdates = (onUpdate) => {
  if (!isSupabaseConfigured() || !supabase) return () => {};

  const channel = supabase
    .channel('public:portfolio-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_profile' }, () => onUpdate())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'experiences' }, () => onUpdate())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'organizations' }, () => onUpdate())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => onUpdate())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'vertical_showcase' }, () => onUpdate())
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
