import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const { action, prompt, imageBase64, messages } = await req.json();
    console.log(`AI Tools - Action: ${action}`);

    let systemPrompt = '';
    let userContent: any[] = [];

    switch (action) {
      case 'image-to-code':
        systemPrompt = `You are an expert frontend developer. When given an image of a UI/website design, you will generate clean, semantic HTML and CSS code that recreates the design as accurately as possible. 
        
        Guidelines:
        - Use modern HTML5 and CSS3
        - Make the code responsive
        - Use flexbox or grid for layouts
        - Include comments explaining key sections
        - Return ONLY the code, no explanations before or after
        - Start with <!DOCTYPE html> and include complete HTML document`;
        
        userContent = [
          { type: 'text', text: prompt || 'Convert this design to HTML/CSS code. Make it responsive and pixel-perfect.' },
          { type: 'image_url', image_url: { url: imageBase64 } }
        ];
        break;

      case 'enhance-image':
        systemPrompt = `You are an AI image enhancement expert. Describe how to enhance this image and provide detailed suggestions for improving its quality, colors, lighting, and composition.`;
        userContent = [
          { type: 'text', text: prompt || 'Analyze this image and provide enhancement suggestions.' },
          { type: 'image_url', image_url: { url: imageBase64 } }
        ];
        break;

      case 'chat':
        systemPrompt = `You are a helpful AI assistant for TransformFiles, a file conversion website. Help users with:
        - File format questions (which format to use, compatibility, etc.)
        - Conversion guidance and tips
        - Image, video, audio, and document format information
        - General questions about the website features
        
        Be concise, friendly, and helpful. If you don't know something, say so.`;
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    const requestBody: any = {
      model: 'google/gemini-2.0-flash-exp:free',
      messages: action === 'chat' 
        ? [{ role: 'system', content: systemPrompt }, ...messages]
        : [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent }
          ],
      max_tokens: 4096,
    };

    console.log('Calling OpenRouter API...');
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://transformfiles.com',
        'X-Title': 'TransformFiles AI',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenRouter response received');

    const result = data.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('AI Tools error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
