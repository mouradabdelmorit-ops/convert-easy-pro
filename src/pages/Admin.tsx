import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Plus, LogOut, Edit, Trash2, Eye, EyeOff, Save, 
  Loader2, FileText, Search, X, Globe, Tag
} from "lucide-react";
import { languages } from "@/i18n/translations";
import type { User } from "@supabase/supabase-js";

interface BlogPost {
  id: string;
  slug: string;
  status: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  featured_image: string | null;
  category: string;
  tags: string[];
  meta_title: Record<string, string>;
  meta_description: Record<string, string>;
  keywords: Record<string, string>;
  canonical_url: string | null;
  og_title: Record<string, string>;
  og_description: Record<string, string>;
  og_image: string | null;
  author: string;
  read_time: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const emptyPost: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> = {
  slug: '',
  status: 'draft',
  title: { en: '' },
  excerpt: { en: '' },
  content: { en: '' },
  featured_image: null,
  category: 'General',
  tags: [],
  meta_title: { en: '' },
  meta_description: { en: '' },
  keywords: { en: '' },
  canonical_url: null,
  og_title: { en: '' },
  og_description: { en: '' },
  og_image: null,
  author: 'TransformFiles Team',
  read_time: 5,
  published_at: null,
};

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<BlogPost>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'og'>('content');
  const [activeLang, setActiveLang] = useState<string>('en');
  const [tagsInput, setTagsInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate('/admin/login');
      } else {
        setTimeout(() => checkAdmin(session.user.email), 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate('/admin/login');
      } else {
        checkAdmin(session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdmin = async (email: string | undefined) => {
    if (!email) {
      setIsLoading(false);
      return;
    }
    
    const { data } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();
    
    if (data) {
      setIsAdmin(true);
      fetchPosts();
    } else {
      toast({ title: "Access Denied", description: "You don't have admin privileges", variant: "destructive" });
      await supabase.auth.signOut();
      navigate('/admin/login');
    }
    setIsLoading(false);
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: "Failed to fetch posts", variant: "destructive" });
    } else {
      setPosts(data as BlogPost[] || []);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleNewPost = () => {
    setSelectedPost(null);
    setEditData(emptyPost);
    setIsEditing(true);
    setTagsInput("");
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setEditData(post);
    setIsEditing(true);
    setTagsInput(post.tags?.join(', ') || '');
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: "Failed to delete post", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Post deleted successfully" });
      fetchPosts();
    }
  };

  const handleSave = async () => {
    if (!editData.slug || !editData.title?.en) {
      toast({ title: "Validation Error", description: "Slug and English title are required", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    
    const dataToSave = {
      slug: editData.slug,
      status: editData.status || 'draft',
      title: editData.title || {},
      excerpt: editData.excerpt || {},
      content: editData.content || {},
      featured_image: editData.featured_image || null,
      category: editData.category || 'General',
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      meta_title: editData.meta_title || {},
      meta_description: editData.meta_description || {},
      keywords: editData.keywords || {},
      canonical_url: editData.canonical_url || null,
      og_title: editData.og_title || {},
      og_description: editData.og_description || {},
      og_image: editData.og_image || null,
      author: editData.author || 'TransformFiles Team',
      read_time: editData.read_time || 5,
      published_at: editData.status === 'published' && !editData.published_at ? new Date().toISOString() : editData.published_at,
    };

    try {
      if (selectedPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(dataToSave)
          .eq('id', selectedPost.id);
        
        if (error) throw error;
        toast({ title: "Saved", description: "Post updated successfully" });
      } else {
        const { error } = await supabase.from('blog_posts').insert([dataToSave]);
        if (error) throw error;
        toast({ title: "Created", description: "Post created successfully" });
      }
      
      setIsEditing(false);
      fetchPosts();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to save post";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof BlogPost, value: unknown) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const updateLocalizedField = (field: keyof BlogPost, lang: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: { ...(prev[field] as Record<string, string> || {}), [lang]: value }
    }));
  };

  const filteredPosts = posts.filter(p => 
    p.title?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | TransformFiles</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="glass-strong border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Blog Admin</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden md:block">{user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {!isEditing ? (
            /* Post List View */
            <div>
              <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="hero" onClick={handleNewPost}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="glass rounded-xl p-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-xl font-semibold text-foreground mb-2">No posts yet</h2>
                  <p className="text-muted-foreground mb-4">Create your first blog post</p>
                  <Button variant="hero" onClick={handleNewPost}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredPosts.map(post => (
                    <div key={post.id} className="glass rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                            post.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {post.status}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.category}</span>
                        </div>
                        <h3 className="font-semibold text-foreground truncate">{post.title?.en || 'Untitled'}</h3>
                        <p className="text-sm text-muted-foreground">/{post.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Edit View */
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <h2 className="text-xl font-bold text-foreground flex-1">
                  {selectedPost ? 'Edit Post' : 'New Post'}
                </h2>
                <Button variant="hero" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save
                </Button>
              </div>

              {/* Language Selector */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {Object.entries(languages).map(([code, { name, flag }]) => (
                  <button
                    key={code}
                    onClick={() => setActiveLang(code)}
                    className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-all ${
                      activeLang === code ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    <span>{flag}</span>
                    <span className="hidden md:inline">{name}</span>
                  </button>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {(['content', 'seo', 'og'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {tab === 'content' && 'Content'}
                    {tab === 'seo' && 'SEO'}
                    {tab === 'og' && 'Open Graph'}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                  {activeTab === 'content' && (
                    <div className="glass rounded-xl p-6 space-y-4">
                      <div>
                        <Label>Title ({activeLang.toUpperCase()})</Label>
                        <Input
                          value={(editData.title as Record<string, string>)?.[activeLang] || ''}
                          onChange={(e) => updateLocalizedField('title', activeLang, e.target.value)}
                          placeholder="Post title"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Excerpt ({activeLang.toUpperCase()})</Label>
                        <Textarea
                          value={(editData.excerpt as Record<string, string>)?.[activeLang] || ''}
                          onChange={(e) => updateLocalizedField('excerpt', activeLang, e.target.value)}
                          placeholder="Brief description"
                          rows={2}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Content ({activeLang.toUpperCase()})</Label>
                        <Textarea
                          value={(editData.content as Record<string, string>)?.[activeLang] || ''}
                          onChange={(e) => updateLocalizedField('content', activeLang, e.target.value)}
                          placeholder="Full article content (supports Markdown)"
                          rows={12}
                          className="mt-1 font-mono text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'seo' && (
                    <div className="glass rounded-xl p-6 space-y-4">
                      <div>
                        <Label>Meta Title ({activeLang.toUpperCase()})</Label>
                        <Input
                          value={(editData.meta_title as Record<string, string>)?.[activeLang] || ''}
                          onChange={(e) => updateLocalizedField('meta_title', activeLang, e.target.value)}
                          placeholder="SEO title (max 60 chars)"
                          maxLength={60}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {((editData.meta_title as Record<string, string>)?.[activeLang] || '').length}/60 characters
                        </p>
                      </div>
                      <div>
                        <Label>Meta Description ({activeLang.toUpperCase()})</Label>
                        <Textarea
                          value={(editData.meta_description as Record<string, string>)?.[activeLang] || ''}
                          onChange={(e) => updateLocalizedField('meta_description', activeLang, e.target.value)}
                          placeholder="SEO description (max 160 chars)"
                          maxLength={160}
                          rows={3}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {((editData.meta_description as Record<string, string>)?.[activeLang] || '').length}/160 characters
                        </p>
                      </div>
                      <div>
                        <Label>Keywords ({activeLang.toUpperCase()})</Label>
                        <Input
                          value={(editData.keywords as Record<string, string>)?.[activeLang] || ''}
                          onChange={(e) => updateLocalizedField('keywords', activeLang, e.target.value)}
                          placeholder="keyword1, keyword2, keyword3"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Canonical URL</Label>
                        <Input
                          value={editData.canonical_url || ''}
                          onChange={(e) => updateField('canonical_url', e.target.value || null)}
                          placeholder="https://transformfiles.com/blog/..."
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'og' && (
                    <div className="glass rounded-xl p-6 space-y-4">
                      <div>
                        <Label>OG Title ({activeLang.toUpperCase()})</Label>
                        <Input
                          value={(editData.og_title as Record<string, string>)?.[activeLang] || ''}
                          onChange={(e) => updateLocalizedField('og_title', activeLang, e.target.value)}
                          placeholder="Social media title"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>OG Description ({activeLang.toUpperCase()})</Label>
                        <Textarea
                          value={(editData.og_description as Record<string, string>)?.[activeLang] || ''}
                          onChange={(e) => updateLocalizedField('og_description', activeLang, e.target.value)}
                          placeholder="Social media description"
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>OG Image URL</Label>
                        <Input
                          value={editData.og_image || ''}
                          onChange={(e) => updateField('og_image', e.target.value || null)}
                          placeholder="https://example.com/image.jpg"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="glass rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Settings
                    </h3>
                    <div>
                      <Label>Slug</Label>
                      <Input
                        value={editData.slug || ''}
                        onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                        placeholder="post-url-slug"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <select
                        value={editData.status || 'draft'}
                        onChange={(e) => updateField('status', e.target.value)}
                        className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input
                        value={editData.category || ''}
                        onChange={(e) => updateField('category', e.target.value)}
                        placeholder="Video, Images, etc."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Author</Label>
                      <Input
                        value={editData.author || ''}
                        onChange={(e) => updateField('author', e.target.value)}
                        placeholder="Author name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Read Time (minutes)</Label>
                      <Input
                        type="number"
                        value={editData.read_time || 5}
                        onChange={(e) => updateField('read_time', parseInt(e.target.value) || 5)}
                        min={1}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags & Media
                    </h3>
                    <div>
                      <Label>Tags (comma separated)</Label>
                      <Input
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="tag1, tag2, tag3"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Featured Image URL</Label>
                      <Input
                        value={editData.featured_image || ''}
                        onChange={(e) => updateField('featured_image', e.target.value || null)}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1"
                      />
                      {editData.featured_image && (
                        <img 
                          src={editData.featured_image} 
                          alt="Preview" 
                          className="mt-2 rounded-lg w-full h-32 object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
