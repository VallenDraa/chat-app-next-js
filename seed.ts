/* eslint-disable @typescript-eslint/naming-convention */
/**
 * ! Executing this script will delete all data in your database and seed it with 10 auth_users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import nextEnv from '@next/env';
import { createSeedClient } from '@snaplet/seed';
import { createClient } from '@supabase/supabase-js';
import { type Database } from '~/types';
import { copycat, faker } from '@snaplet/copycat';

nextEnv.loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production');

const seed = await createSeedClient();
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

// Truncate all tables in the database
await seed.$resetDatabase();

// Seed user
const PASSWORD = '@Test12345';

for (let i = 0; i < 300; i++) {
  // eslint-disable-next-line no-await-in-loop
  await supabase.auth.signUp({
    email: `user${i}@mail.com`,
    password: PASSWORD,
  });
}

const {
  data: { users: auth_users },
} = await supabase.auth.admin.listUsers({
  perPage: 300,
  page: 1,
});

await seed.public_users(
  x =>
    x(300, ({ seed, index }) => ({
      user_id: auth_users[index]!.id,
      username: copycat.username(seed),
      profile_picture: faker.image.avatar(),
      profile_status: copycat.words(seed, { min: 1, max: 8 }),
    })),
  { connect: { auth_users } },
);
await seed.friends_lists(x => x(300), { connect: { auth_users } });

// Seed chat rooms and collect data
const { chat_rooms } = await seed.chat_rooms(x => x(150), {
  connect: { auth_users },
});

// Seed messages lists and collect data
const { messages_lists } = await seed.messages_lists(x => x(150), {
  connect: { chat_rooms },
});

// Seed messages
await seed.messages(
  x =>
    x(1000, ({ seed }) => ({
      content: copycat.words(seed, { min: 5, max: 32 }),
    })),
  { connect: { auth_users, messages_lists } },
);

process.exit();
