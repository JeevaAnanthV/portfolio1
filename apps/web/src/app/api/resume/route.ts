import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'designer'; // 'designer' or 'ats'

  const filename = type === 'ats' ? 'resume_ats.pdf' : 'resume_designer.pdf';
  const filePath = join(process.cwd(), 'artifacts', filename);

  try {
    const fileBuffer = await readFile(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error serving resume PDF:', error);
    return new NextResponse('Resume PDF not found', { status: 404 });
  }
}

