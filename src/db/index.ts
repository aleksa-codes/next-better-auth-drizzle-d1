import { drizzle } from 'drizzle-orm/d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';

async function initDbDev() {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, {
    logger: true,
    casing: 'snake_case',
  });
}

function initDbProd() {
  return drizzle(process.env.DB, {
    logger: true,
    casing: 'snake_case',
  });
}

export const db = process.env.NODE_ENV === 'production' ? initDbProd() : await initDbDev();
