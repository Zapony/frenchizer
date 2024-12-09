import { NextResponse } from 'next/server';
import { Client } from 'pg';

// Initialize PostgreSQL client
const client = new Client({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432,
});

client.connect();

// Handle POST requests to /api/saveTranslation
export async function POST(request: Request) {
    
  try {
    // Get data from the request body
    const translationData = await request.json();

    const {
      source,
      target,
      needs_correction,
      corrected,
    } = translationData;

    // Insert translation data into PostgreSQL database
    const query = `
      INSERT INTO translations 
      (source, target, needs_correction, corrected)
      VALUES ($1, $2, $3, $4)
    `;

    await client.query(query, [
      source,
      target,
      needs_correction,
      corrected,
    ]);

    // Return a success response
    return NextResponse.json(/*{ message: 'Translation saved successfully' },*/ { status: 200 });

  } catch (error) {
    console.error('Error saving translation:', error);
    // Return an error response
    return NextResponse.json({ message: 'Failed to save translation', error: error.message, stack: error.stack, }, { status: 500 });
  }
  
}
