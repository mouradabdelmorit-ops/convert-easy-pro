import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Scale, AlertTriangle, Ban, Copyright, Gavel } from "lucide-react";

const Terms = () => {
  const lastUpdated = "December 29, 2024";

  const sections = [
    {
      icon: Scale,
      title: "Acceptance of Terms",
      content: `By accessing or using ConvertFlow ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.

These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 13 years of age, or the age of majority in your jurisdiction, whichever is greater.

We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last Updated" date.`
    },
    {
      icon: FileText,
      title: "Description of Service",
      content: `ConvertFlow provides an online file conversion service that allows users to convert files between various formats including but not limited to:

- Video formats (MP4, AVI, MKV, MOV, etc.)
- Image formats (JPG, PNG, GIF, WEBP, etc.)
- Audio formats (MP3, WAV, FLAC, AAC, etc.)
- Document formats (PDF, DOCX, TXT, etc.)
- Archive formats (ZIP, RAR, 7Z, etc.)
- E-book formats (EPUB, MOBI, etc.)

The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied.`
    },
    {
      icon: Ban,
      title: "Prohibited Uses",
      content: `You agree NOT to use the Service to:

**Illegal Content:**
- Convert files containing illegal content
- Process files that violate intellectual property rights
- Handle content that promotes violence or hate speech
- Convert child exploitation material (immediate report to authorities)

**Abuse:**
- Attempt to bypass security measures
- Overload our systems with excessive requests
- Use automated tools without authorization
- Interfere with other users' access to the Service

**Malicious Activity:**
- Upload files containing malware or viruses
- Attempt to access unauthorized areas
- Reverse engineer or decompile the Service
- Use the Service for any unlawful purpose

Violation of these terms may result in immediate termination of access and reporting to relevant authorities.`
    },
    {
      icon: Copyright,
      title: "Intellectual Property",
      content: `**Your Content:**
You retain all rights to the files you upload. By using our Service, you grant us a limited license to process your files solely for the purpose of providing the conversion service. This license terminates when your files are deleted.

**Our Content:**
The Service, including its design, features, and code, is owned by ConvertFlow and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our Service.

**Trademarks:**
"ConvertFlow" and our logo are trademarks of ConvertFlow Inc. You may not use our trademarks without prior written permission.`
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: `**Disclaimer of Warranties:**
THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

**Limitation of Damages:**
IN NO EVENT SHALL CONVERTFLOW BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, PROFITS, OR GOODWILL.

**Maximum Liability:**
Our total liability for any claims arising from your use of the Service shall not exceed the amount you paid us (if any) in the 12 months prior to the claim.

**Exceptions:**
Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability. In such cases, the above limitations may not apply to you.`
    },
    {
      icon: Gavel,
      title: "Governing Law & Disputes",
      content: `**Governing Law:**
These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.

**Dispute Resolution:**
Any disputes arising from these Terms or the Service shall be resolved through binding arbitration in San Francisco, California, under the rules of the American Arbitration Association.

**Class Action Waiver:**
You agree to resolve disputes with us on an individual basis. You waive the right to participate in class actions or class arbitrations.

**Exceptions:**
Either party may seek injunctive relief in any court of competent jurisdiction to protect intellectual property rights or confidential information.

**Contact:**
For questions about these Terms, contact us at legal@convertflow.com`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service | TransformFiles</title>
        <meta name="description" content="Read TransformFiles Terms of Service. Understand your rights and responsibilities when using our file conversion service." />
        <link rel="canonical" href="https://transformfiles.app/terms" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Legal</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Terms of Service
                </h1>
                <p className="text-muted-foreground">
                  Last updated: {lastUpdated}
                </p>
              </div>

              {/* Introduction */}
              <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to ConvertFlow. These Terms of Service govern your use of our file conversion 
                  service and website. Please read these terms carefully before using our Service. 
                  Your access to and use of the Service is conditioned on your acceptance of and 
                  compliance with these Terms.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <div key={index} className="glass rounded-2xl p-6 md:p-8">
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

export default Terms;
