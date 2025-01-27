import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://eniacgroup.ir', // Change this if your app runs on a different port
    supportFile: 'cypress/support/e2e.js',
  },
});



  // Your configuration
