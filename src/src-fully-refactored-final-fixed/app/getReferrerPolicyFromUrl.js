/**
 * Determines the appropriate referrer policy for a given URL string.
 *
 * If the URL uses the 'file:', 'about:', or 'blank:' protocol, returns 'no-referrer'.
 * Optionally strips path and query information based on the provided flag.
 *
 * @param {string} urlString - The URL to evaluate and potentially sanitize.
 * @param {boolean} [stripPathAndQuery=false] - If true, removes pathname and search from the URL.
 * @returns {string|URL} Returns 'no-referrer' for certain protocols, or the sanitized URL object otherwise.
 */
function getReferrerPolicyFromUrl(urlString, stripPathAndQuery = false) {
  // Validate that the input is a URL instance or can be converted to one
  v_(urlString instanceof URL);

  // Always create a new URL object from the input
  const urlObject = new URL(urlString);

  // If the protocol is 'file:', 'about:', or 'blank:', return 'no-referrer'
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

  // Optionally strip pathname and search parameters
  if (stripPathAndQuery) {
    urlObject.pathname = "";
    urlObject.search = "";
  }

  return urlObject;
}

module.exports = getReferrerPolicyFromUrl;