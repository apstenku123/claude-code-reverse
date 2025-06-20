/**
 * Factory function that creates a configuration object for plain text processing.
 * This configuration disables autodetection and provides aliases for plain text formats.
 *
 * @param {any} sourceObservable - (Unused) Placeholder parameter for compatibility with factory signature.
 * @returns {Object} Configuration object for plain text processing.
 */
function createPlainTextFactory(sourceObservable) {
  // Return the configuration object for plain text
  return {
    name: "Plain text", // Display name for the format
    aliases: ["text", "txt"], // Supported aliases for plain text
    disableAutodetect: true // Explicitly disable autodetection for this format
  };
}

module.exports = createPlainTextFactory;