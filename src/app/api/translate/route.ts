import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Only POST requests allowed' });
  }

  const { text, targetLanguage } = await req.json();

  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${process.env.API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
      }),
    });

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ message: 'Translation failed' });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Only POST requests allowed' });
}