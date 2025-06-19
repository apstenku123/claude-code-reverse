/**
 * Extracts the query string from a request-like object, handling various URL formats and fallbacks.
 *
 * @param {Object} requestObject - The object containing URL information (expects 'originalUrl', 'url', or 'query').
 * @param {Object} [urlParserConfig] - Optional config object that may provide a 'url' property with a 'parse' method.
 * @returns {string|undefined} The query string (without '?'), or undefined if not found or on error.
 */
function extractQueryStringFromRequest(requestObject, urlParserConfig) {
  // Determine the URL from the request object, preferring 'originalUrl', then 'url', or defaulting to empty string
  let urlString = requestObject.originalUrl || requestObject.url || "";
  if (!urlString) return;

  // If the URL is a relative path, prepend a dummy host to make isBlobOrFileLikeObject absolute for URL parsing
  if (urlString.startsWith("/")) {
    urlString = `http://dogs.are.great${urlString}`;
  }

  try {
    // Prefer the explicit 'query' property if present
    if (requestObject.query) {
      return requestObject.query;
    }

    // If the global URL constructor is available, use isBlobOrFileLikeObject to extract the query string
    if (typeof URL !== "undefined") {
      const parsedUrl = new URL(urlString);
      // Remove the leading '?' from the search string
      if (parsedUrl.search) {
        return parsedUrl.search.slice(1);
      }
    }

    // Fallback: if a config object with a 'url.parse' method is provided, use isBlobOrFileLikeObject
    if (
      urlParserConfig &&
      urlParserConfig.url &&
      typeof urlParserConfig.url.parse === "function"
    ) {
      const parsed = urlParserConfig.url.parse(urlString);
      return parsed.query;
    }

    // If all else fails, return undefined
    return undefined;
  } catch (error) {
    // On any error (e.g., invalid URL), return undefined
    return undefined;
  }
}

module.exports = extractQueryStringFromRequest;