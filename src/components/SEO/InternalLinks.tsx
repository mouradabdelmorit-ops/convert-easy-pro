import { Link } from "react-router-dom";
import { getRelatedTools, allTools, type ConversionTool } from "@/data/conversionTools";
import { ArrowRight, Video, Image, Music, FileText, Sparkles } from "lucide-react";

interface InternalLinksProps {
  toolId: string;
  categoryPath: string;
}

const getCategoryIcon = (category: ConversionTool['category']) => {
  switch (category) {
    case 'video': return Video;
    case 'image': return Image;
    case 'audio': return Music;
    case 'pdf': return FileText;
    case 'ai': return Sparkles;
    default: return FileText;
  }
};

const getCategoryColor = (category: ConversionTool['category']) => {
  switch (category) {
    case 'video': return 'text-red-500 bg-red-500/10';
    case 'image': return 'text-green-500 bg-green-500/10';
    case 'audio': return 'text-purple-500 bg-purple-500/10';
    case 'pdf': return 'text-orange-500 bg-orange-500/10';
    case 'ai': return 'text-blue-500 bg-blue-500/10';
    default: return 'text-primary bg-primary/10';
  }
};

const InternalLinks = ({ toolId, categoryPath }: InternalLinksProps) => {
  const relatedTools = getRelatedTools(toolId);
  
  // Get more tools from the same category
  const sameCategoryTools = allTools
    .filter(t => t.category === categoryPath && t.id !== toolId)
    .slice(0, 6);
  
  // Get popular tools from other categories
  const otherCategoryTools = allTools
    .filter(t => t.category !== categoryPath && !relatedTools.find(r => r.id === t.id))
    .slice(0, 6);

  return (
    <section className="py-12 md:py-16 bg-navy-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-primary" />
                Related Tools You Might Need
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedTools.map((tool) => {
                  const Icon = getCategoryIcon(tool.category);
                  const colorClass = getCategoryColor(tool.category);
                  return (
                    <Link
                      key={tool.id}
                      to={`/${tool.category}/${tool.slug}`}
                      className="group p-5 bg-secondary/30 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:bg-secondary/50"
                    >
                      <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center mb-3`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.metaDescription.slice(0, 80)}...
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Same Category Tools */}
          {sameCategoryTools.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                More {categoryPath.charAt(0).toUpperCase() + categoryPath.slice(1)} Tools
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sameCategoryTools.map((tool) => {
                  const Icon = getCategoryIcon(tool.category);
                  const colorClass = getCategoryColor(tool.category);
                  return (
                    <Link
                      key={tool.id}
                      to={`/${tool.category}/${tool.slug}`}
                      className="group flex items-center gap-4 p-4 bg-secondary/20 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300"
                    >
                      <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">Free • No signup</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other Popular Tools */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Explore More Free Tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherCategoryTools.map((tool) => {
                const Icon = getCategoryIcon(tool.category);
                const colorClass = getCategoryColor(tool.category);
                return (
                  <Link
                    key={tool.id}
                    to={`/${tool.category}/${tool.slug}`}
                    className="group flex items-center gap-4 p-4 bg-secondary/10 rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-muted-foreground capitalize">{tool.category} Tool</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Category Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Browse by Category</h3>
            <div className="flex flex-wrap gap-3">
              <Link to="/video-converter" className="px-4 py-2 bg-red-500/10 text-red-500 rounded-full text-sm font-medium hover:bg-red-500/20 transition-colors">
                Video Converters
              </Link>
              <Link to="/image-converter" className="px-4 py-2 bg-green-500/10 text-green-500 rounded-full text-sm font-medium hover:bg-green-500/20 transition-colors">
                Image Converters
              </Link>
              <Link to="/audio-converter" className="px-4 py-2 bg-purple-500/10 text-purple-500 rounded-full text-sm font-medium hover:bg-purple-500/20 transition-colors">
                Audio Converters
              </Link>
              <Link to="/pdf-editor" className="px-4 py-2 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium hover:bg-orange-500/20 transition-colors">
                PDF Tools
              </Link>
              <Link to="/ai-tools" className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium hover:bg-blue-500/20 transition-colors">
                AI Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalLinks;
