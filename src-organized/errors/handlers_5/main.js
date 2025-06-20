/**
 * Main entry point for the Claude CLI application.
 * This module initializes and runs the CLI.
 */

const initializeClaudeCli = require('errors/handlers_5/main');

/**
 * Main function that starts the CLI application.
 * Handles any top-level errors and ensures proper exit.
 */
async function main() {
  try {
    await initializeClaudeCli();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the main function if this module is executed directly
if (require.main === module) {
  main();
}

module.exports = main;