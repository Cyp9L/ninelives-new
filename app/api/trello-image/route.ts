import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url');
  
  if (!imageUrl) {
    return new NextResponse('Missing URL', { status: 400 });
  }

  // Fetch image from Trello with authentication
  const url = `${imageUrl}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    return new NextResponse('Failed to fetch image', { status: 500 });
  }

  const imageBuffer = await response.arrayBuffer();
  
  return new NextResponse(imageBuffer, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}