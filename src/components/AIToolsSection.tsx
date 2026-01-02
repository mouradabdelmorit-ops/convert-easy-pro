import { Link } from "react-router-dom";
import { 
  Code, ImageIcon, Wand2, FileText, CheckCircle, Mail, 
  Languages, RefreshCw, Code2, ArrowRight, Sparkles 
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

const AIToolsSection = () => {
  const { getLocalizedPath, t } = useLanguage();

  const tools = [
    {
      icon: Code,
      title: t.aiTools.imageToCode.title,
      description: t.aiTools.imageToCode.desc,
      path: "/image-to-code",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ImageIcon,
      title: t.aiTools.backgroundRemover.title,
      description: t.aiTools.backgroundRemover.desc,
      path: "/background-remover",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FileText,
      title: t.aiTools.textSummarizer.title,
      description: t.aiTools.textSummarizer.desc,
      path: "/text-summarizer",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckCircle,
      title: t.aiTools.grammarFixer.title,
      description: t.aiTools.grammarFixer.desc,
      path: "/grammar-fixer",
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      icon: Mail,
      title: t.aiTools.emailGenerator.title,
      description: t.aiTools.emailGenerator.desc,
      path: "/email-generator",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      icon: Languages,
      title: t.aiTools.translator.title,
      description: t.aiTools.translator.desc,
      path: "/translator",
      gradient: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{t.aiTools.badge}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.aiTools.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.aiTools.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={getLocalizedPath(tool.path)}
              className="group bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link to={getLocalizedPath("/ai-tools")}>
              {t.aiTools.viewAll}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
