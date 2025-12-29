import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Clock, Server, Mail } from "lucide-react";

const Privacy = () => {
  const lastUpdated = "December 29, 2024";

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: `We collect minimal information necessary to provide our file conversion service:

**Automatically Collected Information:**
- IP address (anonymized after 24 hours)
- Browser type and version
- Device type and operating system
- Pages visited and time spent
- Referral source

**File Data:**
- Files you upload are temporarily stored for conversion
- Files are automatically deleted within 2 hours of upload
- We do not access, read, or analyze the content of your files
- Conversion logs are retained for 7 days for troubleshooting purposes

**Cookies and Similar Technologies:**
- Essential cookies for site functionality
- Analytics cookies (with your consent)
- Advertising cookies (with your consent)`
    },
    {
      icon: Lock,
      title: "How We Protect Your Data",
      content: `Your privacy and security are our top priorities:

**Encryption:**
- All data transfers use 256-bit SSL/TLS encryption
- Files are encrypted at rest using AES-256
- Secure, isolated processing environments

**Access Controls:**
- Strict employee access policies
- Regular security audits and penetration testing
- SOC 2 Type II compliant infrastructure

**Data Retention:**
- Uploaded files: Deleted within 2 hours
- Conversion logs: 7 days
- Analytics data: 26 months (anonymized)
- Account data: Until you request deletion`
    },
    {
      icon: Server,
      title: "How We Use Your Information",
      content: `We use collected information to:

- Provide and improve our file conversion services
- Analyze usage patterns to optimize performance
- Detect and prevent abuse or fraudulent activity
- Respond to your inquiries and support requests
- Send service-related communications
- Display relevant advertisements (with consent)

**We Never:**
- Sell your personal information to third parties
- Access or analyze the content of your files
- Share your data without explicit consent
- Use your data for purposes not disclosed here`
    },
    {
      icon: Shield,
      title: "Your Rights (GDPR & CCPA)",
      content: `You have the following rights regarding your data:

**For All Users:**
- Access: Request a copy of your data
- Rectification: Correct inaccurate data
- Erasure: Request deletion of your data
- Portability: Receive your data in a portable format
- Objection: Object to certain processing activities

**For California Residents (CCPA):**
- Right to know what personal information is collected
- Right to delete personal information
- Right to opt-out of sale of personal information
- Right to non-discrimination for exercising rights

**For EU Residents (GDPR):**
- All rights listed above
- Right to restrict processing
- Right to lodge a complaint with a supervisory authority

To exercise any of these rights, contact us at privacy@convertflow.com`
    },
    {
      icon: Clock,
      title: "Cookies & Tracking",
      id: "cookies",
      content: `We use cookies and similar technologies:

**Essential Cookies:**
- Required for basic site functionality
- Cannot be disabled
- Include session management and security tokens

**Analytics Cookies:**
- Help us understand how visitors use our site
- Powered by Google Analytics
- Can be disabled via cookie preferences

**Advertising Cookies:**
- Used to display relevant advertisements
- Powered by Google AdSense
- Can be disabled via cookie preferences

**Managing Cookies:**
You can manage your cookie preferences at any time by clicking "Cookie Settings" in the footer or adjusting your browser settings.`
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: `If you have questions about this Privacy Policy or our data practices:

**Email:** privacy@convertflow.com

**Mail:**
ConvertFlow Inc.
123 Tech Street
San Francisco, CA 94105
United States

**Data Protection Officer:**
dpo@convertflow.com

We aim to respond to all inquiries within 48 hours.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | ConvertFlow</title>
        <meta name="description" content="Learn how ConvertFlow protects your privacy and handles your data. GDPR and CCPA compliant." />
        <link rel="canonical" href="https://convertflow.com/privacy" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Your Privacy Matters</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Privacy Policy
                </h1>
                <p className="text-muted-foreground">
                  Last updated: {lastUpdated}
                </p>
              </div>

              {/* Introduction */}
              <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                <p className="text-muted-foreground leading-relaxed">
                  At ConvertFlow, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our file conversion service. 
                  We are committed to being transparent about our data practices and ensuring your data is 
                  handled securely and responsibly.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    id={section.id}
                    className="glass rounded-2xl p-6 md:p-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        {section.title}
                      </h2>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none">
                      {section.content.split('\n\n').map((paragraph, pIndex) => (
                        <div key={pIndex} className="mb-4 last:mb-0">
                          {paragraph.startsWith('**') ? (
                            <p className="text-muted-foreground whitespace-pre-line">
                              {paragraph.split('**').map((part, i) => 
                                i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                              )}
                            </p>
                          ) : paragraph.startsWith('-') ? (
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              {paragraph.split('\n').map((item, i) => (
                                <li key={i}>{item.replace('- ', '')}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">{paragraph}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
