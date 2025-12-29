import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, User, Briefcase, GraduationCap, Code, 
  Download, Loader2, Plus, X, Sparkles
} from "lucide-react";

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

const templates = [
  { id: 'modern', name: 'Modern', color: 'bg-teal-500' },
  { id: 'classic', name: 'Classic', color: 'bg-blue-600' },
  { id: 'creative', name: 'Creative', color: 'bg-purple-500' },
  { id: 'minimal', name: 'Minimal', color: 'bg-gray-600' },
];

const ResumeMaker = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }] as Experience[],
    education: [{ degree: '', school: '', year: '' }] as Education[],
    skills: [''],
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => i === index ? { ...exp, [field]: value } : exp)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', year: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu)
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({ ...prev, skills: [...prev.skills, ''] }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const updateSkill = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const generateResume = async () => {
    if (!formData.fullName || !formData.email) {
      toast({ title: "Error", description: "Please fill in at least your name and email", variant: "destructive" });
      return;
    }

    setIsGenerating(true);

    try {
      const cleanedData = {
        ...formData,
        skills: formData.skills.filter(s => s.trim() !== ''),
        experience: formData.experience.filter(e => e.title || e.company),
        education: formData.education.filter(e => e.degree || e.school),
      };

      const { data, error } = await supabase.functions.invoke('generate-resume', {
        body: { resumeData: cleanedData, template: selectedTemplate }
      });

      if (error) throw error;

      setGeneratedHTML(data.html);
      toast({ title: "Success", description: "Resume generated with AI enhancement!" });

    } catch (error: any) {
      console.error('Error:', error);
      toast({ title: "Error", description: error.message || "Generation failed", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadResume = () => {
    if (!generatedHTML) return;

    const blob = new Blob([generatedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName.replace(/\s+/g, '_')}_Resume.html`;
    a.click();
    URL.revokeObjectURL(url);

    toast({ title: "Downloaded!", description: "Open the HTML file in your browser and print to PDF" });
  };

  return (
    <>
      <Helmet>
        <title>Free AI Resume Maker | Create Professional Resume - ConvertFlow</title>
        <meta name="description" content="Create a professional resume with AI assistance. Choose from multiple templates. Free online resume builder with instant download." />
        <link rel="canonical" href="https://convertflow.com/resume-maker" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero */}
          <section className="relative gradient-hero py-16">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">AI-Powered Resume Builder</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Create Your <span className="text-gradient">Perfect Resume</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Build a professional resume in minutes with AI-enhanced content. Free to use, instant download.
                </p>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Template Selection */}
                <div className="glass rounded-2xl p-6 mb-8">
                  <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Choose Template
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedTemplate === template.id 
                            ? 'border-primary glow-teal' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-full h-20 ${template.color} rounded-lg mb-2`} />
                        <p className="text-sm font-medium text-foreground">{template.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Info */}
                <div className="glass rounded-2xl p-6 mb-6">
                  <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Location (City, State)"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <textarea
                    placeholder="Professional Summary"
                    value={formData.summary}
                    onChange={(e) => updateField('summary', e.target.value)}
                    className="w-full mt-4 bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground min-h-[100px]"
                  />
                </div>

                {/* Experience */}
                <div className="glass rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Work Experience
                    </h3>
                    <Button variant="ghost" size="sm" onClick={addExperience}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="bg-secondary/50 rounded-xl p-4 relative">
                        {formData.experience.length > 1 && (
                          <button 
                            onClick={() => removeExperience(index)}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Job Title"
                            value={exp.title}
                            onChange={(e) => updateExperience(index, 'title', e.target.value)}
                            className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
                          />
                          <input
                            type="text"
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
                          />
                          <input
                            type="text"
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                            className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
                          />
                          <input
                            type="text"
                            placeholder="End Date (or Present)"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                        <textarea
                          placeholder="Job Description & Achievements"
                          value={exp.description}
                          onChange={(e) => updateExperience(index, 'description', e.target.value)}
                          className="w-full mt-3 bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground min-h-[80px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="glass rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Education
                    </h3>
                    <Button variant="ghost" size="sm" onClick={addEducation}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {formData.education.map((edu, index) => (
                      <div key={index} className="bg-secondary/50 rounded-xl p-4 relative">
                        {formData.education.length > 1 && (
                          <button 
                            onClick={() => removeEducation(index)}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
                          />
                          <input
                            type="text"
                            placeholder="School/University"
                            value={edu.school}
                            onChange={(e) => updateEducation(index, 'school', e.target.value)}
                            className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
                          />
                          <input
                            type="text"
                            placeholder="Year"
                            value={edu.year}
                            onChange={(e) => updateEducation(index, 'year', e.target.value)}
                            className="bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="glass rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                      <Code className="w-5 h-5 text-primary" />
                      Skills
                    </h3>
                    <Button variant="ghost" size="sm" onClick={addSkill}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <input
                          type="text"
                          placeholder="Skill"
                          value={skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                          className="bg-secondary border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground w-32"
                        />
                        {formData.skills.length > 1 && (
                          <button onClick={() => removeSkill(index)} className="text-muted-foreground hover:text-destructive">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  variant="teal"
                  size="xl"
                  className="w-full mb-8"
                  onClick={generateResume}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Resume with AI
                    </>
                  )}
                </Button>

                {/* Preview */}
                {generatedHTML && (
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-semibold text-foreground">Preview</h3>
                      <Button variant="hero" onClick={downloadResume}>
                        <Download className="w-4 h-4 mr-2" />
                        Download HTML
                      </Button>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden">
                      <iframe
                        srcDoc={generatedHTML}
                        className="w-full h-[600px]"
                        title="Resume Preview"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Tip: Open the downloaded HTML file in your browser and use Print → Save as PDF for a PDF version.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ResumeMaker;
