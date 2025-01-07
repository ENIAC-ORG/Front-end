import { defineConfig } from 'cypress';
import codeCoverage from '@cypress/code-coverage/task.js';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverage(on, config);
      return config;
    },
    baseUrl: 'http://127.0.0.1:5173/', // Adjust if your app runs on a different port
    supportFile: 'cypress/support/e2e.js',
  },
});
