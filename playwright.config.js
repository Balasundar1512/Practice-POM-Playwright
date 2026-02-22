const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30*1000,
  expect: {

    timeout: 5000
  },


  use: {
    browserName: 'chromium',
    channel: 'chrome',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure',

  },

  reporter: 'html',
});
