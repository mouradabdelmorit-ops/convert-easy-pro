import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    slug: 'how-to-convert-video-formats',
    title: {
      en: 'How to Convert Video Formats: A Complete Guide',
      de: 'So konvertieren Sie Videoformate: Eine vollständige Anleitung',
      es: 'Cómo convertir formatos de video: Una guía completa',
      fr: 'Comment convertir les formats vidéo: Guide complet',
      it: 'Come convertire i formati video: Guida completa',
      pt: 'Como converter formatos de vídeo: Um guia completo',
      nl: 'Video-indelingen converteren: Een complete gids',
      pl: 'Jak konwertować formaty wideo: Kompletny przewodnik',
      ru: 'Как конвертировать видеоформаты: Полное руководство',
      ja: '動画フォーマットの変換方法：完全ガイド',
      zh: '如何转换视频格式：完整指南',
      ko: '비디오 형식 변환 방법: 완전 가이드',
      ar: 'كيفية تحويل صيغ الفيديو: دليل كامل',
      tr: 'Video Formatlarını Dönüştürme: Tam Kılavuz',
      hi: 'वीडियो फॉर्मेट कैसे कन्वर्ट करें: एक पूर्ण गाइड',
    },
    excerpt: {
      en: 'Learn the best practices for converting video files between MP4, AVI, MKV, MOV, and more formats.',
      de: 'Lernen Sie die besten Praktiken zur Konvertierung von Videodateien zwischen MP4, AVI, MKV, MOV und weiteren Formaten.',
      es: 'Aprende las mejores prácticas para convertir archivos de video entre MP4, AVI, MKV, MOV y más formatos.',
      fr: 'Apprenez les meilleures pratiques pour convertir des fichiers vidéo entre MP4, AVI, MKV, MOV et plus.',
      it: 'Impara le migliori pratiche per convertire file video tra MP4, AVI, MKV, MOV e altri formati.',
      pt: 'Aprenda as melhores práticas para converter arquivos de vídeo entre MP4, AVI, MKV, MOV e mais.',
      nl: 'Leer de beste praktijken voor het converteren van videobestanden tussen MP4, AVI, MKV, MOV en meer.',
      pl: 'Poznaj najlepsze praktyki konwertowania plików wideo między MP4, AVI, MKV, MOV i innymi formatami.',
      ru: 'Изучите лучшие практики конвертации видеофайлов между MP4, AVI, MKV, MOV и другими форматами.',
      ja: 'MP4、AVI、MKV、MOVなどの形式間でビデオファイルを変換するベストプラクティスを学びます。',
      zh: '学习在MP4、AVI、MKV、MOV等格式之间转换视频文件的最佳实践。',
      ko: 'MP4, AVI, MKV, MOV 등의 형식 간에 비디오 파일을 변환하는 모범 사례를 배우세요.',
      ar: 'تعلم أفضل الممارسات لتحويل ملفات الفيديو بين MP4 و AVI و MKV و MOV والمزيد.',
      tr: 'MP4, AVI, MKV, MOV ve daha fazla format arasında video dosyalarını dönüştürmenin en iyi uygulamalarını öğrenin.',
      hi: 'MP4, AVI, MKV, MOV और अधिक फॉर्मेट के बीच वीडियो फ़ाइलें कन्वर्ट करने के सर्वोत्तम अभ्यास सीखें।',
    },
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80',
    category: 'Video',
    date: '2024-12-28',
    readTime: 5,
  },
  {
    id: 2,
    slug: 'best-image-formats-for-web',
    title: {
      en: 'Best Image Formats for Web: JPEG vs PNG vs WebP',
      de: 'Beste Bildformate für das Web: JPEG vs PNG vs WebP',
      es: 'Mejores formatos de imagen para web: JPEG vs PNG vs WebP',
      fr: 'Meilleurs formats d\'image pour le web: JPEG vs PNG vs WebP',
      it: 'Migliori formati immagine per il web: JPEG vs PNG vs WebP',
      pt: 'Melhores formatos de imagem para web: JPEG vs PNG vs WebP',
      nl: 'Beste afbeeldingsformaten voor web: JPEG vs PNG vs WebP',
      pl: 'Najlepsze formaty obrazów dla sieci: JPEG vs PNG vs WebP',
      ru: 'Лучшие форматы изображений для веба: JPEG vs PNG vs WebP',
      ja: 'Web用の最適な画像フォーマット：JPEG vs PNG vs WebP',
      zh: '最佳网页图像格式：JPEG vs PNG vs WebP',
      ko: '웹을 위한 최고의 이미지 형식: JPEG vs PNG vs WebP',
      ar: 'أفضل صيغ الصور للويب: JPEG مقابل PNG مقابل WebP',
      tr: 'Web için En İyi Görüntü Formatları: JPEG vs PNG vs WebP',
      hi: 'वेब के लिए सर्वश्रेष्ठ इमेज फॉर्मेट: JPEG vs PNG vs WebP',
    },
    excerpt: {
      en: 'Discover which image format is best for your website to optimize loading speed and quality.',
      de: 'Entdecken Sie, welches Bildformat am besten für Ihre Website geeignet ist, um Ladegeschwindigkeit und Qualität zu optimieren.',
      es: 'Descubre qué formato de imagen es mejor para tu sitio web para optimizar velocidad de carga y calidad.',
      fr: 'Découvrez quel format d\'image est le meilleur pour votre site web pour optimiser vitesse et qualité.',
      it: 'Scopri quale formato immagine è migliore per il tuo sito web per ottimizzare velocità e qualità.',
      pt: 'Descubra qual formato de imagem é melhor para seu site para otimizar velocidade e qualidade.',
      nl: 'Ontdek welk afbeeldingsformaat het beste is voor uw website om laadsnelheid en kwaliteit te optimaliseren.',
      pl: 'Dowiedz się, który format obrazu jest najlepszy dla Twojej strony, aby zoptymalizować szybkość ładowania i jakość.',
      ru: 'Узнайте, какой формат изображения лучше всего подходит для вашего сайта для оптимизации скорости загрузки и качества.',
      ja: 'ウェブサイトの読み込み速度と品質を最適化するために最適な画像フォーマットを発見してください。',
      zh: '发现哪种图像格式最适合您的网站，以优化加载速度和质量。',
      ko: '웹사이트의 로딩 속도와 품질을 최적화하기 위해 어떤 이미지 형식이 가장 좋은지 알아보세요.',
      ar: 'اكتشف أي صيغة صورة هي الأفضل لموقعك لتحسين سرعة التحميل والجودة.',
      tr: 'Web siteniz için yükleme hızını ve kaliteyi optimize etmek için hangi görüntü formatının en iyi olduğunu keşfedin.',
      hi: 'अपनी वेबसाइट के लिए लोडिंग स्पीड और क्वालिटी को ऑप्टिमाइज़ करने के लिए कौन सा इमेज फॉर्मेट सबसे अच्छा है, जानें।',
    },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'Images',
    date: '2024-12-25',
    readTime: 4,
  },
  {
    id: 3,
    slug: 'audio-conversion-tips',
    title: {
      en: 'Audio Conversion Tips: MP3, WAV, FLAC Explained',
      de: 'Audio-Konvertierungstipps: MP3, WAV, FLAC erklärt',
      es: 'Consejos de conversión de audio: MP3, WAV, FLAC explicados',
      fr: 'Conseils de conversion audio: MP3, WAV, FLAC expliqués',
      it: 'Suggerimenti per la conversione audio: MP3, WAV, FLAC spiegati',
      pt: 'Dicas de conversão de áudio: MP3, WAV, FLAC explicados',
      nl: 'Audio-conversietips: MP3, WAV, FLAC uitgelegd',
      pl: 'Wskazówki dotyczące konwersji audio: MP3, WAV, FLAC wyjaśnione',
      ru: 'Советы по конвертации аудио: MP3, WAV, FLAC объяснены',
      ja: 'オーディオ変換のヒント：MP3、WAV、FLACの説明',
      zh: '音频转换技巧：MP3、WAV、FLAC详解',
      ko: '오디오 변환 팁: MP3, WAV, FLAC 설명',
      ar: 'نصائح تحويل الصوت: شرح MP3 و WAV و FLAC',
      tr: 'Ses Dönüştürme İpuçları: MP3, WAV, FLAC Açıklaması',
      hi: 'ऑडियो कन्वर्शन टिप्स: MP3, WAV, FLAC समझाया गया',
    },
    excerpt: {
      en: 'Understanding audio formats and when to use each one for the best sound quality.',
      de: 'Verstehen Sie Audioformate und wann Sie jedes für die beste Klangqualität verwenden sollten.',
      es: 'Comprender los formatos de audio y cuándo usar cada uno para la mejor calidad de sonido.',
      fr: 'Comprendre les formats audio et quand utiliser chacun pour la meilleure qualité sonore.',
      it: 'Comprendere i formati audio e quando usare ciascuno per la migliore qualità del suono.',
      pt: 'Entendendo formatos de áudio e quando usar cada um para a melhor qualidade de som.',
      nl: 'Audio-indelingen begrijpen en wanneer u welke moet gebruiken voor de beste geluidskwaliteit.',
      pl: 'Zrozumienie formatów audio i kiedy używać każdego z nich dla najlepszej jakości dźwięku.',
      ru: 'Понимание аудиоформатов и когда использовать каждый из них для лучшего качества звука.',
      ja: 'オーディオフォーマットを理解し、最高の音質を得るためにいつ使用するかを学びます。',
      zh: '了解音频格式以及何时使用每种格式以获得最佳音质。',
      ko: '오디오 형식을 이해하고 최상의 음질을 위해 각각을 언제 사용해야 하는지 알아보세요.',
      ar: 'فهم صيغ الصوت ومتى تستخدم كل منها للحصول على أفضل جودة صوت.',
      tr: 'Ses formatlarını anlama ve en iyi ses kalitesi için her birini ne zaman kullanacağınızı öğrenin.',
      hi: 'ऑडियो फॉर्मेट को समझना और सर्वोत्तम साउंड क्वालिटी के लिए प्रत्येक का उपयोग कब करें।',
    },
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    category: 'Audio',
    date: '2024-12-22',
    readTime: 6,
  },
  {
    id: 4,
    slug: 'pdf-editing-made-simple',
    title: {
      en: 'PDF Editing Made Simple: Merge, Split, and Compress',
      de: 'PDF-Bearbeitung leicht gemacht: Zusammenführen, Teilen und Komprimieren',
      es: 'Edición de PDF simplificada: Fusionar, dividir y comprimir',
      fr: 'Édition PDF simplifiée: Fusionner, diviser et compresser',
      it: 'Modifica PDF semplificata: Unisci, dividi e comprimi',
      pt: 'Edição de PDF simplificada: Mesclar, dividir e comprimir',
      nl: 'PDF bewerken eenvoudig gemaakt: Samenvoegen, splitsen en comprimeren',
      pl: 'Edycja PDF prosta: Łączenie, dzielenie i kompresja',
      ru: 'Редактирование PDF просто: Объединение, разделение и сжатие',
      ja: 'PDF編集を簡単に：結合、分割、圧縮',
      zh: 'PDF编辑变得简单：合并、拆分和压缩',
      ko: 'PDF 편집 간편하게: 병합, 분할 및 압축',
      ar: 'تحرير PDF بسهولة: الدمج والتقسيم والضغط',
      tr: 'PDF Düzenleme Kolaylaştırıldı: Birleştir, Böl ve Sıkıştır',
      hi: 'PDF एडिटिंग आसान बनाई गई: मर्ज, स्प्लिट और कंप्रेस',
    },
    excerpt: {
      en: 'Master PDF manipulation with our easy-to-follow guide for merging, splitting, and compressing documents.',
      de: 'Beherrschen Sie die PDF-Bearbeitung mit unserem leicht verständlichen Leitfaden zum Zusammenführen, Teilen und Komprimieren.',
      es: 'Domina la manipulación de PDF con nuestra guía fácil de seguir para fusionar, dividir y comprimir documentos.',
      fr: 'Maîtrisez la manipulation PDF avec notre guide facile pour fusionner, diviser et compresser des documents.',
      it: 'Padroneggia la manipolazione PDF con la nostra guida facile per unire, dividere e comprimere documenti.',
      pt: 'Domine a manipulação de PDF com nosso guia fácil para mesclar, dividir e comprimir documentos.',
      nl: 'Beheers PDF-bewerking met onze eenvoudige gids voor samenvoegen, splitsen en comprimeren.',
      pl: 'Opanuj manipulację PDF dzięki naszemu łatwemu przewodnikowi po łączeniu, dzieleniu i kompresji.',
      ru: 'Освойте работу с PDF с помощью нашего простого руководства по объединению, разделению и сжатию документов.',
      ja: '結合、分割、圧縮のための分かりやすいガイドでPDF操作をマスターしましょう。',
      zh: '通过我们易于遵循的合并、拆分和压缩文档指南掌握PDF操作。',
      ko: '병합, 분할 및 압축을 위한 쉬운 가이드로 PDF 조작을 마스터하세요.',
      ar: 'أتقن التعامل مع PDF من خلال دليلنا السهل للدمج والتقسيم والضغط.',
      tr: 'Birleştirme, bölme ve sıkıştırma için kolay takip edilebilir kılavuzumuzla PDF manipülasyonunda ustalaşın.',
      hi: 'मर्जिंग, स्प्लिटिंग और कंप्रेसिंग के लिए हमारे आसान गाइड के साथ PDF मैनिपुलेशन में मास्टर बनें।',
    },
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    category: 'Documents',
    date: '2024-12-20',
    readTime: 7,
  },
  {
    id: 5,
    slug: 'file-security-best-practices',
    title: {
      en: 'File Security: Best Practices for Safe Conversion',
      de: 'Dateisicherheit: Best Practices für sichere Konvertierung',
      es: 'Seguridad de archivos: Mejores prácticas para conversión segura',
      fr: 'Sécurité des fichiers: Meilleures pratiques pour une conversion sûre',
      it: 'Sicurezza dei file: Migliori pratiche per una conversione sicura',
      pt: 'Segurança de arquivos: Melhores práticas para conversão segura',
      nl: 'Bestandsbeveiliging: Best practices voor veilige conversie',
      pl: 'Bezpieczeństwo plików: Najlepsze praktyki bezpiecznej konwersji',
      ru: 'Безопасность файлов: Лучшие практики безопасной конвертации',
      ja: 'ファイルセキュリティ：安全な変換のベストプラクティス',
      zh: '文件安全：安全转换的最佳实践',
      ko: '파일 보안: 안전한 변환을 위한 모범 사례',
      ar: 'أمان الملفات: أفضل الممارسات للتحويل الآمن',
      tr: 'Dosya Güvenliği: Güvenli Dönüştürme İçin En İyi Uygulamalar',
      hi: 'फ़ाइल सुरक्षा: सुरक्षित कन्वर्शन के लिए सर्वोत्तम अभ्यास',
    },
    excerpt: {
      en: 'Learn how to protect your files during conversion and ensure your data stays private.',
      de: 'Erfahren Sie, wie Sie Ihre Dateien während der Konvertierung schützen und Ihre Daten privat halten.',
      es: 'Aprende cómo proteger tus archivos durante la conversión y asegurar que tus datos permanezcan privados.',
      fr: 'Apprenez à protéger vos fichiers pendant la conversion et à garder vos données privées.',
      it: 'Impara a proteggere i tuoi file durante la conversione e a mantenere i tuoi dati privati.',
      pt: 'Aprenda como proteger seus arquivos durante a conversão e garantir que seus dados permaneçam privados.',
      nl: 'Leer hoe u uw bestanden beschermt tijdens conversie en uw gegevens privé houdt.',
      pl: 'Dowiedz się, jak chronić swoje pliki podczas konwersji i zachować prywatność danych.',
      ru: 'Узнайте, как защитить свои файлы во время конвертации и сохранить конфиденциальность данных.',
      ja: '変換中にファイルを保護し、データをプライベートに保つ方法を学びましょう。',
      zh: '学习如何在转换过程中保护您的文件并确保数据隐私。',
      ko: '변환 중 파일을 보호하고 데이터를 비공개로 유지하는 방법을 배우세요.',
      ar: 'تعلم كيفية حماية ملفاتك أثناء التحويل وضمان بقاء بياناتك خاصة.',
      tr: 'Dönüştürme sırasında dosyalarınızı nasıl koruyacağınızı ve verilerinizi gizli tutacağınızı öğrenin.',
      hi: 'कन्वर्शन के दौरान अपनी फ़ाइलों को कैसे सुरक्षित रखें और अपने डेटा को प्राइवेट रखें, सीखें।',
    },
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
    category: 'Security',
    date: '2024-12-18',
    readTime: 5,
  },
  {
    id: 6,
    slug: 'batch-file-conversion',
    title: {
      en: 'Batch File Conversion: How to Convert Multiple Files at Once',
      de: 'Batch-Dateikonvertierung: Mehrere Dateien gleichzeitig konvertieren',
      es: 'Conversión de archivos en lote: Cómo convertir múltiples archivos a la vez',
      fr: 'Conversion par lots: Comment convertir plusieurs fichiers à la fois',
      it: 'Conversione batch: Come convertire più file contemporaneamente',
      pt: 'Conversão em lote: Como converter vários arquivos de uma vez',
      nl: 'Batch-conversie: Meerdere bestanden tegelijk converteren',
      pl: 'Konwersja wsadowa: Jak konwertować wiele plików naraz',
      ru: 'Пакетная конвертация: Как конвертировать несколько файлов одновременно',
      ja: 'バッチファイル変換：複数のファイルを一度に変換する方法',
      zh: '批量文件转换：如何一次转换多个文件',
      ko: '일괄 파일 변환: 여러 파일을 한 번에 변환하는 방법',
      ar: 'تحويل الملفات بالجملة: كيفية تحويل ملفات متعددة في وقت واحد',
      tr: 'Toplu Dosya Dönüştürme: Aynı Anda Birden Fazla Dosya Nasıl Dönüştürülür',
      hi: 'बैच फ़ाइल कन्वर्शन: एक साथ कई फ़ाइलें कैसे कन्वर्ट करें',
    },
    excerpt: {
      en: 'Save time by converting hundreds of files in one go with our batch conversion feature.',
      de: 'Sparen Sie Zeit, indem Sie mit unserer Batch-Konvertierung Hunderte von Dateien auf einmal konvertieren.',
      es: 'Ahorra tiempo convirtiendo cientos de archivos de una vez con nuestra función de conversión por lotes.',
      fr: 'Gagnez du temps en convertissant des centaines de fichiers en une seule fois avec notre conversion par lots.',
      it: 'Risparmia tempo convertendo centinaia di file in una volta con la nostra funzione di conversione batch.',
      pt: 'Economize tempo convertendo centenas de arquivos de uma vez com nossa conversão em lote.',
      nl: 'Bespaar tijd door honderden bestanden tegelijk te converteren met onze batch-conversie.',
      pl: 'Oszczędź czas, konwertując setki plików naraz dzięki naszej konwersji wsadowej.',
      ru: 'Сэкономьте время, конвертируя сотни файлов одновременно с помощью нашей пакетной конвертации.',
      ja: 'バッチ変換機能で一度に何百ものファイルを変換して時間を節約しましょう。',
      zh: '使用我们的批量转换功能一次转换数百个文件，节省时间。',
      ko: '일괄 변환 기능으로 수백 개의 파일을 한 번에 변환하여 시간을 절약하세요.',
      ar: 'وفر الوقت بتحويل مئات الملفات دفعة واحدة باستخدام ميزة التحويل بالجملة.',
      tr: 'Toplu dönüştürme özelliğimizle yüzlerce dosyayı tek seferde dönüştürerek zaman kazanın.',
      hi: 'हमारे बैच कन्वर्शन फीचर से एक ही बार में सैकड़ों फ़ाइलें कन्वर्ट करके समय बचाएं।',
    },
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&q=80',
    category: 'Tips',
    date: '2024-12-15',
    readTime: 4,
  },
];

const Blog = () => {
  const { language, t, getLocalizedPath } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t.meta.blogTitle}</title>
        <meta name="description" content={t.meta.blogDesc} />
        <link rel="canonical" href={`https://transformfiles.com${language === 'en' ? '' : `/${language}`}/blog`} />
        <meta property="og:title" content={t.meta.blogTitle} />
        <meta property="og:description" content={t.meta.blogDesc} />
        <meta property="og:type" content="website" />
        
        {/* Hreflang tags for SEO */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="glass rounded-2xl overflow-hidden group hover:glow-teal transition-all duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title[language] || post.title.en}
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
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : language)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min
                          </span>
                        </div>
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title[language] || post.title.en}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt[language] || post.excerpt.en}
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
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
