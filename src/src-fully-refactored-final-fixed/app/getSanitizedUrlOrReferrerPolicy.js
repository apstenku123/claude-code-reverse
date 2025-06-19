/**
 * Returns a sanitized URL object or a referrer policy string based on the input URL and options.
 *
 * If the input URL uses the 'file:', 'about:', or 'blank:' protocol, returns 'no-referrer'.
 * Otherwise, returns a sanitized URL object with sensitive fields removed and optionally with pathname and search cleared.
 *
 * @param {string|URL} inputUrl - The URL to sanitize. Can be a string or a URL object.
 * @param {boolean} [clearPathAndSearch=false] - If true, clears the pathname and search properties of the URL.
 * @returns {URL|string} The sanitized URL object, or the string 'no-referrer' for special protocols.
 */
function getSanitizedUrlOrReferrerPolicy(inputUrl, clearPathAndSearch = false) {
  // Validate that inputUrl is a valid URL (side effect from v_)
  v_(inputUrl instanceof URL);

  // Always create a new URL object from the input
  const urlObject = new URL(inputUrl);

  // If the protocol is file:, about:, or blank:, return 'no-referrer' string
  if (
    urlObject.protocol === "file:" ||
    urlObject.protocol === "about:" ||
    urlObject.protocol === "blank:"
  ) {
    return "no-referrer";
  }

  // Remove sensitive information from the URL
  urlObject.username = "";
  urlObject.password = "";
  urlObject.hash = "";

  // Optionally clear pathname and search if requested
  if (clearPathAndSearch) {
    urlObject.pathname = "";
    urlObject.search = "";
  }

  return urlObject;
}

module.exports = getSanitizedUrlOrReferrerPolicy;