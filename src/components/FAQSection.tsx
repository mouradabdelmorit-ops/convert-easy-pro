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
  ],
  de: [
    {
      question: "Ist TransformFiles wirklich kostenlos?",
      answer: "Ja, TransformFiles ist komplett kostenlos. Keine Registrierung, keine Abonnements, keine versteckten Gebühren. Sie können unbegrenzt Dateien konvertieren, ohne etwas zu bezahlen."
    },
    {
      question: "Wie sicher sind meine Dateien?",
      answer: "Ihre Sicherheit hat höchste Priorität. Alle Übertragungen sind SSL/TLS-verschlüsselt. Dateien werden nach 2 Stunden automatisch gelöscht. Wir speichern oder analysieren Ihre Dateien niemals."
    },
    {
      question: "Welche Dateiformate werden unterstützt?",
      answer: "Wir unterstützen über 1500+ Formate: Video (MP4, AVI, MKV), Bilder (JPG, PNG, WebP), Audio (MP3, WAV, FLAC), Dokumente (PDF, DOCX, XLSX) und viele mehr."
    },
  ],
  es: [
    {
      question: "¿Es TransformFiles realmente gratis?",
      answer: "Sí, TransformFiles es completamente gratis. No requerimos registro, suscripciones ni tarifas ocultas. Puedes convertir archivos ilimitados sin pagar nada."
    },
    {
      question: "¿Qué tan seguros están mis archivos?",
      answer: "Tu seguridad es nuestra máxima prioridad. Todas las transferencias están encriptadas con SSL/TLS. Los archivos se eliminan automáticamente en 2 horas. Nunca almacenamos ni analizamos tus archivos."
    },
    {
      question: "¿Qué formatos de archivo son compatibles?",
      answer: "Soportamos más de 1500+ formatos: Video (MP4, AVI, MKV), Imágenes (JPG, PNG, WebP), Audio (MP3, WAV, FLAC), Documentos (PDF, DOCX, XLSX) y muchos más."
    },
  ],
  fr: [
    {
      question: "TransformFiles est-il vraiment gratuit?",
      answer: "Oui, TransformFiles est entièrement gratuit. Pas d'inscription, pas d'abonnement, pas de frais cachés. Vous pouvez convertir des fichiers illimités sans rien payer."
    },
    {
      question: "Mes fichiers sont-ils sécurisés?",
      answer: "Votre sécurité est notre priorité. Tous les transferts sont cryptés SSL/TLS. Les fichiers sont automatiquement supprimés après 2 heures. Nous ne stockons ni n'analysons jamais vos fichiers."
    },
    {
      question: "Quels formats de fichiers sont pris en charge?",
      answer: "Nous prenons en charge plus de 1500+ formats: Vidéo (MP4, AVI, MKV), Images (JPG, PNG, WebP), Audio (MP3, WAV, FLAC), Documents (PDF, DOCX, XLSX) et bien plus."
    },
  ],
};

const FAQSection = () => {
  const { language } = useLanguage();
  
  // Get FAQs for current language, fallback to English
  const currentFaqs = faqs[language as keyof typeof faqs] || faqs.en;

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
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about TransformFiles
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
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              We're here to help. Contact our support team anytime.
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
