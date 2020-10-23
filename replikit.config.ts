import { Configuration } from "@replikit/core/typings";

import "@services/management";
import "@services/profile";
import "@replikit/telegram";
import "@replikit/discord";

const config: Configuration = {
    storage: {
        connection: process.env.MONGO_CONNECTION!
    },
    telegram: {
        token: process.env.TELEGRAM_TOKEN!
    },
    discord: {
        token: process.env.DISCORD_TOKEN!
    },
    i18n: {
        defaultLocale: process.env.DEFAULT_LOCALE
    },
    management: {
        admins: process.env.ADMINS?.split(",").map(x => x.trim()) ?? []
    }
};

export default config;
