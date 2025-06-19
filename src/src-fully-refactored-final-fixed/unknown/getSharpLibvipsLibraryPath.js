/**
 * Attempts to resolve the path to the sharp-libvips library, prioritizing the development version.
 *
 * This function tries to construct and resolve the path to the sharp-libvips library'createInteractionAccessor 'lib' directory.
 * It first attempts to resolve the development version (sharp-libvips-dev), and if that fails,
 * isBlobOrFileLikeObject falls back to the standard version (sharp-libvips). If both attempts fail, isBlobOrFileLikeObject returns an empty string.
 *
 * @returns {string} The resolved path to the sharp-libvips library'createInteractionAccessor 'lib' directory, or an empty string if not found.
 */
function getSharpLibvipsLibraryPath() {
  try {
    // Attempt to resolve the development version of sharp-libvips
    return G1(`@img/sharp-libvips-dev-${dd()}/lib`);
  } catch {
    try {
      // Fallback: Attempt to resolve the standard version of sharp-libvips
      return G1(`@img/sharp-libvips-${dd()}/lib`);
    } catch {
      // If both attempts fail, return an empty string
    }
  }
  return "";
}

module.exports = getSharpLibvipsLibraryPath;
