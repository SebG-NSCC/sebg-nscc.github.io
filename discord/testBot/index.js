"use strict";

const mainWindow = new BrowserWindow({webPreferences: {
  nodeIntegration: true
}});

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const config_1 = tslib_1.__importDefault(require("./config"));
const { intents, prefix} = config_1.default;
const token = 'MTE4ODUxNTcyNzU2NTY2ODQwMw.GzL9AL.LmZgI4ZAI_Npltjg6akMosFuNdBsxc-Eyft15w'
const fetch = require("node-fetch");
let currentPrice = NaN;

const client = new discord_js_1.Client({
    intents,
    presence: {
        status: 'online',
        activities: [{
                name: `${prefix}help`,
                type: 'LISTENING'
            }]
    }
});

client.on('ready', () => {
    console.log(`Logged in as: ${client.user?.tag}`);
  
  //price update
  setInterval(async () => {

    const GUILD_ID = '1187792174994161774';
    const guild = await client.guilds.fetch(GUILD_ID);

    guild.me.setNickname(`$${currentPrice}`);
    
fetch('https://api.dexscreener.com/latest/dex/pairs/fantom/0xB77D58926537CE220fd31D2af8af986071869e2e', {
  })
  .then(response => response.json())
  .then(data => {
    // msg.edit(`The current price is: $${data.pairs[0].priceUsd}`);
    currentPrice = data.pairs[0].priceUsd;
    let dailyPriceChange = data.pairs[0].priceChange.h24;
    let fiveMinutePriceChange = data.pairs[0].priceChange.m5;
    let oneHourPriceChange = data.pairs[0].priceChange.h1;
    let sixHourPriceChange = data.pairs[0].priceChange.h6;

      // daily percent change
      setTimeout(() => {
        client.user?.setPresence({activities: [{ name: `24hr: ${dailyPriceChange}%`, type: 'WATCHING'}], status: 'online' });
      }, 7000)

      // 6 hour percent change
      setTimeout(() => {
        client.user?.setPresence({activities: [{ name: `6hr: ${sixHourPriceChange}%`, type: 'WATCHING'}], status: 'online' });
      }, 14000)

      // hourly percent change
      setTimeout(() => {
        client.user?.setPresence({activities: [{ name: `1hr: ${oneHourPriceChange}%`, type: 'WATCHING'}], status: 'online' });
      }, 21000)

      // 5 minute percent change
      setTimeout(() => {
        client.user?.setPresence({activities: [{ name: `5m: ${fiveMinutePriceChange}%`, type: 'WATCHING'}], status: 'online' });
      }, 28000)
    
  });

  }, 30000)})

client.login(token);
//# sourceMappingURL=index.js.map