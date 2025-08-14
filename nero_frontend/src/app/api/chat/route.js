import { getInferenceResponse } from '@/services/inferenceService.js';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const response = await getInferenceResponse(messages);

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
