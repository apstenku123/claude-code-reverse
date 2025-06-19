/**
 * Factory function that returns the definition object for plain text format.
 *
 * @param {any} sourceObservable - (Unused) Placeholder for compatibility with factory interface.
 * @returns {Object} Definition object for plain text format.
 */
function createPlainTextDefinition(sourceObservable) {
  // Return the definition object for plain text format
  return {
    name: "Plain text", // Human-readable name
    aliases: ["text", "txt"], // Common aliases for plain text
    disableAutodetect: true // Disable automatic detection for this format
  };
}

module.exports = createPlainTextDefinition;