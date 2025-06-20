/**
 * Appends query parameters to a URL if the URL does not already contain query or fragment identifiers.
 * Throws an error if the URL already contains '?' or '#'.
 *
 * @param {string} url - The base URL to which query parameters may be appended.
 * @param {object} queryParams - An object representing query parameters to append to the URL.
 * @returns {string} The URL with query parameters appended, if applicable.
 * @throws {Error} If the URL already contains '?' or '#'.
 */
function appendQueryParamsToUrl(url, queryParams) {
  // Check if the URL already contains query or fragment identifiers
  if (url.includes("?") || url.includes("#")) {
    throw new Error('Query params cannot be passed when url already contains "?" or "#".');
  }

  // Convert the queryParams object to a query string using the YY6 utility
  const queryString = YY6(queryParams);

  // If there are query parameters, append them to the URL
  if (queryString) {
    url += "?" + queryString;
  }

  return url;
}

module.exports = appendQueryParamsToUrl;