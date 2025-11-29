import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || searchParams.get('variant') || 'designer'; // 'designer' or 'ats'

  const filename = type === 'ats' ? 'resume_ats.pdf' : 'resume_designer.pdf';
  // Try multiple paths: repo root artifacts/ or apps/web/artifacts/
  const possiblePaths = [
    join(process.cwd(), 'artifacts', filename),
    join(process.cwd(), '..', '..', '..', 'artifacts', filename),
    join(process.cwd(), 'apps', 'web', 'artifacts', filename),
  ];
  
  let filePath = possiblePaths[0];
  let fileBuffer: Buffer | null = null;
  
  for (const path of possiblePaths) {
    try {
      fileBuffer = await readFile(path);
      filePath = path;
      break;
    } catch (e) {
      // Try next path
    }
  }

  if (!fileBuffer) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Resume PDF not found', 
        message: `Please generate artifacts first. Expected: ${filename}`,
        searchedPaths: possiblePaths
      }), 
      { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

