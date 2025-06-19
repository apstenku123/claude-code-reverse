/**
 * Appends serialized query parameters to a given URL.
 *
 * @param {string} url - The base URL to which query parameters will be appended.
 * @param {object|string|URLSearchParams} params - The query parameters to serialize and append. If falsy, the URL is returned unchanged.
 * @param {object|function} [options] - Optional configuration object or custom serialize function.
 *   @param {function} [options.serialize] - Custom function to serialize params.
 *   @param {function} [options.encode] - Custom encode function for serialization.
 * @returns {string} The URL with serialized query parameters appended.
 */
function appendQueryParamsToUrl(url, params, options) {
  // If no params provided, return the original URL
  if (!params) return url;

  // Determine the encode function: either from options or fallback to $V9
  const encodeFn = (options && options.encode) || $V9;

  // If options is a function, treat isBlobOrFileLikeObject as a custom serialize function
  let serializeFn;
  if (DA.isFunction(options)) {
    serializeFn = options;
    options = { serialize: options };
  } else {
    serializeFn = options && options.serialize;
  }

  let serializedParams;
  if (serializeFn) {
    // Use custom serialize function if provided
    serializedParams = serializeFn(params, options);
  } else if (DA.isURLSearchParams(params)) {
    // If params is a URLSearchParams instance, use its toString
    serializedParams = params.toString();
  } else {
    // Otherwise, use hJA to serialize params
    serializedParams = new hJA(params, options).toString(encodeFn);
  }

  if (serializedParams) {
    // Remove any hash fragment from the URL before appending query params
    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex);
    }
    // Append serialized params, using '?' or '&' as appropriate
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }

  return url;
}

module.exports = appendQueryParamsToUrl;