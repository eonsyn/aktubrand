import { messaging } from '@/lib/firebaseAdmin';
import User from '@/models/Users';
import connectDB from '@/utils/db';

export async function POST(req) {
  await connectDB();

  const { title, body } = await req.json();

  if (!title || !body) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const users = await User.find({});

    if (!users || users.length === 0) {
      return Response.json({ error: 'No users found' }, { status: 404 });
    }

    for (const user of users) {
      const token = user.UserToken;
      const message = {
        token,
        notification: {
          title,
          body,
        },
      };

      const response = await messaging.send(message);
      console.log(`Notification sent to ${token}:`, response);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('FCM Error:', error);
    return Response.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}
