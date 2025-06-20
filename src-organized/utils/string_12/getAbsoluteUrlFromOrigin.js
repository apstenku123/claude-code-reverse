/**
 * Returns the absolute URL string for a given relative or absolute URL, using the current window'createInteractionAccessor origin as base.
 *
 * @param {string} urlPath - The relative or absolute URL to resolve.
 * @returns {string|undefined} The absolute URL as a string, or undefined if the URL is invalid.
 */
function getAbsoluteUrlFromOrigin(urlPath) {
  try {
    // Construct a new URL using the provided path and the application'createInteractionAccessor window origin
    // o89.WINDOW is assumed to be a global object providing the window context
    const absoluteUrl = new URL(urlPath, o89.WINDOW.location.origin).href;
    return absoluteUrl;
  } catch (error) {
    // If the URL constructor throws (invalid URL), return undefined
    return;
  }
}

module.exports = getAbsoluteUrlFromOrigin;