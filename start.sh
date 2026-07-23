#!/bin/sh
(BOT_TOKEN=$ZK_BOT_TOKEN exec node bot-zk/dist/index.js) &
(NO_SERVER=true BOT_TOKEN=$SCHOOL_BOT_TOKEN exec node bot-school/dist/index.js) &
wait
