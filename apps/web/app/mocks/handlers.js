import { fromTraffic } from '@msw/source/traffic'
import trafficRaw from './traffic.har?raw'


const traffic = JSON.parse(trafficRaw)

const filteredTraffic = {
    ...traffic,
    log: {
        ...traffic.log,
        entries: traffic.log.entries.filter((entry) => {
            return !entry.request.url.startsWith('http://localhost:5173')
        }),
    },
}

export const handlers = [...fromTraffic(filteredTraffic)]

// import { fromOpenApi } from '@msw/source/open-api'
// import { http, passthrough, HttpResponse } from 'msw'
// import spec from './api.spec.json'

// // Force the Base URL in the spec so generated handlers use absolute URLs
// spec.servers = [{ url: 'https://alfalaksoft2025.ddns.net' }]

// const openApiHandlers = await fromOpenApi(spec)

// export const handlers = [
//     http.get('/app/locales/*', () => passthrough()),
//     http.get('https://alfalaksoft2025.ddns.net/api/v1/CHANGE_LANG/*', () => {
//         return HttpResponse.json({ translations: {} })
//     }),
//     http.get('https://alfalaksoft2025.ddns.net/api/v1/USERS_SYSTEMS_SCREENS_LIST/SCREENS_PRIVILEGES_LIST', () => {
//         return HttpResponse.json({
//             info: { BRANCH_NO: 1, USER_NO: 1 },
//             privileges: {},
//         })
//     }),
//     ...openApiHandlers,
// ]