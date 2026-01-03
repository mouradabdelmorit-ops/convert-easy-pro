// Programmatic SEO data for all conversion tools
// Each tool has its own URL, keyword, and unique content

export interface ConversionTool {
  id: string;
  slug: string;
  category: 'video' | 'audio' | 'image' | 'pdf' | 'ai';
  fromFormat?: string;
  toFormat?: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
  description: string;
  features: string[];
  useCases: string[];
  faqs: { question: string; answer: string }[];
  relatedTools: string[];
}

// VIDEO CONVERSIONS
export const videoConversions: ConversionTool[] = [
  {
    id: 'mp4-to-mp3',
    slug: 'mp4-to-mp3',
    category: 'video',
    fromFormat: 'MP4',
    toFormat: 'MP3',
    title: 'MP4 to MP3 Converter',
    metaTitle: 'MP4 to MP3 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert MP4 to MP3 online for free. Extract audio from video files instantly. Fast, secure, unlimited, no signup required.',
    h1: 'MP4 to MP3 Converter',
    keywords: ['mp4 to mp3', 'mp4 to mp3 converter', 'convert mp4 to mp3', 'extract audio from video', 'mp4 audio extractor', 'video to audio converter'],
    description: 'Extract high-quality audio from your MP4 video files with our free online MP4 to MP3 converter. Whether you want to save music from videos, create podcasts from recorded content, or simply enjoy audio without the video, our tool delivers crystal-clear MP3 files in seconds. No software installation required – just upload, convert, and download.',
    features: [
      'Preserve original audio quality during conversion',
      'Support for files up to 500MB',
      'Batch conversion for multiple files',
      'Works on all devices and browsers',
      'No registration or watermarks'
    ],
    useCases: [
      'Extract music from music videos for offline listening',
      'Convert recorded lectures to audio for studying',
      'Create podcast episodes from video recordings',
      'Save audio from social media videos',
      'Reduce file size while keeping audio content'
    ],
    faqs: [
      { question: 'Is the MP4 to MP3 converter free?', answer: 'Yes, our MP4 to MP3 converter is 100% free with no hidden costs or subscriptions. You can convert unlimited files without paying anything.' },
      { question: 'How long does MP4 to MP3 conversion take?', answer: 'Most conversions complete in under 30 seconds. Larger files may take 1-2 minutes depending on your internet speed.' },
      { question: 'Will my files be deleted after conversion?', answer: 'Yes, all uploaded files are automatically deleted from our servers within 2 hours for your privacy and security.' },
      { question: 'Can I convert large MP4 files to MP3?', answer: 'Yes, you can convert MP4 files up to 500MB. For larger files, consider using our desktop application.' },
      { question: 'Does the converter work on mobile phones?', answer: 'Absolutely! Our MP4 to MP3 converter works perfectly on iPhone, Android, tablets, and all mobile devices.' },
      { question: 'What audio quality will the MP3 have?', answer: 'We preserve the original audio quality. You can expect 128-320 kbps depending on the source video quality.' }
    ],
    relatedTools: ['mkv-to-mp4', 'mp4-to-wav', 'video-compressor', 'audio-converter']
  },
  {
    id: 'mkv-to-mp4',
    slug: 'mkv-to-mp4',
    category: 'video',
    fromFormat: 'MKV',
    toFormat: 'MP4',
    title: 'MKV to MP4 Converter',
    metaTitle: 'MKV to MP4 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert MKV to MP4 online for free. No quality loss, fast conversion. Play MKV videos anywhere. No signup required.',
    h1: 'MKV to MP4 Converter',
    keywords: ['mkv to mp4', 'mkv to mp4 converter', 'convert mkv to mp4', 'mkv converter', 'matroska to mp4'],
    description: 'Convert MKV files to universally compatible MP4 format without losing quality. MKV (Matroska) files often have playback issues on many devices and platforms. Our free online converter transforms your MKV videos to MP4, the most widely supported video format, ensuring smooth playback on smartphones, tablets, smart TVs, and all media players.',
    features: [
      'Lossless quality conversion',
      'Preserve subtitles and audio tracks',
      'Fast cloud-based processing',
      'Support for 4K and HD videos',
      'No watermarks added'
    ],
    useCases: [
      'Play MKV movies on iPhone and iPad',
      'Share videos on social media platforms',
      'Upload videos to YouTube or Vimeo',
      'Play videos on smart TVs',
      'Edit MKV videos in software that only supports MP4'
    ],
    faqs: [
      { question: 'Is MKV to MP4 conversion free?', answer: 'Yes, 100% free with no limitations on the number of conversions.' },
      { question: 'Will I lose video quality converting MKV to MP4?', answer: 'No, our converter uses lossless conversion to preserve the original video quality.' },
      { question: 'Are subtitles preserved during conversion?', answer: 'Yes, embedded subtitles are preserved in the MP4 output file.' },
      { question: 'How long does MKV to MP4 conversion take?', answer: 'Typically 30 seconds to 2 minutes depending on file size and your internet speed.' },
      { question: 'Can I convert 4K MKV videos?', answer: 'Yes, we fully support 4K, 1080p, and all video resolutions.' }
    ],
    relatedTools: ['mp4-to-mp3', 'mov-to-mp4', 'avi-to-mp4', 'video-compressor']
  },
  {
    id: 'mov-to-mp4',
    slug: 'mov-to-mp4',
    category: 'video',
    fromFormat: 'MOV',
    toFormat: 'MP4',
    title: 'MOV to MP4 Converter',
    metaTitle: 'MOV to MP4 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert MOV to MP4 online for free. Perfect for iPhone videos. Fast, secure, no quality loss. No signup required.',
    h1: 'MOV to MP4 Converter',
    keywords: ['mov to mp4', 'mov to mp4 converter', 'convert mov to mp4', 'quicktime to mp4', 'iphone video converter'],
    description: 'Convert Apple MOV files to MP4 format for universal compatibility. MOV is Apple QuickTime format that may not play on Windows, Android, or web browsers. Our free MOV to MP4 converter transforms your iPhone videos, QuickTime recordings, and other MOV files to the universally supported MP4 format.',
    features: [
      'Perfect for iPhone and iPad videos',
      'Maintains original video quality',
      'Fast conversion speed',
      'Works on Windows, Mac, and Linux',
      'No software installation needed'
    ],
    useCases: [
      'Share iPhone videos with Android users',
      'Upload iPhone recordings to YouTube',
      'Edit MOV files in Windows video editors',
      'Play QuickTime videos on any device',
      'Reduce file size while maintaining quality'
    ],
    faqs: [
      { question: 'Why should I convert MOV to MP4?', answer: 'MP4 is universally supported while MOV may not play on non-Apple devices. Converting ensures your videos work everywhere.' },
      { question: 'Will converting affect my video quality?', answer: 'No, our converter preserves the original quality of your MOV files.' },
      { question: 'Can I convert iPhone videos online?', answer: 'Yes, you can upload iPhone MOV videos directly from your device and convert them to MP4.' },
      { question: 'Is there a file size limit?', answer: 'You can convert MOV files up to 500MB for free.' },
      { question: 'How do I convert MOV to MP4 on iPhone?', answer: 'Simply visit our website on Safari, upload your MOV file, and download the converted MP4.' }
    ],
    relatedTools: ['mkv-to-mp4', 'avi-to-mp4', 'mp4-to-mp3', 'video-compressor']
  },
  {
    id: 'avi-to-mp4',
    slug: 'avi-to-mp4',
    category: 'video',
    fromFormat: 'AVI',
    toFormat: 'MP4',
    title: 'AVI to MP4 Converter',
    metaTitle: 'AVI to MP4 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert AVI to MP4 online for free. Modern format, smaller file size. Fast, secure conversion. No signup required.',
    h1: 'AVI to MP4 Converter',
    keywords: ['avi to mp4', 'avi to mp4 converter', 'convert avi to mp4', 'avi converter'],
    description: 'Transform legacy AVI files to modern MP4 format. AVI is an older video format that produces large file sizes and may lack support on modern devices. Our converter efficiently transforms AVI to MP4, reducing file sizes while maintaining quality and ensuring compatibility with all modern devices and platforms.',
    features: [
      'Significantly reduce file sizes',
      'Modern H.264/H.265 encoding',
      'Preserve video quality',
      'Fast processing',
      'Free unlimited conversions'
    ],
    useCases: [
      'Modernize old video collections',
      'Share videos on social media',
      'Save storage space',
      'Play old videos on new devices',
      'Upload to streaming platforms'
    ],
    faqs: [
      { question: 'Is AVI to MP4 conversion free?', answer: 'Yes, completely free with no hidden costs or file limits.' },
      { question: 'How much smaller will my MP4 file be?', answer: 'MP4 files are typically 50-70% smaller than AVI files while maintaining similar quality.' },
      { question: 'Will I lose quality converting AVI to MP4?', answer: 'Our converter uses high-quality encoding to minimize any quality loss.' },
      { question: 'Can I convert multiple AVI files at once?', answer: 'Yes, batch conversion is supported for up to 10 files at a time.' },
      { question: 'What devices support MP4?', answer: 'MP4 is supported by virtually all devices including smartphones, tablets, computers, smart TVs, and gaming consoles.' }
    ],
    relatedTools: ['mkv-to-mp4', 'mov-to-mp4', 'mp4-to-mp3', 'video-compressor']
  },
  {
    id: 'video-compressor',
    slug: 'video-compressor',
    category: 'video',
    title: 'Video Compressor',
    metaTitle: 'Video Compressor – Free Online | TransformFiles',
    metaDescription: 'Compress video files online for free. Reduce file size up to 90% without quality loss. Fast, secure, no signup.',
    h1: 'Video Compressor',
    keywords: ['video compressor', 'compress video online', 'reduce video size', 'video file compressor', 'shrink video'],
    description: 'Compress video files to reduce size while maintaining quality. Whether you need to share videos via email, upload to social media faster, or save storage space, our intelligent video compressor analyzes your video and applies optimal compression settings to achieve the smallest possible file size without visible quality loss.',
    features: [
      'Reduce file sizes up to 90%',
      'Intelligent quality preservation',
      'Support for all video formats',
      'Adjustable compression levels',
      'Fast cloud processing'
    ],
    useCases: [
      'Share videos via email or messaging apps',
      'Upload to social media faster',
      'Save storage space on devices',
      'Reduce bandwidth for video streaming',
      'Optimize videos for websites'
    ],
    faqs: [
      { question: 'How much can I compress my video?', answer: 'Depending on the source video, you can reduce file sizes by 50-90% while maintaining good quality.' },
      { question: 'Will compression affect video quality?', answer: 'Our smart compression balances file size and quality. You can choose different compression levels based on your needs.' },
      { question: 'What video formats are supported?', answer: 'We support MP4, AVI, MKV, MOV, WMV, FLV, WebM, and 50+ more formats.' },
      { question: 'Is there a file size limit?', answer: 'Free users can compress videos up to 500MB.' },
      { question: 'How long does compression take?', answer: 'Most videos are compressed in under 2 minutes.' }
    ],
    relatedTools: ['mp4-to-mp3', 'mkv-to-mp4', 'mov-to-mp4', 'image-compressor']
  }
];

// IMAGE CONVERSIONS
export const imageConversions: ConversionTool[] = [
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    category: 'image',
    fromFormat: 'JPG',
    toFormat: 'PNG',
    title: 'JPG to PNG Converter',
    metaTitle: 'JPG to PNG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert JPG to PNG online for free. Lossless quality, supports transparency. Fast, secure, no signup required.',
    h1: 'JPG to PNG Converter',
    keywords: ['jpg to png', 'jpeg to png', 'convert jpg to png', 'jpg png converter'],
    description: 'Convert JPG images to PNG format for lossless quality and transparency support. PNG format is ideal when you need crisp graphics, transparent backgrounds, or images without compression artifacts. Our free converter transforms your JPG photos to high-quality PNG files instantly.',
    features: [
      'Lossless conversion quality',
      'Optional transparency support',
      'Batch conversion available',
      'Preserve image metadata',
      'No quality degradation'
    ],
    useCases: [
      'Create transparent background images',
      'Prepare graphics for web design',
      'Convert photos for print quality',
      'Remove JPEG compression artifacts',
      'Create high-quality screenshots'
    ],
    faqs: [
      { question: 'Is JPG to PNG conversion free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Will converting to PNG increase file size?', answer: 'PNG files are typically larger than JPG because PNG uses lossless compression.' },
      { question: 'Can I add transparency when converting?', answer: 'PNG supports transparency, but the original opaque areas of JPG will remain opaque.' },
      { question: 'How many images can I convert at once?', answer: 'You can batch convert up to 20 images at a time.' },
      { question: 'Does the conversion preserve image quality?', answer: 'Yes, converting to PNG does not lose any quality from the source JPG.' }
    ],
    relatedTools: ['png-to-jpg', 'heic-to-jpg', 'image-compressor', 'background-remover']
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    category: 'image',
    fromFormat: 'PNG',
    toFormat: 'JPG',
    title: 'PNG to JPG Converter',
    metaTitle: 'PNG to JPG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert PNG to JPG online for free. Smaller file sizes, perfect for photos. Fast, secure, no signup required.',
    h1: 'PNG to JPG Converter',
    keywords: ['png to jpg', 'png to jpeg', 'convert png to jpg', 'png jpg converter'],
    description: 'Convert PNG images to JPG format for smaller file sizes and better compatibility. JPG is the ideal format for photographs and images where transparency is not needed. Our converter efficiently transforms PNG files to optimized JPG images while maintaining excellent visual quality.',
    features: [
      'Significant file size reduction',
      'Adjustable quality settings',
      'Batch conversion support',
      'Choose background color for transparent areas',
      'Fast processing'
    ],
    useCases: [
      'Reduce image sizes for websites',
      'Share photos via email or messaging',
      'Optimize images for social media',
      'Save storage space',
      'Prepare images for print'
    ],
    faqs: [
      { question: 'Is PNG to JPG conversion free?', answer: 'Yes, completely free with no limits.' },
      { question: 'What happens to transparency when converting?', answer: 'Transparent areas are replaced with a white background (or color of your choice).' },
      { question: 'How much smaller will the JPG be?', answer: 'JPG files are typically 50-80% smaller than PNG files.' },
      { question: 'Can I control the output quality?', answer: 'Yes, you can choose quality levels from 60% to 100%.' },
      { question: 'Will I lose image quality?', answer: 'JPG uses lossy compression, but at high quality settings the difference is barely noticeable.' }
    ],
    relatedTools: ['jpg-to-png', 'heic-to-jpg', 'image-compressor', 'jpg-to-webp']
  },
  {
    id: 'heic-to-jpg',
    slug: 'heic-to-jpg',
    category: 'image',
    fromFormat: 'HEIC',
    toFormat: 'JPG',
    title: 'HEIC to JPG Converter',
    metaTitle: 'HEIC to JPG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert HEIC to JPG online for free. Convert iPhone photos instantly. Fast, secure, no signup required.',
    h1: 'HEIC to JPG Converter',
    keywords: ['heic to jpg', 'heic to jpeg', 'convert heic to jpg', 'iphone photo converter', 'heic converter'],
    description: 'Convert iPhone HEIC photos to universally compatible JPG format. HEIC (High Efficiency Image Format) is used by iPhone and iPad but is not supported by all devices and applications. Our free converter instantly transforms your HEIC photos to JPG format that works everywhere.',
    features: [
      'Perfect for iPhone photos',
      'Preserve image quality and metadata',
      'Batch convert multiple photos',
      'Maintain EXIF data and orientation',
      'Works on Windows, Mac, Android'
    ],
    useCases: [
      'Share iPhone photos with non-Apple users',
      'Upload photos to websites',
      'Open iPhone photos on Windows PC',
      'Print iPhone photos at photo labs',
      'Edit photos in software that does not support HEIC'
    ],
    faqs: [
      { question: 'What is HEIC format?', answer: 'HEIC is Apple\'s image format that offers better compression than JPG while maintaining quality.' },
      { question: 'Is HEIC to JPG conversion free?', answer: 'Yes, completely free with unlimited conversions.' },
      { question: 'Why can\'t I open HEIC files on Windows?', answer: 'Windows doesn\'t natively support HEIC. Converting to JPG solves this issue.' },
      { question: 'Will I lose quality converting HEIC to JPG?', answer: 'Our converter uses high-quality settings to minimize any quality loss.' },
      { question: 'Can I convert multiple HEIC files at once?', answer: 'Yes, batch conversion is supported for up to 50 files.' }
    ],
    relatedTools: ['jpg-to-png', 'png-to-jpg', 'image-compressor', 'background-remover']
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    category: 'image',
    title: 'Image Compressor',
    metaTitle: 'Image Compressor – Free Online | TransformFiles',
    metaDescription: 'Compress images online for free. Reduce file size up to 90% without quality loss. JPG, PNG, WebP supported.',
    h1: 'Image Compressor',
    keywords: ['image compressor', 'compress image online', 'reduce image size', 'photo compressor', 'optimize images'],
    description: 'Compress images to reduce file size while maintaining visual quality. Our smart compression algorithm analyzes each image and applies optimal settings to achieve maximum compression with minimal quality loss. Perfect for web optimization, email attachments, and saving storage space.',
    features: [
      'Reduce sizes up to 90%',
      'Support for JPG, PNG, WebP, GIF',
      'Batch compression',
      'Adjustable quality levels',
      'Preserve or strip metadata'
    ],
    useCases: [
      'Optimize images for websites',
      'Reduce email attachment sizes',
      'Save storage space',
      'Speed up page load times',
      'Prepare images for social media'
    ],
    faqs: [
      { question: 'How much can I compress my images?', answer: 'Typically 50-90% size reduction depending on the original image.' },
      { question: 'Will compression make my images blurry?', answer: 'Our smart compression minimizes quality loss. Most compressions are visually indistinguishable.' },
      { question: 'What formats are supported?', answer: 'JPG, PNG, WebP, GIF, BMP, and TIFF.' },
      { question: 'Can I compress multiple images at once?', answer: 'Yes, batch compress up to 50 images simultaneously.' },
      { question: 'Is there a file size limit?', answer: 'Images up to 50MB are supported.' }
    ],
    relatedTools: ['jpg-to-png', 'png-to-jpg', 'background-remover', 'image-enhancer']
  },
  {
    id: 'background-remover',
    slug: 'background-remover',
    category: 'image',
    title: 'Background Remover',
    metaTitle: 'Background Remover – Free AI Tool | TransformFiles',
    metaDescription: 'Remove image backgrounds online for free using AI. Instant results, transparent PNG output. No signup required.',
    h1: 'AI Background Remover',
    keywords: ['background remover', 'remove background', 'transparent background', 'ai background remover', 'remove image background'],
    description: 'Remove backgrounds from images instantly using advanced AI technology. Our AI-powered background remover automatically detects subjects and creates perfect transparent backgrounds in seconds. Ideal for product photos, profile pictures, marketing materials, and creative projects.',
    features: [
      'AI-powered automatic detection',
      'Instant transparent PNG output',
      'Works with complex backgrounds',
      'Hair and edge refinement',
      'Free unlimited use'
    ],
    useCases: [
      'Create product photos for e-commerce',
      'Make professional profile pictures',
      'Design marketing materials',
      'Create social media graphics',
      'Prepare images for presentations'
    ],
    faqs: [
      { question: 'Is the background remover free?', answer: 'Yes, completely free with no limits on the number of images.' },
      { question: 'How accurate is the AI detection?', answer: 'Our AI achieves 95%+ accuracy for most images, including complex hair and edges.' },
      { question: 'What output format do I get?', answer: 'You receive a transparent PNG file.' },
      { question: 'Can I edit the result?', answer: 'Yes, you can manually refine edges if needed using our built-in editor.' },
      { question: 'What image types work best?', answer: 'Clear photos with distinct subjects work best. Very busy backgrounds may need manual refinement.' }
    ],
    relatedTools: ['image-compressor', 'image-enhancer', 'jpg-to-png', 'heic-to-jpg']
  },
  {
    id: 'image-enhancer',
    slug: 'image-enhancer',
    category: 'image',
    title: 'Image Enhancer',
    metaTitle: 'AI Image Enhancer – Free Online | TransformFiles',
    metaDescription: 'Enhance image quality with AI. Upscale, sharpen, and improve photos. Free online tool, no signup required.',
    h1: 'AI Image Enhancer',
    keywords: ['image enhancer', 'enhance image quality', 'ai image enhancer', 'upscale image', 'improve photo quality'],
    description: 'Enhance image quality using AI-powered upscaling and improvement technology. Transform low-resolution images into crisp, high-quality photos. Our AI analyzes your images and intelligently enhances details, reduces noise, and improves overall clarity without creating artificial-looking results.',
    features: [
      'AI-powered quality enhancement',
      'Upscale images up to 4x',
      'Noise reduction',
      'Detail enhancement',
      'Color correction'
    ],
    useCases: [
      'Upscale old photos',
      'Improve product images',
      'Enhance screenshots',
      'Restore blurry images',
      'Prepare images for printing'
    ],
    faqs: [
      { question: 'How does AI image enhancement work?', answer: 'Our AI has been trained on millions of images to intelligently add details and improve quality.' },
      { question: 'Can I upscale images for printing?', answer: 'Yes, you can upscale images up to 4x for high-quality prints.' },
      { question: 'Will enhancement work on very blurry images?', answer: 'AI can improve moderately blurry images, but very blurry images may have limited improvement.' },
      { question: 'Is the image enhancer free?', answer: 'Yes, free with no limitations.' },
      { question: 'What file formats are supported?', answer: 'JPG, PNG, WebP, BMP, and TIFF.' }
    ],
    relatedTools: ['background-remover', 'image-compressor', 'jpg-to-png', 'heic-to-jpg']
  }
];

// PDF TOOLS
export const pdfTools: ConversionTool[] = [
  {
    id: 'pdf-to-word',
    slug: 'pdf-to-word',
    category: 'pdf',
    fromFormat: 'PDF',
    toFormat: 'Word',
    title: 'PDF to Word Converter',
    metaTitle: 'PDF to Word Converter – Free Online | TransformFiles',
    metaDescription: 'Convert PDF to Word (DOCX) online for free. Preserve formatting perfectly. Edit PDFs easily. No signup required.',
    h1: 'PDF to Word Converter',
    keywords: ['pdf to word', 'pdf to docx', 'convert pdf to word', 'pdf converter', 'pdf to word converter free'],
    description: 'Convert PDF documents to editable Word files with perfect formatting preservation. Our advanced PDF to Word converter accurately maintains layouts, fonts, images, and tables, making it easy to edit PDF content in Microsoft Word or Google Docs.',
    features: [
      'Preserve original formatting',
      'Keep images and tables intact',
      'Font recognition and matching',
      'Multi-page PDF support',
      'OCR for scanned PDFs'
    ],
    useCases: [
      'Edit PDF contracts and documents',
      'Update outdated PDF reports',
      'Extract text from PDFs',
      'Modify PDF forms',
      'Collaborate on PDF content'
    ],
    faqs: [
      { question: 'Is PDF to Word conversion free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Will the formatting be preserved?', answer: 'Our converter accurately preserves layouts, fonts, images, and tables.' },
      { question: 'Can I convert scanned PDFs?', answer: 'Yes, our OCR technology can extract text from scanned PDF documents.' },
      { question: 'What Word format is output?', answer: 'You receive a .docx file compatible with Microsoft Word and Google Docs.' },
      { question: 'Is there a page limit?', answer: 'Free users can convert PDFs up to 100 pages.' }
    ],
    relatedTools: ['word-to-pdf', 'pdf-to-jpg', 'merge-pdf', 'compress-pdf']
  },
  {
    id: 'word-to-pdf',
    slug: 'word-to-pdf',
    category: 'pdf',
    fromFormat: 'Word',
    toFormat: 'PDF',
    title: 'Word to PDF Converter',
    metaTitle: 'Word to PDF Converter – Free Online | TransformFiles',
    metaDescription: 'Convert Word to PDF online for free. Perfect formatting, secure sharing. Fast conversion. No signup required.',
    h1: 'Word to PDF Converter',
    keywords: ['word to pdf', 'docx to pdf', 'convert word to pdf', 'word to pdf converter free'],
    description: 'Convert Word documents to PDF format for secure sharing and printing. PDFs maintain consistent formatting across all devices and cannot be easily edited. Our converter transforms your Word files (.doc, .docx) to professional PDF documents instantly.',
    features: [
      'Perfect formatting preservation',
      'Embedded fonts and images',
      'Hyperlinks preserved',
      'Password protection option',
      'High-quality output'
    ],
    useCases: [
      'Create professional documents for sharing',
      'Prepare contracts and agreements',
      'Generate print-ready documents',
      'Archive documents securely',
      'Submit assignments and reports'
    ],
    faqs: [
      { question: 'Is Word to PDF conversion free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Will my formatting be preserved?', answer: 'Yes, all formatting, images, and fonts are accurately preserved.' },
      { question: 'Can I convert .doc files?', answer: 'Yes, both .doc and .docx files are supported.' },
      { question: 'Is the PDF output print-ready?', answer: 'Yes, the PDF is high-quality and suitable for printing.' },
      { question: 'Are my documents secure?', answer: 'Yes, files are encrypted during upload and deleted within 2 hours.' }
    ],
    relatedTools: ['pdf-to-word', 'pdf-to-jpg', 'merge-pdf', 'compress-pdf']
  },
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    category: 'pdf',
    title: 'Merge PDF',
    metaTitle: 'Merge PDF – Free Online PDF Combiner | TransformFiles',
    metaDescription: 'Merge PDF files online for free. Combine multiple PDFs into one. Drag and drop, reorder pages. No signup required.',
    h1: 'Merge PDF Files',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'merge pdf files free'],
    description: 'Combine multiple PDF files into a single document effortlessly. Our PDF merger allows you to drag and drop files, reorder pages, and create one unified PDF document. Perfect for combining reports, contracts, presentations, or any PDF documents.',
    features: [
      'Drag and drop interface',
      'Reorder pages easily',
      'Merge unlimited PDFs',
      'Preview before merging',
      'Fast processing'
    ],
    useCases: [
      'Combine invoice and receipt PDFs',
      'Create complete reports from sections',
      'Merge scanned documents',
      'Compile portfolios',
      'Bundle contracts and attachments'
    ],
    faqs: [
      { question: 'Is PDF merging free?', answer: 'Yes, completely free with no file limits.' },
      { question: 'How many PDFs can I merge?', answer: 'You can merge unlimited PDFs into one document.' },
      { question: 'Can I reorder pages before merging?', answer: 'Yes, drag and drop to reorder files and pages.' },
      { question: 'Will the quality be affected?', answer: 'No, original quality is preserved.' },
      { question: 'Can I merge password-protected PDFs?', answer: 'You\'ll need to unlock them first using our PDF unlock tool.' }
    ],
    relatedTools: ['split-pdf', 'compress-pdf', 'pdf-to-word', 'pdf-editor']
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    category: 'pdf',
    title: 'Split PDF',
    metaTitle: 'Split PDF – Free Online PDF Splitter | TransformFiles',
    metaDescription: 'Split PDF files online for free. Extract pages, split by range. Easy to use, no signup required.',
    h1: 'Split PDF Files',
    keywords: ['split pdf', 'extract pdf pages', 'pdf splitter', 'split pdf pages', 'divide pdf'],
    description: 'Split PDF documents into multiple files or extract specific pages. Whether you need to separate chapters, extract important pages, or divide a large PDF into smaller parts, our tool gives you complete control over your PDF splitting needs.',
    features: [
      'Split by page range',
      'Extract specific pages',
      'Split into equal parts',
      'Preview pages before splitting',
      'Download individual or all files'
    ],
    useCases: [
      'Extract specific chapters from books',
      'Separate pages for different recipients',
      'Create smaller file sizes for sharing',
      'Remove unwanted pages',
      'Divide scanned documents'
    ],
    faqs: [
      { question: 'Is PDF splitting free?', answer: 'Yes, 100% free with no limitations.' },
      { question: 'Can I extract only certain pages?', answer: 'Yes, specify exact page numbers or ranges to extract.' },
      { question: 'How do I split a PDF into separate files?', answer: 'Choose "Split by page" and each page becomes its own PDF.' },
      { question: 'Can I preview pages before splitting?', answer: 'Yes, thumbnails let you see each page.' },
      { question: 'Is there a page limit?', answer: 'Free users can split PDFs up to 500 pages.' }
    ],
    relatedTools: ['merge-pdf', 'compress-pdf', 'pdf-to-word', 'pdf-editor']
  },
  {
    id: 'compress-pdf',
    slug: 'compress-pdf',
    category: 'pdf',
    title: 'Compress PDF',
    metaTitle: 'Compress PDF – Free Online PDF Compressor | TransformFiles',
    metaDescription: 'Compress PDF files online for free. Reduce size up to 90% while maintaining quality. No signup required.',
    h1: 'Compress PDF Files',
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'shrink pdf', 'make pdf smaller'],
    description: 'Reduce PDF file sizes while maintaining quality. Our smart PDF compression analyzes your document and applies optimal settings to achieve maximum compression. Perfect for email attachments, web uploads, and saving storage space.',
    features: [
      'Reduce sizes up to 90%',
      'Multiple compression levels',
      'Preserve text quality',
      'Optimize images within PDFs',
      'Batch compression'
    ],
    useCases: [
      'Share PDFs via email',
      'Upload to websites faster',
      'Save storage space',
      'Meet file size requirements',
      'Speed up PDF loading'
    ],
    faqs: [
      { question: 'How much can I compress my PDF?', answer: 'Typically 50-90% size reduction depending on the PDF content.' },
      { question: 'Will compression affect readability?', answer: 'Our smart compression preserves text quality. Images may be optimized.' },
      { question: 'Can I choose compression level?', answer: 'Yes, choose between low, medium, and high compression.' },
      { question: 'Is PDF compression free?', answer: 'Yes, completely free with no limits.' },
      { question: 'What if my PDF is already compressed?', answer: 'Already compressed PDFs may have limited further compression potential.' }
    ],
    relatedTools: ['merge-pdf', 'split-pdf', 'pdf-to-word', 'pdf-editor']
  },
  {
    id: 'pdf-editor',
    slug: 'pdf-editor',
    category: 'pdf',
    title: 'PDF Editor',
    metaTitle: 'PDF Editor – Free Online PDF Editor | TransformFiles',
    metaDescription: 'Edit PDF files online for free. Add text, images, signatures, annotations. Easy to use, no signup required.',
    h1: 'Free Online PDF Editor',
    keywords: ['pdf editor', 'edit pdf online', 'pdf editor free', 'modify pdf', 'annotate pdf'],
    description: 'Edit PDF files directly in your browser without installing software. Add text, images, shapes, highlights, and signatures to any PDF. Our intuitive editor makes PDF modification simple and accessible for everyone.',
    features: [
      'Add and edit text',
      'Insert images and shapes',
      'Add electronic signatures',
      'Highlight and annotate',
      'Fill forms'
    ],
    useCases: [
      'Fill out PDF forms',
      'Sign documents electronically',
      'Add annotations and comments',
      'Insert company logos',
      'Highlight important text'
    ],
    faqs: [
      { question: 'Is the PDF editor free?', answer: 'Yes, completely free with full editing capabilities.' },
      { question: 'Can I add text to a PDF?', answer: 'Yes, add text boxes anywhere on the PDF.' },
      { question: 'How do I add my signature?', answer: 'Draw, type, or upload an image of your signature.' },
      { question: 'Can I edit existing text?', answer: 'You can add new text over existing content.' },
      { question: 'Will edits be saved permanently?', answer: 'Yes, download the edited PDF with all changes saved.' }
    ],
    relatedTools: ['pdf-to-word', 'merge-pdf', 'compress-pdf', 'split-pdf']
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    category: 'pdf',
    fromFormat: 'JPG',
    toFormat: 'PDF',
    title: 'JPG to PDF Converter',
    metaTitle: 'JPG to PDF Converter – Free Online | TransformFiles',
    metaDescription: 'Convert JPG images to PDF online for free. Combine multiple images into one PDF. No signup required.',
    h1: 'JPG to PDF Converter',
    keywords: ['jpg to pdf', 'jpeg to pdf', 'image to pdf', 'convert jpg to pdf', 'photo to pdf'],
    description: 'Convert JPG images to PDF documents for easy sharing and printing. Combine multiple images into a single PDF or convert individual photos. Our converter maintains image quality while creating properly formatted PDF documents.',
    features: [
      'Convert single or multiple images',
      'Combine into one PDF',
      'Adjust page orientation',
      'Set page margins',
      'Maintain image quality'
    ],
    useCases: [
      'Create PDF documents from photos',
      'Combine scanned pages into one file',
      'Prepare images for printing',
      'Create photo albums as PDFs',
      'Convert receipts to PDF'
    ],
    faqs: [
      { question: 'Is JPG to PDF free?', answer: 'Yes, completely free with no limits.' },
      { question: 'Can I combine multiple JPGs into one PDF?', answer: 'Yes, upload multiple images and they\'ll be combined in order.' },
      { question: 'What image formats are supported?', answer: 'JPG, JPEG, PNG, BMP, and TIFF.' },
      { question: 'Can I choose the page size?', answer: 'Yes, select from A4, Letter, or fit to image.' },
      { question: 'Will image quality be preserved?', answer: 'Yes, original quality is maintained.' }
    ],
    relatedTools: ['pdf-to-jpg', 'merge-pdf', 'compress-pdf', 'png-to-pdf']
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    category: 'pdf',
    fromFormat: 'PDF',
    toFormat: 'JPG',
    title: 'PDF to JPG Converter',
    metaTitle: 'PDF to JPG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert PDF to JPG images online for free. Extract all pages as images. High quality, no signup required.',
    h1: 'PDF to JPG Converter',
    keywords: ['pdf to jpg', 'pdf to jpeg', 'pdf to image', 'convert pdf to jpg', 'extract images from pdf'],
    description: 'Convert PDF pages to high-quality JPG images. Extract all pages from your PDF as separate image files for easy sharing, editing, or use in presentations. Our converter produces crisp, clear images from any PDF document.',
    features: [
      'Convert all pages to images',
      'Adjustable image quality',
      'Choose output resolution',
      'Download as ZIP archive',
      'Single or batch conversion'
    ],
    useCases: [
      'Share PDF content as images',
      'Use PDF pages in presentations',
      'Post PDF content on social media',
      'Archive documents as images',
      'Edit PDF content in image editors'
    ],
    faqs: [
      { question: 'Is PDF to JPG free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Can I convert specific pages only?', answer: 'Yes, select which pages to convert.' },
      { question: 'What resolution will the images be?', answer: 'Choose from 72, 150, or 300 DPI.' },
      { question: 'How do I download multiple images?', answer: 'All images are packaged in a ZIP file.' },
      { question: 'Will text remain readable?', answer: 'Yes, at 300 DPI text is perfectly readable.' }
    ],
    relatedTools: ['jpg-to-pdf', 'pdf-to-word', 'pdf-to-png', 'compress-pdf']
  }
];

// AUDIO CONVERSIONS
export const audioConversions: ConversionTool[] = [
  {
    id: 'wav-to-mp3',
    slug: 'wav-to-mp3',
    category: 'audio',
    fromFormat: 'WAV',
    toFormat: 'MP3',
    title: 'WAV to MP3 Converter',
    metaTitle: 'WAV to MP3 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert WAV to MP3 online for free. Reduce file size dramatically. Fast, secure, no signup required.',
    h1: 'WAV to MP3 Converter',
    keywords: ['wav to mp3', 'convert wav to mp3', 'wav to mp3 converter', 'wav mp3'],
    description: 'Convert WAV audio files to MP3 format for smaller file sizes and universal compatibility. WAV files are uncompressed and can be very large. Our converter transforms them to compact MP3 files while maintaining excellent audio quality.',
    features: [
      'Dramatic size reduction',
      'Adjustable bitrate (128-320 kbps)',
      'Preserve audio quality',
      'Batch conversion',
      'Fast processing'
    ],
    useCases: [
      'Reduce music file sizes',
      'Share audio via email',
      'Upload to music platforms',
      'Create podcasts',
      'Save storage space'
    ],
    faqs: [
      { question: 'Is WAV to MP3 free?', answer: 'Yes, completely free with unlimited conversions.' },
      { question: 'How much smaller will my MP3 be?', answer: 'MP3 files are typically 10-20x smaller than WAV files.' },
      { question: 'Will I lose audio quality?', answer: 'At 320 kbps, quality loss is imperceptible to most listeners.' },
      { question: 'What bitrate should I choose?', answer: '192-320 kbps for high quality, 128 kbps for smaller files.' },
      { question: 'Can I convert multiple files?', answer: 'Yes, batch convert up to 20 files at once.' }
    ],
    relatedTools: ['mp3-to-wav', 'm4a-to-mp3', 'audio-compressor', 'mp4-to-mp3']
  },
  {
    id: 'mp3-to-wav',
    slug: 'mp3-to-wav',
    category: 'audio',
    fromFormat: 'MP3',
    toFormat: 'WAV',
    title: 'MP3 to WAV Converter',
    metaTitle: 'MP3 to WAV Converter – Free Online | TransformFiles',
    metaDescription: 'Convert MP3 to WAV online for free. Uncompressed audio for editing. Fast, secure, no signup required.',
    h1: 'MP3 to WAV Converter',
    keywords: ['mp3 to wav', 'convert mp3 to wav', 'mp3 to wav converter', 'mp3 wav'],
    description: 'Convert MP3 files to uncompressed WAV format for professional audio editing. WAV provides lossless audio quality and is the preferred format for music production, sound design, and professional audio work.',
    features: [
      'Uncompressed output',
      'Professional quality',
      'Multiple sample rates',
      'Batch conversion',
      'Preserve audio fidelity'
    ],
    useCases: [
      'Prepare audio for editing',
      'Music production workflows',
      'Audio mastering',
      'CD burning',
      'Professional sound design'
    ],
    faqs: [
      { question: 'Is MP3 to WAV free?', answer: 'Yes, 100% free with no limitations.' },
      { question: 'Why convert MP3 to WAV?', answer: 'WAV is uncompressed and better for professional audio editing.' },
      { question: 'Will quality improve?', answer: 'Converting won\'t add quality, but it provides an editing-friendly format.' },
      { question: 'What sample rates are available?', answer: '44.1 kHz, 48 kHz, and 96 kHz.' },
      { question: 'Why are WAV files so large?', answer: 'WAV is uncompressed, which means larger files but no quality loss.' }
    ],
    relatedTools: ['wav-to-mp3', 'm4a-to-mp3', 'audio-compressor', 'mp4-to-mp3']
  },
  {
    id: 'm4a-to-mp3',
    slug: 'm4a-to-mp3',
    category: 'audio',
    fromFormat: 'M4A',
    toFormat: 'MP3',
    title: 'M4A to MP3 Converter',
    metaTitle: 'M4A to MP3 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert M4A to MP3 online for free. iTunes and Apple Music files to MP3. Fast, secure, no signup.',
    h1: 'M4A to MP3 Converter',
    keywords: ['m4a to mp3', 'convert m4a to mp3', 'm4a to mp3 converter', 'itunes to mp3'],
    description: 'Convert M4A audio files to universally compatible MP3 format. M4A is used by iTunes and Apple Music but may not play on all devices. Our converter transforms M4A files to MP3 for playback anywhere.',
    features: [
      'iTunes and Apple Music compatible',
      'Preserve audio quality',
      'Universal compatibility',
      'Batch conversion',
      'Fast processing'
    ],
    useCases: [
      'Play Apple Music on non-Apple devices',
      'Transfer iTunes music to Android',
      'Create MP3 playlists',
      'Share music universally',
      'Use audio in video editing'
    ],
    faqs: [
      { question: 'Is M4A to MP3 free?', answer: 'Yes, completely free with unlimited conversions.' },
      { question: 'What is M4A format?', answer: 'M4A is Apple\'s audio format used in iTunes and Apple Music.' },
      { question: 'Will I lose quality?', answer: 'Minimal quality loss at high bitrates (256-320 kbps).' },
      { question: 'Can I convert protected files?', answer: 'DRM-protected files cannot be converted.' },
      { question: 'How long does conversion take?', answer: 'Most files convert in under 30 seconds.' }
    ],
    relatedTools: ['wav-to-mp3', 'mp3-to-wav', 'audio-compressor', 'mp4-to-mp3']
  },
  {
    id: 'audio-compressor',
    slug: 'audio-compressor',
    category: 'audio',
    title: 'Audio Compressor',
    metaTitle: 'Audio Compressor – Free Online | TransformFiles',
    metaDescription: 'Compress audio files online for free. Reduce MP3, WAV, M4A sizes. Fast, secure, no signup required.',
    h1: 'Audio Compressor',
    keywords: ['audio compressor', 'compress audio', 'reduce audio size', 'compress mp3', 'audio file compressor'],
    description: 'Compress audio files to reduce size while maintaining quality. Whether you need smaller files for email, faster uploads, or storage savings, our audio compressor intelligently reduces file sizes with minimal impact on sound quality.',
    features: [
      'Support for all audio formats',
      'Adjustable compression levels',
      'Preserve audio clarity',
      'Batch compression',
      'Fast processing'
    ],
    useCases: [
      'Reduce podcast file sizes',
      'Share audio via email',
      'Save storage space',
      'Faster audio uploads',
      'Optimize audio for web'
    ],
    faqs: [
      { question: 'How much can I compress audio?', answer: 'Typically 30-70% size reduction depending on source quality.' },
      { question: 'Will compression affect sound quality?', answer: 'Our smart compression minimizes quality impact.' },
      { question: 'What formats are supported?', answer: 'MP3, WAV, M4A, OGG, FLAC, AAC, and more.' },
      { question: 'Can I compress multiple files?', answer: 'Yes, batch compress up to 20 files at once.' },
      { question: 'Is there a file size limit?', answer: 'Audio files up to 200MB are supported.' }
    ],
    relatedTools: ['wav-to-mp3', 'm4a-to-mp3', 'mp3-to-wav', 'video-compressor']
  }
];

// AI TOOLS
export const aiTools: ConversionTool[] = [
  {
    id: 'text-summarizer',
    slug: 'text-summarizer',
    category: 'ai',
    title: 'AI Text Summarizer',
    metaTitle: 'AI Text Summarizer – Free Online | TransformFiles',
    metaDescription: 'Summarize text with AI for free. Condense articles, documents, essays instantly. No signup required.',
    h1: 'AI Text Summarizer',
    keywords: ['text summarizer', 'ai summarizer', 'summarize text', 'article summarizer', 'text summary generator'],
    description: 'Summarize long texts, articles, and documents instantly using advanced AI. Our text summarizer understands context and extracts key points to create concise, accurate summaries. Perfect for students, researchers, and professionals who need to quickly digest large amounts of text.',
    features: [
      'AI-powered understanding',
      'Adjustable summary length',
      'Maintain key points',
      'Multiple languages',
      'Instant results'
    ],
    useCases: [
      'Summarize research papers',
      'Condense news articles',
      'Review long documents quickly',
      'Study preparation',
      'Business report summaries'
    ],
    faqs: [
      { question: 'Is the text summarizer free?', answer: 'Yes, completely free with no word limits.' },
      { question: 'How accurate are the summaries?', answer: 'Our AI produces highly accurate summaries that capture key points.' },
      { question: 'Can I summarize in other languages?', answer: 'Yes, we support 50+ languages.' },
      { question: 'What\'s the maximum text length?', answer: 'You can summarize up to 100,000 characters.' },
      { question: 'Can I adjust summary length?', answer: 'Yes, choose from brief, medium, or detailed summaries.' }
    ],
    relatedTools: ['paraphraser', 'grammar-fixer', 'translator', 'email-generator']
  },
  {
    id: 'paraphraser',
    slug: 'paraphraser',
    category: 'ai',
    title: 'AI Paraphraser',
    metaTitle: 'AI Paraphraser – Free Online Paraphrasing Tool | TransformFiles',
    metaDescription: 'Paraphrase text with AI for free. Rewrite content uniquely while keeping meaning. No signup required.',
    h1: 'AI Paraphraser',
    keywords: ['paraphraser', 'paraphrasing tool', 'rewrite text', 'rephrase', 'paraphrase online free'],
    description: 'Rewrite text in different words while maintaining the original meaning. Our AI paraphraser understands context and produces natural, fluent rewrites. Ideal for avoiding plagiarism, improving readability, or creating multiple versions of content.',
    features: [
      'Multiple rewriting styles',
      'Maintain original meaning',
      'Natural language output',
      'Plagiarism-free results',
      'Instant paraphrasing'
    ],
    useCases: [
      'Avoid plagiarism in academic writing',
      'Create unique content versions',
      'Improve text readability',
      'Rephrase for different audiences',
      'Content repurposing'
    ],
    faqs: [
      { question: 'Is the paraphraser free?', answer: 'Yes, 100% free with unlimited use.' },
      { question: 'Will the paraphrased text be unique?', answer: 'Yes, our AI creates unique rewrites every time.' },
      { question: 'Is it considered plagiarism?', answer: 'Properly paraphrased text with citation is not plagiarism.' },
      { question: 'Can I choose writing styles?', answer: 'Yes, choose from casual, formal, academic, or creative.' },
      { question: 'What languages are supported?', answer: 'Currently English, with more languages coming soon.' }
    ],
    relatedTools: ['text-summarizer', 'grammar-fixer', 'translator', 'email-generator']
  },
  {
    id: 'grammar-fixer',
    slug: 'grammar-fixer',
    category: 'ai',
    title: 'AI Grammar Fixer',
    metaTitle: 'AI Grammar Fixer – Free Online Grammar Checker | TransformFiles',
    metaDescription: 'Fix grammar and spelling with AI for free. Improve your writing instantly. No signup required.',
    h1: 'AI Grammar Fixer',
    keywords: ['grammar fixer', 'grammar checker', 'fix grammar', 'grammar correction', 'spelling checker'],
    description: 'Fix grammar, spelling, and punctuation errors instantly using AI. Our grammar fixer goes beyond simple spell-checking to understand context and suggest improvements. Perfect for emails, essays, documents, and any writing that needs polishing.',
    features: [
      'Grammar error correction',
      'Spelling fixes',
      'Punctuation improvements',
      'Style suggestions',
      'Context-aware corrections'
    ],
    useCases: [
      'Polish emails before sending',
      'Review essays and reports',
      'Improve social media posts',
      'Check business documents',
      'Perfect cover letters'
    ],
    faqs: [
      { question: 'Is the grammar fixer free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Does it work with British and American English?', answer: 'Yes, supports both variants and others.' },
      { question: 'Can it fix complex grammar issues?', answer: 'Yes, our AI handles complex sentence structures.' },
      { question: 'Does it suggest style improvements?', answer: 'Yes, beyond grammar, it suggests clarity improvements.' },
      { question: 'Can I use it for academic writing?', answer: 'Absolutely, it\'s perfect for academic papers.' }
    ],
    relatedTools: ['paraphraser', 'text-summarizer', 'translator', 'email-generator']
  },
  {
    id: 'translator',
    slug: 'translator',
    category: 'ai',
    title: 'AI Translator',
    metaTitle: 'AI Translator – Free Online Translation Tool | TransformFiles',
    metaDescription: 'Translate text with AI for free. 100+ languages supported. Natural, accurate translations. No signup.',
    h1: 'AI Translator',
    keywords: ['translator', 'translate text', 'ai translator', 'language translator', 'free translation'],
    description: 'Translate text between 100+ languages using advanced AI. Our translator understands context and nuance to deliver natural, accurate translations. Perfect for documents, messages, websites, and any multilingual communication needs.',
    features: [
      '100+ languages supported',
      'Context-aware translation',
      'Natural language output',
      'Preserve formatting',
      'Instant results'
    ],
    useCases: [
      'Translate documents',
      'Communicate internationally',
      'Translate emails and messages',
      'Understand foreign content',
      'Localize marketing materials'
    ],
    faqs: [
      { question: 'Is the translator free?', answer: 'Yes, 100% free with unlimited translations.' },
      { question: 'How many languages are supported?', answer: 'We support 100+ languages including all major ones.' },
      { question: 'Is translation accurate?', answer: 'Our AI produces highly accurate, natural translations.' },
      { question: 'Can I translate documents?', answer: 'Yes, paste text from any document for translation.' },
      { question: 'Is it better than Google Translate?', answer: 'Our AI focuses on natural, context-aware translations.' }
    ],
    relatedTools: ['text-summarizer', 'paraphraser', 'grammar-fixer', 'email-generator']
  },
  {
    id: 'email-generator',
    slug: 'email-generator',
    category: 'ai',
    title: 'AI Email Generator',
    metaTitle: 'AI Email Generator – Free Online | TransformFiles',
    metaDescription: 'Generate professional emails with AI for free. Business, formal, casual emails instantly. No signup.',
    h1: 'AI Email Generator',
    keywords: ['email generator', 'ai email writer', 'write email', 'professional email generator', 'email creator'],
    description: 'Generate professional emails instantly using AI. Simply describe what you need to communicate, and our AI crafts well-structured, appropriately toned emails. Perfect for business correspondence, job applications, customer service, and personal communication.',
    features: [
      'Multiple tones (formal, casual, friendly)',
      'Business email templates',
      'Subject line suggestions',
      'Follow-up email generation',
      'Multi-language support'
    ],
    useCases: [
      'Write business proposals',
      'Create job application emails',
      'Respond to customer inquiries',
      'Send meeting requests',
      'Draft follow-up emails'
    ],
    faqs: [
      { question: 'Is the email generator free?', answer: 'Yes, completely free with unlimited emails.' },
      { question: 'Can I choose the email tone?', answer: 'Yes, select formal, casual, friendly, or professional.' },
      { question: 'Does it generate subject lines?', answer: 'Yes, we provide optimized subject line suggestions.' },
      { question: 'Can I edit the generated email?', answer: 'Absolutely, all generated content is fully editable.' },
      { question: 'Is it suitable for business emails?', answer: 'Yes, we specialize in professional business correspondence.' }
    ],
    relatedTools: ['text-summarizer', 'paraphraser', 'grammar-fixer', 'translator']
  },
  {
    id: 'image-to-code',
    slug: 'image-to-code',
    category: 'ai',
    title: 'Image to Code Converter',
    metaTitle: 'Image to Code Converter – Free AI Tool | TransformFiles',
    metaDescription: 'Convert design images to HTML/CSS code with AI for free. Upload screenshots, get code instantly.',
    h1: 'Image to Code Converter',
    keywords: ['image to code', 'screenshot to code', 'design to code', 'ai code generator', 'html from image'],
    description: 'Convert design mockups and screenshots to HTML/CSS code using AI. Simply upload an image of any design, and our AI generates clean, responsive code. Perfect for developers who want to quickly implement designs or learn from existing layouts.',
    features: [
      'AI-powered code generation',
      'Responsive HTML/CSS output',
      'Tailwind CSS support',
      'Clean, readable code',
      'Instant conversion'
    ],
    useCases: [
      'Implement design mockups',
      'Learn from existing designs',
      'Prototype quickly',
      'Convert wireframes to code',
      'Recreate layouts'
    ],
    faqs: [
      { question: 'Is image to code free?', answer: 'Yes, completely free to use.' },
      { question: 'What image formats are supported?', answer: 'PNG, JPG, and screenshots from any source.' },
      { question: 'How accurate is the code?', answer: 'AI captures layouts well; minor tweaks may be needed.' },
      { question: 'What frameworks are supported?', answer: 'Plain HTML/CSS and Tailwind CSS.' },
      { question: 'Can I edit the generated code?', answer: 'Yes, all code is fully editable and downloadable.' }
    ],
    relatedTools: ['code-explainer', 'text-summarizer', 'paraphraser']
  },
  {
    id: 'code-explainer',
    slug: 'code-explainer',
    category: 'ai',
    title: 'AI Code Explainer',
    metaTitle: 'AI Code Explainer – Free Online | TransformFiles',
    metaDescription: 'Understand code with AI explanations for free. Any programming language. Clear, detailed explanations.',
    h1: 'AI Code Explainer',
    keywords: ['code explainer', 'explain code', 'code explanation', 'understand code', 'ai code helper'],
    description: 'Understand any code with clear AI-powered explanations. Paste code in any programming language and receive line-by-line explanations of what it does. Perfect for learning, code reviews, or understanding unfamiliar codebases.',
    features: [
      'All programming languages',
      'Line-by-line explanations',
      'Concept clarification',
      'Best practice suggestions',
      'Learning resources'
    ],
    useCases: [
      'Learn new programming languages',
      'Understand inherited code',
      'Code review assistance',
      'Debug complex logic',
      'Teaching and tutoring'
    ],
    faqs: [
      { question: 'Is the code explainer free?', answer: 'Yes, 100% free with no limits.' },
      { question: 'What languages are supported?', answer: 'All major programming languages including Python, JavaScript, Java, C++, and more.' },
      { question: 'How detailed are the explanations?', answer: 'Very detailed with line-by-line breakdowns.' },
      { question: 'Can it explain complex algorithms?', answer: 'Yes, it breaks down complex logic into understandable parts.' },
      { question: 'Is my code stored or shared?', answer: 'No, code is processed and immediately deleted.' }
    ],
    relatedTools: ['image-to-code', 'text-summarizer', 'grammar-fixer']
  },
  {
    id: 'resume-maker',
    slug: 'resume-maker',
    category: 'ai',
    title: 'AI Resume Maker',
    metaTitle: 'AI Resume Maker – Free Online CV Builder | TransformFiles',
    metaDescription: 'Create professional resumes with AI for free. Multiple templates, ATS-friendly. No signup required.',
    h1: 'AI Resume Maker',
    keywords: ['resume maker', 'cv maker', 'ai resume builder', 'resume generator', 'cv builder free'],
    description: 'Create professional, ATS-friendly resumes using AI. Our resume maker helps you craft compelling content, choose from modern templates, and format your experience effectively. Perfect for job seekers at any career level.',
    features: [
      'ATS-optimized formats',
      'Multiple professional templates',
      'AI content suggestions',
      'Easy customization',
      'PDF download'
    ],
    useCases: [
      'Create job application resumes',
      'Update outdated CVs',
      'Change career direction',
      'Entry-level resumes',
      'Executive resumes'
    ],
    faqs: [
      { question: 'Is the resume maker free?', answer: 'Yes, create and download resumes for free.' },
      { question: 'Are the resumes ATS-friendly?', answer: 'Yes, all templates are optimized for applicant tracking systems.' },
      { question: 'Can I customize templates?', answer: 'Yes, fully customize colors, fonts, and layouts.' },
      { question: 'What format is the output?', answer: 'Download as PDF for best compatibility.' },
      { question: 'Will AI write my content?', answer: 'AI suggests improvements; you control all content.' }
    ],
    relatedTools: ['email-generator', 'grammar-fixer', 'text-summarizer', 'paraphraser']
  }
];

// All tools combined
export const allTools: ConversionTool[] = [
  ...videoConversions,
  ...imageConversions,
  ...pdfTools,
  ...audioConversions,
  ...aiTools
];

// Get related tools for a specific tool
export const getRelatedTools = (toolId: string): ConversionTool[] => {
  const tool = allTools.find(t => t.id === toolId);
  if (!tool) return [];
  
  return tool.relatedTools
    .map(id => allTools.find(t => t.id === id))
    .filter((t): t is ConversionTool => t !== undefined);
};

// Get tools by category
export const getToolsByCategory = (category: ConversionTool['category']): ConversionTool[] => {
  return allTools.filter(t => t.category === category);
};
