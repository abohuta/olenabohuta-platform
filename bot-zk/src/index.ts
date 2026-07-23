import { supabase } from './db';
import { config } from './config';
import { createBot } from './bot';
import { createServer } from './server';
import { startScheduler } from './scheduler';

async function main() {
  // Test Supabase connection
  const { error } = await supabase.from('users').select('id').limit(1);
  if (error) throw new Error(`Supabase connection failed: ${error.message}`);
  console.log('[DB] Connected to Supabase');

  const bot = createBot();
  const app = createServer(bot);

  app.listen(config.PORT, () => console.log(`[Server] Port ${config.PORT}`));

  startScheduler(bot);
  console.log('[Scheduler] Started');

  await bot.start({ onStart: () => console.log('[Bot] Running') });
}

main().catch((err) => {
  console.error('[Fatal]', err);
  process.exit(1);
});
