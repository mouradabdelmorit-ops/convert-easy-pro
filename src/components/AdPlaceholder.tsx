interface AdPlaceholderProps {
  size: "banner" | "rectangle" | "leaderboard" | "skyscraper";
  className?: string;
}

const AdPlaceholder = ({ size, className = "" }: AdPlaceholderProps) => {
  const sizeClasses = {
    banner: "h-[90px] w-full max-w-[728px]",
    rectangle: "h-[250px] w-[300px]",
    leaderboard: "h-[90px] w-full max-w-[970px]",
    skyscraper: "h-[600px] w-[160px]",
  };

  return (
    <div
      className={`bg-navy-medium border border-border/50 rounded-lg flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      <div className="text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Advertisement
        </p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
