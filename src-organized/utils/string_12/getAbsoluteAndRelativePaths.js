/**
 * Retrieves the absolute and relative paths for a given input.
 *
 * This function takes an input value, resolves its absolute path using the getValidInteractionEntry function,
 * and, if an absolute path exists, computes its relative path using the nO1 function
 * with the current working directory (from iA) as the base.
 *
 * @param {string} inputPath - The input path to resolve.
 * @returns {{ absolutePath: string | undefined, relativePath: string | undefined }}
 *   An object containing the absolute path (if resolved) and the relative path (if applicable).
 */
function getAbsoluteAndRelativePaths(inputPath) {
  // Resolve the absolute path using the external getValidInteractionEntry function
  const absolutePath = getValidInteractionEntry(inputPath);

  // If an absolute path exists, compute the relative path from the current working directory
  const relativePath = absolutePath ? nO1(iA(), absolutePath) : undefined;

  return {
    absolutePath,
    relativePath
  };
}

module.exports = getAbsoluteAndRelativePaths;