/**
 * Creates a plain text format definition for use in the factory.
 *
 * @param {Object} options - Optional configuration settings (currently unused).
 * @returns {Object} formatDefinition - An object describing the plain text format.
 */
function createPlainTextFormat(options) {
  // Define the display name for this format
  const formatName = "Plain text";

  // Define alternative names that can be used to reference this format
  const formatAliases = [
    "text",
    "txt"
  ];

  // Disable automatic detection since this is a fallback/plain format
  const disableAutodetect = true;

  return {
    name: formatName,
    aliases: formatAliases,
    disableAutodetect: disableAutodetect
  };
}

// Export the factory function for external usage
module.exports = createPlainTextFormat;