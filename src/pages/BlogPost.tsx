import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

// Full blog content for each article
const blogContent: Record<string, {
  title: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  image: string;
  category: string;
  date: string;
  readTime: number;
}> = {
  'how-to-convert-video-formats': {
    title: {
      en: 'How to Convert Video Formats: A Complete Guide',
      de: 'So konvertieren Sie Videoformate: Eine vollständige Anleitung',
      es: 'Cómo convertir formatos de video: Una guía completa',
      fr: 'Comment convertir les formats vidéo: Guide complet',
    },
    excerpt: {
      en: 'Learn the best practices for converting video files between MP4, AVI, MKV, MOV, and more formats.',
      de: 'Lernen Sie die besten Praktiken zur Konvertierung von Videodateien.',
      es: 'Aprende las mejores prácticas para convertir archivos de video.',
      fr: 'Apprenez les meilleures pratiques pour convertir des fichiers vidéo.',
    },
    content: {
      en: `
## Understanding Video Formats

Video formats can be confusing, but understanding them is essential for anyone working with digital media. Each format has its strengths and ideal use cases.

### MP4 (MPEG-4 Part 14)

MP4 is the most universally compatible video format. It's supported by virtually all devices, browsers, and platforms. MP4 uses efficient compression, providing good quality at reasonable file sizes.

**Best for:**
- Sharing videos online
- Uploading to social media platforms
- General-purpose video storage

### AVI (Audio Video Interleave)

AVI is an older format developed by Microsoft. While it offers excellent quality, file sizes tend to be larger than modern formats.

**Best for:**
- Archival purposes
- Windows-based systems
- When quality is priority over file size

### MKV (Matroska)

MKV is an open-source container format that can hold multiple audio and subtitle tracks. It's popular for high-quality video content.

**Best for:**
- Movies with multiple audio languages
- Content with embedded subtitles
- High-definition video storage

### MOV (QuickTime)

MOV was developed by Apple and is optimized for macOS and iOS devices. It offers excellent quality but may require conversion for non-Apple devices.

**Best for:**
- Apple ecosystem
- Professional video editing
- High-quality video production

## Step-by-Step Conversion Guide

### Step 1: Upload Your Video
Simply drag and drop your video file onto our converter or click to browse your files. We support files up to 2GB.

### Step 2: Select Output Format
Choose your desired output format from our extensive list. Consider your target device and use case when selecting.

### Step 3: Adjust Settings (Optional)
Fine-tune quality settings, resolution, and bitrate if needed. Our default settings work well for most use cases.

### Step 4: Convert and Download
Click convert and wait for processing. Download your converted file when ready.

## Tips for Best Results

1. **Choose the right format** for your target platform
2. **Consider file size** vs quality tradeoffs
3. **Test on target devices** before mass conversion
4. **Keep originals** until you verify the conversion

## Conclusion

Video conversion doesn't have to be complicated. With TransformFiles, you can convert any video format quickly and securely, right in your browser.
      `,
      de: `## Videoformate verstehen\n\nVideoformate können verwirrend sein, aber ihr Verständnis ist für jeden, der mit digitalen Medien arbeitet, unerlässlich.`,
      es: `## Entender los formatos de video\n\nLos formatos de video pueden ser confusos, pero comprenderlos es esencial para cualquier persona que trabaje con medios digitales.`,
      fr: `## Comprendre les formats vidéo\n\nLes formats vidéo peuvent être déroutants, mais les comprendre est essentiel pour quiconque travaille avec des médias numériques.`,
    },
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&q=80',
    category: 'Video',
    date: '2024-12-28',
    readTime: 5,
  },
  'best-image-formats-for-web': {
    title: {
      en: 'Best Image Formats for Web: JPEG vs PNG vs WebP',
      de: 'Beste Bildformate für das Web: JPEG vs PNG vs WebP',
      es: 'Mejores formatos de imagen para web: JPEG vs PNG vs WebP',
      fr: 'Meilleurs formats d\'image pour le web: JPEG vs PNG vs WebP',
    },
    excerpt: {
      en: 'Discover which image format is best for your website to optimize loading speed and quality.',
      de: 'Entdecken Sie, welches Bildformat am besten für Ihre Website geeignet ist.',
      es: 'Descubre qué formato de imagen es mejor para tu sitio web.',
      fr: 'Découvrez quel format d\'image est le meilleur pour votre site web.',
    },
    content: {
      en: `
## The Web Image Format Battle

Choosing the right image format for your website can significantly impact loading speed, user experience, and SEO rankings. Let's break down the three most popular formats.

### JPEG: The Photography Champion

JPEG (Joint Photographic Experts Group) has been the go-to format for photographs since 1992.

**Advantages:**
- Excellent compression for photos
- Small file sizes
- Universal browser support

**Disadvantages:**
- Lossy compression (quality degrades with each save)
- No transparency support
- Not ideal for graphics with text

**Use JPEG when:**
- Displaying photographs
- Background images
- Images where small quality loss is acceptable

### PNG: The Graphics Master

PNG (Portable Network Graphics) excels at graphics, logos, and images requiring transparency.

**Advantages:**
- Lossless compression
- Supports transparency (alpha channel)
- Perfect for screenshots and graphics

**Disadvantages:**
- Larger file sizes for photos
- Slower loading times

**Use PNG when:**
- Logos and icons
- Graphics with text
- Images requiring transparency
- Screenshots

### WebP: The Modern Solution

WebP, developed by Google, offers the best of both worlds with superior compression.

**Advantages:**
- 25-35% smaller than JPEG at same quality
- Supports both lossy and lossless compression
- Supports transparency and animation

**Disadvantages:**
- Older browser compatibility (though now 95%+ support)

**Use WebP when:**
- Modern websites
- Performance is critical
- You need both quality and small size

## Conversion Best Practices

1. **Always keep original files** before converting
2. **Test different quality levels** to find the sweet spot
3. **Use responsive images** with multiple sizes
4. **Implement lazy loading** for below-the-fold images

## Quick Comparison Table

| Feature | JPEG | PNG | WebP |
|---------|------|-----|------|
| File Size | Small | Large | Smallest |
| Transparency | No | Yes | Yes |
| Animation | No | No | Yes |
| Quality | Good | Excellent | Excellent |

## Conclusion

For most modern websites, WebP is the recommended format. Use TransformFiles to convert your images to WebP and improve your site's performance instantly.
      `,
      de: `## Der Kampf der Web-Bildformate\n\nDie Wahl des richtigen Bildformats für Ihre Website kann die Ladegeschwindigkeit erheblich beeinflussen.`,
      es: `## La batalla de formatos de imagen web\n\nElegir el formato de imagen correcto para tu sitio web puede impactar significativamente la velocidad de carga.`,
      fr: `## La bataille des formats d'image web\n\nChoisir le bon format d'image pour votre site web peut avoir un impact significatif sur la vitesse de chargement.`,
    },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    category: 'Images',
    date: '2024-12-25',
    readTime: 4,
  },
  'audio-conversion-tips': {
    title: {
      en: 'Audio Conversion Tips: MP3, WAV, FLAC Explained',
      de: 'Audio-Konvertierungstipps: MP3, WAV, FLAC erklärt',
      es: 'Consejos de conversión de audio: MP3, WAV, FLAC explicados',
      fr: 'Conseils de conversion audio: MP3, WAV, FLAC expliqués',
    },
    excerpt: {
      en: 'Understanding audio formats and when to use each one for the best sound quality.',
      de: 'Verstehen Sie Audioformate und wann Sie jedes verwenden sollten.',
      es: 'Comprender los formatos de audio y cuándo usar cada uno.',
      fr: 'Comprendre les formats audio et quand utiliser chacun.',
    },
    content: {
      en: `
## Audio Format Fundamentals

Audio formats fall into two main categories: lossy and lossless. Understanding this distinction is crucial for making the right conversion choices.

### MP3: The Universal Standard

MP3 revolutionized digital audio by making music files small enough to share online.

**Bitrate Guide:**
- 128 kbps: Acceptable for podcasts and voice
- 192 kbps: Good quality for casual listening
- 256 kbps: High quality
- 320 kbps: Maximum MP3 quality

**Best for:**
- Music streaming
- Podcasts
- General listening on any device

### WAV: Uncompressed Excellence

WAV (Waveform Audio File Format) stores audio without any compression, preserving every detail.

**Advantages:**
- Perfect audio quality
- No generation loss when editing
- Industry standard for professional audio

**Disadvantages:**
- Very large file sizes (10x larger than MP3)
- Not practical for streaming or portable devices

**Best for:**
- Audio production and editing
- Archival of original recordings
- Professional music production

### FLAC: The Audiophile's Choice

FLAC (Free Lossless Audio Codec) compresses audio without losing any quality.

**Advantages:**
- Identical quality to WAV
- 50-60% smaller than WAV
- Open source and free

**Disadvantages:**
- Larger than MP3
- Not supported by all devices

**Best for:**
- High-quality music collections
- Archiving with space savings
- Audiophile listening

## When to Convert

### MP3 → FLAC
Don't do this! Converting lossy to lossless doesn't recover lost quality.

### FLAC → MP3
Great for making files smaller for portable devices while keeping a lossless backup.

### WAV → FLAC
Perfect for archiving - saves space without quality loss.

## Conclusion

Choose your audio format based on your specific needs. TransformFiles makes conversion easy, supporting all major audio formats with optimal quality settings.
      `,
      de: `## Grundlagen der Audioformate\n\nAudioformate fallen in zwei Hauptkategorien: verlustbehaftet und verlustfrei.`,
      es: `## Fundamentos de formatos de audio\n\nLos formatos de audio se dividen en dos categorías principales: con pérdida y sin pérdida.`,
      fr: `## Fondamentaux des formats audio\n\nLes formats audio se divisent en deux catégories principales: avec perte et sans perte.`,
    },
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    category: 'Audio',
    date: '2024-12-22',
    readTime: 6,
  },
  'pdf-editing-made-simple': {
    title: {
      en: 'PDF Editing Made Simple: Merge, Split, and Compress',
      de: 'PDF-Bearbeitung leicht gemacht: Zusammenführen, Teilen und Komprimieren',
      es: 'Edición de PDF simplificada: Fusionar, dividir y comprimir',
      fr: 'Édition PDF simplifiée: Fusionner, divider et compresser',
    },
    excerpt: {
      en: 'Master PDF manipulation with our easy-to-follow guide for merging, splitting, and compressing documents.',
      de: 'Beherrschen Sie die PDF-Bearbeitung mit unserem leicht verständlichen Leitfaden.',
      es: 'Domina la manipulación de PDF con nuestra guía fácil de seguir.',
      fr: 'Maîtrisez la manipulation PDF avec notre guide facile.',
    },
    content: {
      en: `
## Why PDF Editing Matters

PDFs are the standard for sharing documents, but editing them has traditionally required expensive software. Our free online PDF editor changes that.

## Merging PDFs

Combining multiple PDFs into one document is essential for creating comprehensive reports, portfolios, or documentation.

### How to Merge PDFs:

1. **Upload your files** - Drag and drop all PDFs you want to combine
2. **Arrange order** - Drag files to reorder them
3. **Click Merge** - We combine them instantly
4. **Download** - Get your merged PDF

### Pro Tips for Merging:
- Number your files before uploading for easier ordering
- Check page counts to verify all content is included
- Review the final document before distributing

## Splitting PDFs

Extract specific pages or break a large document into smaller sections.

### Split Options:

- **Extract range** - Get pages 1-5, 10-15, etc.
- **Split by page** - Each page becomes its own PDF
- **Custom selection** - Pick specific pages

### Common Use Cases:
- Extracting chapters from ebooks
- Separating invoices from a batch PDF
- Creating handouts from presentations

## Compressing PDFs

Large PDFs are slow to upload, download, and share. Compression reduces file size while maintaining readability.

### Compression Levels:

- **Light compression** - Minimal quality loss, 20-40% size reduction
- **Medium compression** - Balanced approach, 40-60% reduction
- **Maximum compression** - Smallest size, some quality loss

### When to Compress:
- Before emailing attachments
- Uploading to file-size-limited platforms
- Storing large document collections

## Advanced Features

### Rotating Pages
Fix upside-down or sideways scans instantly.

### Adding Watermarks
Protect your documents with text overlays.

### Annotations
Add notes, highlights, and drawings directly on your PDF.

## Conclusion

PDF editing doesn't require expensive software. TransformFiles provides all the tools you need, free and secure, right in your browser.
      `,
      de: `## Warum PDF-Bearbeitung wichtig ist\n\nPDFs sind der Standard für den Dokumentenaustausch, aber ihre Bearbeitung erforderte traditionell teure Software.`,
      es: `## Por qué importa la edición de PDF\n\nLos PDFs son el estándar para compartir documentos, pero editarlos tradicionalmente requería software costoso.`,
      fr: `## Pourquoi l'édition PDF est importante\n\nLes PDFs sont la norme pour partager des documents, mais les éditer nécessitait traditionnellement des logiciels coûteux.`,
    },
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80',
    category: 'Documents',
    date: '2024-12-20',
    readTime: 7,
  },
  'file-security-best-practices': {
    title: {
      en: 'File Security: Best Practices for Safe Conversion',
      de: 'Dateisicherheit: Best Practices für sichere Konvertierung',
      es: 'Seguridad de archivos: Mejores prácticas para conversión segura',
      fr: 'Sécurité des fichiers: Meilleures pratiques pour une conversion sûre',
    },
    excerpt: {
      en: 'Learn how to protect your files during conversion and ensure your data stays private.',
      de: 'Erfahren Sie, wie Sie Ihre Dateien während der Konvertierung schützen.',
      es: 'Aprende cómo proteger tus archivos durante la conversión.',
      fr: 'Apprenez à protéger vos fichiers pendant la conversion.',
    },
    content: {
      en: `
## File Security in the Digital Age

When converting files online, security should be your top priority. Here's how to protect your sensitive documents.

## Understanding the Risks

### Common Security Threats:
- Unauthorized access to uploaded files
- Data retention by conversion services
- Man-in-the-middle attacks during transfer
- Malware injection into converted files

## How TransformFiles Protects You

### End-to-End Encryption
All file transfers use TLS 1.3 encryption, the same security banks use.

### Automatic Deletion
Files are automatically deleted within 1 hour of conversion. We don't keep copies.

### No Account Required
Convert files anonymously without creating an account or sharing personal information.

### Local Processing
Many conversions happen entirely in your browser - your files never leave your device.

## Best Practices for Users

### Before Uploading:
1. **Remove sensitive metadata** from files
2. **Check file permissions** and sharing settings
3. **Use private browsing** for sensitive documents
4. **Verify the website URL** to avoid phishing sites

### During Conversion:
1. **Use HTTPS connections** (look for the lock icon)
2. **Avoid public WiFi** for sensitive files
3. **Don't leave files in the converter** unnecessarily

### After Downloading:
1. **Scan converted files** with antivirus
2. **Verify file integrity** and content
3. **Securely delete** local copies if needed

## Identifying Secure Conversion Services

### Green Flags:
✅ Clear privacy policy
✅ HTTPS encryption
✅ Automatic file deletion
✅ No registration required
✅ Transparent about data handling

### Red Flags:
❌ No HTTPS
❌ Unclear data retention
❌ Excessive permissions requested
❌ No privacy policy

## Conclusion

File security doesn't have to be complicated. Choose trusted services like TransformFiles and follow these best practices to keep your data safe.
      `,
      de: `## Dateisicherheit im digitalen Zeitalter\n\nBei der Online-Konvertierung von Dateien sollte Sicherheit Ihre oberste Priorität sein.`,
      es: `## Seguridad de archivos en la era digital\n\nAl convertir archivos en línea, la seguridad debe ser tu máxima prioridad.`,
      fr: `## Sécurité des fichiers à l'ère numérique\n\nLors de la conversion de fichiers en ligne, la sécurité doit être votre priorité absolue.`,
    },
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
    category: 'Security',
    date: '2024-12-18',
    readTime: 5,
  },
  'batch-file-conversion': {
    title: {
      en: 'Batch File Conversion: How to Convert Multiple Files at Once',
      de: 'Batch-Dateikonvertierung: Mehrere Dateien gleichzeitig konvertieren',
      es: 'Conversión de archivos en lote: Cómo convertir múltiples archivos a la vez',
      fr: 'Conversion par lots: Comment convertir plusieurs fichiers à la fois',
    },
    excerpt: {
      en: 'Save time by converting hundreds of files in one go with our batch conversion feature.',
      de: 'Sparen Sie Zeit, indem Sie Hunderte von Dateien auf einmal konvertieren.',
      es: 'Ahorra tiempo convirtiendo cientos de archivos de una sola vez.',
      fr: 'Gagnez du temps en convertissant des centaines de fichiers en une seule fois.',
    },
    content: {
      en: `
## The Power of Batch Conversion

Converting files one at a time is tedious and time-consuming. Batch conversion lets you process hundreds of files simultaneously.

## When to Use Batch Conversion

### Common Scenarios:
- Converting a folder of photos for web use
- Changing document formats for compatibility
- Processing video files for different platforms
- Preparing audio files for specific devices

## How Batch Conversion Works

### Step 1: Select Multiple Files
Drag and drop an entire folder or select multiple files using Ctrl/Cmd+Click.

### Step 2: Choose Output Format
Select one target format for all files, or configure different settings per file type.

### Step 3: Set Quality Options
Apply uniform settings to all files or customize individually.

### Step 4: Process and Download
Click convert to process all files simultaneously. Download individually or as a ZIP archive.

## Optimization Tips

### For Images:
- Use consistent naming conventions
- Set appropriate quality levels (80% is often optimal)
- Consider output dimensions for web use

### For Videos:
- Choose appropriate bitrates for your use case
- Consider resolution requirements
- Test with a sample before batch processing

### For Documents:
- Verify formatting compatibility
- Check font embedding settings
- Review layout preservation options

## Advanced Features

### Folder Structure Preservation
Maintain your original folder organization in the output.

### Naming Templates
Automatically rename files with patterns like:
- {original}_converted
- {date}_{original}
- {sequence}_{original}

### Format-Specific Settings
Apply different compression levels based on file type or content.

## Conclusion

Batch conversion saves hours of manual work. Upload your files to TransformFiles and convert them all at once, free and fast.
      `,
      de: `## Die Macht der Batch-Konvertierung\n\nDas Konvertieren von Dateien einzeln ist mühsam und zeitaufwändig.`,
      es: `## El poder de la conversión por lotes\n\nConvertir archivos uno por uno es tedioso y lleva mucho tiempo.`,
      fr: `## La puissance de la conversion par lots\n\nConvertir des fichiers un par un est fastidieux et chronophage.`,
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    category: 'Tips',
    date: '2024-12-15',
    readTime: 4,
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, getLocalizedPath } = useLanguage();

  const post = slug ? blogContent[slug] : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const title = post.title[language as keyof typeof post.title] || post.title.en;
  const excerpt = post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.en;
  const content = post.content[language as keyof typeof post.content] || post.content.en;

  const canonicalUrl = language === 'en'
    ? `https://transformfiles.com/blog/${slug}`
    : `https://transformfiles.com/${language}/blog/${slug}`;

  const shareUrl = encodeURIComponent(canonicalUrl);
  const shareTitle = encodeURIComponent(title);

  return (
    <>
      <Helmet>
        <title>{title} - TransformFiles Blog</title>
        <meta name="description" content={excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "description": excerpt,
            "image": post.image,
            "datePublished": post.date,
            "author": {
              "@type": "Organization",
              "name": "TransformFiles"
            },
            "publisher": {
              "@type": "Organization",
              "name": "TransformFiles",
              "url": "https://transformfiles.com"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20">
          {/* Hero Image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={post.image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          {/* Article Content */}
          <article className="container mx-auto px-4 -mt-32 relative z-10">
            <div className="max-w-3xl mx-auto">
              {/* Back Link */}
              <Link
                to={getLocalizedPath('/blog')}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Article Header */}
              <div className="glass rounded-2xl p-6 md:p-10 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString(language, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read
                  </span>
                </div>

                <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
                  {title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {excerpt}
                </p>

                {/* Share Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share:
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg glass hover:bg-card transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg glass hover:bg-card transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg glass hover:bg-card transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </a>
                </div>
              </div>

              {/* Article Body */}
              <div className="glass rounded-2xl p-6 md:p-10 prose prose-invert prose-lg max-w-none mb-12">
                <div
                  className="text-foreground [&_h2]:text-2xl [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-muted-foreground [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-muted-foreground [&_li]:mb-2 [&_strong]:text-foreground [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-card [&_td]:border [&_td]:border-border [&_td]:p-2"
                  dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />').replace(/## /g, '<h2>').replace(/### /g, '<h3>').replace(/<h2>/g, '</p><h2>').replace(/<h3>/g, '</p><h3>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/- /g, '<li>').replace(/<li>/g, '</li><li>').replace(/✅/g, '<span class="text-green-500">✅</span>').replace(/❌/g, '<span class="text-red-500">❌</span>') }}
                />
              </div>

              {/* CTA */}
              <div className="glass rounded-2xl p-8 text-center mb-12">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Ready to Convert Your Files?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start converting your files for free with TransformFiles. No registration required.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <Link to={getLocalizedPath('/')}>
                    Start Converting Now
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
