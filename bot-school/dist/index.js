"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = require("./config");
const access_1 = require("./access");
const server_1 = require("./server");
const start_1 = require("./handlers/start");
const courses_1 = require("./handlers/courses");
const my_1 = require("./handlers/my");
const admin_1 = require("./handlers/admin");
async function main() {
    const bot = new grammy_1.Bot(config_1.config.BOT_TOKEN);
    (0, access_1.setBot)(bot);
    (0, start_1.registerStartHandler)(bot);
    (0, courses_1.registerCoursesHandler)(bot);
    (0, my_1.registerMyHandler)(bot);
    (0, admin_1.registerAdminHandlers)(bot);
    const app = (0, server_1.createServer)(bot);
    app.listen(config_1.config.PORT, () => {
        console.log(`[Server] Port ${config_1.config.PORT}`);
    });
    bot.catch((err) => console.error('[Bot error]', err));
    await bot.start();
    console.log('[Bot] Running — @OlenaBohutaSchool_bot');
}
main().catch(console.error);
