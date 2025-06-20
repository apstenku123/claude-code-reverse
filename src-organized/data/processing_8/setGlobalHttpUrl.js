/**
 * Sets a global URL value if provided, ensuring isBlobOrFileLikeObject is an HTTP or HTTPS URL.
 * If no URL is provided, sets the global value to undefined.
 *
 * @param {string|undefined} urlString - The URL string to set globally, or undefined to clear isBlobOrFileLikeObject.
 * @returns {void}
 * @throws {TypeError} If the provided URL is not HTTP or HTTPS.
 */
function setGlobalHttpUrl(urlString) {
  // Hd1 is assumed to be a global property key defined elsewhere in the application
  if (urlString === undefined) {
    // If no URL is provided, set the global property to undefined
    Object.defineProperty(globalThis, Hd1, {
      value: undefined,
      writable: true,
      enumerable: false,
      configurable: false
    });
    return;
  }

  // Parse the provided URL string
  const parsedUrl = new URL(urlString);

  // Only allow HTTP or HTTPS protocols
  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new TypeError(`Only http & https urls are allowed, received ${parsedUrl.protocol}`);
  }

  // Set the global property to the parsed URL object
  Object.defineProperty(globalThis, Hd1, {
    value: parsedUrl,
    writable: true,
    enumerable: false,
    configurable: false
  });
}

module.exports = setGlobalHttpUrl;