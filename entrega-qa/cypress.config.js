const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:8080/Doctor-Patient-Portal',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    testIsolation: true,
    setupNodeEvents(on, config) {
      config.expose = {
        ...config.expose,
        onlySmoke: String(config.env.onlySmoke) === 'true',
        adminEmail: config.env.adminEmail || 'admin@gmail.com',
        adminPassword: config.env.adminPassword || 'admin',
      };
      return config;
    },
  },
  viewportWidth: 1280,
  viewportHeight: 900,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  retries: 0,
  screenshotOnRunFailure: true,
  video: false,
});
