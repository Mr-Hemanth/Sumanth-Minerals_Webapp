import { NextResponse } from 'next/server';
import { getDictionary } from '@/lib/get-dictionary';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('l') || 'en';
  
  try {
    const dict = await getDictionary(lang);
    return NextResponse.json(dict);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load dictionary' }, { status: 500 });
  }
}
