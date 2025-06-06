import { messaging } from '@/lib/firebaseAdmin';
import User from '@/models/User';
import connectDB from '@/utils/db';

export async function POST(req) {
  await connectDB();

  const { title, body, link } = await req.json();

  // Validate required fields
  if (!title || !body || !link) {
    return Response.json({ error: 'Missing fields: title, body, or link' }, { status: 400 });
  }

  try {
    // Get all users with tokens
    const users = await User.find({});

    if (!users || users.length === 0) {
      return Response.json({ error: 'No users found' }, { status: 404 });
    }

    // Loop through users and send notifications
    for (const user of users) {
      const token = user.UserToken;

      const message = {
        token,
        notification: {
          title,
          body,
        },
        webpush: {
          fcmOptions: {
            link: link, // Link that opens when the notification is clicked
          },
        },
        data: {
          click_action: link, // Also needed for service worker `data.click_action`
        },
      };

      // Send the notification
      const response = await messaging.send(message);
      console.log(`✅ Notification sent to ${token}:`, response);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('❌ FCM Error:', error);
    return Response.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}
