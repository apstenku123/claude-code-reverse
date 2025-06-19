/**
 * Extracts the file extension from a string and retrieves the corresponding handler from the extensions registry.
 *
 * @param {string} fileName - The name of the file whose extension handler is to be retrieved.
 * @returns {any|boolean} The handler associated with the file extension, or false if not found or input is invalid.
 */
function getFileExtensionHandler(fileName) {
  // Validate that fileName is a non-empty string
  if (!fileName || typeof fileName !== "string") return false;

  // Attempt to extract the file extension using the hWA regular expression
  const extensionMatch = hWA.exec(fileName);

  // Retrieve the handler array for the extracted extension (case-insensitive)
  const extensionHandlers = extensionMatch && mX9.extensions[extensionMatch[1].toLowerCase()];

  // If no handler found or the handler array is empty, return false
  if (!extensionHandlers || !extensionHandlers.length) return false;

  // Return the first handler associated with the extension
  return extensionHandlers[0];
}

module.exports = getFileExtensionHandler;