import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - TransformFiles | Get Support & Help</title>
        <meta name="description" content="Contact TransformFiles for support, feedback, or business inquiries. We're here to help with your file conversion needs." />
        <link rel="canonical" href="https://transformfiles.com/contact" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Contact Us</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">Have questions or feedback? We'd love to hear from you.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass rounded-2xl p-8">
                <h2 className="font-display text-xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground">support@transformfiles.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="text-foreground">San Francisco, CA, USA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="font-display text-xl font-semibold mb-6">Send a Message</h2>
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground" />
                  <input type="email" placeholder="Your Email" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground" />
                  <textarea rows={4} placeholder="Your Message" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground resize-none" />
                  <Button variant="hero" size="lg" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
