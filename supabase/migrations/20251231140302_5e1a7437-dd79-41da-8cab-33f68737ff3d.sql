-- Create blog_posts table with full SEO suite
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  
  -- Content fields (multilingual support as JSONB)
  title JSONB NOT NULL DEFAULT '{}',
  excerpt JSONB NOT NULL DEFAULT '{}',
  content JSONB NOT NULL DEFAULT '{}',
  
  -- Media
  featured_image TEXT,
  
  -- Categorization
  category TEXT NOT NULL DEFAULT 'General',
  tags TEXT[] DEFAULT '{}',
  
  -- SEO fields (multilingual)
  meta_title JSONB DEFAULT '{}',
  meta_description JSONB DEFAULT '{}',
  keywords JSONB DEFAULT '{}',
  canonical_url TEXT,
  
  -- Open Graph
  og_title JSONB DEFAULT '{}',
  og_description JSONB DEFAULT '{}',
  og_image TEXT,
  
  -- Publishing
  author TEXT DEFAULT 'TransformFiles Team',
  read_time INTEGER DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Anyone can read published posts"
ON public.blog_posts
FOR SELECT
USING (status = 'published');

-- Create admin_users table for single admin access
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only admin can see admin table
CREATE POLICY "Admins can read admin_users"
ON public.admin_users
FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' = email);

-- Security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE email = auth.jwt() ->> 'email'
  )
$$;

-- Admin policies for blog_posts
CREATE POLICY "Admins can do anything with blog posts"
ON public.blog_posts
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();