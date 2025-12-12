import { fetchMessage } from '../../../src/service/message';

export async function GET() {
  try {
    const message = await fetchMessage();
    return Response.json({ message });
  } catch (error) {
    console.error('Failed to fetch message', error);
    return Response.json(
      { message: 'Failed to fetch message' },
      { status: 500 },
    );
  }
}
