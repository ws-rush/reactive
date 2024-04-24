import { type LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  catalogs: [
    {
      exclude: ["app/locales"],
      include: ["app"],
      path: "app/locales/{locale}",
    },
  ],
  fallbackLocales: {
    default: "en",
  },
  format: "po",
  locales: ["en", "ar"],
  sourceLocale: "en",
};

export default config;
