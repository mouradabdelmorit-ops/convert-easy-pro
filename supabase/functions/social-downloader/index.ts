import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DownloadRequest {
  url: string;
  platform: 'youtube' | 'instagram' | 'tiktok';
}

interface DownloadResponse {
  success: boolean;
  downloadUrl?: string;
  title?: string;
  thumbnail?: string;
  error?: string;
}

// Validate URL patterns
function validateUrl(url: string, platform: string): boolean {
  const patterns: Record<string, RegExp[]> = {
    youtube: [
      /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)/,
    ],
    instagram: [
      /^https?:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv)\//,
    ],
    tiktok: [
      /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)\//,
    ],
  };

  return patterns[platform]?.some(pattern => pattern.test(url)) || false;
}

async function downloadYouTube(url: string, apiKey: string): Promise<DownloadResponse> {
  try {
    console.log("Fetching YouTube video from API...");
    
    // Use ytstream-download API from RapidAPI
    const apiUrl = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${encodeURIComponent(url)}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      console.error("YouTube API response not ok:", response.status);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    console.log("YouTube API response:", JSON.stringify(data).substring(0, 500));

    if (data.status === 'fail') {
      throw new Error(data.msg || "Failed to get video");
    }

    // Get the best quality video link
    let downloadUrl = null;
    let title = data.title || "YouTube Video";
    let thumbnail = data.thumbnail || null;

    // Check for formats/adaptiveFormats
    if (data.formats && data.formats.length > 0) {
      // Find a format with both video and audio (usually the first few)
      const videoFormat = data.formats.find((f: any) => f.url && f.hasVideo && f.hasAudio) 
        || data.formats.find((f: any) => f.url);
      if (videoFormat) {
        downloadUrl = videoFormat.url;
      }
    }

    // Alternative: check for link array
    if (!downloadUrl && data.link && Array.isArray(data.link)) {
      const videoLink = data.link.find((l: any) => l.url);
      if (videoLink) {
        downloadUrl = videoLink.url;
      }
    }

    // Check for direct links
    if (!downloadUrl && data.links) {
      for (const quality of ['720p', '480p', '360p', '1080p']) {
        if (data.links[quality]) {
          downloadUrl = data.links[quality];
          break;
        }
      }
    }

    if (!downloadUrl) {
      throw new Error("No download URL found in response");
    }

    return {
      success: true,
      downloadUrl,
      title,
      thumbnail,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("YouTube download error:", error);
    return { 
      success: false, 
      error: `Unable to download YouTube video: ${errorMessage}` 
    };
  }
}

async function downloadInstagram(url: string, apiKey: string): Promise<DownloadResponse> {
  try {
    console.log("Fetching Instagram media from API...");
    
    // Use Instagram downloader API
    const apiUrl = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      console.error("Instagram API response not ok:", response.status);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    console.log("Instagram API response:", JSON.stringify(data).substring(0, 500));

    let downloadUrl = null;
    let thumbnail = null;
    
    // Handle different response structures
    if (data.result && Array.isArray(data.result) && data.result.length > 0) {
      downloadUrl = data.result[0].url || data.result[0];
    } else if (data.url) {
      downloadUrl = data.url;
    } else if (data.video) {
      downloadUrl = data.video;
    } else if (data.download_url) {
      downloadUrl = data.download_url;
    }

    if (data.thumbnail) {
      thumbnail = data.thumbnail;
    } else if (data.thumb) {
      thumbnail = data.thumb;
    }

    if (!downloadUrl) {
      throw new Error("No download URL found in response");
    }

    return {
      success: true,
      downloadUrl,
      title: "Instagram Media",
      thumbnail,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Instagram download error:", error);
    return { 
      success: false, 
      error: `Unable to download Instagram media: ${errorMessage}` 
    };
  }
}

async function downloadTikTok(url: string, apiKey: string): Promise<DownloadResponse> {
  try {
    console.log("Fetching TikTok video from API...");
    
    // Use TikTok downloader API - no watermark
    const apiUrl = `https://tiktok-download-video1.p.rapidapi.com/getVideo?url=${encodeURIComponent(url)}&hd=1`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'tiktok-download-video1.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      console.error("TikTok API response not ok:", response.status);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    console.log("TikTok API response:", JSON.stringify(data).substring(0, 500));

    let downloadUrl = null;
    let thumbnail = null;
    let title = "TikTok Video";

    // Handle response structure
    if (data.data) {
      // No watermark version
      downloadUrl = data.data.play || data.data.hdplay || data.data.wmplay;
      thumbnail = data.data.cover || data.data.origin_cover;
      title = data.data.title || "TikTok Video";
    } else if (data.video) {
      downloadUrl = data.video;
    } else if (data.nowatermark) {
      downloadUrl = data.nowatermark;
    } else if (data.play) {
      downloadUrl = data.play;
    }

    if (!downloadUrl) {
      throw new Error("No download URL found in response");
    }

    return {
      success: true,
      downloadUrl,
      title,
      thumbnail,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("TikTok download error:", error);
    return { 
      success: false, 
      error: `Unable to download TikTok video: ${errorMessage}` 
    };
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('RAPIDAPI_KEY');
    if (!apiKey) {
      console.error("RAPIDAPI_KEY not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Download service not configured. Please add your RapidAPI key." }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const { url, platform }: DownloadRequest = await req.json();

    console.log(`Processing ${platform} download for URL: ${url}`);

    // Validate the URL
    if (!url || !platform) {
      return new Response(
        JSON.stringify({ success: false, error: "URL and platform are required" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (!validateUrl(url, platform)) {
      return new Response(
        JSON.stringify({ success: false, error: `Invalid ${platform} URL. Please check the URL and try again.` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    let result: DownloadResponse;

    switch (platform) {
      case 'youtube':
        result = await downloadYouTube(url, apiKey);
        break;
      case 'instagram':
        result = await downloadInstagram(url, apiKey);
        break;
      case 'tiktok':
        result = await downloadTikTok(url, apiKey);
        break;
      default:
        result = { success: false, error: "Unsupported platform" };
    }

    console.log(`Download result:`, result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error processing download:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An error occurred. Please try again." }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
