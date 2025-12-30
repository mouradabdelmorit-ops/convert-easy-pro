import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cookie, Shield, Settings, Info, Clock, Mail } from "lucide-react";

const sections = [
  {
    icon: Cookie,
    title: "What Are Cookies",
    content: `Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.

Cookies can be "session" cookies (deleted when you close your browser) or "persistent" cookies (remain on your device for a set period or until you delete them).`
  },
  {
    icon: Shield,
    title: "How We Use Cookies",
    content: `We use cookies for the following purposes:

**Essential Cookies:** These are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.

**Analytics Cookies:** We use these to understand how visitors interact with our website. This helps us improve our services and user experience.

**Preference Cookies:** These remember your settings and preferences, such as language preferences or cookie consent choices.

**Marketing Cookies:** With your consent, we may use these to deliver relevant advertisements and track their effectiveness.`
  },
  {
    icon: Settings,
    title: "Managing Cookies",
    content: `You have control over cookies. Most web browsers allow you to:

• View what cookies are stored on your device
• Delete cookies individually or all at once
• Block third-party cookies
• Block cookies from specific sites
• Block all cookies
• Delete all cookies when you close your browser

Please note that blocking all cookies may affect your experience on our website, as some features may not work properly.`
  },
  {
    icon: Info,
    title: "Third-Party Cookies",
    content: `Some cookies are placed by third-party services that appear on our pages:

**Google Analytics:** We use Google Analytics to understand website usage. Google's privacy policy: https://policies.google.com/privacy

**Google AdSense:** We display advertisements through Google AdSense. These may use cookies to show you relevant ads. Google's ad settings: https://adssettings.google.com

You can opt out of personalized advertising by visiting https://www.aboutads.info/choices/`
  },
  {
    icon: Clock,
    title: "Cookie Retention",
    content: `Different cookies have different lifespans:

• **Session Cookies:** Deleted when you close your browser
• **Preference Cookies:** Up to 1 year
• **Analytics Cookies:** Up to 2 years
• **Marketing Cookies:** Up to 90 days

We regularly review our cookie usage to ensure we only use cookies that are necessary and beneficial.`
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: `If you have questions about our use of cookies, please contact us:

**Email:** privacy@transformfiles.app

**Address:** TransformFiles.app
123 Tech Street
San Francisco, CA 94105

We will respond to your inquiry within 30 days.`
  }
];

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | TransformFiles.app</title>
        <meta name="description" content="Learn about how TransformFiles.app uses cookies and how you can manage your cookie preferences." />
        <link rel="canonical" href="https://transformfiles.app/cookies" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero */}
          <section className="gradient-hero py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Cookie className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Cookie Policy</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Our <span className="text-gradient">Cookie Policy</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Understanding how we use cookies to improve your experience
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Last updated: December 30, 2024
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-12 md:py-16 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                  <p className="text-muted-foreground leading-relaxed">
                    This Cookie Policy explains how TransformFiles.app ("we", "us", or "our") uses cookies and similar technologies when you visit our website. By using our website, you consent to our use of cookies as described in this policy. You can manage your cookie preferences at any time.
                  </p>
                </div>

                <div className="space-y-6">
                  {sections.map((section, index) => (
                    <div key={index} className="glass rounded-2xl p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <section.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                            {section.title}
                          </h2>
                          <div className="prose prose-invert max-w-none">
                            {section.content.split('\n').map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-muted-foreground leading-relaxed mb-3 last:mb-0">
                                {paragraph.startsWith('**') ? (
                                  <span dangerouslySetInnerHTML={{ 
                                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                                  }} />
                                ) : paragraph.startsWith('•') ? (
                                  <span className="block pl-4">{paragraph}</span>
                                ) : paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default CookiePolicy;
