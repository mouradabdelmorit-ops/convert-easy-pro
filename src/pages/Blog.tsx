import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";
import { Calendar, Clock, ArrowRight, Tag, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  slug: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  featured_image: string | null;
  category: string;
  published_at: string | null;
  read_time: number | null;
  tags: string[] | null;
}

const Blog = () => {
  const { t, language, getLocalizedPath } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, featured_image, category, published_at, read_time, tags')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else {
        // Type assertion to handle JSONB fields
        const typedPosts = (data || []).map(post => ({
          ...post,
          title: typeof post.title === 'object' ? post.title as Record<string, string> : { en: String(post.title) },
          excerpt: typeof post.excerpt === 'object' ? post.excerpt as Record<string, string> : { en: String(post.excerpt) },
        }));
        setPosts(typedPosts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const getLocalizedText = (field: Record<string, string> | null | undefined, lang: Language): string => {
    if (!field) return '';
    return field[lang] || field['en'] || '';
  };

  return (
    <>
      <Helmet>
        <title>{t.meta.blogTitle}</title>
        <meta name="description" content={t.meta.blogDesc} />
        <meta name="keywords" content="file conversion tips, video converter guide, image format guide, PDF tips, audio conversion" />
        <link rel="canonical" href={`https://transformfiles.com${language === 'en' ? '' : '/' + language}/blog`} />
        <meta property="og:title" content={t.meta.blogTitle} />
        <meta property="og:description" content={t.meta.blogDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://transformfiles.com${language === 'en' ? '' : '/' + language}/blog`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.blogTitle} />
        <meta name="twitter:description" content={t.meta.blogDesc} />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "TransformFiles Blog",
            "description": t.meta.blogDesc,
            "url": `https://transformfiles.com${language === 'en' ? '' : '/' + language}/blog`,
            "inLanguage": language,
          })}
        </script>
        <link rel="alternate" hrefLang="x-default" href="https://transformfiles.com/blog" />
        <link rel="alternate" hrefLang="en" href="https://transformfiles.com/blog" />
        <link rel="alternate" hrefLang="de" href="https://transformfiles.com/de/blog" />
        <link rel="alternate" hrefLang="es" href="https://transformfiles.com/es/blog" />
        <link rel="alternate" hrefLang="fr" href="https://transformfiles.com/fr/blog" />
        <link rel="alternate" hrefLang="it" href="https://transformfiles.com/it/blog" />
        <link rel="alternate" hrefLang="pt" href="https://transformfiles.com/pt/blog" />
        <link rel="alternate" hrefLang="ja" href="https://transformfiles.com/ja/blog" />
        <link rel="alternate" hrefLang="zh" href="https://transformfiles.com/zh/blog" />
        <link rel="alternate" hrefLang="ko" href="https://transformfiles.com/ko/blog" />
        <link rel="alternate" hrefLang="ar" href="https://transformfiles.com/ar/blog" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero */}
          <section className="gradient-hero py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  {t.blog.title.split('&')[0]}
                  <span className="text-gradient">{t.blog.title.includes('&') ? '& ' + t.blog.title.split('&')[1] : ''}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {t.blog.subtitle}
                </p>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No blog posts available yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <article 
                      key={post.id} 
                      className="glass rounded-2xl overflow-hidden group hover:glow-teal transition-all duration-300"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.featured_image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'} 
                          alt={getLocalizedText(post.title, language)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                            <Tag className="w-3 h-3" />
                            {post.category}
                          </span>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {post.published_at && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.published_at).toLocaleDateString(language === 'en' ? 'en-US' : language)}
                              </span>
                            )}
                            {post.read_time && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.read_time} min
                              </span>
                            )}
                          </div>
                        </div>
                        <h2 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {getLocalizedText(post.title, language)}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {getLocalizedText(post.excerpt, language)}
                        </p>
                        <Link 
                          to={getLocalizedPath(`/blog/${post.slug}`)}
                          className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                        >
                          {t.blog.readMore}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;