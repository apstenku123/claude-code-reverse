/**
 * Factory function that returns a language definition object for plain text files.
 * This definition is used to identify and handle plain text content in the application.
 *
 * @param {any} sourceObservable - (Unused) Placeholder parameter for compatibility with factory interface.
 * @returns {Object} Language definition for plain text, including name, aliases, and autodetect flag.
 */
function createPlainTextLanguageDefinition(sourceObservable) {
  return {
    // The display name for the language
    name: "Plain text",
    // Common aliases for plain text files
    aliases: ["text", "txt"],
    // Disables automatic language detection for plain text
    disableAutodetect: true
  };
}

module.exports = createPlainTextLanguageDefinition;
