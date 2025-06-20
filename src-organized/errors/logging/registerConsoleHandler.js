/**
 * Registers a handler for console events and instruments the console if needed.
 *
 * @param {Function} consoleHandler - The function to handle console events.
 * @returns {void}
 */
function registerConsoleHandler(consoleHandler) {
  // Add the provided handler to the 'console' event
  PE1.addHandler("console", consoleHandler);
  // Instrument the console if instrumentation is required
  PE1.maybeInstrument("console", pm2);
}

module.exports = registerConsoleHandler;