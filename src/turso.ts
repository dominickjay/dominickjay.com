import { createClient } from "@libsql/client/web";

const databaseUrl = import.meta.env.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

if (!databaseUrl || !authToken) {
  console.error('Missing Turso environment variables:', {
    TURSO_DATABASE_URL: !!databaseUrl,
    TURSO_AUTH_TOKEN: !!authToken
  });
}

export const turso = createClient({
  url: databaseUrl,
  authToken: authToken,
});
