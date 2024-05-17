import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '~/env';

const client = postgres(env.POSTGRES_DB_URL);
export const db = drizzle(client);