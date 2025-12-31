import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./i18n/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import AIChatAssistant from "./components/AIChatAssistant";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import PDFEditor from "./pages/PDFEditor";
import ResumeMaker from "./pages/ResumeMaker";
import CookiePolicy from "./pages/CookiePolicy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Compress from "./pages/Compress";
import VideoConverter from "./pages/converters/VideoConverter";
import ImageConverter from "./pages/converters/ImageConverter";
import AudioConverter from "./pages/converters/AudioConverter";
import DocumentConverter from "./pages/converters/DocumentConverter";
import AITools from "./pages/ai/AITools";
import ImageToCode from "./pages/ai/ImageToCode";
import BackgroundRemover from "./pages/ai/BackgroundRemover";
import ImageEnhancer from "./pages/ai/ImageEnhancer";
import TextSummarizer from "./pages/ai/TextSummarizer";
import GrammarFixer from "./pages/ai/GrammarFixer";
import EmailGenerator from "./pages/ai/EmailGenerator";
import Translator from "./pages/ai/Translator";
import Paraphraser from "./pages/ai/Paraphraser";
import CodeExplainer from "./pages/ai/CodeExplainer";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// AI Tools routes component
const AIToolsRoutes = () => (
  <>
    <Route path="ai-tools" element={<AITools />} />
    <Route path="image-to-code" element={<ImageToCode />} />
    <Route path="background-remover" element={<BackgroundRemover />} />
    <Route path="image-enhancer" element={<ImageEnhancer />} />
    <Route path="text-summarizer" element={<TextSummarizer />} />
    <Route path="grammar-fixer" element={<GrammarFixer />} />
    <Route path="email-generator" element={<EmailGenerator />} />
    <Route path="translator" element={<Translator />} />
    <Route path="paraphraser" element={<Paraphraser />} />
    <Route path="code-explainer" element={<CodeExplainer />} />
  </>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <ScrollToTop />
            <Routes>
              {/* English (default) routes */}
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/about" element={<About />} />
              <Route path="/pdf-editor" element={<PDFEditor />} />
              <Route path="/resume-maker" element={<ResumeMaker />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/compress" element={<Compress />} />
              <Route path="/video-converter" element={<VideoConverter />} />
              <Route path="/image-converter" element={<ImageConverter />} />
              <Route path="/audio-converter" element={<AudioConverter />} />
              <Route path="/document-converter" element={<DocumentConverter />} />
              
              {/* AI Tools routes */}
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/image-to-code" element={<ImageToCode />} />
              <Route path="/background-remover" element={<BackgroundRemover />} />
              <Route path="/image-enhancer" element={<ImageEnhancer />} />
              <Route path="/text-summarizer" element={<TextSummarizer />} />
              <Route path="/grammar-fixer" element={<GrammarFixer />} />
              <Route path="/email-generator" element={<EmailGenerator />} />
              <Route path="/translator" element={<Translator />} />
              <Route path="/paraphraser" element={<Paraphraser />} />
              <Route path="/code-explainer" element={<CodeExplainer />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Language prefixed routes */}
              {['de', 'es', 'fr', 'it', 'pt', 'nl', 'pl', 'ru', 'ja', 'zh', 'ko', 'ar', 'tr', 'hi'].map((lang) => (
                <Route key={lang} path={`/${lang}/*`}>
                  <Route index element={<Index />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="about" element={<About />} />
                  <Route path="pdf-editor" element={<PDFEditor />} />
                  <Route path="resume-maker" element={<ResumeMaker />} />
                  <Route path="cookies" element={<CookiePolicy />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:slug" element={<BlogPost />} />
                  <Route path="compress" element={<Compress />} />
                  <Route path="video-converter" element={<VideoConverter />} />
                  <Route path="image-converter" element={<ImageConverter />} />
                  <Route path="audio-converter" element={<AudioConverter />} />
                  <Route path="document-converter" element={<DocumentConverter />} />
                  {/* AI Tools */}
                  <Route path="ai-tools" element={<AITools />} />
                  <Route path="image-to-code" element={<ImageToCode />} />
                  <Route path="background-remover" element={<BackgroundRemover />} />
                  <Route path="image-enhancer" element={<ImageEnhancer />} />
                  <Route path="text-summarizer" element={<TextSummarizer />} />
                  <Route path="grammar-fixer" element={<GrammarFixer />} />
                  <Route path="email-generator" element={<EmailGenerator />} />
                  <Route path="translator" element={<Translator />} />
                  <Route path="paraphraser" element={<Paraphraser />} />
                  <Route path="code-explainer" element={<CodeExplainer />} />
                </Route>
              ))}
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIChatAssistant />
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
