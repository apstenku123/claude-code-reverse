/**
 * Retrieves the handler for a file extension found in the input string.
 *
 * This function attempts to match the input string against a regular expression (hWA),
 * extracts the extension, and looks up the corresponding handler(createInteractionAccessor) from the mX9.extensions object.
 * If a handler is found, the first handler is returned; otherwise, false is returned.
 *
 * @param {string} inputString - The string to extract the extension from (e.g., a filename).
 * @returns {any|false} The first handler associated with the extension, or false if not found.
 */
function getExtensionHandlerByString(inputString) {
  // Validate that inputString is a non-empty string
  if (!inputString || typeof inputString !== "string") return false;

  // Attempt to extract the extension using the hWA regular expression
  const extensionMatch = hWA.exec(inputString);

  // If a match is found, look up the handler(createInteractionAccessor) for the extension (case-insensitive)
  const extensionHandlers = extensionMatch && mX9.extensions[extensionMatch[1].toLowerCase()];

  // If no handlers are found or the handlers array is empty, return false
  if (!extensionHandlers || !extensionHandlers.length) return false;

  // Return the first handler for the matched extension
  return extensionHandlers[0];
}

module.exports = getExtensionHandlerByString;