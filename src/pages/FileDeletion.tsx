import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trash2, Clock, Shield, Lock } from "lucide-react";

const FileDeletion = () => {
  return (
    <>
      <Helmet>
        <title>File Deletion Policy - TransformFiles | Your Files Are Safe</title>
        <meta name="description" content="Learn about TransformFiles file deletion policy. All uploaded files are automatically deleted within 2 hours for your privacy and security." />
        <link rel="canonical" href="https://transformfiles.com/file-deletion" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Trash2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">File Security</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">File Deletion Policy</h1>
              <p className="text-muted-foreground">Your privacy is our priority. All files are automatically deleted.</p>
            </div>

            <div className="space-y-8">
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Automatic Deletion Timeline</h2>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• <strong className="text-foreground">Uploaded files:</strong> Deleted within 2 hours of upload</li>
                  <li>• <strong className="text-foreground">Converted files:</strong> Deleted within 2 hours of conversion</li>
                  <li>• <strong className="text-foreground">Processing logs:</strong> Deleted within 7 days</li>
                  <li>• <strong className="text-foreground">No permanent storage:</strong> Files are never stored long-term</li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Security Measures</h2>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• 256-bit SSL encryption for all file transfers</li>
                  <li>• Files encrypted at rest using AES-256</li>
                  <li>• Isolated processing environments</li>
                  <li>• No human access to your files</li>
                  <li>• SOC 2 compliant infrastructure</li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Your Rights</h2>
                </div>
                <p className="text-muted-foreground">You can request immediate deletion of your files at any time by contacting support@transformfiles.com. We will process your request within 24 hours.</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FileDeletion;
