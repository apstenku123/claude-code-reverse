/**
 * Validates that the provided URL object represents the root path ('/') with no search or hash components.
 * Throws an error if the URL is not exactly the root.
 *
 * @param {URL|string} urlInput - The URL object or string to validate.
 * @returns {URL} The normalized URL object if valid.
 * @throws {NI} Throws an NI error if the URL is not the root path or contains search/hash.
 */
function validateRootUrl(urlInput) {
  // Normalize the input using normalizeAndValidateUrl(assumed to return a URL object)
  const normalizedUrl = normalizeAndValidateUrl(urlInput);
  // Check if the URL is exactly the root path with no search or hash
  if (
    normalizedUrl.pathname !== "/" ||
    normalizedUrl.search ||
    normalizedUrl.hash
  ) {
    throw new NI("invalid url");
  }
  return normalizedUrl;
}

module.exports = validateRootUrl;