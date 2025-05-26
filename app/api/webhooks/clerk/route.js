import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { db } from '@/lib/prisma';

export async function POST(req) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, primary_email_address_id } = evt.data;

    try {
      const primaryEmail = email_addresses.find(email => email.id === primary_email_address_id);
      if (!primaryEmail) {
        console.error('No primary email found for user:', id);
        return new Response('No primary email found', { status: 400 });
      }

      await db.user.upsert({
        where: { clerkUserId: id },
        create: {
          clerkUserId: id,
          email: primaryEmail.email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
          imageUrl: image_url,
        },
        update: {
          email: primaryEmail.email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
          imageUrl: image_url,
        },
      });

      return new Response('User synchronized', { status: 200 });
    } catch (error) {
      console.error('Error syncing user:', error);
      return new Response('Error syncing user', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
} 