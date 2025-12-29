import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeData, template } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Generating resume with template:', template);

    // Use AI to enhance the resume content
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional resume writer. Enhance the resume content to be more impactful and professional. 
            Keep the information accurate but improve the wording to be more compelling.
            Return a JSON object with the enhanced resume data in the same structure as provided.`
          },
          {
            role: "user",
            content: `Enhance this resume data: ${JSON.stringify(resumeData)}`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const enhancedContent = data.choices?.[0]?.message?.content || '';

    // Try to parse the enhanced content as JSON, fallback to original if fails
    let enhancedData = resumeData;
    try {
      const jsonMatch = enhancedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        enhancedData = JSON.parse(jsonMatch[0]);
      }
    } catch {
      console.log('Using original data, AI response not parseable');
    }

    // Generate HTML resume
    const htmlResume = generateResumeHTML(enhancedData, template);

    return new Response(
      JSON.stringify({ 
        success: true,
        html: htmlResume,
        enhancedData: enhancedData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Resume generation error:', error);
    const message = error instanceof Error ? error.message : 'Resume generation failed';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateResumeHTML(data: any, template: string): string {
  const colors = {
    modern: { primary: '#0d9488', secondary: '#0f172a', accent: '#14b8a6' },
    classic: { primary: '#1e40af', secondary: '#1f2937', accent: '#3b82f6' },
    creative: { primary: '#7c3aed', secondary: '#1f2937', accent: '#a855f7' },
    minimal: { primary: '#374151', secondary: '#111827', accent: '#6b7280' },
  };

  const color = colors[template as keyof typeof colors] || colors.modern;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: ${color.secondary}; }
    .resume { max-width: 800px; margin: 0 auto; padding: 40px; }
    .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid ${color.primary}; }
    .name { font-size: 32px; font-weight: bold; color: ${color.primary}; margin-bottom: 10px; }
    .contact { font-size: 14px; color: #666; }
    .contact span { margin: 0 10px; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 18px; font-weight: bold; color: ${color.primary}; border-bottom: 2px solid ${color.accent}; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase; }
    .summary { font-size: 14px; color: #444; }
    .experience-item, .education-item { margin-bottom: 20px; }
    .job-title, .degree { font-size: 16px; font-weight: bold; color: ${color.secondary}; }
    .company, .school { font-size: 14px; color: ${color.primary}; font-weight: 500; }
    .date { font-size: 12px; color: #888; margin-bottom: 5px; }
    .description { font-size: 13px; color: #555; }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill { background: ${color.accent}22; color: ${color.primary}; padding: 5px 12px; border-radius: 20px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="resume">
    <div class="header">
      <div class="name">${data.fullName || 'Your Name'}</div>
      <div class="contact">
        <span>${data.email || 'email@example.com'}</span>
        <span>|</span>
        <span>${data.phone || '(123) 456-7890'}</span>
        <span>|</span>
        <span>${data.location || 'City, State'}</span>
      </div>
    </div>
    
    ${data.summary ? `
    <div class="section">
      <div class="section-title">Professional Summary</div>
      <p class="summary">${data.summary}</p>
    </div>
    ` : ''}
    
    ${data.experience && data.experience.length > 0 ? `
    <div class="section">
      <div class="section-title">Experience</div>
      ${data.experience.map((exp: any) => `
        <div class="experience-item">
          <div class="job-title">${exp.title || ''}</div>
          <div class="company">${exp.company || ''}</div>
          <div class="date">${exp.startDate || ''} - ${exp.endDate || 'Present'}</div>
          <p class="description">${exp.description || ''}</p>
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    ${data.education && data.education.length > 0 ? `
    <div class="section">
      <div class="section-title">Education</div>
      ${data.education.map((edu: any) => `
        <div class="education-item">
          <div class="degree">${edu.degree || ''}</div>
          <div class="school">${edu.school || ''}</div>
          <div class="date">${edu.year || ''}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    ${data.skills && data.skills.length > 0 ? `
    <div class="section">
      <div class="section-title">Skills</div>
      <div class="skills">
        ${data.skills.map((skill: string) => `<span class="skill">${skill}</span>`).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
  `;
}
