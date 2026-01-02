import { useLanguage } from "@/i18n/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = {
  en: [
    {
      question: "Is TransformFiles really free to use?",
      answer: "Yes, TransformFiles is completely free. We don't require any registration, subscriptions, or hidden fees. You can convert unlimited files without paying anything. We're supported by non-intrusive advertising to keep the service free for everyone."
    },
    {
      question: "How secure are my files during conversion?",
      answer: "Your security is our top priority. All file transfers are encrypted using SSL/TLS. Files are processed on secure servers and automatically deleted within 2 hours of conversion. We never store, share, or analyze your files. Your data remains completely private."
    },
    {
      question: "What file formats does TransformFiles support?",
      answer: "We support over 1500+ file formats including: Video (MP4, AVI, MKV, MOV, WebM), Images (JPG, PNG, WebP, GIF, SVG, HEIC), Audio (MP3, WAV, FLAC, AAC, OGG), Documents (PDF, DOCX, XLSX, PPTX), and many more specialized formats."
    },
    {
      question: "Is there a file size limit for conversions?",
      answer: "For free users, we support files up to 100MB for most formats. Video files can be up to 500MB. There's no limit on the number of files you can convert. For larger files, consider our premium options or split your files into smaller parts."
    },
    {
      question: "How long does file conversion take?",
      answer: "Most conversions complete within seconds. The exact time depends on the file size, format complexity, and current server load. Video conversions typically take 1-2 minutes per 100MB. You'll see a real-time progress indicator during conversion."
    },
    {
      question: "Do I need to install any software?",
      answer: "No software installation required! TransformFiles works entirely in your web browser. Simply upload your file, select the output format, and download your converted file. Works on Windows, Mac, Linux, iOS, Android, and any device with a modern browser."
    },
    {
      question: "What is the quality of converted files?",
      answer: "We prioritize maintaining the highest quality possible. Our conversion algorithms preserve original resolution, bitrate, and quality settings. For video and audio, you can choose quality presets ranging from compressed (smaller file size) to lossless (original quality)."
    },
    {
      question: "Can I convert multiple files at once?",
      answer: "Yes! TransformFiles supports batch conversion. Upload multiple files simultaneously, select your desired output format, and convert them all at once. This saves significant time when you have many files to process."
    },
    {
      question: "How do I edit a PDF file?",
      answer: "Use our free PDF Editor tool. You can merge multiple PDFs, split pages, compress file size, rotate pages, add watermarks, and even draw or add text annotations. Upload your PDF and choose from our suite of editing tools."
    },
    {
      question: "Is TransformFiles GDPR compliant?",
      answer: "Yes, we are fully GDPR compliant. We respect your privacy rights, collect minimal data, and provide transparent information about our data practices. You have full control over your data and can request deletion at any time."
    },
    {
      question: "What AI tools are available on TransformFiles?",
      answer: "TransformFiles offers a suite of free AI tools including: AI Translator (100+ languages), Grammar Fixer, Text Summarizer, Paraphraser, Email Generator, Code Explainer, Background Remover, and Image Enhancer. All tools are free to use with no registration required."
    },
    {
      question: "How does the AI Translator work?",
      answer: "Our AI Translator uses advanced language models to provide accurate translations in over 100 languages. Simply paste your text, select source and target languages, and get instant translations. It handles context and nuances better than traditional translation tools."
    },
  ],
  de: [
    {
      question: "Ist TransformFiles wirklich kostenlos?",
      answer: "Ja, TransformFiles ist komplett kostenlos. Keine Registrierung, keine Abonnements, keine versteckten Gebühren. Sie können unbegrenzt Dateien konvertieren, ohne etwas zu bezahlen. Wir finanzieren uns durch unaufdringliche Werbung."
    },
    {
      question: "Wie sicher sind meine Dateien während der Konvertierung?",
      answer: "Ihre Sicherheit hat höchste Priorität. Alle Dateiübertragungen sind mit SSL/TLS verschlüsselt. Dateien werden auf sicheren Servern verarbeitet und innerhalb von 2 Stunden automatisch gelöscht. Wir speichern, teilen oder analysieren Ihre Dateien niemals."
    },
    {
      question: "Welche Dateiformate unterstützt TransformFiles?",
      answer: "Wir unterstützen über 1500+ Dateiformate: Video (MP4, AVI, MKV, MOV, WebM), Bilder (JPG, PNG, WebP, GIF, SVG, HEIC), Audio (MP3, WAV, FLAC, AAC, OGG), Dokumente (PDF, DOCX, XLSX, PPTX) und viele weitere spezialisierte Formate."
    },
    {
      question: "Gibt es eine Dateigrößenbeschränkung für Konvertierungen?",
      answer: "Für kostenlose Nutzer unterstützen wir Dateien bis zu 100MB für die meisten Formate. Videodateien können bis zu 500MB groß sein. Es gibt keine Begrenzung für die Anzahl der Dateien, die Sie konvertieren können."
    },
    {
      question: "Wie lange dauert die Dateikonvertierung?",
      answer: "Die meisten Konvertierungen sind innerhalb von Sekunden abgeschlossen. Die genaue Zeit hängt von der Dateigröße, der Formatkomplexität und der aktuellen Serverlast ab. Videokonvertierungen dauern typischerweise 1-2 Minuten pro 100MB."
    },
    {
      question: "Muss ich Software installieren?",
      answer: "Keine Softwareinstallation erforderlich! TransformFiles funktioniert vollständig in Ihrem Webbrowser. Laden Sie einfach Ihre Datei hoch, wählen Sie das Ausgabeformat und laden Sie Ihre konvertierte Datei herunter. Funktioniert auf Windows, Mac, Linux, iOS und Android."
    },
    {
      question: "Wie ist die Qualität der konvertierten Dateien?",
      answer: "Wir priorisieren die Beibehaltung der höchstmöglichen Qualität. Unsere Konvertierungsalgorithmen bewahren die ursprüngliche Auflösung, Bitrate und Qualitätseinstellungen. Für Video und Audio können Sie Qualitätsvoreinstellungen wählen."
    },
    {
      question: "Kann ich mehrere Dateien gleichzeitig konvertieren?",
      answer: "Ja! TransformFiles unterstützt Stapelkonvertierung. Laden Sie mehrere Dateien gleichzeitig hoch, wählen Sie Ihr gewünschtes Ausgabeformat und konvertieren Sie alle auf einmal. Das spart erheblich Zeit."
    },
    {
      question: "Wie bearbeite ich eine PDF-Datei?",
      answer: "Nutzen Sie unser kostenloses PDF-Editor-Tool. Sie können mehrere PDFs zusammenführen, Seiten teilen, die Dateigröße komprimieren, Seiten drehen, Wasserzeichen hinzufügen und sogar Zeichnungen oder Textanmerkungen einfügen."
    },
    {
      question: "Ist TransformFiles DSGVO-konform?",
      answer: "Ja, wir sind vollständig DSGVO-konform. Wir respektieren Ihre Datenschutzrechte, sammeln minimale Daten und bieten transparente Informationen über unsere Datenpraktiken. Sie haben volle Kontrolle über Ihre Daten."
    },
    {
      question: "Welche KI-Tools sind auf TransformFiles verfügbar?",
      answer: "TransformFiles bietet eine Reihe kostenloser KI-Tools: KI-Übersetzer (100+ Sprachen), Grammatikkorrektur, Textzusammenfassung, Umschreiber, E-Mail-Generator, Code-Erklärer, Hintergrundentferner und Bildverbesserer. Alle Tools sind kostenlos nutzbar."
    },
    {
      question: "Wie funktioniert der KI-Übersetzer?",
      answer: "Unser KI-Übersetzer verwendet fortschrittliche Sprachmodelle für präzise Übersetzungen in über 100 Sprachen. Fügen Sie einfach Ihren Text ein, wählen Sie Quell- und Zielsprache und erhalten Sie sofortige Übersetzungen."
    },
  ],
  es: [
    {
      question: "¿Es TransformFiles realmente gratis?",
      answer: "Sí, TransformFiles es completamente gratis. No requerimos registro, suscripciones ni tarifas ocultas. Puedes convertir archivos ilimitados sin pagar nada. Nos financiamos con publicidad no intrusiva."
    },
    {
      question: "¿Qué tan seguros están mis archivos durante la conversión?",
      answer: "Tu seguridad es nuestra máxima prioridad. Todas las transferencias están encriptadas con SSL/TLS. Los archivos se procesan en servidores seguros y se eliminan automáticamente en 2 horas. Nunca almacenamos, compartimos ni analizamos tus archivos."
    },
    {
      question: "¿Qué formatos de archivo soporta TransformFiles?",
      answer: "Soportamos más de 1500+ formatos: Video (MP4, AVI, MKV, MOV, WebM), Imágenes (JPG, PNG, WebP, GIF, SVG, HEIC), Audio (MP3, WAV, FLAC, AAC, OGG), Documentos (PDF, DOCX, XLSX, PPTX) y muchos más formatos especializados."
    },
    {
      question: "¿Hay un límite de tamaño de archivo para las conversiones?",
      answer: "Para usuarios gratuitos, soportamos archivos de hasta 100MB para la mayoría de formatos. Los archivos de video pueden ser de hasta 500MB. No hay límite en la cantidad de archivos que puedes convertir."
    },
    {
      question: "¿Cuánto tiempo tarda la conversión de archivos?",
      answer: "La mayoría de las conversiones se completan en segundos. El tiempo exacto depende del tamaño del archivo, la complejidad del formato y la carga del servidor. Las conversiones de video típicamente tardan 1-2 minutos por cada 100MB."
    },
    {
      question: "¿Necesito instalar algún software?",
      answer: "¡No se requiere instalación de software! TransformFiles funciona completamente en tu navegador web. Simplemente sube tu archivo, selecciona el formato de salida y descarga tu archivo convertido. Funciona en Windows, Mac, Linux, iOS y Android."
    },
    {
      question: "¿Cuál es la calidad de los archivos convertidos?",
      answer: "Priorizamos mantener la más alta calidad posible. Nuestros algoritmos de conversión preservan la resolución original, tasa de bits y configuraciones de calidad. Para video y audio, puedes elegir preajustes de calidad."
    },
    {
      question: "¿Puedo convertir múltiples archivos a la vez?",
      answer: "¡Sí! TransformFiles soporta conversión por lotes. Sube múltiples archivos simultáneamente, selecciona tu formato de salida deseado y conviértelos todos a la vez. Esto ahorra tiempo significativo."
    },
    {
      question: "¿Cómo edito un archivo PDF?",
      answer: "Usa nuestra herramienta gratuita de Editor PDF. Puedes fusionar múltiples PDFs, dividir páginas, comprimir el tamaño del archivo, rotar páginas, añadir marcas de agua e incluso dibujar o añadir anotaciones de texto."
    },
    {
      question: "¿Es TransformFiles compatible con GDPR?",
      answer: "Sí, cumplimos completamente con GDPR. Respetamos tus derechos de privacidad, recopilamos datos mínimos y proporcionamos información transparente sobre nuestras prácticas de datos. Tienes control total sobre tus datos."
    },
    {
      question: "¿Qué herramientas de IA están disponibles en TransformFiles?",
      answer: "TransformFiles ofrece un conjunto de herramientas de IA gratuitas: Traductor IA (100+ idiomas), Corrector de gramática, Resumidor de texto, Parafraseador, Generador de emails, Explicador de código, Eliminador de fondos y Mejorador de imágenes. Todas las herramientas son gratuitas."
    },
    {
      question: "¿Cómo funciona el Traductor IA?",
      answer: "Nuestro Traductor IA utiliza modelos de lenguaje avanzados para proporcionar traducciones precisas en más de 100 idiomas. Simplemente pega tu texto, selecciona los idiomas de origen y destino, y obtén traducciones instantáneas."
    },
  ],
  fr: [
    {
      question: "TransformFiles est-il vraiment gratuit?",
      answer: "Oui, TransformFiles est entièrement gratuit. Pas d'inscription, pas d'abonnement, pas de frais cachés. Vous pouvez convertir des fichiers illimités sans rien payer. Nous sommes financés par une publicité non intrusive."
    },
    {
      question: "Mes fichiers sont-ils sécurisés pendant la conversion?",
      answer: "Votre sécurité est notre priorité absolue. Tous les transferts de fichiers sont cryptés avec SSL/TLS. Les fichiers sont traités sur des serveurs sécurisés et automatiquement supprimés dans les 2 heures. Nous ne stockons, partageons ou analysons jamais vos fichiers."
    },
    {
      question: "Quels formats de fichiers TransformFiles prend-il en charge?",
      answer: "Nous prenons en charge plus de 1500+ formats: Vidéo (MP4, AVI, MKV, MOV, WebM), Images (JPG, PNG, WebP, GIF, SVG, HEIC), Audio (MP3, WAV, FLAC, AAC, OGG), Documents (PDF, DOCX, XLSX, PPTX) et bien d'autres formats spécialisés."
    },
    {
      question: "Y a-t-il une limite de taille de fichier pour les conversions?",
      answer: "Pour les utilisateurs gratuits, nous prenons en charge les fichiers jusqu'à 100 Mo pour la plupart des formats. Les fichiers vidéo peuvent atteindre 500 Mo. Il n'y a pas de limite au nombre de fichiers que vous pouvez convertir."
    },
    {
      question: "Combien de temps dure la conversion de fichiers?",
      answer: "La plupart des conversions sont terminées en quelques secondes. Le temps exact dépend de la taille du fichier, de la complexité du format et de la charge du serveur. Les conversions vidéo prennent généralement 1-2 minutes par 100 Mo."
    },
    {
      question: "Dois-je installer un logiciel?",
      answer: "Aucune installation de logiciel requise! TransformFiles fonctionne entièrement dans votre navigateur web. Téléchargez simplement votre fichier, sélectionnez le format de sortie et téléchargez votre fichier converti. Fonctionne sur Windows, Mac, Linux, iOS et Android."
    },
    {
      question: "Quelle est la qualité des fichiers convertis?",
      answer: "Nous privilégions le maintien de la plus haute qualité possible. Nos algorithmes de conversion préservent la résolution originale, le débit binaire et les paramètres de qualité. Pour la vidéo et l'audio, vous pouvez choisir des préréglages de qualité."
    },
    {
      question: "Puis-je convertir plusieurs fichiers à la fois?",
      answer: "Oui! TransformFiles prend en charge la conversion par lots. Téléchargez plusieurs fichiers simultanément, sélectionnez votre format de sortie souhaité et convertissez-les tous en une fois. Cela fait gagner un temps considérable."
    },
    {
      question: "Comment modifier un fichier PDF?",
      answer: "Utilisez notre outil gratuit d'édition PDF. Vous pouvez fusionner plusieurs PDF, diviser des pages, compresser la taille du fichier, faire pivoter des pages, ajouter des filigranes et même dessiner ou ajouter des annotations textuelles."
    },
    {
      question: "TransformFiles est-il conforme au RGPD?",
      answer: "Oui, nous sommes entièrement conformes au RGPD. Nous respectons vos droits à la vie privée, collectons un minimum de données et fournissons des informations transparentes sur nos pratiques en matière de données. Vous avez un contrôle total sur vos données."
    },
    {
      question: "Quels outils d'IA sont disponibles sur TransformFiles?",
      answer: "TransformFiles offre une suite d'outils d'IA gratuits: Traducteur IA (100+ langues), Correcteur de grammaire, Résumeur de texte, Paraphraseur, Générateur d'emails, Explicateur de code, Suppresseur d'arrière-plan et Améliorateur d'images. Tous les outils sont gratuits."
    },
    {
      question: "Comment fonctionne le Traducteur IA?",
      answer: "Notre Traducteur IA utilise des modèles de langage avancés pour fournir des traductions précises dans plus de 100 langues. Collez simplement votre texte, sélectionnez les langues source et cible, et obtenez des traductions instantanées."
    },
  ],
  it: [
    {
      question: "TransformFiles è davvero gratuito?",
      answer: "Sì, TransformFiles è completamente gratuito. Nessuna registrazione, nessun abbonamento, nessun costo nascosto. Puoi convertire file illimitati senza pagare nulla. Ci finanziamo con pubblicità non invasiva."
    },
    {
      question: "I miei file sono sicuri durante la conversione?",
      answer: "La tua sicurezza è la nostra massima priorità. Tutti i trasferimenti di file sono crittografati con SSL/TLS. I file vengono elaborati su server sicuri e automaticamente eliminati entro 2 ore. Non memorizziamo, condividiamo o analizziamo mai i tuoi file."
    },
    {
      question: "Quali formati di file supporta TransformFiles?",
      answer: "Supportiamo oltre 1500+ formati: Video (MP4, AVI, MKV, MOV, WebM), Immagini (JPG, PNG, WebP, GIF, SVG, HEIC), Audio (MP3, WAV, FLAC, AAC, OGG), Documenti (PDF, DOCX, XLSX, PPTX) e molti altri formati specializzati."
    },
    {
      question: "C'è un limite di dimensione per le conversioni?",
      answer: "Per gli utenti gratuiti, supportiamo file fino a 100MB per la maggior parte dei formati. I file video possono essere fino a 500MB. Non c'è limite al numero di file che puoi convertire."
    },
    {
      question: "Quanto tempo richiede la conversione dei file?",
      answer: "La maggior parte delle conversioni si completa in pochi secondi. Il tempo esatto dipende dalla dimensione del file, dalla complessità del formato e dal carico del server. Le conversioni video richiedono tipicamente 1-2 minuti per 100MB."
    },
    {
      question: "Devo installare qualche software?",
      answer: "Nessuna installazione software richiesta! TransformFiles funziona interamente nel tuo browser web. Carica semplicemente il tuo file, seleziona il formato di output e scarica il file convertito. Funziona su Windows, Mac, Linux, iOS e Android."
    },
    {
      question: "Qual è la qualità dei file convertiti?",
      answer: "Diamo priorità al mantenimento della massima qualità possibile. I nostri algoritmi di conversione preservano la risoluzione originale, il bitrate e le impostazioni di qualità. Per video e audio, puoi scegliere preset di qualità."
    },
    {
      question: "Posso convertire più file contemporaneamente?",
      answer: "Sì! TransformFiles supporta la conversione in batch. Carica più file simultaneamente, seleziona il formato di output desiderato e convertili tutti insieme. Questo fa risparmiare tempo significativo."
    },
    {
      question: "Come modifico un file PDF?",
      answer: "Usa il nostro strumento gratuito Editor PDF. Puoi unire più PDF, dividere pagine, comprimere le dimensioni del file, ruotare pagine, aggiungere filigrane e persino disegnare o aggiungere annotazioni di testo."
    },
    {
      question: "TransformFiles è conforme al GDPR?",
      answer: "Sì, siamo pienamente conformi al GDPR. Rispettiamo i tuoi diritti alla privacy, raccogliamo dati minimi e forniamo informazioni trasparenti sulle nostre pratiche relative ai dati. Hai il pieno controllo sui tuoi dati."
    },
    {
      question: "Quali strumenti AI sono disponibili su TransformFiles?",
      answer: "TransformFiles offre una suite di strumenti AI gratuiti: Traduttore AI (100+ lingue), Correttore grammaticale, Riassuntore di testo, Parafrasatore, Generatore di email, Spiegatore di codice, Rimozione sfondo e Miglioratore di immagini."
    },
    {
      question: "Come funziona il Traduttore AI?",
      answer: "Il nostro Traduttore AI utilizza modelli linguistici avanzati per fornire traduzioni accurate in oltre 100 lingue. Incolla semplicemente il tuo testo, seleziona le lingue di origine e destinazione e ottieni traduzioni istantanee."
    },
  ],
  pt: [
    {
      question: "O TransformFiles é realmente gratuito?",
      answer: "Sim, o TransformFiles é completamente gratuito. Não exigimos registro, assinaturas ou taxas ocultas. Você pode converter arquivos ilimitados sem pagar nada. Somos financiados por publicidade não intrusiva."
    },
    {
      question: "Meus arquivos estão seguros durante a conversão?",
      answer: "Sua segurança é nossa máxima prioridade. Todas as transferências de arquivos são criptografadas com SSL/TLS. Os arquivos são processados em servidores seguros e automaticamente excluídos em 2 horas. Nunca armazenamos, compartilhamos ou analisamos seus arquivos."
    },
    {
      question: "Quais formatos de arquivo o TransformFiles suporta?",
      answer: "Suportamos mais de 1500+ formatos: Vídeo (MP4, AVI, MKV, MOV, WebM), Imagens (JPG, PNG, WebP, GIF, SVG, HEIC), Áudio (MP3, WAV, FLAC, AAC, OGG), Documentos (PDF, DOCX, XLSX, PPTX) e muitos mais formatos especializados."
    },
    {
      question: "Existe um limite de tamanho de arquivo para conversões?",
      answer: "Para usuários gratuitos, suportamos arquivos de até 100MB para a maioria dos formatos. Arquivos de vídeo podem ter até 500MB. Não há limite para o número de arquivos que você pode converter."
    },
    {
      question: "Quanto tempo leva a conversão de arquivos?",
      answer: "A maioria das conversões é concluída em segundos. O tempo exato depende do tamanho do arquivo, complexidade do formato e carga do servidor. Conversões de vídeo geralmente levam 1-2 minutos por 100MB."
    },
    {
      question: "Preciso instalar algum software?",
      answer: "Nenhuma instalação de software necessária! O TransformFiles funciona inteiramente no seu navegador. Basta fazer upload do arquivo, selecionar o formato de saída e baixar o arquivo convertido. Funciona em Windows, Mac, Linux, iOS e Android."
    },
    {
      question: "Qual é a qualidade dos arquivos convertidos?",
      answer: "Priorizamos manter a mais alta qualidade possível. Nossos algoritmos de conversão preservam a resolução original, taxa de bits e configurações de qualidade. Para vídeo e áudio, você pode escolher predefinições de qualidade."
    },
    {
      question: "Posso converter vários arquivos de uma vez?",
      answer: "Sim! O TransformFiles suporta conversão em lote. Faça upload de vários arquivos simultaneamente, selecione o formato de saída desejado e converta todos de uma vez. Isso economiza tempo significativo."
    },
    {
      question: "Como edito um arquivo PDF?",
      answer: "Use nossa ferramenta gratuita de Editor PDF. Você pode mesclar vários PDFs, dividir páginas, comprimir o tamanho do arquivo, girar páginas, adicionar marcas d'água e até desenhar ou adicionar anotações de texto."
    },
    {
      question: "O TransformFiles é compatível com LGPD/GDPR?",
      answer: "Sim, somos totalmente compatíveis com LGPD e GDPR. Respeitamos seus direitos de privacidade, coletamos dados mínimos e fornecemos informações transparentes sobre nossas práticas de dados. Você tem controle total sobre seus dados."
    },
    {
      question: "Quais ferramentas de IA estão disponíveis no TransformFiles?",
      answer: "O TransformFiles oferece um conjunto de ferramentas de IA gratuitas: Tradutor IA (100+ idiomas), Corretor gramatical, Resumidor de texto, Parafraseador, Gerador de emails, Explicador de código, Removedor de fundo e Melhorador de imagens."
    },
    {
      question: "Como funciona o Tradutor IA?",
      answer: "Nosso Tradutor IA usa modelos de linguagem avançados para fornecer traduções precisas em mais de 100 idiomas. Basta colar seu texto, selecionar os idiomas de origem e destino e obter traduções instantâneas."
    },
  ],
};

// Helper function to get FAQs for a language with fallback
const getFAQsForLanguage = (lang: string) => {
  return faqs[lang as keyof typeof faqs] || faqs.en;
};

// Translated section titles
const sectionText = {
  en: { title: "Frequently Asked", highlight: "Questions", subtitle: "Everything you need to know about TransformFiles", stillHaveQuestions: "Still have questions?", helpText: "We're here to help. Contact our support team anytime." },
  de: { title: "Häufig gestellte", highlight: "Fragen", subtitle: "Alles, was Sie über TransformFiles wissen müssen", stillHaveQuestions: "Noch Fragen?", helpText: "Wir helfen Ihnen gerne. Kontaktieren Sie unser Support-Team." },
  es: { title: "Preguntas", highlight: "Frecuentes", subtitle: "Todo lo que necesitas saber sobre TransformFiles", stillHaveQuestions: "¿Aún tienes preguntas?", helpText: "Estamos aquí para ayudar. Contacta a nuestro equipo de soporte." },
  fr: { title: "Questions", highlight: "Fréquentes", subtitle: "Tout ce que vous devez savoir sur TransformFiles", stillHaveQuestions: "Encore des questions?", helpText: "Nous sommes là pour vous aider. Contactez notre équipe de support." },
  it: { title: "Domande", highlight: "Frequenti", subtitle: "Tutto ciò che devi sapere su TransformFiles", stillHaveQuestions: "Hai ancora domande?", helpText: "Siamo qui per aiutarti. Contatta il nostro team di supporto." },
  pt: { title: "Perguntas", highlight: "Frequentes", subtitle: "Tudo o que você precisa saber sobre o TransformFiles", stillHaveQuestions: "Ainda tem perguntas?", helpText: "Estamos aqui para ajudar. Entre em contato com nossa equipe de suporte." },
};

const getSectionText = (lang: string) => {
  return sectionText[lang as keyof typeof sectionText] || sectionText.en;
};

const FAQSection = () => {
  const { language } = useLanguage();
  
  const currentFaqs = getFAQsForLanguage(language);
  const text = getSectionText(language);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">FAQ</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {text.title} <span className="text-gradient">{text.highlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {text.subtitle}
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {currentFaqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 text-center glass rounded-xl p-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              {text.stillHaveQuestions}
            </h3>
            <p className="text-muted-foreground mb-4">
              {text.helpText}
            </p>
            <a 
              href="mailto:support@transformfiles.com" 
              className="text-primary hover:underline font-medium"
            >
              support@transformfiles.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;