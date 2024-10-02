const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0tlN2hjdFFGUldnVzRMVVpIekhhbWFmUkRwTnpQa1NsV21NOVB2bGFuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGFjNGxQQkN2bVNCRDg1eTNzM1MrM3hZcnFmUjdwZXVuaFI0WFptYWdGYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQnFpdmcxN2lacXN4djlkZVk3Y3phdHR3V0JYZG5oYkhXVWtRWlJBS21vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJobi82N0lKQ0tFNVcwMThTV2lXT01LQXNFYit5blpGU3JqV296Z2I1TDM4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitHZEJWMDY3U2V5a0hNclZyeDBzSGxROW1mOFNNVTZTclB1bFpReVRVR0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpqMXkwRDNYd1lUZVlKWjhaZFlnSjRWNzJzLzB3bEx1MGdXM2wxUzZhMWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0ZsUGgyYWQxdnFyZFNmc2FhcklOa3F2VWdNUUhaR1JzT1UzWUZKbU5XST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1p1dE1odXB6WEp3b29LUGtKRjlJNnBaRzJoY2NzTCsxWGVDQ1FuWktBaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZVVGt4RHdGQTh2MTlGNVlseGoyZndsa3R5Ty8yaURwalZrblp0bmdBV2F0N285SW9meDlaOUJhTmpzSld0ZENUSzdtZERjeHBJUmRCTU9jV0RzNWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDcsImFkdlNlY3JldEtleSI6IjlzWGR0dU1GQjhXc0hHL0tXWTVZeEd1eWRXQStlNlh1RWczOXhzL3Y4YW89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InRPc0UxVFJQUUlhQ0lDWjRVQkROTUEiLCJwaG9uZUlkIjoiNWVhZGJhNTItMDI2Yi00MGZlLWIyOTMtYWFjODM2ZDcwMWFmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVxTXpmSm5FbG5LdmVLaU11TkRpRElWWExQST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwQlZuRzVGaUErQ3Jxa1oyQzlSaHRodTg5MzQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMUhKRjlZNFoiLCJtZSI6eyJpZCI6IjIyMzkxNjE2MDU2OjU3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOSG44T1lGRVB1bDhyY0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTUzJhb3pUQ0xlVXBlNkJPT2xsdXFkVzdKcDZEZTFCaVZhc3dCLytiRjJVPSIsImFjY291bnRTaWduYXR1cmUiOiJnL056TGxuUDZLZnJIbnBpbGQyZmlwMnJBZlZTZmZFWHNlZzFVTUZtT000UEtsR0lhWm1DNUMwckRJYzVhZnhhbGNhLzBJajUxK1kzQVhTMklFTnREQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoid1dpbzlKZk1ZcDdTTWxBWUdtYW0vdWJJMjI0ZFYvaUhmZWZRdHhLMGxRL0JhekdQOVJHV3JWSmR4T2VJeERxZnp4djVlMDhjelByQ0lnK0E5QStXZ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjM5MTYxNjA1Njo1N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVa3RtcU0wd2kzbEtYdWdUanBaYnFuVnV5YWVnM3RRWWxXck1BZi9teGRsIn19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc4Mjg3NDMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQWJtIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
