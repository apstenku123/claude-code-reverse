/**
 * Extracts a RegExp object from the provided source using the isObjectType utility function.
 *
 * @param {any} source - The input value from which to extract a RegExp object.
 * @returns {any} The result of calling isObjectType with the source and 'RegExp' as arguments.
 */
function extractRegExpFromSource(source) {
  // Delegates extraction logic to the isObjectType utility with 'RegExp' as the type
  return isObjectType(source, "RegExp");
}

module.exports = extractRegExpFromSource;