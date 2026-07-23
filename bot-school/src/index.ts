import { Bot } from 'grammy';
import { config } from './config';
import { setBot } from './access';
import { createServer } from './server';
import { registerStartHandler } from './handlers/start';
import { registerCoursesHandler } from './handlers/courses';
import { registerMyHandler } from './handlers/my';
import { registerAdminHandlers } from './handlers/admin';

async function main() {
  const bot = new Bot(config.BOT_TOKEN);
  setBot(bot);

  registerStartHandler(bot);
  registerCoursesHandler(bot);
  registerMyHandler(bot);
  registerAdminHandlers(bot);

  if (process.env.NO_SERVER !== 'true') {
    const app = createServer(bot);
    app.listen(config.PORT, () => {
      console.log(`[Server] Port ${config.PORT}`);
    });
  }

  bot.catch((err) => console.error('[Bot error]', err));
  await bot.start();
  console.log('[Bot] Running — @OlenaBohutaSchool_bot');
}

main().catch(console.error);
