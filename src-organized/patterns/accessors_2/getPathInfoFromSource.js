/**
 * Retrieves absolute and relative path information from a given source.
 *
 * @param {any} source - The source object or value to extract path information from.
 * @returns {{ absolutePath: string | undefined, relativePath: string | undefined }}
 *   An object containing the absolute path (if available) and the relative path (if available).
 */
function getPathInfoFromSource(source) {
  // Extract the absolute path from the source using the getValidInteractionEntry function
  const absolutePath = getValidInteractionEntry(source);

  // If absolutePath exists, compute the relative path using nO1 and iA
  const relativePath = absolutePath ? nO1(iA(), absolutePath) : undefined;

  return {
    absolutePath,
    relativePath
  };
}

module.exports = getPathInfoFromSource;