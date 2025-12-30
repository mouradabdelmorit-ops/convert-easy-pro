import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import PDFEditor from "./pages/PDFEditor";
import ResumeMaker from "./pages/ResumeMaker";
import CookiePolicy from "./pages/CookiePolicy";
import VideoConverter from "./pages/converters/VideoConverter";
import ImageConverter from "./pages/converters/ImageConverter";
import AudioConverter from "./pages/converters/AudioConverter";
import DocumentConverter from "./pages/converters/DocumentConverter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/pdf-editor" element={<PDFEditor />} />
            <Route path="/resume-maker" element={<ResumeMaker />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/video-converter" element={<VideoConverter />} />
            <Route path="/image-converter" element={<ImageConverter />} />
            <Route path="/audio-converter" element={<AudioConverter />} />
            <Route path="/document-converter" element={<DocumentConverter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
