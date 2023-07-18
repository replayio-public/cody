import { defineConfig } from '@playwright/test'
import { devices as replayDevices } from '@replayio/playwright';

export default defineConfig({
    workers: 1,
    testDir: 'test/e2e',
    projects: [
        {
            name: 'replay-chromium',
            use: { ...(replayDevices['Replay Chromium']) },
        },
    ],
})
