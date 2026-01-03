import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Globe, Shield, UserCheck, FileText } from "lucide-react";

const GDPR = () => {
  return (
    <>
      <Helmet>
        <title>GDPR Compliance - TransformFiles | Data Protection</title>
        <meta name="description" content="TransformFiles GDPR compliance notice. Learn how we protect your data and respect your privacy rights under EU regulations." />
        <link rel="canonical" href="https://transformfiles.com/gdpr" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">GDPR</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">GDPR Compliance</h1>
              <p className="text-muted-foreground">We are committed to protecting your data rights under EU regulations.</p>
            </div>

            <div className="space-y-8">
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Your Rights Under GDPR</h2>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• <strong className="text-foreground">Right to Access:</strong> Request a copy of your personal data</li>
                  <li>• <strong className="text-foreground">Right to Rectification:</strong> Correct inaccurate data</li>
                  <li>• <strong className="text-foreground">Right to Erasure:</strong> Request deletion of your data</li>
                  <li>• <strong className="text-foreground">Right to Portability:</strong> Receive your data in portable format</li>
                  <li>• <strong className="text-foreground">Right to Object:</strong> Object to processing activities</li>
                  <li>• <strong className="text-foreground">Right to Restrict:</strong> Limit how we use your data</li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Data Protection</h2>
                </div>
                <p className="text-muted-foreground mb-4">We implement appropriate technical and organizational measures to protect your personal data, including:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• End-to-end encryption</li>
                  <li>• Regular security audits</li>
                  <li>• Data minimization practices</li>
                  <li>• Automatic file deletion within 2 hours</li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Contact Our DPO</h2>
                </div>
                <p className="text-muted-foreground">For GDPR-related inquiries, contact our Data Protection Officer at <strong className="text-foreground">dpo@transformfiles.com</strong></p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GDPR;
