export const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  pt: { name: 'Português', flag: '🇵🇹' },
  nl: { name: 'Nederlands', flag: '🇳🇱' },
  pl: { name: 'Polski', flag: '🇵🇱' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  ja: { name: '日本語', flag: '🇯🇵' },
  zh: { name: '中文', flag: '🇨🇳' },
  ko: { name: '한국어', flag: '🇰🇷' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  tr: { name: 'Türkçe', flag: '🇹🇷' },
  hi: { name: 'हिन्दी', flag: '🇮🇳' },
} as const;

export type Language = keyof typeof languages;

export const translations: Record<Language, {
  nav: {
    home: string;
    pdfEditor: string;
    resumeMaker: string;
    about: string;
    blog: string;
    startConverting: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    dropzone: string;
    dragActive: string;
    orBrowse: string;
    supportedFormats: string;
    trusted: string;
  };
  features: {
    title: string;
    subtitle: string;
    lightning: { title: string; desc: string };
    secure: { title: string; desc: string };
    formats: { title: string; desc: string };
    free: { title: string; desc: string };
    quality: { title: string; desc: string };
    mobile: { title: string; desc: string };
  };
  footer: {
    description: string;
    tools: string;
    converters: string;
    company: string;
    legal: string;
    copyright: string;
  };
  about: {
    title: string;
    subtitle: string;
    ourStory: string;
    storyContent: string[];
    values: string;
    valuesSubtitle: string;
    team: string;
    teamSubtitle: string;
    contact: string;
    contactSubtitle: string;
  };
  privacy: {
    title: string;
    subtitle: string;
    intro: string;
  };
  terms: {
    title: string;
    subtitle: string;
    intro: string;
  };
  cookies: {
    title: string;
    subtitle: string;
    intro: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
  };
  converter: {
    upload: string;
    convert: string;
    download: string;
    converting: string;
    completed: string;
    failed: string;
    selectFormat: string;
    removeAll: string;
  };
  meta: {
    homeTitle: string;
    homeDesc: string;
    aboutTitle: string;
    aboutDesc: string;
    privacyTitle: string;
    privacyDesc: string;
    termsTitle: string;
    termsDesc: string;
    cookiesTitle: string;
    cookiesDesc: string;
    blogTitle: string;
    blogDesc: string;
  };
}> = {
  en: {
    nav: {
      home: 'Home',
      pdfEditor: 'PDF Editor',
      resumeMaker: 'Resume Maker',
      about: 'About',
      blog: 'Blog',
      startConverting: 'Start Converting',
    },
    hero: {
      badge: 'Trusted by 2M+ users worldwide',
      title: 'Transform Any File',
      titleHighlight: 'In Seconds',
      description: 'The fastest online file converter. Convert videos, images, audio, documents, and more. Free, secure, no registration required.',
      dropzone: 'Drag & drop files here or click to browse',
      dragActive: 'Drop files here...',
      orBrowse: 'or browse files',
      supportedFormats: '1500+ formats supported',
      trusted: 'Trusted by millions',
    },
    features: {
      title: 'Why Choose TransformFiles?',
      subtitle: 'The most powerful file converter on the web',
      lightning: { title: 'Lightning Fast', desc: 'Convert files in seconds with our optimized infrastructure' },
      secure: { title: '100% Secure', desc: 'Files are encrypted and auto-deleted after 2 hours' },
      formats: { title: '1500+ Formats', desc: 'Support for virtually any file format you need' },
      free: { title: 'Always Free', desc: 'No hidden fees, no subscriptions, completely free' },
      quality: { title: 'High Quality', desc: 'Maintain original quality during conversion' },
      mobile: { title: 'Mobile Friendly', desc: 'Works perfectly on any device' },
    },
    footer: {
      description: 'The fastest and most reliable online file converter. Transform any file format with ease.',
      tools: 'Tools',
      converters: 'Converters',
      company: 'Company',
      legal: 'Legal',
      copyright: '© 2024 TransformFiles.app. All rights reserved.',
    },
    about: {
      title: 'Making File Conversion',
      subtitle: 'Accessible to All',
      ourStory: 'Our Story',
      storyContent: [
        'TransformFiles was born from a simple frustration: why is converting files so complicated? In 2023, our team was working on creative projects and needed to convert hundreds of files. The existing tools were either slow, expensive, or required downloading software.',
        "That's when the idea for TransformFiles came to life. We set out to build the fastest, most user-friendly file converter on the web. No downloads, no signups, no hassle.",
        "Today, TransformFiles serves millions of users worldwide, processing over 10 million files every month. But we're just getting started. Our team continues to innovate, adding new formats, improving speed, and enhancing the user experience.",
      ],
      values: 'Our Values',
      valuesSubtitle: 'The principles that guide everything we do',
      team: 'Meet Our Team',
      teamSubtitle: 'The passionate people behind TransformFiles',
      contact: 'Get In Touch',
      contactSubtitle: 'Have questions or feedback? We\'d love to hear from you.',
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Your Privacy Matters',
      intro: 'At TransformFiles, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our file conversion service.',
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Legal',
      intro: 'Welcome to TransformFiles. These Terms of Service govern your use of our file conversion service and website.',
    },
    cookies: {
      title: 'Cookie Policy',
      subtitle: 'Understanding how we use cookies',
      intro: 'This Cookie Policy explains how TransformFiles uses cookies and similar technologies when you visit our website.',
    },
    blog: {
      title: 'Blog & Resources',
      subtitle: 'Tips, guides, and news about file conversion',
      readMore: 'Read More',
    },
    converter: {
      upload: 'Upload Files',
      convert: 'Convert',
      download: 'Download',
      converting: 'Converting...',
      completed: 'Completed',
      failed: 'Failed',
      selectFormat: 'Select format',
      removeAll: 'Remove All',
    },
    meta: {
      homeTitle: 'TransformFiles - Free Online File Converter | Convert Any File Format',
      homeDesc: 'Convert files online for free. Support for 1500+ formats including video, image, audio, documents. Fast, secure, no registration required.',
      aboutTitle: 'About Us | TransformFiles - Our Mission & Team',
      aboutDesc: 'Learn about TransformFiles mission to make file conversion accessible to everyone. Meet our team and discover our values.',
      privacyTitle: 'Privacy Policy | TransformFiles',
      privacyDesc: 'Learn how TransformFiles protects your privacy and handles your data. GDPR and CCPA compliant.',
      termsTitle: 'Terms of Service | TransformFiles',
      termsDesc: 'Read TransformFiles Terms of Service. Understand your rights and responsibilities when using our file conversion service.',
      cookiesTitle: 'Cookie Policy | TransformFiles',
      cookiesDesc: 'Learn about how TransformFiles uses cookies and how you can manage your cookie preferences.',
      blogTitle: 'Blog | TransformFiles - File Conversion Tips & Guides',
      blogDesc: 'Expert tips, guides, and tutorials on file conversion. Learn how to convert any file format easily.',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      pdfEditor: 'PDF-Editor',
      resumeMaker: 'Lebenslauf-Ersteller',
      about: 'Über uns',
      blog: 'Blog',
      startConverting: 'Jetzt konvertieren',
    },
    hero: {
      badge: 'Vertraut von 2M+ Nutzern weltweit',
      title: 'Jede Datei umwandeln',
      titleHighlight: 'In Sekunden',
      description: 'Der schnellste Online-Dateikonverter. Konvertieren Sie Videos, Bilder, Audio, Dokumente und mehr. Kostenlos, sicher, keine Registrierung erforderlich.',
      dropzone: 'Dateien hier ablegen oder klicken zum Durchsuchen',
      dragActive: 'Dateien hier ablegen...',
      orBrowse: 'oder Dateien durchsuchen',
      supportedFormats: '1500+ Formate unterstützt',
      trusted: 'Millionen vertrauen uns',
    },
    features: {
      title: 'Warum TransformFiles?',
      subtitle: 'Der leistungsstärkste Dateikonverter im Web',
      lightning: { title: 'Blitzschnell', desc: 'Dateien in Sekunden konvertieren' },
      secure: { title: '100% Sicher', desc: 'Dateien werden verschlüsselt und nach 2 Stunden gelöscht' },
      formats: { title: '1500+ Formate', desc: 'Unterstützung für praktisch jedes Dateiformat' },
      free: { title: 'Immer kostenlos', desc: 'Keine versteckten Gebühren, völlig kostenlos' },
      quality: { title: 'Hohe Qualität', desc: 'Originalqualität während der Konvertierung beibehalten' },
      mobile: { title: 'Mobilfreundlich', desc: 'Funktioniert perfekt auf jedem Gerät' },
    },
    footer: {
      description: 'Der schnellste und zuverlässigste Online-Dateikonverter.',
      tools: 'Werkzeuge',
      converters: 'Konverter',
      company: 'Unternehmen',
      legal: 'Rechtliches',
      copyright: '© 2024 TransformFiles.app. Alle Rechte vorbehalten.',
    },
    about: {
      title: 'Dateikonvertierung',
      subtitle: 'Für alle zugänglich machen',
      ourStory: 'Unsere Geschichte',
      storyContent: [
        'TransformFiles entstand aus einer einfachen Frustration: Warum ist das Konvertieren von Dateien so kompliziert?',
        'Wir haben den schnellsten, benutzerfreundlichsten Dateikonverter im Web gebaut.',
        'Heute bedient TransformFiles Millionen von Nutzern weltweit.',
      ],
      values: 'Unsere Werte',
      valuesSubtitle: 'Die Prinzipien, die alles leiten, was wir tun',
      team: 'Unser Team',
      teamSubtitle: 'Die leidenschaftlichen Menschen hinter TransformFiles',
      contact: 'Kontakt',
      contactSubtitle: 'Haben Sie Fragen oder Feedback?',
    },
    privacy: {
      title: 'Datenschutzerklärung',
      subtitle: 'Ihre Privatsphäre ist wichtig',
      intro: 'Bei TransformFiles nehmen wir Ihre Privatsphäre ernst.',
    },
    terms: {
      title: 'Nutzungsbedingungen',
      subtitle: 'Rechtliches',
      intro: 'Willkommen bei TransformFiles. Diese Nutzungsbedingungen regeln Ihre Nutzung unseres Dienstes.',
    },
    cookies: {
      title: 'Cookie-Richtlinie',
      subtitle: 'Wie wir Cookies verwenden',
      intro: 'Diese Cookie-Richtlinie erklärt, wie TransformFiles Cookies verwendet.',
    },
    blog: {
      title: 'Blog & Ressourcen',
      subtitle: 'Tipps und Anleitungen zur Dateikonvertierung',
      readMore: 'Weiterlesen',
    },
    converter: {
      upload: 'Dateien hochladen',
      convert: 'Konvertieren',
      download: 'Herunterladen',
      converting: 'Konvertiere...',
      completed: 'Abgeschlossen',
      failed: 'Fehlgeschlagen',
      selectFormat: 'Format wählen',
      removeAll: 'Alle entfernen',
    },
    meta: {
      homeTitle: 'TransformFiles - Kostenloser Online-Dateikonverter',
      homeDesc: 'Dateien kostenlos online konvertieren. Unterstützung für 1500+ Formate.',
      aboutTitle: 'Über uns | TransformFiles',
      aboutDesc: 'Erfahren Sie mehr über die Mission von TransformFiles.',
      privacyTitle: 'Datenschutz | TransformFiles',
      privacyDesc: 'Erfahren Sie, wie TransformFiles Ihre Daten schützt.',
      termsTitle: 'Nutzungsbedingungen | TransformFiles',
      termsDesc: 'Lesen Sie die Nutzungsbedingungen von TransformFiles.',
      cookiesTitle: 'Cookie-Richtlinie | TransformFiles',
      cookiesDesc: 'Erfahren Sie, wie TransformFiles Cookies verwendet.',
      blogTitle: 'Blog | TransformFiles',
      blogDesc: 'Tipps und Anleitungen zur Dateikonvertierung.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      pdfEditor: 'Editor PDF',
      resumeMaker: 'Crear Currículum',
      about: 'Nosotros',
      blog: 'Blog',
      startConverting: 'Empezar a convertir',
    },
    hero: {
      badge: 'Confiado por 2M+ usuarios en todo el mundo',
      title: 'Transforma cualquier archivo',
      titleHighlight: 'En segundos',
      description: 'El convertidor de archivos en línea más rápido. Convierte videos, imágenes, audio, documentos y más. Gratis, seguro, sin registro.',
      dropzone: 'Arrastra y suelta archivos aquí o haz clic para explorar',
      dragActive: 'Suelta los archivos aquí...',
      orBrowse: 'o explorar archivos',
      supportedFormats: '1500+ formatos soportados',
      trusted: 'Millones confían en nosotros',
    },
    features: {
      title: '¿Por qué TransformFiles?',
      subtitle: 'El convertidor de archivos más potente de la web',
      lightning: { title: 'Ultra rápido', desc: 'Convierte archivos en segundos' },
      secure: { title: '100% Seguro', desc: 'Archivos encriptados y eliminados automáticamente' },
      formats: { title: '1500+ Formatos', desc: 'Soporte para prácticamente cualquier formato' },
      free: { title: 'Siempre gratis', desc: 'Sin costos ocultos, completamente gratis' },
      quality: { title: 'Alta calidad', desc: 'Mantiene la calidad original' },
      mobile: { title: 'Móvil friendly', desc: 'Funciona perfectamente en cualquier dispositivo' },
    },
    footer: {
      description: 'El convertidor de archivos en línea más rápido y confiable.',
      tools: 'Herramientas',
      converters: 'Convertidores',
      company: 'Empresa',
      legal: 'Legal',
      copyright: '© 2024 TransformFiles.app. Todos los derechos reservados.',
    },
    about: {
      title: 'Haciendo la conversión de archivos',
      subtitle: 'Accesible para todos',
      ourStory: 'Nuestra historia',
      storyContent: [
        'TransformFiles nació de una simple frustración: ¿por qué es tan complicado convertir archivos?',
        'Nos propusimos construir el convertidor más rápido y fácil de usar.',
        'Hoy, TransformFiles sirve a millones de usuarios en todo el mundo.',
      ],
      values: 'Nuestros valores',
      valuesSubtitle: 'Los principios que guían todo lo que hacemos',
      team: 'Nuestro equipo',
      teamSubtitle: 'Las personas apasionadas detrás de TransformFiles',
      contact: 'Contáctanos',
      contactSubtitle: '¿Tienes preguntas o comentarios?',
    },
    privacy: {
      title: 'Política de privacidad',
      subtitle: 'Tu privacidad importa',
      intro: 'En TransformFiles, nos tomamos tu privacidad en serio.',
    },
    terms: {
      title: 'Términos de servicio',
      subtitle: 'Legal',
      intro: 'Bienvenido a TransformFiles. Estos términos rigen el uso de nuestro servicio.',
    },
    cookies: {
      title: 'Política de cookies',
      subtitle: 'Cómo usamos las cookies',
      intro: 'Esta política explica cómo TransformFiles usa las cookies.',
    },
    blog: {
      title: 'Blog y recursos',
      subtitle: 'Consejos y guías sobre conversión de archivos',
      readMore: 'Leer más',
    },
    converter: {
      upload: 'Subir archivos',
      convert: 'Convertir',
      download: 'Descargar',
      converting: 'Convirtiendo...',
      completed: 'Completado',
      failed: 'Fallido',
      selectFormat: 'Seleccionar formato',
      removeAll: 'Eliminar todo',
    },
    meta: {
      homeTitle: 'TransformFiles - Convertidor de archivos online gratis',
      homeDesc: 'Convierte archivos online gratis. Soporte para 1500+ formatos.',
      aboutTitle: 'Sobre nosotros | TransformFiles',
      aboutDesc: 'Conoce la misión de TransformFiles.',
      privacyTitle: 'Privacidad | TransformFiles',
      privacyDesc: 'Cómo TransformFiles protege tus datos.',
      termsTitle: 'Términos | TransformFiles',
      termsDesc: 'Lee los términos de servicio de TransformFiles.',
      cookiesTitle: 'Cookies | TransformFiles',
      cookiesDesc: 'Cómo TransformFiles usa las cookies.',
      blogTitle: 'Blog | TransformFiles',
      blogDesc: 'Consejos y guías sobre conversión de archivos.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      pdfEditor: 'Éditeur PDF',
      resumeMaker: 'Créateur de CV',
      about: 'À propos',
      blog: 'Blog',
      startConverting: 'Commencer',
    },
    hero: {
      badge: 'Approuvé par 2M+ utilisateurs',
      title: 'Transformez tout fichier',
      titleHighlight: 'En quelques secondes',
      description: 'Le convertisseur de fichiers en ligne le plus rapide. Convertissez vidéos, images, audio, documents et plus. Gratuit, sécurisé, sans inscription.',
      dropzone: 'Glissez-déposez vos fichiers ici ou cliquez pour parcourir',
      dragActive: 'Déposez les fichiers ici...',
      orBrowse: 'ou parcourir les fichiers',
      supportedFormats: '1500+ formats supportés',
      trusted: 'Des millions nous font confiance',
    },
    features: {
      title: 'Pourquoi TransformFiles?',
      subtitle: 'Le convertisseur de fichiers le plus puissant du web',
      lightning: { title: 'Ultra rapide', desc: 'Convertissez des fichiers en secondes' },
      secure: { title: '100% Sécurisé', desc: 'Fichiers cryptés et supprimés automatiquement' },
      formats: { title: '1500+ Formats', desc: 'Support pour pratiquement tous les formats' },
      free: { title: 'Toujours gratuit', desc: 'Aucun frais caché, complètement gratuit' },
      quality: { title: 'Haute qualité', desc: 'Maintient la qualité originale' },
      mobile: { title: 'Mobile friendly', desc: 'Fonctionne parfaitement sur tout appareil' },
    },
    footer: {
      description: 'Le convertisseur de fichiers en ligne le plus rapide et fiable.',
      tools: 'Outils',
      converters: 'Convertisseurs',
      company: 'Entreprise',
      legal: 'Légal',
      copyright: '© 2024 TransformFiles.app. Tous droits réservés.',
    },
    about: {
      title: 'Rendre la conversion de fichiers',
      subtitle: 'Accessible à tous',
      ourStory: 'Notre histoire',
      storyContent: [
        'TransformFiles est né d\'une simple frustration: pourquoi convertir des fichiers est-il si compliqué?',
        'Nous avons créé le convertisseur le plus rapide et facile à utiliser.',
        'Aujourd\'hui, TransformFiles sert des millions d\'utilisateurs dans le monde.',
      ],
      values: 'Nos valeurs',
      valuesSubtitle: 'Les principes qui guident tout ce que nous faisons',
      team: 'Notre équipe',
      teamSubtitle: 'Les personnes passionnées derrière TransformFiles',
      contact: 'Contactez-nous',
      contactSubtitle: 'Des questions ou des commentaires?',
    },
    privacy: {
      title: 'Politique de confidentialité',
      subtitle: 'Votre vie privée compte',
      intro: 'Chez TransformFiles, nous prenons votre vie privée au sérieux.',
    },
    terms: {
      title: 'Conditions d\'utilisation',
      subtitle: 'Légal',
      intro: 'Bienvenue sur TransformFiles. Ces conditions régissent l\'utilisation de notre service.',
    },
    cookies: {
      title: 'Politique de cookies',
      subtitle: 'Comment nous utilisons les cookies',
      intro: 'Cette politique explique comment TransformFiles utilise les cookies.',
    },
    blog: {
      title: 'Blog et ressources',
      subtitle: 'Conseils et guides sur la conversion de fichiers',
      readMore: 'Lire la suite',
    },
    converter: {
      upload: 'Télécharger des fichiers',
      convert: 'Convertir',
      download: 'Télécharger',
      converting: 'Conversion...',
      completed: 'Terminé',
      failed: 'Échoué',
      selectFormat: 'Choisir le format',
      removeAll: 'Tout supprimer',
    },
    meta: {
      homeTitle: 'TransformFiles - Convertisseur de fichiers en ligne gratuit',
      homeDesc: 'Convertissez des fichiers en ligne gratuitement. Support pour 1500+ formats.',
      aboutTitle: 'À propos | TransformFiles',
      aboutDesc: 'Découvrez la mission de TransformFiles.',
      privacyTitle: 'Confidentialité | TransformFiles',
      privacyDesc: 'Comment TransformFiles protège vos données.',
      termsTitle: 'Conditions | TransformFiles',
      termsDesc: 'Lisez les conditions d\'utilisation de TransformFiles.',
      cookiesTitle: 'Cookies | TransformFiles',
      cookiesDesc: 'Comment TransformFiles utilise les cookies.',
      blogTitle: 'Blog | TransformFiles',
      blogDesc: 'Conseils et guides sur la conversion de fichiers.',
    },
  },
  it: {
    nav: {
      home: 'Home',
      pdfEditor: 'Editor PDF',
      resumeMaker: 'Crea Curriculum',
      about: 'Chi siamo',
      blog: 'Blog',
      startConverting: 'Inizia a convertire',
    },
    hero: {
      badge: 'Scelto da 2M+ utenti nel mondo',
      title: 'Trasforma qualsiasi file',
      titleHighlight: 'In pochi secondi',
      description: 'Il convertitore di file online più veloce. Converti video, immagini, audio, documenti e altro. Gratuito, sicuro, senza registrazione.',
      dropzone: 'Trascina e rilascia i file qui o clicca per sfogliare',
      dragActive: 'Rilascia i file qui...',
      orBrowse: 'o sfoglia i file',
      supportedFormats: '1500+ formati supportati',
      trusted: 'Milioni si fidano di noi',
    },
    features: {
      title: 'Perché TransformFiles?',
      subtitle: 'Il convertitore di file più potente del web',
      lightning: { title: 'Velocissimo', desc: 'Converti file in pochi secondi' },
      secure: { title: '100% Sicuro', desc: 'File crittografati e cancellati automaticamente' },
      formats: { title: '1500+ Formati', desc: 'Supporto per praticamente qualsiasi formato' },
      free: { title: 'Sempre gratuito', desc: 'Nessun costo nascosto, completamente gratuito' },
      quality: { title: 'Alta qualità', desc: 'Mantiene la qualità originale' },
      mobile: { title: 'Mobile friendly', desc: 'Funziona perfettamente su qualsiasi dispositivo' },
    },
    footer: {
      description: 'Il convertitore di file online più veloce e affidabile.',
      tools: 'Strumenti',
      converters: 'Convertitori',
      company: 'Azienda',
      legal: 'Legale',
      copyright: '© 2024 TransformFiles.app. Tutti i diritti riservati.',
    },
    about: {
      title: 'Rendere la conversione di file',
      subtitle: 'Accessibile a tutti',
      ourStory: 'La nostra storia',
      storyContent: [
        'TransformFiles è nato da una semplice frustrazione: perché convertire file è così complicato?',
        'Abbiamo creato il convertitore più veloce e facile da usare.',
        'Oggi, TransformFiles serve milioni di utenti in tutto il mondo.',
      ],
      values: 'I nostri valori',
      valuesSubtitle: 'I principi che guidano tutto ciò che facciamo',
      team: 'Il nostro team',
      teamSubtitle: 'Le persone appassionate dietro TransformFiles',
      contact: 'Contattaci',
      contactSubtitle: 'Hai domande o feedback?',
    },
    privacy: {
      title: 'Informativa sulla privacy',
      subtitle: 'La tua privacy è importante',
      intro: 'In TransformFiles, prendiamo la tua privacy sul serio.',
    },
    terms: {
      title: 'Termini di servizio',
      subtitle: 'Legale',
      intro: 'Benvenuto su TransformFiles. Questi termini regolano l\'uso del nostro servizio.',
    },
    cookies: {
      title: 'Informativa sui cookie',
      subtitle: 'Come utilizziamo i cookie',
      intro: 'Questa informativa spiega come TransformFiles utilizza i cookie.',
    },
    blog: {
      title: 'Blog e risorse',
      subtitle: 'Suggerimenti e guide sulla conversione di file',
      readMore: 'Leggi di più',
    },
    converter: {
      upload: 'Carica file',
      convert: 'Converti',
      download: 'Scarica',
      converting: 'Conversione...',
      completed: 'Completato',
      failed: 'Fallito',
      selectFormat: 'Seleziona formato',
      removeAll: 'Rimuovi tutto',
    },
    meta: {
      homeTitle: 'TransformFiles - Convertitore di file online gratuito',
      homeDesc: 'Converti file online gratis. Supporto per 1500+ formati.',
      aboutTitle: 'Chi siamo | TransformFiles',
      aboutDesc: 'Scopri la missione di TransformFiles.',
      privacyTitle: 'Privacy | TransformFiles',
      privacyDesc: 'Come TransformFiles protegge i tuoi dati.',
      termsTitle: 'Termini | TransformFiles',
      termsDesc: 'Leggi i termini di servizio di TransformFiles.',
      cookiesTitle: 'Cookie | TransformFiles',
      cookiesDesc: 'Come TransformFiles utilizza i cookie.',
      blogTitle: 'Blog | TransformFiles',
      blogDesc: 'Suggerimenti e guide sulla conversione di file.',
    },
  },
  pt: {
    nav: {
      home: 'Início',
      pdfEditor: 'Editor PDF',
      resumeMaker: 'Criar Currículo',
      about: 'Sobre',
      blog: 'Blog',
      startConverting: 'Começar a converter',
    },
    hero: {
      badge: 'Confiado por 2M+ usuários',
      title: 'Transforme qualquer arquivo',
      titleHighlight: 'Em segundos',
      description: 'O conversor de arquivos online mais rápido. Converta vídeos, imagens, áudio, documentos e mais. Grátis, seguro, sem registro.',
      dropzone: 'Arraste e solte arquivos aqui ou clique para navegar',
      dragActive: 'Solte os arquivos aqui...',
      orBrowse: 'ou navegue pelos arquivos',
      supportedFormats: '1500+ formatos suportados',
      trusted: 'Milhões confiam em nós',
    },
    features: {
      title: 'Por que TransformFiles?',
      subtitle: 'O conversor de arquivos mais poderoso da web',
      lightning: { title: 'Ultra rápido', desc: 'Converta arquivos em segundos' },
      secure: { title: '100% Seguro', desc: 'Arquivos criptografados e deletados automaticamente' },
      formats: { title: '1500+ Formatos', desc: 'Suporte para praticamente qualquer formato' },
      free: { title: 'Sempre grátis', desc: 'Sem custos ocultos, completamente grátis' },
      quality: { title: 'Alta qualidade', desc: 'Mantém a qualidade original' },
      mobile: { title: 'Mobile friendly', desc: 'Funciona perfeitamente em qualquer dispositivo' },
    },
    footer: {
      description: 'O conversor de arquivos online mais rápido e confiável.',
      tools: 'Ferramentas',
      converters: 'Conversores',
      company: 'Empresa',
      legal: 'Legal',
      copyright: '© 2024 TransformFiles.app. Todos os direitos reservados.',
    },
    about: {
      title: 'Tornando a conversão de arquivos',
      subtitle: 'Acessível a todos',
      ourStory: 'Nossa história',
      storyContent: [
        'TransformFiles nasceu de uma simples frustração: por que converter arquivos é tão complicado?',
        'Criamos o conversor mais rápido e fácil de usar.',
        'Hoje, TransformFiles serve milhões de usuários em todo o mundo.',
      ],
      values: 'Nossos valores',
      valuesSubtitle: 'Os princípios que guiam tudo o que fazemos',
      team: 'Nossa equipe',
      teamSubtitle: 'As pessoas apaixonadas por trás do TransformFiles',
      contact: 'Contato',
      contactSubtitle: 'Tem perguntas ou feedback?',
    },
    privacy: {
      title: 'Política de privacidade',
      subtitle: 'Sua privacidade importa',
      intro: 'Na TransformFiles, levamos sua privacidade a sério.',
    },
    terms: {
      title: 'Termos de serviço',
      subtitle: 'Legal',
      intro: 'Bem-vindo ao TransformFiles. Estes termos regem o uso do nosso serviço.',
    },
    cookies: {
      title: 'Política de cookies',
      subtitle: 'Como usamos cookies',
      intro: 'Esta política explica como o TransformFiles usa cookies.',
    },
    blog: {
      title: 'Blog e recursos',
      subtitle: 'Dicas e guias sobre conversão de arquivos',
      readMore: 'Leia mais',
    },
    converter: {
      upload: 'Carregar arquivos',
      convert: 'Converter',
      download: 'Baixar',
      converting: 'Convertendo...',
      completed: 'Concluído',
      failed: 'Falhou',
      selectFormat: 'Selecionar formato',
      removeAll: 'Remover tudo',
    },
    meta: {
      homeTitle: 'TransformFiles - Conversor de arquivos online grátis',
      homeDesc: 'Converta arquivos online grátis. Suporte para 1500+ formatos.',
      aboutTitle: 'Sobre | TransformFiles',
      aboutDesc: 'Conheça a missão do TransformFiles.',
      privacyTitle: 'Privacidade | TransformFiles',
      privacyDesc: 'Como o TransformFiles protege seus dados.',
      termsTitle: 'Termos | TransformFiles',
      termsDesc: 'Leia os termos de serviço do TransformFiles.',
      cookiesTitle: 'Cookies | TransformFiles',
      cookiesDesc: 'Como o TransformFiles usa cookies.',
      blogTitle: 'Blog | TransformFiles',
      blogDesc: 'Dicas e guias sobre conversão de arquivos.',
    },
  },
  nl: {
    nav: { home: 'Home', pdfEditor: 'PDF Editor', resumeMaker: 'CV Maker', about: 'Over ons', blog: 'Blog', startConverting: 'Start converteren' },
    hero: { badge: 'Vertrouwd door 2M+ gebruikers', title: 'Transformeer elk bestand', titleHighlight: 'In seconden', description: 'De snelste online bestandsconverter. Converteer video\'s, afbeeldingen, audio, documenten en meer. Gratis, veilig, geen registratie vereist.', dropzone: 'Sleep bestanden hier of klik om te bladeren', dragActive: 'Laat bestanden hier los...', orBrowse: 'of blader door bestanden', supportedFormats: '1500+ formaten ondersteund', trusted: 'Miljoenen vertrouwen ons' },
    features: { title: 'Waarom TransformFiles?', subtitle: 'De krachtigste bestandsconverter op het web', lightning: { title: 'Bliksemnel', desc: 'Converteer bestanden in seconden' }, secure: { title: '100% Veilig', desc: 'Bestanden versleuteld en automatisch verwijderd' }, formats: { title: '1500+ Formaten', desc: 'Ondersteuning voor vrijwel elk bestandsformaat' }, free: { title: 'Altijd gratis', desc: 'Geen verborgen kosten, volledig gratis' }, quality: { title: 'Hoge kwaliteit', desc: 'Behoudt originele kwaliteit' }, mobile: { title: 'Mobiel vriendelijk', desc: 'Werkt perfect op elk apparaat' } },
    footer: { description: 'De snelste en meest betrouwbare online bestandsconverter.', tools: 'Tools', converters: 'Converters', company: 'Bedrijf', legal: 'Juridisch', copyright: '© 2024 TransformFiles.app. Alle rechten voorbehouden.' },
    about: { title: 'Bestandsconversie', subtitle: 'Toegankelijk voor iedereen', ourStory: 'Ons verhaal', storyContent: ['TransformFiles is ontstaan uit een simpele frustratie.', 'We hebben de snelste converter gebouwd.', 'Vandaag bedient TransformFiles miljoenen gebruikers.'], values: 'Onze waarden', valuesSubtitle: 'De principes die ons leiden', team: 'Ons team', teamSubtitle: 'De gepassioneerde mensen achter TransformFiles', contact: 'Contact', contactSubtitle: 'Heeft u vragen of feedback?' },
    privacy: { title: 'Privacybeleid', subtitle: 'Uw privacy is belangrijk', intro: 'Bij TransformFiles nemen we uw privacy serieus.' },
    terms: { title: 'Gebruiksvoorwaarden', subtitle: 'Juridisch', intro: 'Welkom bij TransformFiles.' },
    cookies: { title: 'Cookiebeleid', subtitle: 'Hoe we cookies gebruiken', intro: 'Dit beleid legt uit hoe TransformFiles cookies gebruikt.' },
    blog: { title: 'Blog en bronnen', subtitle: 'Tips en handleidingen over bestandsconversie', readMore: 'Lees meer' },
    converter: { upload: 'Upload bestanden', convert: 'Converteren', download: 'Downloaden', converting: 'Converteren...', completed: 'Voltooid', failed: 'Mislukt', selectFormat: 'Selecteer formaat', removeAll: 'Alles verwijderen' },
    meta: { homeTitle: 'TransformFiles - Gratis online bestandsconverter', homeDesc: 'Converteer bestanden gratis online.', aboutTitle: 'Over ons | TransformFiles', aboutDesc: 'Leer over TransformFiles.', privacyTitle: 'Privacy | TransformFiles', privacyDesc: 'Hoe TransformFiles uw gegevens beschermt.', termsTitle: 'Voorwaarden | TransformFiles', termsDesc: 'Lees de voorwaarden van TransformFiles.', cookiesTitle: 'Cookies | TransformFiles', cookiesDesc: 'Hoe TransformFiles cookies gebruikt.', blogTitle: 'Blog | TransformFiles', blogDesc: 'Tips over bestandsconversie.' }
  },
  pl: {
    nav: { home: 'Strona główna', pdfEditor: 'Edytor PDF', resumeMaker: 'Kreator CV', about: 'O nas', blog: 'Blog', startConverting: 'Zacznij konwertować' },
    hero: { badge: 'Zaufało nam 2M+ użytkowników', title: 'Przekształć dowolny plik', titleHighlight: 'W sekundy', description: 'Najszybszy konwerter plików online. Konwertuj wideo, obrazy, audio, dokumenty i więcej. Bezpłatnie, bezpiecznie, bez rejestracji.', dropzone: 'Przeciągnij i upuść pliki tutaj lub kliknij, aby przeglądać', dragActive: 'Upuść pliki tutaj...', orBrowse: 'lub przeglądaj pliki', supportedFormats: '1500+ obsługiwanych formatów', trusted: 'Miliony nam zaufało' },
    features: { title: 'Dlaczego TransformFiles?', subtitle: 'Najpotężniejszy konwerter plików w sieci', lightning: { title: 'Błyskawiczny', desc: 'Konwertuj pliki w sekundy' }, secure: { title: '100% Bezpieczny', desc: 'Pliki szyfrowane i automatycznie usuwane' }, formats: { title: '1500+ Formatów', desc: 'Wsparcie dla praktycznie każdego formatu' }, free: { title: 'Zawsze bezpłatny', desc: 'Bez ukrytych opłat, całkowicie bezpłatny' }, quality: { title: 'Wysoka jakość', desc: 'Zachowuje oryginalną jakość' }, mobile: { title: 'Przyjazny dla urządzeń mobilnych', desc: 'Działa idealnie na każdym urządzeniu' } },
    footer: { description: 'Najszybszy i najbardziej niezawodny konwerter plików online.', tools: 'Narzędzia', converters: 'Konwertery', company: 'Firma', legal: 'Prawne', copyright: '© 2024 TransformFiles.app. Wszelkie prawa zastrzeżone.' },
    about: { title: 'Czynimy konwersję plików', subtitle: 'Dostępną dla wszystkich', ourStory: 'Nasza historia', storyContent: ['TransformFiles narodził się z prostej frustracji.', 'Zbudowaliśmy najszybszy konwerter.', 'Dziś TransformFiles obsługuje miliony użytkowników.'], values: 'Nasze wartości', valuesSubtitle: 'Zasady, które nas prowadzą', team: 'Nasz zespół', teamSubtitle: 'Pasjonaci stojący za TransformFiles', contact: 'Kontakt', contactSubtitle: 'Masz pytania lub uwagi?' },
    privacy: { title: 'Polityka prywatności', subtitle: 'Twoja prywatność jest ważna', intro: 'W TransformFiles poważnie traktujemy Twoją prywatność.' },
    terms: { title: 'Warunki korzystania z usługi', subtitle: 'Prawne', intro: 'Witamy w TransformFiles.' },
    cookies: { title: 'Polityka cookies', subtitle: 'Jak używamy plików cookie', intro: 'Ta polityka wyjaśnia, jak TransformFiles używa plików cookie.' },
    blog: { title: 'Blog i zasoby', subtitle: 'Wskazówki dotyczące konwersji plików', readMore: 'Czytaj więcej' },
    converter: { upload: 'Prześlij pliki', convert: 'Konwertuj', download: 'Pobierz', converting: 'Konwertowanie...', completed: 'Ukończono', failed: 'Nie powiodło się', selectFormat: 'Wybierz format', removeAll: 'Usuń wszystko' },
    meta: { homeTitle: 'TransformFiles - Darmowy konwerter plików online', homeDesc: 'Konwertuj pliki online za darmo.', aboutTitle: 'O nas | TransformFiles', aboutDesc: 'Poznaj misję TransformFiles.', privacyTitle: 'Prywatność | TransformFiles', privacyDesc: 'Jak TransformFiles chroni Twoje dane.', termsTitle: 'Warunki | TransformFiles', termsDesc: 'Przeczytaj warunki TransformFiles.', cookiesTitle: 'Cookies | TransformFiles', cookiesDesc: 'Jak TransformFiles używa cookies.', blogTitle: 'Blog | TransformFiles', blogDesc: 'Wskazówki dotyczące konwersji plików.' }
  },
  ru: {
    nav: { home: 'Главная', pdfEditor: 'PDF Редактор', resumeMaker: 'Создать резюме', about: 'О нас', blog: 'Блог', startConverting: 'Начать конвертацию' },
    hero: { badge: 'Доверяют 2M+ пользователей', title: 'Преобразуйте любой файл', titleHighlight: 'За секунды', description: 'Самый быстрый онлайн-конвертер файлов. Конвертируйте видео, изображения, аудио, документы и многое другое. Бесплатно, безопасно, без регистрации.', dropzone: 'Перетащите файлы сюда или нажмите для просмотра', dragActive: 'Отпустите файлы здесь...', orBrowse: 'или выберите файлы', supportedFormats: '1500+ поддерживаемых форматов', trusted: 'Миллионы нам доверяют' },
    features: { title: 'Почему TransformFiles?', subtitle: 'Самый мощный конвертер файлов в интернете', lightning: { title: 'Молниеносно', desc: 'Конвертируйте файлы за секунды' }, secure: { title: '100% Безопасно', desc: 'Файлы зашифрованы и автоматически удаляются' }, formats: { title: '1500+ Форматов', desc: 'Поддержка практически любого формата' }, free: { title: 'Всегда бесплатно', desc: 'Никаких скрытых платежей, полностью бесплатно' }, quality: { title: 'Высокое качество', desc: 'Сохраняет оригинальное качество' }, mobile: { title: 'Мобильная версия', desc: 'Работает идеально на любом устройстве' } },
    footer: { description: 'Самый быстрый и надежный онлайн-конвертер файлов.', tools: 'Инструменты', converters: 'Конвертеры', company: 'Компания', legal: 'Правовая информация', copyright: '© 2024 TransformFiles.app. Все права защищены.' },
    about: { title: 'Делаем конвертацию файлов', subtitle: 'Доступной для всех', ourStory: 'Наша история', storyContent: ['TransformFiles родился из простого разочарования.', 'Мы создали самый быстрый конвертер.', 'Сегодня TransformFiles обслуживает миллионы пользователей.'], values: 'Наши ценности', valuesSubtitle: 'Принципы, которые нас направляют', team: 'Наша команда', teamSubtitle: 'Увлеченные люди за TransformFiles', contact: 'Контакты', contactSubtitle: 'Есть вопросы или отзывы?' },
    privacy: { title: 'Политика конфиденциальности', subtitle: 'Ваша конфиденциальность важна', intro: 'В TransformFiles мы серьезно относимся к вашей конфиденциальности.' },
    terms: { title: 'Условия использования', subtitle: 'Правовая информация', intro: 'Добро пожаловать в TransformFiles.' },
    cookies: { title: 'Политика cookies', subtitle: 'Как мы используем cookies', intro: 'Эта политика объясняет, как TransformFiles использует cookies.' },
    blog: { title: 'Блог и ресурсы', subtitle: 'Советы по конвертации файлов', readMore: 'Читать далее' },
    converter: { upload: 'Загрузить файлы', convert: 'Конвертировать', download: 'Скачать', converting: 'Конвертация...', completed: 'Завершено', failed: 'Ошибка', selectFormat: 'Выбрать формат', removeAll: 'Удалить все' },
    meta: { homeTitle: 'TransformFiles - Бесплатный онлайн-конвертер файлов', homeDesc: 'Конвертируйте файлы онлайн бесплатно.', aboutTitle: 'О нас | TransformFiles', aboutDesc: 'Узнайте о миссии TransformFiles.', privacyTitle: 'Конфиденциальность | TransformFiles', privacyDesc: 'Как TransformFiles защищает ваши данные.', termsTitle: 'Условия | TransformFiles', termsDesc: 'Прочитайте условия TransformFiles.', cookiesTitle: 'Cookies | TransformFiles', cookiesDesc: 'Как TransformFiles использует cookies.', blogTitle: 'Блог | TransformFiles', blogDesc: 'Советы по конвертации файлов.' }
  },
  ja: {
    nav: { home: 'ホーム', pdfEditor: 'PDF編集', resumeMaker: '履歴書作成', about: '会社概要', blog: 'ブログ', startConverting: '変換開始' },
    hero: { badge: '200万人以上のユーザーに信頼されています', title: 'あらゆるファイルを変換', titleHighlight: '数秒で', description: '最速のオンラインファイルコンバーター。動画、画像、音声、ドキュメントなどを変換。無料、安全、登録不要。', dropzone: 'ファイルをドラッグ＆ドロップするか、クリックして選択', dragActive: 'ここにファイルをドロップ...', orBrowse: 'またはファイルを選択', supportedFormats: '1500以上の形式に対応', trusted: '数百万人が信頼' },
    features: { title: 'なぜTransformFiles？', subtitle: 'ウェブで最も強力なファイルコンバーター', lightning: { title: '超高速', desc: '数秒でファイルを変換' }, secure: { title: '100%安全', desc: 'ファイルは暗号化され自動削除' }, formats: { title: '1500+形式', desc: 'ほぼすべての形式をサポート' }, free: { title: '常に無料', desc: '隠れた費用なし、完全無料' }, quality: { title: '高品質', desc: 'オリジナル品質を維持' }, mobile: { title: 'モバイル対応', desc: 'あらゆるデバイスで完璧に動作' } },
    footer: { description: '最速で最も信頼性の高いオンラインファイルコンバーター。', tools: 'ツール', converters: 'コンバーター', company: '会社', legal: '法的情報', copyright: '© 2024 TransformFiles.app. 全著作権所有。' },
    about: { title: 'ファイル変換を', subtitle: 'すべての人に', ourStory: '私たちの物語', storyContent: ['TransformFilesはシンプルな不満から生まれました。', '最速のコンバーターを作りました。', '今日、TransformFilesは世界中の何百万人ものユーザーにサービスを提供しています。'], values: '私たちの価値観', valuesSubtitle: '私たちを導く原則', team: 'チーム紹介', teamSubtitle: 'TransformFilesの情熱的なメンバー', contact: 'お問い合わせ', contactSubtitle: 'ご質問やフィードバックはありますか？' },
    privacy: { title: 'プライバシーポリシー', subtitle: 'あなたのプライバシーは重要です', intro: 'TransformFilesでは、お客様のプライバシーを真剣に考えています。' },
    terms: { title: '利用規約', subtitle: '法的情報', intro: 'TransformFilesへようこそ。' },
    cookies: { title: 'Cookieポリシー', subtitle: 'Cookieの使用方法', intro: 'このポリシーは、TransformFilesがCookieを使用する方法を説明します。' },
    blog: { title: 'ブログとリソース', subtitle: 'ファイル変換のヒントとガイド', readMore: '続きを読む' },
    converter: { upload: 'ファイルをアップロード', convert: '変換', download: 'ダウンロード', converting: '変換中...', completed: '完了', failed: '失敗', selectFormat: '形式を選択', removeAll: 'すべて削除' },
    meta: { homeTitle: 'TransformFiles - 無料オンラインファイルコンバーター', homeDesc: 'ファイルをオンラインで無料変換。', aboutTitle: '会社概要 | TransformFiles', aboutDesc: 'TransformFilesのミッションについて。', privacyTitle: 'プライバシー | TransformFiles', privacyDesc: 'TransformFilesがデータを保護する方法。', termsTitle: '利用規約 | TransformFiles', termsDesc: 'TransformFilesの利用規約をお読みください。', cookiesTitle: 'Cookie | TransformFiles', cookiesDesc: 'TransformFilesがCookieを使用する方法。', blogTitle: 'ブログ | TransformFiles', blogDesc: 'ファイル変換のヒント。' }
  },
  zh: {
    nav: { home: '首页', pdfEditor: 'PDF编辑器', resumeMaker: '简历制作', about: '关于我们', blog: '博客', startConverting: '开始转换' },
    hero: { badge: '全球200万+用户信赖', title: '转换任何文件', titleHighlight: '几秒钟内', description: '最快的在线文件转换器。转换视频、图像、音频、文档等。免费、安全、无需注册。', dropzone: '拖放文件到这里或点击浏览', dragActive: '将文件放到这里...', orBrowse: '或浏览文件', supportedFormats: '支持1500+格式', trusted: '数百万用户信赖' },
    features: { title: '为什么选择TransformFiles？', subtitle: '网络上最强大的文件转换器', lightning: { title: '极速', desc: '几秒内转换文件' }, secure: { title: '100%安全', desc: '文件加密并自动删除' }, formats: { title: '1500+格式', desc: '支持几乎所有文件格式' }, free: { title: '永久免费', desc: '无隐藏费用，完全免费' }, quality: { title: '高质量', desc: '保持原始质量' }, mobile: { title: '移动友好', desc: '在任何设备上完美运行' } },
    footer: { description: '最快、最可靠的在线文件转换器。', tools: '工具', converters: '转换器', company: '公司', legal: '法律', copyright: '© 2024 TransformFiles.app. 保留所有权利。' },
    about: { title: '让文件转换', subtitle: '人人可用', ourStory: '我们的故事', storyContent: ['TransformFiles源于一个简单的困扰。', '我们建立了最快的转换器。', '今天，TransformFiles为全球数百万用户提供服务。'], values: '我们的价值观', valuesSubtitle: '指导我们的原则', team: '我们的团队', teamSubtitle: 'TransformFiles背后的热情团队', contact: '联系我们', contactSubtitle: '有问题或反馈？' },
    privacy: { title: '隐私政策', subtitle: '您的隐私很重要', intro: '在TransformFiles，我们非常重视您的隐私。' },
    terms: { title: '服务条款', subtitle: '法律', intro: '欢迎使用TransformFiles。' },
    cookies: { title: 'Cookie政策', subtitle: '我们如何使用Cookie', intro: '本政策解释TransformFiles如何使用Cookie。' },
    blog: { title: '博客和资源', subtitle: '文件转换技巧和指南', readMore: '阅读更多' },
    converter: { upload: '上传文件', convert: '转换', download: '下载', converting: '转换中...', completed: '已完成', failed: '失败', selectFormat: '选择格式', removeAll: '全部删除' },
    meta: { homeTitle: 'TransformFiles - 免费在线文件转换器', homeDesc: '免费在线转换文件。', aboutTitle: '关于我们 | TransformFiles', aboutDesc: '了解TransformFiles的使命。', privacyTitle: '隐私 | TransformFiles', privacyDesc: 'TransformFiles如何保护您的数据。', termsTitle: '条款 | TransformFiles', termsDesc: '阅读TransformFiles的服务条款。', cookiesTitle: 'Cookie | TransformFiles', cookiesDesc: 'TransformFiles如何使用Cookie。', blogTitle: '博客 | TransformFiles', blogDesc: '文件转换技巧。' }
  },
  ko: {
    nav: { home: '홈', pdfEditor: 'PDF 편집기', resumeMaker: '이력서 만들기', about: '소개', blog: '블로그', startConverting: '변환 시작' },
    hero: { badge: '전 세계 200만+ 사용자가 신뢰', title: '모든 파일을 변환하세요', titleHighlight: '몇 초 만에', description: '가장 빠른 온라인 파일 변환기. 비디오, 이미지, 오디오, 문서 등을 변환하세요. 무료, 안전, 등록 불필요.', dropzone: '파일을 드래그 앤 드롭하거나 클릭하여 찾아보기', dragActive: '여기에 파일을 놓으세요...', orBrowse: '또는 파일 찾아보기', supportedFormats: '1500+ 형식 지원', trusted: '수백만 명이 신뢰' },
    features: { title: '왜 TransformFiles인가요?', subtitle: '웹에서 가장 강력한 파일 변환기', lightning: { title: '초고속', desc: '몇 초 만에 파일 변환' }, secure: { title: '100% 안전', desc: '파일 암호화 및 자동 삭제' }, formats: { title: '1500+ 형식', desc: '거의 모든 파일 형식 지원' }, free: { title: '항상 무료', desc: '숨겨진 비용 없음, 완전 무료' }, quality: { title: '고품질', desc: '원본 품질 유지' }, mobile: { title: '모바일 친화적', desc: '모든 기기에서 완벽하게 작동' } },
    footer: { description: '가장 빠르고 안정적인 온라인 파일 변환기.', tools: '도구', converters: '변환기', company: '회사', legal: '법률', copyright: '© 2024 TransformFiles.app. 모든 권리 보유.' },
    about: { title: '파일 변환을', subtitle: '모두에게 접근 가능하게', ourStory: '우리의 이야기', storyContent: ['TransformFiles는 간단한 좌절에서 탄생했습니다.', '가장 빠른 변환기를 만들었습니다.', '오늘날 TransformFiles는 전 세계 수백만 사용자에게 서비스를 제공합니다.'], values: '우리의 가치', valuesSubtitle: '우리를 이끄는 원칙', team: '우리 팀', teamSubtitle: 'TransformFiles 뒤의 열정적인 사람들', contact: '문의하기', contactSubtitle: '질문이나 피드백이 있으신가요?' },
    privacy: { title: '개인정보 보호정책', subtitle: '귀하의 프라이버시가 중요합니다', intro: 'TransformFiles에서는 귀하의 프라이버시를 진지하게 생각합니다.' },
    terms: { title: '서비스 약관', subtitle: '법률', intro: 'TransformFiles에 오신 것을 환영합니다.' },
    cookies: { title: '쿠키 정책', subtitle: '쿠키 사용 방법', intro: '이 정책은 TransformFiles가 쿠키를 사용하는 방법을 설명합니다.' },
    blog: { title: '블로그 및 리소스', subtitle: '파일 변환 팁과 가이드', readMore: '더 읽기' },
    converter: { upload: '파일 업로드', convert: '변환', download: '다운로드', converting: '변환 중...', completed: '완료', failed: '실패', selectFormat: '형식 선택', removeAll: '모두 제거' },
    meta: { homeTitle: 'TransformFiles - 무료 온라인 파일 변환기', homeDesc: '무료로 온라인에서 파일을 변환하세요.', aboutTitle: '소개 | TransformFiles', aboutDesc: 'TransformFiles의 미션에 대해 알아보세요.', privacyTitle: '개인정보 | TransformFiles', privacyDesc: 'TransformFiles가 데이터를 보호하는 방법.', termsTitle: '약관 | TransformFiles', termsDesc: 'TransformFiles의 서비스 약관을 읽어보세요.', cookiesTitle: '쿠키 | TransformFiles', cookiesDesc: 'TransformFiles가 쿠키를 사용하는 방법.', blogTitle: '블로그 | TransformFiles', blogDesc: '파일 변환 팁.' }
  },
  ar: {
    nav: { home: 'الرئيسية', pdfEditor: 'محرر PDF', resumeMaker: 'إنشاء السيرة الذاتية', about: 'من نحن', blog: 'المدونة', startConverting: 'ابدأ التحويل' },
    hero: { badge: 'موثوق به من قبل 2 مليون+ مستخدم', title: 'حوّل أي ملف', titleHighlight: 'في ثوانٍ', description: 'أسرع محول ملفات عبر الإنترنت. حوّل الفيديو والصور والصوت والمستندات والمزيد. مجاني وآمن ولا يتطلب تسجيل.', dropzone: 'اسحب الملفات وأفلتها هنا أو انقر للاستعراض', dragActive: 'أفلت الملفات هنا...', orBrowse: 'أو تصفح الملفات', supportedFormats: '1500+ تنسيق مدعوم', trusted: 'يثق بنا الملايين' },
    features: { title: 'لماذا TransformFiles؟', subtitle: 'أقوى محول ملفات على الويب', lightning: { title: 'سريع للغاية', desc: 'حوّل الملفات في ثوانٍ' }, secure: { title: 'آمن 100%', desc: 'الملفات مشفرة وتُحذف تلقائياً' }, formats: { title: '1500+ تنسيق', desc: 'دعم لأي تنسيق ملف تقريباً' }, free: { title: 'مجاني دائماً', desc: 'بدون رسوم خفية، مجاني تماماً' }, quality: { title: 'جودة عالية', desc: 'الحفاظ على الجودة الأصلية' }, mobile: { title: 'متوافق مع الجوال', desc: 'يعمل بشكل مثالي على أي جهاز' } },
    footer: { description: 'أسرع وأكثر محول ملفات موثوق عبر الإنترنت.', tools: 'الأدوات', converters: 'المحولات', company: 'الشركة', legal: 'قانوني', copyright: '© 2024 TransformFiles.app. جميع الحقوق محفوظة.' },
    about: { title: 'نجعل تحويل الملفات', subtitle: 'متاحاً للجميع', ourStory: 'قصتنا', storyContent: ['ولد TransformFiles من إحباط بسيط.', 'بنينا أسرع محول.', 'اليوم، يخدم TransformFiles ملايين المستخدمين حول العالم.'], values: 'قيمنا', valuesSubtitle: 'المبادئ التي ترشدنا', team: 'فريقنا', teamSubtitle: 'الأشخاص المتحمسون وراء TransformFiles', contact: 'اتصل بنا', contactSubtitle: 'هل لديك أسئلة أو تعليقات؟' },
    privacy: { title: 'سياسة الخصوصية', subtitle: 'خصوصيتك مهمة', intro: 'في TransformFiles، نأخذ خصوصيتك على محمل الجد.' },
    terms: { title: 'شروط الخدمة', subtitle: 'قانوني', intro: 'مرحباً بك في TransformFiles.' },
    cookies: { title: 'سياسة ملفات تعريف الارتباط', subtitle: 'كيف نستخدم ملفات تعريف الارتباط', intro: 'توضح هذه السياسة كيفية استخدام TransformFiles لملفات تعريف الارتباط.' },
    blog: { title: 'المدونة والموارد', subtitle: 'نصائح وأدلة حول تحويل الملفات', readMore: 'اقرأ المزيد' },
    converter: { upload: 'رفع الملفات', convert: 'تحويل', download: 'تحميل', converting: 'جارٍ التحويل...', completed: 'مكتمل', failed: 'فشل', selectFormat: 'اختر التنسيق', removeAll: 'حذف الكل' },
    meta: { homeTitle: 'TransformFiles - محول ملفات مجاني عبر الإنترنت', homeDesc: 'حوّل الملفات عبر الإنترنت مجاناً.', aboutTitle: 'من نحن | TransformFiles', aboutDesc: 'تعرف على مهمة TransformFiles.', privacyTitle: 'الخصوصية | TransformFiles', privacyDesc: 'كيف يحمي TransformFiles بياناتك.', termsTitle: 'الشروط | TransformFiles', termsDesc: 'اقرأ شروط خدمة TransformFiles.', cookiesTitle: 'الكوكيز | TransformFiles', cookiesDesc: 'كيف يستخدم TransformFiles ملفات تعريف الارتباط.', blogTitle: 'المدونة | TransformFiles', blogDesc: 'نصائح حول تحويل الملفات.' }
  },
  tr: {
    nav: { home: 'Ana Sayfa', pdfEditor: 'PDF Düzenleyici', resumeMaker: 'Özgeçmiş Oluşturucu', about: 'Hakkımızda', blog: 'Blog', startConverting: 'Dönüştürmeye Başla' },
    hero: { badge: '2M+ kullanıcı tarafından güveniliyor', title: 'Herhangi bir dosyayı dönüştürün', titleHighlight: 'Saniyeler içinde', description: 'En hızlı çevrimiçi dosya dönüştürücü. Video, resim, ses, belge ve daha fazlasını dönüştürün. Ücretsiz, güvenli, kayıt gerekmez.', dropzone: 'Dosyaları buraya sürükleyip bırakın veya göz atmak için tıklayın', dragActive: 'Dosyaları buraya bırakın...', orBrowse: 'veya dosyalara göz atın', supportedFormats: '1500+ format destekleniyor', trusted: 'Milyonlar güveniyor' },
    features: { title: 'Neden TransformFiles?', subtitle: 'Webdeki en güçlü dosya dönüştürücü', lightning: { title: 'Çok Hızlı', desc: 'Dosyaları saniyeler içinde dönüştürün' }, secure: { title: '%100 Güvenli', desc: 'Dosyalar şifrelenir ve otomatik silinir' }, formats: { title: '1500+ Format', desc: 'Neredeyse her dosya formatını destekler' }, free: { title: 'Her Zaman Ücretsiz', desc: 'Gizli ücret yok, tamamen ücretsiz' }, quality: { title: 'Yüksek Kalite', desc: 'Orijinal kaliteyi korur' }, mobile: { title: 'Mobil Uyumlu', desc: 'Her cihazda mükemmel çalışır' } },
    footer: { description: 'En hızlı ve güvenilir çevrimiçi dosya dönüştürücü.', tools: 'Araçlar', converters: 'Dönüştürücüler', company: 'Şirket', legal: 'Yasal', copyright: '© 2024 TransformFiles.app. Tüm hakları saklıdır.' },
    about: { title: 'Dosya dönüşümünü', subtitle: 'Herkes için erişilebilir yapıyoruz', ourStory: 'Hikayemiz', storyContent: ['TransformFiles basit bir hayal kırıklığından doğdu.', 'En hızlı dönüştürücüyü yaptık.', 'Bugün TransformFiles dünya çapında milyonlarca kullanıcıya hizmet veriyor.'], values: 'Değerlerimiz', valuesSubtitle: 'Bizi yönlendiren ilkeler', team: 'Ekibimiz', teamSubtitle: 'TransformFiles arkasındaki tutkulu insanlar', contact: 'İletişim', contactSubtitle: 'Sorularınız veya geri bildiriminiz mi var?' },
    privacy: { title: 'Gizlilik Politikası', subtitle: 'Gizliliğiniz önemlidir', intro: 'TransformFiles olarak gizliliğinizi ciddiye alıyoruz.' },
    terms: { title: 'Hizmet Şartları', subtitle: 'Yasal', intro: 'TransformFiles\'a hoş geldiniz.' },
    cookies: { title: 'Çerez Politikası', subtitle: 'Çerezleri nasıl kullanıyoruz', intro: 'Bu politika TransformFiles\'ın çerezleri nasıl kullandığını açıklar.' },
    blog: { title: 'Blog ve Kaynaklar', subtitle: 'Dosya dönüştürme ipuçları ve rehberler', readMore: 'Devamını oku' },
    converter: { upload: 'Dosya yükle', convert: 'Dönüştür', download: 'İndir', converting: 'Dönüştürülüyor...', completed: 'Tamamlandı', failed: 'Başarısız', selectFormat: 'Format seç', removeAll: 'Tümünü kaldır' },
    meta: { homeTitle: 'TransformFiles - Ücretsiz Çevrimiçi Dosya Dönüştürücü', homeDesc: 'Dosyaları çevrimiçi ücretsiz dönüştürün.', aboutTitle: 'Hakkımızda | TransformFiles', aboutDesc: 'TransformFiles\'ın misyonunu öğrenin.', privacyTitle: 'Gizlilik | TransformFiles', privacyDesc: 'TransformFiles verilerinizi nasıl koruyor.', termsTitle: 'Şartlar | TransformFiles', termsDesc: 'TransformFiles hizmet şartlarını okuyun.', cookiesTitle: 'Çerezler | TransformFiles', cookiesDesc: 'TransformFiles çerezleri nasıl kullanıyor.', blogTitle: 'Blog | TransformFiles', blogDesc: 'Dosya dönüştürme ipuçları.' }
  },
  hi: {
    nav: { home: 'होम', pdfEditor: 'PDF संपादक', resumeMaker: 'रिज्यूमे बनाएं', about: 'हमारे बारे में', blog: 'ब्लॉग', startConverting: 'कन्वर्ट करना शुरू करें' },
    hero: { badge: '2M+ उपयोगकर्ताओं द्वारा विश्वसनीय', title: 'किसी भी फ़ाइल को बदलें', titleHighlight: 'सेकंडों में', description: 'सबसे तेज़ ऑनलाइन फ़ाइल कन्वर्टर। वीडियो, इमेज, ऑडियो, दस्तावेज़ और बहुत कुछ कन्वर्ट करें। मुफ़्त, सुरक्षित, पंजीकरण की आवश्यकता नहीं।', dropzone: 'फ़ाइलें यहाँ खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें', dragActive: 'फ़ाइलें यहाँ छोड़ें...', orBrowse: 'या फ़ाइलें ब्राउज़ करें', supportedFormats: '1500+ फॉर्मेट समर्थित', trusted: 'लाखों हम पर भरोसा करते हैं' },
    features: { title: 'TransformFiles क्यों?', subtitle: 'वेब पर सबसे शक्तिशाली फ़ाइल कन्वर्टर', lightning: { title: 'बिजली की तरह तेज़', desc: 'सेकंडों में फ़ाइलें कन्वर्ट करें' }, secure: { title: '100% सुरक्षित', desc: 'फ़ाइलें एन्क्रिप्टेड और स्वचालित रूप से हटाई जाती हैं' }, formats: { title: '1500+ फॉर्मेट', desc: 'लगभग किसी भी फ़ाइल फॉर्मेट का समर्थन' }, free: { title: 'हमेशा मुफ़्त', desc: 'कोई छिपी फीस नहीं, पूरी तरह मुफ़्त' }, quality: { title: 'उच्च गुणवत्ता', desc: 'मूल गुणवत्ता बनाए रखें' }, mobile: { title: 'मोबाइल फ्रेंडली', desc: 'किसी भी डिवाइस पर पूरी तरह काम करता है' } },
    footer: { description: 'सबसे तेज़ और सबसे विश्वसनीय ऑनलाइन फ़ाइल कन्वर्टर।', tools: 'उपकरण', converters: 'कन्वर्टर', company: 'कंपनी', legal: 'कानूनी', copyright: '© 2024 TransformFiles.app. सर्वाधिकार सुरक्षित।' },
    about: { title: 'फ़ाइल रूपांतरण को', subtitle: 'सभी के लिए सुलभ बनाना', ourStory: 'हमारी कहानी', storyContent: ['TransformFiles एक साधारण निराशा से पैदा हुआ।', 'हमने सबसे तेज़ कन्वर्टर बनाया।', 'आज TransformFiles दुनिया भर में लाखों उपयोगकर्ताओं की सेवा करता है।'], values: 'हमारे मूल्य', valuesSubtitle: 'वे सिद्धांत जो हमें मार्गदर्शन करते हैं', team: 'हमारी टीम', teamSubtitle: 'TransformFiles के पीछे के जुनूनी लोग', contact: 'संपर्क करें', contactSubtitle: 'प्रश्न या प्रतिक्रिया है?' },
    privacy: { title: 'गोपनीयता नीति', subtitle: 'आपकी गोपनीयता महत्वपूर्ण है', intro: 'TransformFiles में, हम आपकी गोपनीयता को गंभीरता से लेते हैं।' },
    terms: { title: 'सेवा की शर्तें', subtitle: 'कानूनी', intro: 'TransformFiles में आपका स्वागत है।' },
    cookies: { title: 'कुकी नीति', subtitle: 'हम कुकीज़ का उपयोग कैसे करते हैं', intro: 'यह नीति बताती है कि TransformFiles कुकीज़ का उपयोग कैसे करता है।' },
    blog: { title: 'ब्लॉग और संसाधन', subtitle: 'फ़ाइल रूपांतरण युक्तियाँ और गाइड', readMore: 'और पढ़ें' },
    converter: { upload: 'फ़ाइलें अपलोड करें', convert: 'कन्वर्ट करें', download: 'डाउनलोड करें', converting: 'कन्वर्ट हो रहा है...', completed: 'पूर्ण', failed: 'विफल', selectFormat: 'फॉर्मेट चुनें', removeAll: 'सभी हटाएं' },
    meta: { homeTitle: 'TransformFiles - मुफ़्त ऑनलाइन फ़ाइल कन्वर्टर', homeDesc: 'ऑनलाइन मुफ़्त में फ़ाइलें कन्वर्ट करें।', aboutTitle: 'हमारे बारे में | TransformFiles', aboutDesc: 'TransformFiles के मिशन के बारे में जानें।', privacyTitle: 'गोपनीयता | TransformFiles', privacyDesc: 'TransformFiles आपके डेटा की सुरक्षा कैसे करता है।', termsTitle: 'शर्तें | TransformFiles', termsDesc: 'TransformFiles की सेवा शर्तें पढ़ें।', cookiesTitle: 'कुकीज़ | TransformFiles', cookiesDesc: 'TransformFiles कुकीज़ का उपयोग कैसे करता है।', blogTitle: 'ब्लॉग | TransformFiles', blogDesc: 'फ़ाइल रूपांतरण युक्तियाँ।' }
  }
};

export const getTranslation = (lang: Language) => translations[lang] || translations.en;
