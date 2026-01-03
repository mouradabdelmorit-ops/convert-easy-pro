// Comprehensive Programmatic SEO data for all conversion tools
// Each tool has its own URL, keyword, and unique SEO-optimized content

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

// =====================
// VIDEO CONVERSIONS - 15+ Pages
// =====================
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
    keywords: ['mp4 to mp3', 'mp4 to mp3 converter', 'convert mp4 to mp3', 'extract audio from video', 'mp4 audio extractor', 'video to audio converter', 'mp4 to mp3 online free'],
    description: 'Extract high-quality audio from your MP4 video files with our free online MP4 to MP3 converter. Whether you want to save music from videos, create podcasts from recorded content, or simply enjoy audio without the video, our tool delivers crystal-clear MP3 files in seconds. No software installation required – just upload, convert, and download.',
    features: ['Preserve original audio quality during conversion', 'Support for files up to 500MB', 'Batch conversion for multiple files', 'Works on all devices and browsers', 'No registration or watermarks'],
    useCases: ['Extract music from music videos for offline listening', 'Convert recorded lectures to audio for studying', 'Create podcast episodes from video recordings', 'Save audio from social media videos', 'Reduce file size while keeping audio content'],
    faqs: [
      { question: 'Is the MP4 to MP3 converter free?', answer: 'Yes, our MP4 to MP3 converter is 100% free with no hidden costs or subscriptions. You can convert unlimited files without paying anything.' },
      { question: 'How long does MP4 to MP3 conversion take?', answer: 'Most conversions complete in under 30 seconds. Larger files may take 1-2 minutes depending on your internet speed.' },
      { question: 'Will my files be deleted after conversion?', answer: 'Yes, all uploaded files are automatically deleted from our servers within 2 hours for your privacy and security.' },
      { question: 'Can I convert large MP4 files to MP3?', answer: 'Yes, you can convert MP4 files up to 500MB. For larger files, consider using our desktop application.' },
      { question: 'Does the converter work on mobile phones?', answer: 'Absolutely! Our MP4 to MP3 converter works perfectly on iPhone, Android, tablets, and all mobile devices.' },
      { question: 'What audio quality will the MP3 have?', answer: 'We preserve the original audio quality. You can expect 128-320 kbps depending on the source video quality.' }
    ],
    relatedTools: ['mkv-to-mp4', 'mp4-to-wav', 'video-compressor', 'mov-to-mp3']
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
    keywords: ['mkv to mp4', 'mkv to mp4 converter', 'convert mkv to mp4', 'mkv converter', 'matroska to mp4', 'mkv to mp4 online free', 'mkv file converter'],
    description: 'Convert MKV files to universally compatible MP4 format without losing quality. MKV (Matroska) files often have playback issues on many devices and platforms. Our free online converter transforms your MKV videos to MP4, the most widely supported video format, ensuring smooth playback on smartphones, tablets, smart TVs, and all media players.',
    features: ['Lossless quality conversion', 'Preserve subtitles and audio tracks', 'Fast cloud-based processing', 'Support for 4K and HD videos', 'No watermarks added'],
    useCases: ['Play MKV movies on iPhone and iPad', 'Share videos on social media platforms', 'Upload videos to YouTube or Vimeo', 'Play videos on smart TVs', 'Edit MKV videos in software that only supports MP4'],
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
    keywords: ['mov to mp4', 'mov to mp4 converter', 'convert mov to mp4', 'quicktime to mp4', 'iphone video converter', 'mov to mp4 online free'],
    description: 'Convert Apple MOV files to MP4 format for universal compatibility. MOV is Apple QuickTime format that may not play on Windows, Android, or web browsers. Our free MOV to MP4 converter transforms your iPhone videos, QuickTime recordings, and other MOV files to the universally supported MP4 format.',
    features: ['Perfect for iPhone and iPad videos', 'Maintains original video quality', 'Fast conversion speed', 'Works on Windows, Mac, and Linux', 'No software installation needed'],
    useCases: ['Share iPhone videos with Android users', 'Upload iPhone recordings to YouTube', 'Edit MOV files in Windows video editors', 'Play QuickTime videos on any device', 'Reduce file size while maintaining quality'],
    faqs: [
      { question: 'Why should I convert MOV to MP4?', answer: 'MP4 is universally supported while MOV may not play on non-Apple devices. Converting ensures your videos work everywhere.' },
      { question: 'Will converting affect my video quality?', answer: 'No, our converter preserves the original quality of your MOV files.' },
      { question: 'Can I convert iPhone videos online?', answer: 'Yes, you can upload iPhone MOV videos directly from your device and convert them to MP4.' },
      { question: 'Is there a file size limit?', answer: 'You can convert MOV files up to 500MB for free.' },
      { question: 'How do I convert MOV to MP4 on iPhone?', answer: 'Simply visit our website on Safari, upload your MOV file, and download the converted MP4.' }
    ],
    relatedTools: ['mkv-to-mp4', 'avi-to-mp4', 'mp4-to-mp3', 'mov-to-mp3']
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
    keywords: ['avi to mp4', 'avi to mp4 converter', 'convert avi to mp4', 'avi converter', 'avi to mp4 online free'],
    description: 'Transform legacy AVI files to modern MP4 format. AVI is an older video format that produces large file sizes and may lack support on modern devices. Our converter efficiently transforms AVI to MP4, reducing file sizes while maintaining quality and ensuring compatibility with all modern devices and platforms.',
    features: ['Significantly reduce file sizes', 'Modern H.264/H.265 encoding', 'Preserve video quality', 'Fast processing', 'Free unlimited conversions'],
    useCases: ['Modernize old video collections', 'Share videos on social media', 'Save storage space', 'Play old videos on new devices', 'Upload to streaming platforms'],
    faqs: [
      { question: 'Is AVI to MP4 conversion free?', answer: 'Yes, completely free with no hidden costs or file limits.' },
      { question: 'How much smaller will my MP4 file be?', answer: 'MP4 files are typically 50-70% smaller than AVI files while maintaining similar quality.' },
      { question: 'Will I lose quality converting AVI to MP4?', answer: 'Our converter uses high-quality encoding to minimize any quality loss.' },
      { question: 'Can I convert multiple AVI files at once?', answer: 'Yes, batch conversion is supported for up to 10 files at a time.' },
      { question: 'What devices support MP4?', answer: 'MP4 is supported by virtually all devices including smartphones, tablets, computers, smart TVs, and gaming consoles.' }
    ],
    relatedTools: ['mkv-to-mp4', 'mov-to-mp4', 'wmv-to-mp4', 'video-compressor']
  },
  {
    id: 'wmv-to-mp4',
    slug: 'wmv-to-mp4',
    category: 'video',
    fromFormat: 'WMV',
    toFormat: 'MP4',
    title: 'WMV to MP4 Converter',
    metaTitle: 'WMV to MP4 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert WMV to MP4 online for free. Windows Media Video to universal MP4. Fast, secure, no signup required.',
    h1: 'WMV to MP4 Converter',
    keywords: ['wmv to mp4', 'wmv to mp4 converter', 'convert wmv to mp4', 'windows media to mp4', 'wmv converter online'],
    description: 'Convert Windows Media Video (WMV) files to universally compatible MP4 format. WMV files are primarily designed for Windows and may not play on Mac, iPhone, Android, or web browsers. Our free WMV to MP4 converter ensures your videos work on any device.',
    features: ['Convert Windows Media files instantly', 'Maintain video quality', 'Cross-platform compatibility', 'No software download required', 'Batch conversion available'],
    useCases: ['Play WMV files on Mac', 'Share Windows videos on iPhone', 'Upload WMV to social media', 'Edit WMV in non-Windows editors', 'Archive old Windows videos'],
    faqs: [
      { question: 'Is WMV to MP4 conversion free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Can Mac users convert WMV?', answer: 'Yes, our web-based converter works on any operating system including Mac.' },
      { question: 'Will quality be preserved?', answer: 'Yes, we use high-quality encoding to maintain video quality.' },
      { question: 'How fast is the conversion?', answer: 'Most files convert in under 2 minutes.' },
      { question: 'Are there file size limits?', answer: 'You can convert files up to 500MB for free.' }
    ],
    relatedTools: ['avi-to-mp4', 'mkv-to-mp4', 'mov-to-mp4', 'flv-to-mp4']
  },
  {
    id: 'flv-to-mp4',
    slug: 'flv-to-mp4',
    category: 'video',
    fromFormat: 'FLV',
    toFormat: 'MP4',
    title: 'FLV to MP4 Converter',
    metaTitle: 'FLV to MP4 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert FLV to MP4 online for free. Flash video to modern MP4 format. Fast, secure, no signup required.',
    h1: 'FLV to MP4 Converter',
    keywords: ['flv to mp4', 'flv to mp4 converter', 'convert flv to mp4', 'flash video converter', 'flv converter online'],
    description: 'Convert Flash Video (FLV) files to modern MP4 format. With Flash being discontinued, FLV files are no longer supported by most browsers and devices. Our converter transforms your old FLV videos to widely compatible MP4 format.',
    features: ['Convert legacy Flash videos', 'Modern MP4 output', 'Preserve video quality', 'Browser-based conversion', 'No plugins needed'],
    useCases: ['Archive old Flash videos', 'Play FLV on modern devices', 'Upload legacy content to YouTube', 'Preserve old web videos', 'Edit FLV in modern software'],
    faqs: [
      { question: 'Why convert FLV to MP4?', answer: 'Flash is discontinued and FLV files no longer play in modern browsers. MP4 is the universal standard.' },
      { question: 'Is FLV to MP4 free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Will I lose quality?', answer: 'We preserve the original quality of your FLV files.' },
      { question: 'Can I batch convert FLV files?', answer: 'Yes, convert multiple FLV files at once.' },
      { question: 'What happened to Flash?', answer: 'Adobe discontinued Flash in 2020. Converting to MP4 ensures your videos remain playable.' }
    ],
    relatedTools: ['wmv-to-mp4', 'avi-to-mp4', 'webm-to-mp4', 'video-compressor']
  },
  {
    id: 'webm-to-mp4',
    slug: 'webm-to-mp4',
    category: 'video',
    fromFormat: 'WebM',
    toFormat: 'MP4',
    title: 'WebM to MP4 Converter',
    metaTitle: 'WebM to MP4 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert WebM to MP4 online for free. Web video to universal MP4 format. Fast, secure, no signup required.',
    h1: 'WebM to MP4 Converter',
    keywords: ['webm to mp4', 'webm to mp4 converter', 'convert webm to mp4', 'webm converter', 'webm to mp4 online free'],
    description: 'Convert WebM video files to universally compatible MP4 format. While WebM is great for web browsers, it may not play on all devices and video editors. Our converter transforms WebM to MP4 for maximum compatibility.',
    features: ['Web-optimized to universal format', 'High-quality conversion', 'Fast processing', 'No quality loss', 'Works on all devices'],
    useCases: ['Play WebM on iPhone', 'Edit WebM in video editors', 'Share web recordings anywhere', 'Upload to platforms requiring MP4', 'Archive browser recordings'],
    faqs: [
      { question: 'What is WebM format?', answer: 'WebM is an open video format designed for the web, commonly used by YouTube and web browsers.' },
      { question: 'Is WebM to MP4 free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Why convert WebM to MP4?', answer: 'MP4 has broader device and software support than WebM.' },
      { question: 'Will quality be affected?', answer: 'No, our converter preserves original video quality.' },
      { question: 'How long does conversion take?', answer: 'Most files convert in under a minute.' }
    ],
    relatedTools: ['mp4-to-webm', 'mkv-to-mp4', 'flv-to-mp4', 'video-compressor']
  },
  {
    id: 'mp4-to-webm',
    slug: 'mp4-to-webm',
    category: 'video',
    fromFormat: 'MP4',
    toFormat: 'WebM',
    title: 'MP4 to WebM Converter',
    metaTitle: 'MP4 to WebM Converter – Free Online | TransformFiles',
    metaDescription: 'Convert MP4 to WebM online for free. Optimize videos for web. Fast, secure, no signup required.',
    h1: 'MP4 to WebM Converter',
    keywords: ['mp4 to webm', 'mp4 to webm converter', 'convert mp4 to webm', 'video to webm', 'mp4 webm online'],
    description: 'Convert MP4 videos to WebM format optimized for web browsers. WebM offers excellent compression for web streaming and is natively supported by all modern browsers including Chrome, Firefox, and Edge.',
    features: ['Web-optimized output', 'Excellent compression', 'Browser-native format', 'Fast conversion', 'No quality loss'],
    useCases: ['Optimize videos for websites', 'Reduce bandwidth usage', 'HTML5 video compatibility', 'Web streaming preparation', 'Lighter file sizes for web'],
    faqs: [
      { question: 'Why use WebM for web?', answer: 'WebM offers better compression for web delivery and is natively supported by browsers without plugins.' },
      { question: 'Is MP4 to WebM free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Which browsers support WebM?', answer: 'Chrome, Firefox, Edge, and Opera all support WebM natively.' },
      { question: 'Is WebM smaller than MP4?', answer: 'WebM typically offers 30-50% smaller file sizes at similar quality.' },
      { question: 'Can I use WebM on mobile?', answer: 'Most modern mobile browsers support WebM playback.' }
    ],
    relatedTools: ['webm-to-mp4', 'mp4-to-gif', 'video-compressor', 'mp4-to-mp3']
  },
  {
    id: 'mp4-to-gif',
    slug: 'mp4-to-gif',
    category: 'video',
    fromFormat: 'MP4',
    toFormat: 'GIF',
    title: 'MP4 to GIF Converter',
    metaTitle: 'MP4 to GIF Converter – Free Online | TransformFiles',
    metaDescription: 'Convert MP4 to GIF online for free. Create animated GIFs from videos. Fast, easy, no signup required.',
    h1: 'MP4 to GIF Converter',
    keywords: ['mp4 to gif', 'video to gif', 'convert mp4 to gif', 'gif maker', 'video to animated gif', 'mp4 to gif online free'],
    description: 'Create animated GIFs from your MP4 videos instantly. Perfect for creating memes, reactions, tutorials, and shareable content. Our converter lets you select the portion of video to convert and customize the output size.',
    features: ['Create GIFs from any video', 'Adjustable frame rate', 'Custom dimensions', 'Select video portion', 'Optimize file size'],
    useCases: ['Create memes and reactions', 'Make tutorial GIFs', 'Social media content', 'Email-friendly animations', 'Product demonstrations'],
    faqs: [
      { question: 'Is MP4 to GIF free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Can I choose which part to convert?', answer: 'Yes, select the start and end time of the video portion you want.' },
      { question: 'What size will the GIF be?', answer: 'You can customize the dimensions. Smaller sizes produce smaller file sizes.' },
      { question: 'Why are GIFs so popular?', answer: 'GIFs work everywhere without video players and loop automatically.' },
      { question: 'Can I adjust the speed?', answer: 'Yes, you can slow down or speed up the GIF.' }
    ],
    relatedTools: ['gif-to-mp4', 'mp4-to-mp3', 'video-compressor', 'webm-to-mp4']
  },
  {
    id: 'gif-to-mp4',
    slug: 'gif-to-mp4',
    category: 'video',
    fromFormat: 'GIF',
    toFormat: 'MP4',
    title: 'GIF to MP4 Converter',
    metaTitle: 'GIF to MP4 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert GIF to MP4 online for free. Reduce file size dramatically. Fast, secure, no signup required.',
    h1: 'GIF to MP4 Converter',
    keywords: ['gif to mp4', 'gif to video', 'convert gif to mp4', 'animated gif to video', 'gif to mp4 online'],
    description: 'Convert animated GIFs to MP4 video format for dramatically smaller file sizes. MP4 videos are typically 80-90% smaller than equivalent GIFs while maintaining the same visual quality.',
    features: ['Massive file size reduction', 'Preserve animation quality', 'Fast conversion', 'Universal compatibility', 'No quality loss'],
    useCases: ['Reduce GIF file sizes', 'Upload to video platforms', 'Save bandwidth', 'Mobile optimization', 'Better streaming quality'],
    faqs: [
      { question: 'Why convert GIF to MP4?', answer: 'MP4 files are typically 10x smaller than GIFs with better quality.' },
      { question: 'Is GIF to MP4 free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Will the animation be preserved?', answer: 'Yes, the animation is perfectly preserved as video.' },
      { question: 'Can I still share the result?', answer: 'Yes, MP4 is supported everywhere and plays automatically on most platforms.' },
      { question: 'How much smaller will it be?', answer: 'Typically 80-90% smaller than the original GIF.' }
    ],
    relatedTools: ['mp4-to-gif', 'video-compressor', 'webm-to-mp4', 'mp4-to-webm']
  },
  {
    id: 'mov-to-mp3',
    slug: 'mov-to-mp3',
    category: 'video',
    fromFormat: 'MOV',
    toFormat: 'MP3',
    title: 'MOV to MP3 Converter',
    metaTitle: 'MOV to MP3 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert MOV to MP3 online for free. Extract audio from QuickTime videos. Fast, secure, no signup required.',
    h1: 'MOV to MP3 Converter',
    keywords: ['mov to mp3', 'mov to mp3 converter', 'convert mov to mp3', 'extract audio from mov', 'quicktime to mp3'],
    description: 'Extract audio from MOV video files and convert to MP3 format. Perfect for saving audio from iPhone recordings, QuickTime videos, and other MOV files.',
    features: ['Extract audio from MOV', 'High-quality MP3 output', 'Preserve audio quality', 'Fast processing', 'No software needed'],
    useCases: ['Extract audio from iPhone videos', 'Create audio from video interviews', 'Save music from video recordings', 'Convert voice memos', 'Create podcasts from video'],
    faqs: [
      { question: 'Is MOV to MP3 free?', answer: 'Yes, completely free with unlimited conversions.' },
      { question: 'What audio quality will I get?', answer: 'We extract audio at the highest quality available in the source video.' },
      { question: 'Can I convert iPhone videos?', answer: 'Yes, iPhone videos in MOV format work perfectly.' },
      { question: 'How long does it take?', answer: 'Most conversions complete in under 30 seconds.' },
      { question: 'Will my video be deleted?', answer: 'Yes, all files are deleted within 2 hours.' }
    ],
    relatedTools: ['mp4-to-mp3', 'mov-to-mp4', 'mkv-to-mp3', 'avi-to-mp3']
  },
  {
    id: 'video-compressor',
    slug: 'video-compressor',
    category: 'video',
    title: 'Video Compressor',
    metaTitle: 'Video Compressor – Free Online | TransformFiles',
    metaDescription: 'Compress video files online for free. Reduce file size up to 90% without quality loss. Fast, secure, no signup.',
    h1: 'Video Compressor',
    keywords: ['video compressor', 'compress video online', 'reduce video size', 'video file compressor', 'shrink video', 'compress video free'],
    description: 'Compress video files to reduce size while maintaining quality. Whether you need to share videos via email, upload to social media faster, or save storage space, our intelligent video compressor analyzes your video and applies optimal compression settings.',
    features: ['Reduce file sizes up to 90%', 'Intelligent quality preservation', 'Support for all video formats', 'Adjustable compression levels', 'Fast cloud processing'],
    useCases: ['Share videos via email', 'Upload to social media faster', 'Save storage space', 'Reduce bandwidth for streaming', 'Optimize videos for websites'],
    faqs: [
      { question: 'How much can I compress my video?', answer: 'Depending on the source video, you can reduce file sizes by 50-90% while maintaining good quality.' },
      { question: 'Will compression affect video quality?', answer: 'Our smart compression balances file size and quality. You can choose different compression levels.' },
      { question: 'What video formats are supported?', answer: 'We support MP4, AVI, MKV, MOV, WMV, FLV, WebM, and 50+ more formats.' },
      { question: 'Is there a file size limit?', answer: 'Free users can compress videos up to 500MB.' },
      { question: 'How long does compression take?', answer: 'Most videos are compressed in under 2 minutes.' }
    ],
    relatedTools: ['mp4-to-mp3', 'mkv-to-mp4', 'image-compressor', 'audio-compressor']
  },
  {
    id: 'mp4-to-avi',
    slug: 'mp4-to-avi',
    category: 'video',
    fromFormat: 'MP4',
    toFormat: 'AVI',
    title: 'MP4 to AVI Converter',
    metaTitle: 'MP4 to AVI Converter – Free Online | TransformFiles',
    metaDescription: 'Convert MP4 to AVI online for free. High quality conversion. Fast, secure, no signup required.',
    h1: 'MP4 to AVI Converter',
    keywords: ['mp4 to avi', 'mp4 to avi converter', 'convert mp4 to avi', 'mp4 avi online'],
    description: 'Convert MP4 videos to AVI format for compatibility with older software and devices that require AVI format. Our converter maintains video quality during the conversion process.',
    features: ['High-quality AVI output', 'Preserve video quality', 'Fast conversion', 'No watermarks', 'Works on all devices'],
    useCases: ['Use with legacy software', 'DVD authoring', 'Older device compatibility', 'Video editing in older apps', 'Specific format requirements'],
    faqs: [
      { question: 'Is MP4 to AVI free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Why convert to AVI?', answer: 'Some older software and devices only support AVI format.' },
      { question: 'Will file size increase?', answer: 'AVI files are typically larger than MP4 due to less efficient compression.' },
      { question: 'Is quality preserved?', answer: 'Yes, we maintain the original video quality.' },
      { question: 'How long does it take?', answer: 'Most files convert in under 2 minutes.' }
    ],
    relatedTools: ['avi-to-mp4', 'mp4-to-mov', 'mp4-to-mkv', 'video-compressor']
  },
  {
    id: 'mp4-to-mov',
    slug: 'mp4-to-mov',
    category: 'video',
    fromFormat: 'MP4',
    toFormat: 'MOV',
    title: 'MP4 to MOV Converter',
    metaTitle: 'MP4 to MOV Converter – Free Online | TransformFiles',
    metaDescription: 'Convert MP4 to MOV online for free. Apple QuickTime format. Fast, secure, no signup required.',
    h1: 'MP4 to MOV Converter',
    keywords: ['mp4 to mov', 'mp4 to mov converter', 'convert mp4 to mov', 'mp4 to quicktime'],
    description: 'Convert MP4 videos to Apple QuickTime MOV format. Perfect for Mac users, Final Cut Pro, and other Apple software that works best with MOV format.',
    features: ['Apple-optimized output', 'Professional quality', 'Fast conversion', 'Final Cut Pro compatible', 'No quality loss'],
    useCases: ['Edit in Final Cut Pro', 'Mac video workflow', 'Apple ecosystem compatibility', 'Professional video editing', 'QuickTime playback'],
    faqs: [
      { question: 'Is MP4 to MOV free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Why convert to MOV?', answer: 'MOV works better with Apple software like Final Cut Pro and QuickTime.' },
      { question: 'Is it compatible with Final Cut?', answer: 'Yes, our MOV output is fully compatible with Final Cut Pro.' },
      { question: 'Will quality be preserved?', answer: 'Yes, we use lossless conversion methods.' },
      { question: 'Can Windows users convert?', answer: 'Yes, our converter works on any operating system.' }
    ],
    relatedTools: ['mov-to-mp4', 'mp4-to-avi', 'mp4-to-mkv', 'video-compressor']
  },
  {
    id: '3gp-to-mp4',
    slug: '3gp-to-mp4',
    category: 'video',
    fromFormat: '3GP',
    toFormat: 'MP4',
    title: '3GP to MP4 Converter',
    metaTitle: '3GP to MP4 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert 3GP to MP4 online for free. Old phone videos to modern format. Fast, secure, no signup required.',
    h1: '3GP to MP4 Converter',
    keywords: ['3gp to mp4', '3gp to mp4 converter', 'convert 3gp to mp4', '3gp converter', 'old phone video converter'],
    description: 'Convert 3GP videos from old mobile phones to modern MP4 format. 3GP was used by older mobile devices but is rarely supported today. Our converter preserves your memories in a universally compatible format.',
    features: ['Convert legacy phone videos', 'Modern MP4 output', 'Preserve original quality', 'Fast processing', 'Archive old memories'],
    useCases: ['Preserve old phone videos', 'Share legacy recordings', 'Archive family memories', 'Play old videos on new devices', 'Upload to modern platforms'],
    faqs: [
      { question: 'What is 3GP format?', answer: '3GP was a video format used by older mobile phones for recording video.' },
      { question: 'Is 3GP to MP4 free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Will quality be preserved?', answer: 'Yes, we preserve the original quality of your 3GP files.' },
      { question: 'Can I convert old phone videos?', answer: 'Yes, any 3GP video can be converted to MP4.' },
      { question: 'How do I transfer 3GP files?', answer: 'Connect your old phone via USB or email the files to yourself.' }
    ],
    relatedTools: ['avi-to-mp4', 'wmv-to-mp4', 'flv-to-mp4', 'video-compressor']
  }
];

// =====================
// IMAGE CONVERSIONS - 20+ Pages
// =====================
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
    keywords: ['jpg to png', 'jpeg to png', 'convert jpg to png', 'jpg png converter', 'jpg to png online free'],
    description: 'Convert JPG images to PNG format for lossless quality and transparency support. PNG format is ideal when you need crisp graphics, transparent backgrounds, or images without compression artifacts.',
    features: ['Lossless conversion quality', 'Optional transparency support', 'Batch conversion available', 'Preserve image metadata', 'No quality degradation'],
    useCases: ['Create transparent background images', 'Prepare graphics for web design', 'Convert photos for print quality', 'Remove JPEG compression artifacts', 'Create high-quality screenshots'],
    faqs: [
      { question: 'Is JPG to PNG conversion free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Will converting to PNG increase file size?', answer: 'PNG files are typically larger than JPG because PNG uses lossless compression.' },
      { question: 'Can I add transparency when converting?', answer: 'PNG supports transparency, but the original opaque areas of JPG will remain opaque.' },
      { question: 'How many images can I convert at once?', answer: 'You can batch convert up to 20 images at a time.' },
      { question: 'Does the conversion preserve image quality?', answer: 'Yes, converting to PNG does not lose any quality from the source JPG.' }
    ],
    relatedTools: ['png-to-jpg', 'heic-to-jpg', 'jpg-to-webp', 'image-compressor']
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
    keywords: ['png to jpg', 'png to jpeg', 'convert png to jpg', 'png jpg converter', 'png to jpg online free'],
    description: 'Convert PNG images to JPG format for smaller file sizes and better compatibility. JPG is the ideal format for photographs and images where transparency is not needed.',
    features: ['Significant file size reduction', 'Adjustable quality settings', 'Batch conversion support', 'Choose background color for transparent areas', 'Fast processing'],
    useCases: ['Reduce image sizes for websites', 'Share photos via email or messaging', 'Optimize images for social media', 'Save storage space', 'Prepare images for print'],
    faqs: [
      { question: 'Is PNG to JPG conversion free?', answer: 'Yes, completely free with no limits.' },
      { question: 'What happens to transparency when converting?', answer: 'Transparent areas are replaced with a white background (or color of your choice).' },
      { question: 'How much smaller will the JPG be?', answer: 'JPG files are typically 50-80% smaller than PNG files.' },
      { question: 'Can I control the output quality?', answer: 'Yes, you can choose quality levels from 60% to 100%.' },
      { question: 'Will I lose image quality?', answer: 'JPG uses lossy compression, but at high quality settings the difference is barely noticeable.' }
    ],
    relatedTools: ['jpg-to-png', 'heic-to-jpg', 'png-to-webp', 'image-compressor']
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
    keywords: ['heic to jpg', 'heic to jpeg', 'convert heic to jpg', 'iphone photo converter', 'heic converter', 'heic to jpg online free'],
    description: 'Convert iPhone HEIC photos to universally compatible JPG format. HEIC (High Efficiency Image Format) is used by iPhone and iPad but is not supported by all devices and applications.',
    features: ['Perfect for iPhone photos', 'Preserve image quality and metadata', 'Batch convert multiple photos', 'Maintain EXIF data and orientation', 'Works on Windows, Mac, Android'],
    useCases: ['Share iPhone photos with non-Apple users', 'Upload photos to websites', 'Open iPhone photos on Windows PC', 'Print iPhone photos at photo labs', 'Edit photos in software that does not support HEIC'],
    faqs: [
      { question: 'What is HEIC format?', answer: 'HEIC is Apple\'s image format that offers better compression than JPG while maintaining quality.' },
      { question: 'Is HEIC to JPG conversion free?', answer: 'Yes, completely free with unlimited conversions.' },
      { question: 'Why can\'t I open HEIC files on Windows?', answer: 'Windows doesn\'t natively support HEIC. Converting to JPG solves this issue.' },
      { question: 'Will I lose quality converting HEIC to JPG?', answer: 'Our converter uses high-quality settings to minimize any quality loss.' },
      { question: 'Can I convert multiple HEIC files at once?', answer: 'Yes, batch conversion is supported for up to 50 files.' }
    ],
    relatedTools: ['heic-to-png', 'jpg-to-png', 'image-compressor', 'background-remover']
  },
  {
    id: 'heic-to-png',
    slug: 'heic-to-png',
    category: 'image',
    fromFormat: 'HEIC',
    toFormat: 'PNG',
    title: 'HEIC to PNG Converter',
    metaTitle: 'HEIC to PNG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert HEIC to PNG online for free. Lossless iPhone photo conversion. Fast, secure, no signup required.',
    h1: 'HEIC to PNG Converter',
    keywords: ['heic to png', 'convert heic to png', 'iphone to png', 'heic png converter'],
    description: 'Convert iPhone HEIC photos to lossless PNG format. Perfect when you need the highest quality image or plan to edit the photo without further quality loss.',
    features: ['Lossless quality', 'Preserve transparency if present', 'High-quality output', 'Batch conversion', 'Works everywhere'],
    useCases: ['High-quality photo editing', 'Professional graphics work', 'Lossless archiving', 'Print preparation', 'Design projects'],
    faqs: [
      { question: 'Is HEIC to PNG free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Why choose PNG over JPG?', answer: 'PNG is lossless, meaning no quality is lost during conversion.' },
      { question: 'Will files be larger?', answer: 'Yes, PNG files are larger than JPG but preserve more quality.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple HEIC files at once.' },
      { question: 'Does it work on Windows?', answer: 'Yes, our web-based converter works on any operating system.' }
    ],
    relatedTools: ['heic-to-jpg', 'png-to-jpg', 'image-compressor', 'jpg-to-png']
  },
  {
    id: 'webp-to-jpg',
    slug: 'webp-to-jpg',
    category: 'image',
    fromFormat: 'WebP',
    toFormat: 'JPG',
    title: 'WebP to JPG Converter',
    metaTitle: 'WebP to JPG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert WebP to JPG online for free. Universal image format conversion. Fast, secure, no signup required.',
    h1: 'WebP to JPG Converter',
    keywords: ['webp to jpg', 'webp to jpeg', 'convert webp to jpg', 'webp converter', 'webp to jpg online free'],
    description: 'Convert WebP images to universally compatible JPG format. While WebP is great for web use, JPG is more widely supported by image editors, viewers, and older applications.',
    features: ['Universal compatibility', 'Adjustable quality', 'Fast conversion', 'Batch processing', 'No software needed'],
    useCases: ['Edit WebP in Photoshop', 'Share on platforms not supporting WebP', 'Print WebP images', 'Use in older software', 'Email attachments'],
    faqs: [
      { question: 'What is WebP format?', answer: 'WebP is a modern image format developed by Google that offers excellent compression for web use.' },
      { question: 'Is WebP to JPG free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Why convert WebP to JPG?', answer: 'Some applications and older software don\'t support WebP format.' },
      { question: 'Will quality be preserved?', answer: 'We use high-quality settings to minimize any quality loss.' },
      { question: 'Can I convert animated WebP?', answer: 'Animated WebP will be converted to a static JPG image.' }
    ],
    relatedTools: ['webp-to-png', 'jpg-to-webp', 'png-to-webp', 'image-compressor']
  },
  {
    id: 'webp-to-png',
    slug: 'webp-to-png',
    category: 'image',
    fromFormat: 'WebP',
    toFormat: 'PNG',
    title: 'WebP to PNG Converter',
    metaTitle: 'WebP to PNG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert WebP to PNG online for free. Lossless conversion with transparency. Fast, secure, no signup required.',
    h1: 'WebP to PNG Converter',
    keywords: ['webp to png', 'convert webp to png', 'webp png converter', 'webp to png online'],
    description: 'Convert WebP images to PNG format with lossless quality. PNG preserves transparency from WebP files and provides a universally compatible format for editing and sharing.',
    features: ['Lossless conversion', 'Preserve transparency', 'High-quality output', 'Batch conversion', 'Universal compatibility'],
    useCases: ['Edit in image editors', 'Preserve transparency', 'High-quality archiving', 'Print preparation', 'Design work'],
    faqs: [
      { question: 'Is WebP to PNG free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Will transparency be preserved?', answer: 'Yes, PNG supports transparency and it will be preserved.' },
      { question: 'Why choose PNG over JPG?', answer: 'PNG is lossless and supports transparency.' },
      { question: 'Are files larger than WebP?', answer: 'Yes, PNG files are typically larger than WebP.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple WebP files at once.' }
    ],
    relatedTools: ['webp-to-jpg', 'png-to-webp', 'jpg-to-png', 'image-compressor']
  },
  {
    id: 'jpg-to-webp',
    slug: 'jpg-to-webp',
    category: 'image',
    fromFormat: 'JPG',
    toFormat: 'WebP',
    title: 'JPG to WebP Converter',
    metaTitle: 'JPG to WebP Converter – Free Online | TransformFiles',
    metaDescription: 'Convert JPG to WebP online for free. Smaller file sizes for web. Fast, secure, no signup required.',
    h1: 'JPG to WebP Converter',
    keywords: ['jpg to webp', 'jpeg to webp', 'convert jpg to webp', 'jpg webp converter', 'jpg to webp online'],
    description: 'Convert JPG images to WebP format for smaller file sizes optimized for web use. WebP typically offers 25-35% smaller file sizes than JPG at equivalent quality.',
    features: ['Smaller file sizes', 'Web-optimized format', 'Fast conversion', 'Batch processing', 'Maintain quality'],
    useCases: ['Optimize website images', 'Reduce page load times', 'Save bandwidth', 'Improve Core Web Vitals', 'Modern web development'],
    faqs: [
      { question: 'Is JPG to WebP free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'How much smaller will WebP be?', answer: 'WebP is typically 25-35% smaller than JPG at similar quality.' },
      { question: 'Do all browsers support WebP?', answer: 'Yes, all modern browsers now support WebP.' },
      { question: 'Is WebP better than JPG?', answer: 'For web use, WebP offers better compression and smaller file sizes.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple JPG files at once.' }
    ],
    relatedTools: ['png-to-webp', 'webp-to-jpg', 'jpg-to-png', 'image-compressor']
  },
  {
    id: 'png-to-webp',
    slug: 'png-to-webp',
    category: 'image',
    fromFormat: 'PNG',
    toFormat: 'WebP',
    title: 'PNG to WebP Converter',
    metaTitle: 'PNG to WebP Converter – Free Online | TransformFiles',
    metaDescription: 'Convert PNG to WebP online for free. Smaller files with transparency. Fast, secure, no signup required.',
    h1: 'PNG to WebP Converter',
    keywords: ['png to webp', 'convert png to webp', 'png webp converter', 'png to webp online'],
    description: 'Convert PNG images to WebP format for dramatically smaller file sizes while preserving transparency. WebP supports both lossy and lossless compression with alpha channel support.',
    features: ['Preserve transparency', 'Much smaller file sizes', 'Lossy or lossless options', 'Web-optimized', 'Batch conversion'],
    useCases: ['Website optimization', 'Transparent web graphics', 'Reduce bandwidth', 'Faster page loads', 'Modern web development'],
    faqs: [
      { question: 'Is PNG to WebP free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Will transparency be preserved?', answer: 'Yes, WebP fully supports transparency.' },
      { question: 'How much smaller will WebP be?', answer: 'WebP can be 50-80% smaller than PNG while maintaining quality.' },
      { question: 'Is WebP lossless?', answer: 'WebP supports both lossy and lossless compression.' },
      { question: 'Should I use WebP for my website?', answer: 'Yes, WebP is ideal for modern websites due to smaller file sizes.' }
    ],
    relatedTools: ['jpg-to-webp', 'webp-to-png', 'png-to-jpg', 'image-compressor']
  },
  {
    id: 'svg-to-png',
    slug: 'svg-to-png',
    category: 'image',
    fromFormat: 'SVG',
    toFormat: 'PNG',
    title: 'SVG to PNG Converter',
    metaTitle: 'SVG to PNG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert SVG to PNG online for free. Vector to raster conversion. Fast, secure, no signup required.',
    h1: 'SVG to PNG Converter',
    keywords: ['svg to png', 'convert svg to png', 'vector to png', 'svg png converter', 'svg to png online'],
    description: 'Convert SVG vector graphics to PNG raster images. Choose your desired resolution and get a high-quality PNG output suitable for any use case.',
    features: ['Custom output resolution', 'Maintain aspect ratio', 'Transparent background', 'High-quality rendering', 'Batch conversion'],
    useCases: ['Use vectors in raster editors', 'Social media uploads', 'Email attachments', 'Print preparation', 'Fixed-size graphics'],
    faqs: [
      { question: 'Is SVG to PNG free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Can I choose the output size?', answer: 'Yes, specify the width and height in pixels.' },
      { question: 'Will transparency be preserved?', answer: 'Yes, PNG supports transparency from SVG.' },
      { question: 'What resolution should I use?', answer: 'It depends on your use case. 1x for web, 2x for retina, higher for print.' },
      { question: 'Why convert SVG to PNG?', answer: 'Some applications and platforms don\'t support SVG format.' }
    ],
    relatedTools: ['png-to-svg', 'svg-to-jpg', 'png-to-jpg', 'image-compressor']
  },
  {
    id: 'bmp-to-jpg',
    slug: 'bmp-to-jpg',
    category: 'image',
    fromFormat: 'BMP',
    toFormat: 'JPG',
    title: 'BMP to JPG Converter',
    metaTitle: 'BMP to JPG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert BMP to JPG online for free. Reduce file size dramatically. Fast, secure, no signup required.',
    h1: 'BMP to JPG Converter',
    keywords: ['bmp to jpg', 'bmp to jpeg', 'convert bmp to jpg', 'bitmap to jpg', 'bmp converter'],
    description: 'Convert BMP bitmap images to compressed JPG format. BMP files are uncompressed and very large. Our converter transforms them to efficiently compressed JPG files.',
    features: ['Massive size reduction', 'Adjustable quality', 'Fast conversion', 'Batch processing', 'No software needed'],
    useCases: ['Reduce file sizes', 'Share images easily', 'Web optimization', 'Email attachments', 'Save storage space'],
    faqs: [
      { question: 'Is BMP to JPG free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'How much smaller will the JPG be?', answer: 'JPG files are typically 90-95% smaller than BMP files.' },
      { question: 'Will I lose quality?', answer: 'Some quality loss occurs with JPG compression, but it\'s usually imperceptible at high quality settings.' },
      { question: 'What is BMP format?', answer: 'BMP is an uncompressed bitmap image format that results in very large files.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple BMP files at once.' }
    ],
    relatedTools: ['bmp-to-png', 'jpg-to-png', 'png-to-jpg', 'image-compressor']
  },
  {
    id: 'bmp-to-png',
    slug: 'bmp-to-png',
    category: 'image',
    fromFormat: 'BMP',
    toFormat: 'PNG',
    title: 'BMP to PNG Converter',
    metaTitle: 'BMP to PNG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert BMP to PNG online for free. Lossless compression. Fast, secure, no signup required.',
    h1: 'BMP to PNG Converter',
    keywords: ['bmp to png', 'convert bmp to png', 'bitmap to png', 'bmp png converter'],
    description: 'Convert BMP bitmap images to PNG format with lossless compression. Reduce file size while maintaining perfect image quality.',
    features: ['Lossless compression', 'Smaller file sizes', 'Perfect quality', 'Batch conversion', 'Fast processing'],
    useCases: ['Reduce BMP file sizes', 'Archive images', 'Web optimization', 'Share more easily', 'Cross-platform compatibility'],
    faqs: [
      { question: 'Is BMP to PNG free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Is conversion lossless?', answer: 'Yes, PNG uses lossless compression so no quality is lost.' },
      { question: 'How much smaller will files be?', answer: 'PNG files are typically 50-70% smaller than BMP.' },
      { question: 'Why use PNG instead of JPG?', answer: 'PNG is lossless and supports transparency.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple files at once.' }
    ],
    relatedTools: ['bmp-to-jpg', 'png-to-jpg', 'jpg-to-png', 'image-compressor']
  },
  {
    id: 'tiff-to-jpg',
    slug: 'tiff-to-jpg',
    category: 'image',
    fromFormat: 'TIFF',
    toFormat: 'JPG',
    title: 'TIFF to JPG Converter',
    metaTitle: 'TIFF to JPG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert TIFF to JPG online for free. Reduce file size for sharing. Fast, secure, no signup required.',
    h1: 'TIFF to JPG Converter',
    keywords: ['tiff to jpg', 'tiff to jpeg', 'convert tiff to jpg', 'tif to jpg', 'tiff converter'],
    description: 'Convert TIFF images to JPG format for smaller file sizes and universal compatibility. TIFF files are often used in professional photography but are too large for web use.',
    features: ['Significant size reduction', 'Adjustable quality', 'Multi-page TIFF support', 'Batch conversion', 'Fast processing'],
    useCases: ['Share professional photos', 'Web optimization', 'Email attachments', 'Social media uploads', 'Reduce storage'],
    faqs: [
      { question: 'Is TIFF to JPG free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'What about multi-page TIFF?', answer: 'Each page is converted to a separate JPG file.' },
      { question: 'Will I lose quality?', answer: 'TIFF is often very high quality, so some data is lost, but JPG quality is still excellent.' },
      { question: 'How much smaller will it be?', answer: 'JPG files are typically 80-95% smaller than TIFF.' },
      { question: 'Is TIFF the same as TIF?', answer: 'Yes, they are the same format with different file extensions.' }
    ],
    relatedTools: ['tiff-to-png', 'jpg-to-tiff', 'png-to-jpg', 'image-compressor']
  },
  {
    id: 'gif-to-jpg',
    slug: 'gif-to-jpg',
    category: 'image',
    fromFormat: 'GIF',
    toFormat: 'JPG',
    title: 'GIF to JPG Converter',
    metaTitle: 'GIF to JPG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert GIF to JPG online for free. Extract first frame from animated GIFs. Fast, secure, no signup required.',
    h1: 'GIF to JPG Converter',
    keywords: ['gif to jpg', 'gif to jpeg', 'convert gif to jpg', 'gif converter', 'animated gif to jpg'],
    description: 'Convert GIF images to JPG format. For animated GIFs, extract the first frame or a frame of your choice as a static JPG image.',
    features: ['Extract frames from animated GIFs', 'Choose specific frame', 'Adjustable quality', 'Batch conversion', 'Fast processing'],
    useCases: ['Create thumbnails from GIFs', 'Static preview images', 'Reduce file size', 'Universal compatibility', 'Print preparation'],
    faqs: [
      { question: 'Is GIF to JPG free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'What happens to animated GIFs?', answer: 'By default, the first frame is extracted. You can choose a different frame.' },
      { question: 'Will quality be preserved?', answer: 'JPG quality is typically better than GIF due to more colors.' },
      { question: 'Can I convert static GIFs?', answer: 'Yes, static GIFs are converted directly to JPG.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple GIFs at once.' }
    ],
    relatedTools: ['gif-to-png', 'jpg-to-gif', 'png-to-gif', 'image-compressor']
  },
  {
    id: 'gif-to-png',
    slug: 'gif-to-png',
    category: 'image',
    fromFormat: 'GIF',
    toFormat: 'PNG',
    title: 'GIF to PNG Converter',
    metaTitle: 'GIF to PNG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert GIF to PNG online for free. Lossless quality with transparency. Fast, secure, no signup required.',
    h1: 'GIF to PNG Converter',
    keywords: ['gif to png', 'convert gif to png', 'gif png converter', 'animated gif to png'],
    description: 'Convert GIF images to PNG format with lossless quality. PNG supports more colors than GIF and provides better quality for static images.',
    features: ['Lossless quality', 'Preserve transparency', 'More colors than GIF', 'Batch conversion', 'Fast processing'],
    useCases: ['Higher quality output', 'Better color support', 'Static images from GIFs', 'Design work', 'Print preparation'],
    faqs: [
      { question: 'Is GIF to PNG free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Why convert GIF to PNG?', answer: 'PNG supports millions of colors while GIF is limited to 256.' },
      { question: 'What about animated GIFs?', answer: 'Each frame can be extracted as a separate PNG, or just the first frame.' },
      { question: 'Is transparency preserved?', answer: 'Yes, both GIF and PNG support transparency.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple GIFs at once.' }
    ],
    relatedTools: ['gif-to-jpg', 'png-to-gif', 'jpg-to-gif', 'image-compressor']
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    category: 'image',
    title: 'Image Compressor',
    metaTitle: 'Image Compressor – Free Online | TransformFiles',
    metaDescription: 'Compress images online for free. Reduce file size up to 90% without quality loss. JPG, PNG, WebP supported.',
    h1: 'Image Compressor',
    keywords: ['image compressor', 'compress image online', 'reduce image size', 'photo compressor', 'optimize images', 'compress image free'],
    description: 'Compress images to reduce file size while maintaining visual quality. Our smart compression algorithm analyzes each image and applies optimal settings.',
    features: ['Reduce sizes up to 90%', 'Support for JPG, PNG, WebP, GIF', 'Batch compression', 'Adjustable quality levels', 'Preserve or strip metadata'],
    useCases: ['Optimize images for websites', 'Reduce email attachment sizes', 'Save storage space', 'Speed up page load times', 'Prepare images for social media'],
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
    keywords: ['background remover', 'remove background', 'transparent background', 'ai background remover', 'remove image background', 'background remover free'],
    description: 'Remove backgrounds from images instantly using advanced AI technology. Our AI-powered background remover automatically detects subjects and creates perfect transparent backgrounds in seconds.',
    features: ['AI-powered automatic detection', 'Instant transparent PNG output', 'Works with complex backgrounds', 'Hair and edge refinement', 'Free unlimited use'],
    useCases: ['Create product photos for e-commerce', 'Make professional profile pictures', 'Design marketing materials', 'Create social media graphics', 'Prepare images for presentations'],
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
    keywords: ['image enhancer', 'enhance image quality', 'ai image enhancer', 'upscale image', 'improve photo quality', 'ai image upscaler'],
    description: 'Enhance image quality using AI-powered upscaling and improvement technology. Transform low-resolution images into crisp, high-quality photos.',
    features: ['AI-powered quality enhancement', 'Upscale images up to 4x', 'Noise reduction', 'Detail enhancement', 'Color correction'],
    useCases: ['Upscale old photos', 'Improve product images', 'Enhance screenshots', 'Restore blurry images', 'Prepare images for printing'],
    faqs: [
      { question: 'How does AI image enhancement work?', answer: 'Our AI has been trained on millions of images to intelligently add details and improve quality.' },
      { question: 'Can I upscale images for printing?', answer: 'Yes, you can upscale images up to 4x for high-quality prints.' },
      { question: 'Will enhancement work on very blurry images?', answer: 'AI can improve moderately blurry images, but very blurry images may have limited improvement.' },
      { question: 'Is the image enhancer free?', answer: 'Yes, free with no limitations.' },
      { question: 'What file formats are supported?', answer: 'JPG, PNG, WebP, BMP, and TIFF.' }
    ],
    relatedTools: ['background-remover', 'image-compressor', 'jpg-to-png', 'heic-to-jpg']
  },
  {
    id: 'ico-to-png',
    slug: 'ico-to-png',
    category: 'image',
    fromFormat: 'ICO',
    toFormat: 'PNG',
    title: 'ICO to PNG Converter',
    metaTitle: 'ICO to PNG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert ICO to PNG online for free. Icon to image conversion. Fast, secure, no signup required.',
    h1: 'ICO to PNG Converter',
    keywords: ['ico to png', 'convert ico to png', 'icon to png', 'ico converter', 'favicon to png'],
    description: 'Convert ICO icon files to PNG image format. Extract icons from ICO files at various resolutions for use in design projects or documentation.',
    features: ['Extract all icon sizes', 'Choose specific resolution', 'Preserve transparency', 'Batch conversion', 'Fast processing'],
    useCases: ['Use icons in designs', 'Documentation', 'Create image from favicon', 'Design assets', 'Icon library management'],
    faqs: [
      { question: 'Is ICO to PNG free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Can I choose the icon size?', answer: 'Yes, ICO files often contain multiple sizes and you can choose which to extract.' },
      { question: 'Will transparency be preserved?', answer: 'Yes, PNG supports transparency.' },
      { question: 'What is ICO format?', answer: 'ICO is an image format used for icons in Windows and favicons on websites.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple ICO files at once.' }
    ],
    relatedTools: ['png-to-ico', 'jpg-to-png', 'svg-to-png', 'image-compressor']
  },
  {
    id: 'png-to-ico',
    slug: 'png-to-ico',
    category: 'image',
    fromFormat: 'PNG',
    toFormat: 'ICO',
    title: 'PNG to ICO Converter',
    metaTitle: 'PNG to ICO Converter – Free Online Favicon Maker | TransformFiles',
    metaDescription: 'Convert PNG to ICO online for free. Create favicons and icons. Fast, secure, no signup required.',
    h1: 'PNG to ICO Converter',
    keywords: ['png to ico', 'convert png to ico', 'favicon maker', 'icon creator', 'png to favicon', 'ico generator'],
    description: 'Convert PNG images to ICO icon format. Perfect for creating favicons for websites or Windows application icons. Generate multiple icon sizes automatically.',
    features: ['Create multi-size ICO files', 'Favicon generation', 'Automatic resizing', 'Preserve transparency', 'Batch conversion'],
    useCases: ['Create website favicons', 'Windows application icons', 'Desktop shortcuts', 'Software icons', 'Browser tab icons'],
    faqs: [
      { question: 'Is PNG to ICO free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'What sizes are included?', answer: 'We generate 16x16, 32x32, 48x48, and 256x256 sizes in one ICO file.' },
      { question: 'Can I use it for my website favicon?', answer: 'Yes, the ICO file works perfectly as a favicon.' },
      { question: 'What PNG size should I start with?', answer: 'Start with at least 256x256 pixels for best quality.' },
      { question: 'Will transparency work?', answer: 'Yes, transparency is preserved in the ICO file.' }
    ],
    relatedTools: ['ico-to-png', 'jpg-to-png', 'png-to-jpg', 'svg-to-png']
  }
];

// =====================
// PDF TOOLS - 10+ Pages
// =====================
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
    keywords: ['pdf to word', 'pdf to docx', 'convert pdf to word', 'pdf converter', 'pdf to word converter free', 'pdf to word online'],
    description: 'Convert PDF documents to editable Word files with perfect formatting preservation. Our advanced PDF to Word converter accurately maintains layouts, fonts, images, and tables.',
    features: ['Preserve original formatting', 'Keep images and tables intact', 'Font recognition and matching', 'Multi-page PDF support', 'OCR for scanned PDFs'],
    useCases: ['Edit PDF contracts and documents', 'Update outdated PDF reports', 'Extract text from PDFs', 'Modify PDF forms', 'Collaborate on PDF content'],
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
    keywords: ['word to pdf', 'docx to pdf', 'convert word to pdf', 'word to pdf converter free', 'doc to pdf online'],
    description: 'Convert Word documents to PDF format for secure sharing and printing. PDFs maintain consistent formatting across all devices and cannot be easily edited.',
    features: ['Perfect formatting preservation', 'Embedded fonts and images', 'Hyperlinks preserved', 'Password protection option', 'High-quality output'],
    useCases: ['Create professional documents for sharing', 'Prepare contracts and agreements', 'Generate print-ready documents', 'Archive documents securely', 'Submit assignments and reports'],
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
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'merge pdf files free', 'combine pdf online'],
    description: 'Combine multiple PDF files into a single document effortlessly. Our PDF merger allows you to drag and drop files, reorder pages, and create one unified PDF document.',
    features: ['Drag and drop interface', 'Reorder pages easily', 'Merge unlimited PDFs', 'Preview before merging', 'Fast processing'],
    useCases: ['Combine invoice and receipt PDFs', 'Create complete reports from sections', 'Merge scanned documents', 'Compile portfolios', 'Bundle contracts and attachments'],
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
    keywords: ['split pdf', 'extract pdf pages', 'pdf splitter', 'split pdf pages', 'divide pdf', 'split pdf online free'],
    description: 'Split PDF documents into multiple files or extract specific pages. Whether you need to separate chapters, extract important pages, or divide a large PDF into smaller parts.',
    features: ['Split by page range', 'Extract specific pages', 'Split into equal parts', 'Preview pages before splitting', 'Download individual or all files'],
    useCases: ['Extract specific chapters from books', 'Separate pages for different recipients', 'Create smaller file sizes for sharing', 'Remove unwanted pages', 'Divide scanned documents'],
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
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'shrink pdf', 'make pdf smaller', 'compress pdf online free'],
    description: 'Reduce PDF file sizes while maintaining quality. Our smart PDF compression analyzes your document and applies optimal settings to achieve maximum compression.',
    features: ['Reduce sizes up to 90%', 'Multiple compression levels', 'Preserve text quality', 'Optimize images within PDFs', 'Batch compression'],
    useCases: ['Share PDFs via email', 'Upload to websites faster', 'Save storage space', 'Meet file size requirements', 'Speed up PDF loading'],
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
    keywords: ['pdf editor', 'edit pdf online', 'pdf editor free', 'modify pdf', 'annotate pdf', 'pdf editor online free'],
    description: 'Edit PDF files directly in your browser without installing software. Add text, images, shapes, highlights, and signatures to any PDF.',
    features: ['Add and edit text', 'Insert images and shapes', 'Add electronic signatures', 'Highlight and annotate', 'Fill forms'],
    useCases: ['Fill out PDF forms', 'Sign documents electronically', 'Add annotations and comments', 'Insert company logos', 'Highlight important text'],
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
    keywords: ['jpg to pdf', 'jpeg to pdf', 'image to pdf', 'convert jpg to pdf', 'photo to pdf', 'jpg to pdf online free'],
    description: 'Convert JPG images to PDF documents for easy sharing and printing. Combine multiple images into a single PDF or convert individual photos.',
    features: ['Convert single or multiple images', 'Combine into one PDF', 'Adjust page orientation', 'Set page margins', 'Maintain image quality'],
    useCases: ['Create PDF documents from photos', 'Combine scanned pages into one file', 'Prepare images for printing', 'Create photo albums as PDFs', 'Convert receipts to PDF'],
    faqs: [
      { question: 'Is JPG to PDF free?', answer: 'Yes, completely free with no limits.' },
      { question: 'Can I combine multiple JPGs into one PDF?', answer: 'Yes, upload multiple images and they\'ll be combined in order.' },
      { question: 'What image formats are supported?', answer: 'JPG, JPEG, PNG, BMP, and TIFF.' },
      { question: 'Can I choose the page size?', answer: 'Yes, select from A4, Letter, or fit to image.' },
      { question: 'Will image quality be preserved?', answer: 'Yes, original quality is maintained.' }
    ],
    relatedTools: ['pdf-to-jpg', 'png-to-pdf', 'merge-pdf', 'compress-pdf']
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
    keywords: ['pdf to jpg', 'pdf to jpeg', 'pdf to image', 'convert pdf to jpg', 'extract images from pdf', 'pdf to jpg online free'],
    description: 'Convert PDF pages to high-quality JPG images. Extract all pages from your PDF as separate image files for easy sharing, editing, or use in presentations.',
    features: ['Convert all pages to images', 'Adjustable image quality', 'Choose output resolution', 'Download as ZIP archive', 'Single or batch conversion'],
    useCases: ['Share PDF content as images', 'Use PDF pages in presentations', 'Post PDF content on social media', 'Archive documents as images', 'Edit PDF content in image editors'],
    faqs: [
      { question: 'Is PDF to JPG free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Can I convert specific pages only?', answer: 'Yes, select which pages to convert.' },
      { question: 'What resolution will the images be?', answer: 'Choose from 72, 150, or 300 DPI.' },
      { question: 'How do I download multiple images?', answer: 'All images are packaged in a ZIP file.' },
      { question: 'Will text remain readable?', answer: 'Yes, at 300 DPI text is perfectly readable.' }
    ],
    relatedTools: ['jpg-to-pdf', 'pdf-to-png', 'pdf-to-word', 'compress-pdf']
  },
  {
    id: 'png-to-pdf',
    slug: 'png-to-pdf',
    category: 'pdf',
    fromFormat: 'PNG',
    toFormat: 'PDF',
    title: 'PNG to PDF Converter',
    metaTitle: 'PNG to PDF Converter – Free Online | TransformFiles',
    metaDescription: 'Convert PNG images to PDF online for free. Combine multiple PNGs into one PDF. No signup required.',
    h1: 'PNG to PDF Converter',
    keywords: ['png to pdf', 'convert png to pdf', 'image to pdf', 'png pdf converter', 'png to pdf online free'],
    description: 'Convert PNG images to PDF documents. Combine multiple PNG files into a single PDF for easy sharing and printing while preserving transparency.',
    features: ['Preserve transparency', 'Combine multiple images', 'Adjust page size', 'Set margins', 'High-quality output'],
    useCases: ['Create PDF from screenshots', 'Combine design files', 'Prepare for printing', 'Share multiple images', 'Archive graphics'],
    faqs: [
      { question: 'Is PNG to PDF free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Can I combine multiple PNGs?', answer: 'Yes, upload multiple PNG files to combine into one PDF.' },
      { question: 'Is transparency preserved?', answer: 'PNG transparency is preserved in the PDF.' },
      { question: 'What page sizes are available?', answer: 'A4, Letter, Legal, or fit to image.' },
      { question: 'Can I set the image order?', answer: 'Yes, drag and drop to reorder images.' }
    ],
    relatedTools: ['jpg-to-pdf', 'pdf-to-png', 'merge-pdf', 'compress-pdf']
  },
  {
    id: 'pdf-to-png',
    slug: 'pdf-to-png',
    category: 'pdf',
    fromFormat: 'PDF',
    toFormat: 'PNG',
    title: 'PDF to PNG Converter',
    metaTitle: 'PDF to PNG Converter – Free Online | TransformFiles',
    metaDescription: 'Convert PDF to PNG images online for free. High quality with transparency. No signup required.',
    h1: 'PDF to PNG Converter',
    keywords: ['pdf to png', 'convert pdf to png', 'pdf to image', 'pdf png converter', 'pdf to png online'],
    description: 'Convert PDF pages to high-quality PNG images with transparency support. Perfect for graphics, presentations, and web use where lossless quality is needed.',
    features: ['Lossless quality', 'Transparency support', 'High resolution output', 'Batch conversion', 'All pages or selection'],
    useCases: ['Create web graphics from PDFs', 'Use in presentations', 'High-quality archives', 'Design work', 'Print preparation'],
    faqs: [
      { question: 'Is PDF to PNG free?', answer: 'Yes, 100% free with unlimited conversions.' },
      { question: 'Why choose PNG over JPG?', answer: 'PNG is lossless and supports transparency.' },
      { question: 'What resolution is output?', answer: 'Choose from 72, 150, or 300 DPI.' },
      { question: 'Can I convert specific pages?', answer: 'Yes, select which pages to convert.' },
      { question: 'Is quality preserved?', answer: 'Yes, PNG uses lossless compression.' }
    ],
    relatedTools: ['pdf-to-jpg', 'png-to-pdf', 'pdf-to-word', 'compress-pdf']
  },
  {
    id: 'excel-to-pdf',
    slug: 'excel-to-pdf',
    category: 'pdf',
    fromFormat: 'Excel',
    toFormat: 'PDF',
    title: 'Excel to PDF Converter',
    metaTitle: 'Excel to PDF Converter – Free Online | TransformFiles',
    metaDescription: 'Convert Excel to PDF online for free. Preserve formatting and formulas. Fast, secure, no signup required.',
    h1: 'Excel to PDF Converter',
    keywords: ['excel to pdf', 'xlsx to pdf', 'convert excel to pdf', 'spreadsheet to pdf', 'excel to pdf online free'],
    description: 'Convert Excel spreadsheets to PDF format for secure sharing and printing. Our converter preserves formatting, charts, and table layouts perfectly.',
    features: ['Preserve formatting', 'Keep charts and graphs', 'Multi-sheet support', 'Print-ready output', 'Fast conversion'],
    useCases: ['Share reports securely', 'Print spreadsheets', 'Archive financial data', 'Present data professionally', 'Email attachments'],
    faqs: [
      { question: 'Is Excel to PDF free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Will charts be preserved?', answer: 'Yes, all charts and graphs are accurately preserved.' },
      { question: 'Can I convert multiple sheets?', answer: 'Yes, all sheets are converted to the PDF.' },
      { question: 'Is formatting maintained?', answer: 'Yes, cell formatting, colors, and borders are preserved.' },
      { question: 'What Excel formats are supported?', answer: '.xlsx and .xls files are both supported.' }
    ],
    relatedTools: ['pdf-to-excel', 'word-to-pdf', 'ppt-to-pdf', 'compress-pdf']
  },
  {
    id: 'ppt-to-pdf',
    slug: 'ppt-to-pdf',
    category: 'pdf',
    fromFormat: 'PPT',
    toFormat: 'PDF',
    title: 'PowerPoint to PDF Converter',
    metaTitle: 'PowerPoint to PDF Converter – Free Online | TransformFiles',
    metaDescription: 'Convert PowerPoint to PDF online for free. Preserve slides and animations. Fast, secure, no signup required.',
    h1: 'PowerPoint to PDF Converter',
    keywords: ['ppt to pdf', 'powerpoint to pdf', 'convert ppt to pdf', 'pptx to pdf', 'presentation to pdf', 'ppt to pdf online free'],
    description: 'Convert PowerPoint presentations to PDF format for secure sharing and universal compatibility. Our converter preserves slide layouts, images, and formatting.',
    features: ['Preserve slide layouts', 'Keep images and graphics', 'Maintain transitions', 'All slides or selection', 'High-quality output'],
    useCases: ['Share presentations securely', 'Print slide decks', 'Archive presentations', 'Email attachments', 'Universal viewing'],
    faqs: [
      { question: 'Is PowerPoint to PDF free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Will animations be preserved?', answer: 'PDF is static, so animations appear as their final state.' },
      { question: 'Can I convert specific slides?', answer: 'Yes, select which slides to convert.' },
      { question: 'Is formatting maintained?', answer: 'Yes, slide layouts and formatting are preserved.' },
      { question: 'What PPT formats are supported?', answer: '.pptx and .ppt files are both supported.' }
    ],
    relatedTools: ['pdf-to-ppt', 'word-to-pdf', 'excel-to-pdf', 'compress-pdf']
  }
];

// =====================
// AUDIO CONVERSIONS - 10+ Pages
// =====================
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
    keywords: ['wav to mp3', 'convert wav to mp3', 'wav to mp3 converter', 'wav mp3', 'wav to mp3 online free'],
    description: 'Convert WAV audio files to MP3 format for smaller file sizes and universal compatibility. WAV files are uncompressed and can be very large. Our converter transforms them to compact MP3 files.',
    features: ['Dramatic size reduction', 'Adjustable bitrate (128-320 kbps)', 'Preserve audio quality', 'Batch conversion', 'Fast processing'],
    useCases: ['Reduce music file sizes', 'Share audio via email', 'Upload to music platforms', 'Create podcasts', 'Save storage space'],
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
    keywords: ['mp3 to wav', 'convert mp3 to wav', 'mp3 to wav converter', 'mp3 wav', 'mp3 to wav online'],
    description: 'Convert MP3 files to uncompressed WAV format for professional audio editing. WAV provides lossless audio quality and is the preferred format for music production.',
    features: ['Uncompressed output', 'Professional quality', 'Multiple sample rates', 'Batch conversion', 'Preserve audio fidelity'],
    useCases: ['Prepare audio for editing', 'Music production workflows', 'Audio mastering', 'CD burning', 'Professional sound design'],
    faqs: [
      { question: 'Is MP3 to WAV free?', answer: 'Yes, 100% free with no limitations.' },
      { question: 'Why convert MP3 to WAV?', answer: 'WAV is uncompressed and better for professional audio editing.' },
      { question: 'Will quality improve?', answer: 'Converting won\'t add quality, but it provides an editing-friendly format.' },
      { question: 'What sample rates are available?', answer: '44.1 kHz, 48 kHz, and 96 kHz.' },
      { question: 'Why are WAV files so large?', answer: 'WAV is uncompressed, which means larger files but no quality loss.' }
    ],
    relatedTools: ['wav-to-mp3', 'm4a-to-mp3', 'audio-compressor', 'flac-to-mp3']
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
    keywords: ['m4a to mp3', 'convert m4a to mp3', 'm4a to mp3 converter', 'itunes to mp3', 'm4a to mp3 online free'],
    description: 'Convert M4A audio files to universally compatible MP3 format. M4A is used by iTunes and Apple Music but may not play on all devices.',
    features: ['iTunes and Apple Music compatible', 'Preserve audio quality', 'Universal compatibility', 'Batch conversion', 'Fast processing'],
    useCases: ['Play Apple Music on non-Apple devices', 'Transfer iTunes music to Android', 'Create MP3 playlists', 'Share music universally', 'Use audio in video editing'],
    faqs: [
      { question: 'Is M4A to MP3 free?', answer: 'Yes, completely free with unlimited conversions.' },
      { question: 'What is M4A format?', answer: 'M4A is Apple\'s audio format used in iTunes and Apple Music.' },
      { question: 'Will I lose quality?', answer: 'Minimal quality loss at high bitrates (256-320 kbps).' },
      { question: 'Can I convert protected files?', answer: 'DRM-protected files cannot be converted.' },
      { question: 'How long does conversion take?', answer: 'Most files convert in under 30 seconds.' }
    ],
    relatedTools: ['wav-to-mp3', 'mp3-to-wav', 'aac-to-mp3', 'flac-to-mp3']
  },
  {
    id: 'flac-to-mp3',
    slug: 'flac-to-mp3',
    category: 'audio',
    fromFormat: 'FLAC',
    toFormat: 'MP3',
    title: 'FLAC to MP3 Converter',
    metaTitle: 'FLAC to MP3 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert FLAC to MP3 online for free. Reduce file size while keeping quality. Fast, secure, no signup.',
    h1: 'FLAC to MP3 Converter',
    keywords: ['flac to mp3', 'convert flac to mp3', 'flac to mp3 converter', 'flac mp3', 'flac to mp3 online free'],
    description: 'Convert FLAC lossless audio to MP3 format for smaller file sizes and universal compatibility. Perfect for portable devices and sharing music.',
    features: ['Reduce file sizes significantly', 'Adjustable bitrate', 'Preserve audio quality', 'Batch conversion', 'ID3 tag preservation'],
    useCases: ['Portable music players', 'Smartphone storage', 'Share music files', 'Streaming preparation', 'Podcast distribution'],
    faqs: [
      { question: 'Is FLAC to MP3 free?', answer: 'Yes, completely free with unlimited conversions.' },
      { question: 'What is FLAC format?', answer: 'FLAC is a lossless audio format that preserves original CD quality.' },
      { question: 'How much smaller will MP3 be?', answer: 'MP3 files are typically 5-10x smaller than FLAC.' },
      { question: 'Will I lose quality?', answer: 'Some quality loss occurs, but at 320 kbps most listeners can\'t tell.' },
      { question: 'Are ID3 tags preserved?', answer: 'Yes, artist, album, and track info are preserved.' }
    ],
    relatedTools: ['mp3-to-flac', 'wav-to-mp3', 'm4a-to-mp3', 'audio-compressor']
  },
  {
    id: 'ogg-to-mp3',
    slug: 'ogg-to-mp3',
    category: 'audio',
    fromFormat: 'OGG',
    toFormat: 'MP3',
    title: 'OGG to MP3 Converter',
    metaTitle: 'OGG to MP3 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert OGG to MP3 online for free. Universal audio format. Fast, secure, no signup required.',
    h1: 'OGG to MP3 Converter',
    keywords: ['ogg to mp3', 'convert ogg to mp3', 'ogg to mp3 converter', 'ogg vorbis to mp3', 'ogg to mp3 online'],
    description: 'Convert OGG Vorbis audio files to universally compatible MP3 format. While OGG offers great quality, MP3 is more widely supported across devices.',
    features: ['Universal compatibility', 'Adjustable bitrate', 'Preserve audio quality', 'Batch conversion', 'Fast processing'],
    useCases: ['Play OGG on any device', 'Share audio universally', 'Use in video editing', 'Import to music software', 'Create playlists'],
    faqs: [
      { question: 'Is OGG to MP3 free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'What is OGG format?', answer: 'OGG Vorbis is an open-source audio format with good compression.' },
      { question: 'Why convert to MP3?', answer: 'MP3 has wider device and software support than OGG.' },
      { question: 'Will quality be preserved?', answer: 'We use high bitrate settings to minimize quality loss.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple OGG files at once.' }
    ],
    relatedTools: ['mp3-to-ogg', 'wav-to-mp3', 'flac-to-mp3', 'audio-compressor']
  },
  {
    id: 'aac-to-mp3',
    slug: 'aac-to-mp3',
    category: 'audio',
    fromFormat: 'AAC',
    toFormat: 'MP3',
    title: 'AAC to MP3 Converter',
    metaTitle: 'AAC to MP3 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert AAC to MP3 online for free. Universal audio format. Fast, secure, no signup required.',
    h1: 'AAC to MP3 Converter',
    keywords: ['aac to mp3', 'convert aac to mp3', 'aac to mp3 converter', 'aac mp3', 'aac to mp3 online'],
    description: 'Convert AAC audio files to universally compatible MP3 format. AAC is common in YouTube downloads and some music services but MP3 has broader compatibility.',
    features: ['Universal compatibility', 'High-quality output', 'Batch conversion', 'Fast processing', 'No quality loss'],
    useCases: ['Play AAC on older devices', 'Universal music library', 'Share audio files', 'Use in video editing', 'Create compatible playlists'],
    faqs: [
      { question: 'Is AAC to MP3 free?', answer: 'Yes, completely free with unlimited conversions.' },
      { question: 'What is AAC format?', answer: 'AAC is an audio format commonly used by Apple and YouTube.' },
      { question: 'Is MP3 or AAC better?', answer: 'AAC is technically more efficient, but MP3 is more universally supported.' },
      { question: 'Will I lose quality?', answer: 'Minimal quality loss at high bitrate settings.' },
      { question: 'Can I batch convert?', answer: 'Yes, convert multiple AAC files at once.' }
    ],
    relatedTools: ['mp3-to-aac', 'm4a-to-mp3', 'wav-to-mp3', 'audio-compressor']
  },
  {
    id: 'wma-to-mp3',
    slug: 'wma-to-mp3',
    category: 'audio',
    fromFormat: 'WMA',
    toFormat: 'MP3',
    title: 'WMA to MP3 Converter',
    metaTitle: 'WMA to MP3 Converter – Free Online | TransformFiles',
    metaDescription: 'Convert WMA to MP3 online for free. Windows Media Audio to universal MP3. Fast, secure, no signup.',
    h1: 'WMA to MP3 Converter',
    keywords: ['wma to mp3', 'convert wma to mp3', 'wma to mp3 converter', 'windows media to mp3', 'wma to mp3 online'],
    description: 'Convert Windows Media Audio (WMA) files to universally compatible MP3 format. WMA is a Windows-specific format that may not play on other devices.',
    features: ['Universal compatibility', 'Preserve audio quality', 'Batch conversion', 'Fast processing', 'Works on any device'],
    useCases: ['Play WMA on Mac', 'Transfer to iPhone/Android', 'Universal music library', 'Share audio files', 'Archive old music'],
    faqs: [
      { question: 'Is WMA to MP3 free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'What is WMA format?', answer: 'WMA is a Windows-specific audio format developed by Microsoft.' },
      { question: 'Why convert WMA to MP3?', answer: 'MP3 works on all devices while WMA is Windows-specific.' },
      { question: 'Will quality be preserved?', answer: 'Yes, we use high-quality conversion settings.' },
      { question: 'Can I convert protected WMA?', answer: 'DRM-protected files cannot be converted.' }
    ],
    relatedTools: ['mp3-to-wma', 'wav-to-mp3', 'm4a-to-mp3', 'audio-compressor']
  },
  {
    id: 'audio-compressor',
    slug: 'audio-compressor',
    category: 'audio',
    title: 'Audio Compressor',
    metaTitle: 'Audio Compressor – Free Online | TransformFiles',
    metaDescription: 'Compress audio files online for free. Reduce MP3, WAV, M4A sizes. Fast, secure, no signup required.',
    h1: 'Audio Compressor',
    keywords: ['audio compressor', 'compress audio', 'reduce audio size', 'compress mp3', 'audio file compressor', 'compress audio online free'],
    description: 'Compress audio files to reduce size while maintaining quality. Whether you need smaller files for email, faster uploads, or storage savings, our audio compressor delivers.',
    features: ['Support for all audio formats', 'Adjustable compression levels', 'Preserve audio clarity', 'Batch compression', 'Fast processing'],
    useCases: ['Reduce podcast file sizes', 'Share audio via email', 'Save storage space', 'Faster audio uploads', 'Optimize audio for web'],
    faqs: [
      { question: 'How much can I compress audio?', answer: 'Typically 30-70% size reduction depending on source quality.' },
      { question: 'Will compression affect sound quality?', answer: 'Our smart compression minimizes quality impact.' },
      { question: 'What formats are supported?', answer: 'MP3, WAV, M4A, OGG, FLAC, AAC, and more.' },
      { question: 'Can I compress multiple files?', answer: 'Yes, batch compress up to 20 files at once.' },
      { question: 'Is there a file size limit?', answer: 'Audio files up to 200MB are supported.' }
    ],
    relatedTools: ['wav-to-mp3', 'm4a-to-mp3', 'flac-to-mp3', 'video-compressor']
  },
  {
    id: 'mp3-cutter',
    slug: 'mp3-cutter',
    category: 'audio',
    title: 'MP3 Cutter',
    metaTitle: 'MP3 Cutter – Free Online Audio Trimmer | TransformFiles',
    metaDescription: 'Cut and trim MP3 files online for free. Create ringtones, clips, and samples. Fast, easy, no signup required.',
    h1: 'MP3 Cutter & Trimmer',
    keywords: ['mp3 cutter', 'cut mp3', 'trim mp3', 'mp3 trimmer', 'audio cutter', 'mp3 cutter online free', 'ringtone maker'],
    description: 'Cut and trim MP3 files to create ringtones, clips, samples, and custom audio segments. Our visual editor makes it easy to select the exact portion you need.',
    features: ['Visual waveform editor', 'Precise trimming', 'Fade in/out effects', 'Ringtone creation', 'Multiple format output'],
    useCases: ['Create custom ringtones', 'Make audio clips', 'Edit podcast segments', 'Sample creation', 'Remove unwanted parts'],
    faqs: [
      { question: 'Is the MP3 cutter free?', answer: 'Yes, completely free with no limitations.' },
      { question: 'Can I create ringtones?', answer: 'Yes, cut any MP3 to ringtone length and download.' },
      { question: 'Can I add fade effects?', answer: 'Yes, add fade in and fade out effects.' },
      { question: 'What formats are supported?', answer: 'MP3, WAV, M4A, OGG, and more.' },
      { question: 'Is there a length limit?', answer: 'No limit on input length, cut to any duration you need.' }
    ],
    relatedTools: ['wav-to-mp3', 'audio-compressor', 'm4a-to-mp3', 'mp4-to-mp3']
  }
];

// =====================
// AI TOOLS - 10+ Pages
// =====================
export const aiTools: ConversionTool[] = [
  {
    id: 'text-summarizer',
    slug: 'text-summarizer',
    category: 'ai',
    title: 'AI Text Summarizer',
    metaTitle: 'AI Text Summarizer – Free Online | TransformFiles',
    metaDescription: 'Summarize text with AI for free. Condense articles, documents, essays instantly. No signup required.',
    h1: 'AI Text Summarizer',
    keywords: ['text summarizer', 'ai summarizer', 'summarize text', 'article summarizer', 'text summary generator', 'summarize text online free'],
    description: 'Summarize long texts, articles, and documents instantly using advanced AI. Our text summarizer understands context and extracts key points to create concise, accurate summaries.',
    features: ['AI-powered understanding', 'Adjustable summary length', 'Maintain key points', 'Multiple languages', 'Instant results'],
    useCases: ['Summarize research papers', 'Condense news articles', 'Review long documents quickly', 'Study preparation', 'Business report summaries'],
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
    keywords: ['paraphraser', 'paraphrasing tool', 'rewrite text', 'rephrase', 'paraphrase online free', 'text rewriter'],
    description: 'Rewrite text in different words while maintaining the original meaning. Our AI paraphraser understands context and produces natural, fluent rewrites.',
    features: ['Multiple rewriting styles', 'Maintain original meaning', 'Natural language output', 'Plagiarism-free results', 'Instant paraphrasing'],
    useCases: ['Avoid plagiarism in academic writing', 'Create unique content versions', 'Improve text readability', 'Rephrase for different audiences', 'Content repurposing'],
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
    keywords: ['grammar fixer', 'grammar checker', 'fix grammar', 'grammar correction', 'spelling checker', 'grammar checker free online'],
    description: 'Fix grammar, spelling, and punctuation errors instantly using AI. Our grammar fixer goes beyond simple spell-checking to understand context and suggest improvements.',
    features: ['Grammar error correction', 'Spelling fixes', 'Punctuation improvements', 'Style suggestions', 'Context-aware corrections'],
    useCases: ['Polish emails before sending', 'Review essays and reports', 'Improve social media posts', 'Check business documents', 'Perfect cover letters'],
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
    keywords: ['translator', 'translate text', 'ai translator', 'language translator', 'free translation', 'translate online free'],
    description: 'Translate text between 100+ languages using advanced AI. Our translator understands context and nuance to deliver natural, accurate translations.',
    features: ['100+ languages supported', 'Context-aware translation', 'Natural language output', 'Preserve formatting', 'Instant results'],
    useCases: ['Translate documents', 'Communicate internationally', 'Translate emails and messages', 'Understand foreign content', 'Localize marketing materials'],
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
    keywords: ['email generator', 'ai email writer', 'write email', 'professional email generator', 'email creator', 'email writer free'],
    description: 'Generate professional emails instantly using AI. Simply describe what you need to communicate, and our AI crafts well-structured, appropriately toned emails.',
    features: ['Multiple tones (formal, casual, friendly)', 'Business email templates', 'Subject line suggestions', 'Follow-up email generation', 'Multi-language support'],
    useCases: ['Write business proposals', 'Create job application emails', 'Respond to customer inquiries', 'Send meeting requests', 'Draft follow-up emails'],
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
    keywords: ['image to code', 'screenshot to code', 'design to code', 'ai code generator', 'html from image', 'image to html free'],
    description: 'Convert design mockups and screenshots to HTML/CSS code using AI. Simply upload an image of any design, and our AI generates clean, responsive code.',
    features: ['AI-powered code generation', 'Responsive HTML/CSS output', 'Tailwind CSS support', 'Clean, readable code', 'Instant conversion'],
    useCases: ['Implement design mockups', 'Learn from existing designs', 'Prototype quickly', 'Convert wireframes to code', 'Recreate layouts'],
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
    keywords: ['code explainer', 'explain code', 'code explanation', 'understand code', 'ai code helper', 'code explainer free'],
    description: 'Understand any code with clear AI-powered explanations. Paste code in any programming language and receive line-by-line explanations of what it does.',
    features: ['All programming languages', 'Line-by-line explanations', 'Concept clarification', 'Best practice suggestions', 'Learning resources'],
    useCases: ['Learn new programming languages', 'Understand inherited code', 'Code review assistance', 'Debug complex logic', 'Teaching and tutoring'],
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
    keywords: ['resume maker', 'cv maker', 'ai resume builder', 'resume generator', 'cv builder free', 'resume maker free online'],
    description: 'Create professional, ATS-friendly resumes using AI. Our resume maker helps you craft compelling content, choose from modern templates, and format your experience effectively.',
    features: ['ATS-optimized formats', 'Multiple professional templates', 'AI content suggestions', 'Easy customization', 'PDF download'],
    useCases: ['Create job application resumes', 'Update outdated CVs', 'Change career direction', 'Entry-level resumes', 'Executive resumes'],
    faqs: [
      { question: 'Is the resume maker free?', answer: 'Yes, create and download resumes for free.' },
      { question: 'Are the resumes ATS-friendly?', answer: 'Yes, all templates are optimized for applicant tracking systems.' },
      { question: 'Can I customize templates?', answer: 'Yes, fully customize colors, fonts, and layouts.' },
      { question: 'What format is the output?', answer: 'Download as PDF for best compatibility.' },
      { question: 'Will AI write my content?', answer: 'AI suggests improvements; you control all content.' }
    ],
    relatedTools: ['email-generator', 'grammar-fixer', 'text-summarizer', 'paraphraser']
  },
  {
    id: 'ai-writer',
    slug: 'ai-writer',
    category: 'ai',
    title: 'AI Content Writer',
    metaTitle: 'AI Content Writer – Free Online | TransformFiles',
    metaDescription: 'Generate content with AI for free. Blog posts, articles, marketing copy. Fast, easy, no signup.',
    h1: 'AI Content Writer',
    keywords: ['ai writer', 'ai content generator', 'content writer', 'blog writer', 'article generator', 'ai writing tool free'],
    description: 'Generate high-quality content using AI. Create blog posts, articles, product descriptions, and marketing copy in seconds with our advanced AI writing tool.',
    features: ['Multiple content types', 'SEO optimization', 'Customizable tone', 'Plagiarism-free output', 'Fast generation'],
    useCases: ['Write blog posts', 'Create product descriptions', 'Generate marketing copy', 'Draft social media posts', 'Content ideation'],
    faqs: [
      { question: 'Is the AI writer free?', answer: 'Yes, completely free with no word limits.' },
      { question: 'Is the content original?', answer: 'Yes, all content is uniquely generated.' },
      { question: 'Can I edit the output?', answer: 'Absolutely, all generated content is fully editable.' },
      { question: 'What content types are supported?', answer: 'Blog posts, articles, ads, product descriptions, and more.' },
      { question: 'Is it SEO-friendly?', answer: 'Yes, content is optimized for search engines.' }
    ],
    relatedTools: ['text-summarizer', 'paraphraser', 'email-generator', 'grammar-fixer']
  },
  {
    id: 'hashtag-generator',
    slug: 'hashtag-generator',
    category: 'ai',
    title: 'AI Hashtag Generator',
    metaTitle: 'AI Hashtag Generator – Free Online | TransformFiles',
    metaDescription: 'Generate trending hashtags with AI for free. Instagram, TikTok, Twitter hashtags. No signup required.',
    h1: 'AI Hashtag Generator',
    keywords: ['hashtag generator', 'instagram hashtags', 'tiktok hashtags', 'twitter hashtags', 'trending hashtags', 'hashtag generator free'],
    description: 'Generate relevant, trending hashtags for your social media posts using AI. Increase your reach and engagement with optimized hashtag suggestions.',
    features: ['Platform-specific hashtags', 'Trending tag suggestions', 'Niche-specific options', 'Copy-ready format', 'Engagement optimization'],
    useCases: ['Instagram posts', 'TikTok videos', 'Twitter engagement', 'LinkedIn reach', 'Content discovery'],
    faqs: [
      { question: 'Is the hashtag generator free?', answer: 'Yes, completely free with unlimited use.' },
      { question: 'Which platforms are supported?', answer: 'Instagram, TikTok, Twitter, LinkedIn, and more.' },
      { question: 'Are the hashtags trending?', answer: 'We suggest a mix of trending and niche-specific hashtags.' },
      { question: 'How many hashtags should I use?', answer: 'Instagram: 20-30, Twitter: 2-3, TikTok: 4-5.' },
      { question: 'Can I copy hashtags directly?', answer: 'Yes, copy all hashtags with one click.' }
    ],
    relatedTools: ['ai-writer', 'text-summarizer', 'email-generator', 'paraphraser']
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
