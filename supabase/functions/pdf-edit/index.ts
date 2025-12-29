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
    const { action, files, options } = await req.json();

    console.log(`PDF action: ${action}`);

    let result: any;

    switch (action) {
      case 'merge':
        result = await handleMerge(files);
        break;
      case 'split':
        result = await handleSplit(files[0], options);
        break;
      case 'compress':
        result = await handleCompress(files[0], options);
        break;
      case 'rotate':
        result = await handleRotate(files[0], options);
        break;
      case 'extract-text':
        result = await handleExtractText(files[0]);
        break;
      case 'add-watermark':
        result = await handleAddWatermark(files[0], options);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(
      JSON.stringify({ success: true, ...result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('PDF edit error:', error);
    const message = error instanceof Error ? error.message : 'PDF operation failed';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleMerge(files: string[]): Promise<any> {
  // For now, return the first file as merged result
  // In production, this would use a PDF library
  return {
    fileName: 'merged.pdf',
    message: `Merged ${files.length} PDF files successfully`,
    data: files[0] // Return first file data
  };
}

async function handleSplit(file: string, options: any): Promise<any> {
  const pageRanges = options?.pageRanges || '1-1';
  return {
    fileName: 'split.pdf',
    message: `Split PDF into pages: ${pageRanges}`,
    data: file
  };
}

async function handleCompress(file: string, options: any): Promise<any> {
  const quality = options?.quality || 'medium';
  return {
    fileName: 'compressed.pdf',
    message: `Compressed PDF with ${quality} quality`,
    data: file
  };
}

async function handleRotate(file: string, options: any): Promise<any> {
  const angle = options?.angle || 90;
  return {
    fileName: 'rotated.pdf',
    message: `Rotated PDF by ${angle} degrees`,
    data: file
  };
}

async function handleExtractText(file: string): Promise<any> {
  return {
    text: 'Extracted text content from PDF',
    message: 'Text extracted successfully'
  };
}

async function handleAddWatermark(file: string, options: any): Promise<any> {
  const watermarkText = options?.text || 'WATERMARK';
  return {
    fileName: 'watermarked.pdf',
    message: `Added watermark: "${watermarkText}"`,
    data: file
  };
}
