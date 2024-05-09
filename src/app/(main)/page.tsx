import { createClient } from '~/server/external-services/supabase';
import { ChatUi } from './_components/chat-ui';
import { cookies } from 'next/headers';

export default async function Home() {
  const { data: messages } = await createClient(cookies())
    .from('messages')
    .select('*');

  return <ChatUi messages={messages ?? []} />;
}
