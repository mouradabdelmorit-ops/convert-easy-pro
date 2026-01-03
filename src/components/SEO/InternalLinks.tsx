import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getRelatedTools, type ConversionTool } from "@/data/conversionTools";

interface InternalLinksProps {
  toolId: string;
  categoryPath: string;
}

const getCategoryPath = (category: ConversionTool['category']): string => {
  switch (category) {
    case 'video': return 'video';
    case 'audio': return 'audio';
    case 'image': return 'image';
    case 'pdf': return 'pdf';
    case 'ai': return 'ai';
    default: return '';
  }
};

const InternalLinks = ({ toolId, categoryPath }: InternalLinksProps) => {
  const relatedTools = getRelatedTools(toolId);

  if (relatedTools.length === 0) return null;

  return (
    <section className="py-12 bg-navy-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Related Tools You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/${getCategoryPath(tool.category)}/${tool.slug}`}
                className="glass rounded-xl p-4 hover:bg-primary/5 transition-all group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {tool.metaDescription.slice(0, 80)}...
                </p>
                <span className="inline-flex items-center text-primary text-sm font-medium">
                  Try Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalLinks;
