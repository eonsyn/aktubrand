import { messaging } from '@/lib/firebaseAdmin';

export async function POST(req) {
  const { token, title, body } = await req.json();

  if (!token || !title || !body) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const message = {
      token,
      notification: {
        title,
        body,
      },
    };

    const response = await messaging.send(message);
    return Response.json({ success: true, response });
  } catch (error) {
    console.error('FCM Error:', error);
    return Response.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
