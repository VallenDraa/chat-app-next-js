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
  await supabase.auth.admin.createUser({
    email: `user${i}@mail.com`,
    password: PASSWORD,
  });
}

await seed.public_users(x =>
  x(300, ({ index }) => ({
    username: copycat.username(index),
    profile_picture: faker.image.avatar(),
    profile_status: copycat.words(index, { min: 1, max: 8 }),
  })),
);
await seed.friends_lists(x => x(600));

await seed.messages(x =>
  x(1000, ({ index }) => ({
    content: copycat.words(index, { min: 5, max: 32 }),
  })),
);
await seed.messages_lists(x => x(1000));
await seed.chat_rooms(x => x(150));

process.exit();
