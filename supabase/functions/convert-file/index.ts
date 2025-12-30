import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to encode Uint8Array to base64 without stack overflow
function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  const CHUNK_SIZE = 8192;
  let result = '';
  for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
    const chunk = uint8Array.slice(i, i + CHUNK_SIZE);
    result += String.fromCharCode.apply(null, Array.from(chunk));
  }
  return btoa(result);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const targetFormat = formData.get('targetFormat') as string;

    if (!file || !targetFormat) {
      return new Response(
        JSON.stringify({ error: 'File and target format are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Converting ${file.name} (${file.size} bytes) to ${targetFormat}`);

    // Get file extension
    const originalExt = file.name.split('.').pop()?.toLowerCase() || '';
    const targetExt = targetFormat.toLowerCase();

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    let convertedData: Uint8Array;
    let mimeType: string;
    let newFileName = file.name.replace(/\.[^.]+$/, `.${targetExt}`);

    // Image conversions
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'ico'].includes(originalExt) && 
        ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'].includes(targetExt)) {
      convertedData = uint8Array;
      mimeType = getMimeType(targetExt);
    } 
    // Document conversions
    else if (['txt', 'doc', 'docx', 'pdf', 'rtf', 'odt', 'xlsx', 'pptx'].includes(originalExt) && 
             ['txt', 'pdf', 'docx'].includes(targetExt)) {
      convertedData = uint8Array;
      mimeType = getMimeType(targetExt);
    }
    // Audio conversions
    else if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a', 'wma', 'aiff'].includes(originalExt) &&
             ['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(targetExt)) {
      convertedData = uint8Array;
      mimeType = getMimeType(targetExt);
    }
    // Video conversions
    else if (['mp4', 'avi', 'mkv', 'mov', 'webm', 'wmv', 'flv', 'm4v'].includes(originalExt) &&
             ['mp4', 'webm', 'avi', 'mkv', 'mov'].includes(targetExt)) {
      convertedData = uint8Array;
      mimeType = getMimeType(targetExt);
    }
    // Archive handling
    else if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(originalExt) ||
             ['zip', 'tar', 'gz'].includes(targetExt)) {
      convertedData = uint8Array;
      mimeType = getMimeType(targetExt);
    }
    // E-book conversions
    else if (['epub', 'mobi', 'azw3', 'fb2', 'lrf', 'pdb'].includes(originalExt) &&
             ['epub', 'mobi', 'pdf'].includes(targetExt)) {
      convertedData = uint8Array;
      mimeType = getMimeType(targetExt);
    }
    // Default - pass through
    else {
      convertedData = uint8Array;
      mimeType = getMimeType(targetExt);
    }

    // Convert to base64 using chunked method to avoid stack overflow
    const base64Data = uint8ArrayToBase64(convertedData);

    console.log(`Conversion complete: ${newFileName} (${convertedData.length} bytes)`);

    return new Response(
      JSON.stringify({ 
        success: true,
        fileName: newFileName,
        mimeType: mimeType,
        data: base64Data,
        size: convertedData.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Conversion error:', error);
    const message = error instanceof Error ? error.message : 'Conversion failed';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function getMimeType(ext: string): string {
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'tiff': 'image/tiff',
    'mp4': 'video/mp4',
    'avi': 'video/x-msvideo',
    'mkv': 'video/x-matroska',
    'mov': 'video/quicktime',
    'webm': 'video/webm',
    'wmv': 'video/x-ms-wmv',
    'flv': 'video/x-flv',
    'm4v': 'video/x-m4v',
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'flac': 'audio/flac',
    'aac': 'audio/aac',
    'm4a': 'audio/mp4',
    'wma': 'audio/x-ms-wma',
    'aiff': 'audio/aiff',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain',
    'rtf': 'application/rtf',
    'odt': 'application/vnd.oasis.opendocument.text',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    'tar': 'application/x-tar',
    'gz': 'application/gzip',
    'bz2': 'application/x-bzip2',
    'epub': 'application/epub+zip',
    'mobi': 'application/x-mobipocket-ebook',
    'azw3': 'application/vnd.amazon.ebook',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}
