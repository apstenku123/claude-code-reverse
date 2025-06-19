/**
 * Returns the absolute URL string for a given path or URL fragment, using the application'createInteractionAccessor current origin as the base.
 *
 * @param {string} relativeOrAbsolutePath - The path or URL fragment to resolve into an absolute URL.
 * @returns {string|undefined} The absolute URL as a string, or undefined if the input is invalid.
 */
function getAbsoluteUrlFromPath(relativeOrAbsolutePath) {
  try {
    // Construct a new URL using the provided path and the application'createInteractionAccessor current origin
    // o89.WINDOW.location.origin is assumed to be the application'createInteractionAccessor base URL
    const absoluteUrl = new URL(relativeOrAbsolutePath, o89.WINDOW.location.origin);
    return absoluteUrl.href;
  } catch (error) {
    // If the input is invalid or URL construction fails, return undefined
    return;
  }
}

module.exports = getAbsoluteUrlFromPath;