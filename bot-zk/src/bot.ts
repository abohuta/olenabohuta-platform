import { Bot } from 'grammy';
import { config } from './config';
import { setBot } from './access';
import { registerStartHandler } from './handlers/start';
import { registerAboutHandler } from './handlers/about';
import { registerPlansHandler } from './handlers/plans';
import { registerStatusHandler } from './handlers/status';
import { registerAdminHandlers } from './handlers/admin';
import { registerHelpHandler } from './handlers/help';

export function createBot(): Bot {
  const bot = new Bot(config.BOT_TOKEN);

  setBot(bot);

  registerStartHandler(bot);
  registerAboutHandler(bot);
  registerPlansHandler(bot);
  registerStatusHandler(bot);
  registerAdminHandlers(bot);
  registerHelpHandler(bot);

  bot.catch((err) => console.error('[Bot error]', err.error));

  return bot;
}
