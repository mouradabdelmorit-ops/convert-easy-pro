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
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { action, prompt, imageBase64, messages, text } = await req.json();
    console.log(`AI Tools - Action: ${action}`);

    let systemPrompt = '';
    let userContent: any = '';

    switch (action) {
      case 'image-to-code':
        systemPrompt = `You are an expert frontend developer. When given an image of a UI/website design, generate clean, semantic HTML and CSS code that recreates the design. Use modern HTML5/CSS3, make it responsive, use flexbox/grid for layouts. Return ONLY the code starting with <!DOCTYPE html>.`;
        userContent = [
          { type: 'text', text: prompt || 'Convert this design to HTML/CSS code.' },
          { type: 'image_url', image_url: { url: imageBase64 } }
        ];
        break;

      case 'summarizer':
        systemPrompt = `You are a professional text summarizer. Provide clear, concise summaries that capture the key points. Be accurate and maintain the original meaning.`;
        userContent = `Please summarize the following text:\n\n${text}`;
        break;

      case 'grammar-fixer':
        systemPrompt = `You are a professional editor. Fix grammar, spelling, and punctuation errors. Improve sentence structure while keeping the original meaning. Return ONLY the corrected text.`;
        userContent = `Please fix the grammar and improve the following text:\n\n${text}`;
        break;

      case 'email-generator':
        systemPrompt = `You are a professional email writer. Generate well-structured, professional emails based on the given context. Include appropriate greeting and sign-off.`;
        userContent = `Write a professional email based on: ${text}`;
        break;

      case 'translator':
        systemPrompt = `You are a professional translator. Translate text accurately while maintaining the original tone and meaning.`;
        userContent = text;
        break;

      case 'paraphraser':
        systemPrompt = `You are a writing assistant. Rewrite the given text in a different way while keeping the same meaning. Make it sound natural and fluent.`;
        userContent = `Please paraphrase the following text:\n\n${text}`;
        break;

      case 'code-explainer':
        systemPrompt = `You are a programming expert. Explain code clearly and simply, breaking down complex concepts. Be thorough but accessible.`;
        userContent = `Please explain this code:\n\n${text}`;
        break;

      case 'chat':
        systemPrompt = `You are a helpful AI assistant for TransformFiles, a file conversion website. Help users with file format questions, conversion guidance, and tips. Be concise and friendly.`;
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    const requestBody: any = {
      model: 'google/gemini-2.5-flash',
      messages: action === 'chat' 
        ? [{ role: 'system', content: systemPrompt }, ...messages]
        : [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent }
          ],
    };

    console.log('Calling Lovable AI Gateway...');
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit reached. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'API credits exhausted. Please try again later.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Lovable AI response received');

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
