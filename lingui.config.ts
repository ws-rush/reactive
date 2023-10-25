import type { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
    locales: ["en", "ar"],
    catalogs: [
        {
            path: "src/locales/{locale}",
            include: [
                "src"
            ],
            exclude: [
                "src/locales"
            ]
        }
    ],
    format: "po",
    sourceLocale: "en",
    fallbackLocales: {
        default: "en"
    }
}

export default config