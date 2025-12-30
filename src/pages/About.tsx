import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  Users, Target, Heart, Zap, Mail, MapPin, Phone,
  Linkedin, Twitter, Github
} from "lucide-react";

const About = () => {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "We believe file conversion should be instant. Our infrastructure is optimized for the fastest possible conversions."
    },
    {
      icon: Heart,
      title: "User-First Design",
      description: "Every feature we build starts with user feedback. Your experience is at the heart of everything we do."
    },
    {
      icon: Target,
      title: "Quality & Accuracy",
      description: "We maintain the highest standards for file quality. Your converted files will always match the original."
    }
  ];

  const team = [
    { name: "Alex Chen", role: "Founder & CEO", image: "AC" },
    { name: "Sarah Johnson", role: "Head of Engineering", image: "SJ" },
    { name: "Michael Park", role: "Product Lead", image: "MP" },
    { name: "Emily Davis", role: "Design Director", image: "ED" },
  ];

  const stats = [
    { value: "10M+", label: "Files Converted" },
    { value: "1500+", label: "Formats Supported" },
    { value: "99.9%", label: "Uptime" },
    { value: "180+", label: "Countries" },
  ];

  const canonicalUrl = language === 'en' 
    ? 'https://transformfiles.app/about' 
    : `https://transformfiles.app/${language}/about`;

  return (
    <>
      <Helmet>
        <title>{t.meta.aboutTitle}</title>
        <meta name="description" content={t.meta.aboutDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t.meta.aboutTitle} />
        <meta property="og:description" content={t.meta.aboutDesc} />
        <html lang={language} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          {/* Hero */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{t.nav.about}</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  {t.about.title}{" "}
                  <span className="text-gradient">{t.about.subtitle}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  {t.hero.description}
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="glass rounded-2xl p-8 md:p-12">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {t.about.ourStory}
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {t.about.storyContent.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 md:py-24 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t.about.values}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t.about.valuesSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {values.map((value, index) => (
                  <div key={index} className="glass rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t.about.team}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t.about.teamSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {team.map((member, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-2xl gradient-teal flex items-center justify-center text-2xl md:text-3xl font-bold text-primary-foreground group-hover:glow-teal transition-all duration-300">
                      {member.image}
                    </div>
                    <h3 className="font-display font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="py-16 md:py-24 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {t.about.contact}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {t.about.contactSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <div className="glass rounded-2xl p-8">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="text-foreground">hello@transformfiles.app</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="text-foreground">123 Tech Street, San Francisco, CA</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="text-foreground">+1 (555) 123-4567</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-4">Follow us</p>
                      <div className="flex items-center gap-4">
                        <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                          <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                          <Github className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="glass rounded-2xl p-8">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                      Send us a message
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          placeholder="How can we help?"
                        />
                      </div>
                      <Button variant="hero" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
