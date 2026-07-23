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

  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      await bot.start({ onStart: () => console.log('[Bot] Running — @OlenaBohutaSchool_bot') });
      break;
    } catch (e: any) {
      if (e?.error_code === 409) {
        console.log(`[Bot] 409 conflict, retry ${attempt}/10 in 5s...`);
        await new Promise(r => setTimeout(r, 5000));
      } else {
        throw e;
      }
    }
  }
}

main().catch(console.error);
