/**
 * Returns a sanitized URL object or the string "no-referrer" based on protocol and options.
 *
 * If the input URL uses the 'file:', 'about:', or 'blank:' protocol, returns "no-referrer".
 * Otherwise, returns a sanitized URL object with sensitive information removed.
 * If removePathAndQuery is true, also removes the pathname and search parameters.
 *
 * @param {string|URL} inputUrl - The URL to sanitize. Can be a string or a URL object.
 * @param {boolean} [removePathAndQuery=false] - Whether to remove the pathname and search from the URL.
 * @returns {URL|string} The sanitized URL object, or the string "no-referrer" if the protocol is not allowed.
 */
function getSanitizedUrlOrNoReferrer(inputUrl, removePathAndQuery = false) {
  // Validate that inputUrl is a URL instance or can be converted to one
  v_(inputUrl instanceof URL);
  // Ensure inputUrl is a URL object
  const url = new URL(inputUrl);

  // If the protocol is 'file:', 'about:', or 'blank:', return "no-referrer"
  if (
    url.protocol === "file:" ||
    url.protocol === "about:" ||
    url.protocol === "blank:"
  ) {
    return "no-referrer";
  }

  // Remove sensitive information from the URL
  url.username = "";
  url.password = "";
  url.hash = "";

  // Optionally remove pathname and search if requested
  if (removePathAndQuery) {
    url.pathname = "";
    url.search = "";
  }

  return url;
}

module.exports = getSanitizedUrlOrNoReferrer;
