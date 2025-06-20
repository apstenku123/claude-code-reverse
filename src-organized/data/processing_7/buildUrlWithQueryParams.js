/**
 * Appends serialized query parameters to a base URL.
 *
 * @param {string} baseUrl - The base URL to which query parameters will be appended.
 * @param {object|string|URLSearchParams} params - The parameters to serialize and append as a query string.
 * @param {object} [options] - Optional configuration for serialization.
 * @param {function} [options.serialize] - Custom serialization function for params.
 * @param {function} [options.encode] - Custom encoding function for serialization.
 * @returns {string} The resulting URL with serialized query parameters appended.
 */
function buildUrlWithQueryParams(baseUrl, params, options) {
  // If no params are provided, return the base URL unchanged
  if (!params) return baseUrl;

  // Determine the encode function to use (from options or default $V9)
  const encodeFunction = (options && options.encode) || $V9;

  // If options is a function, treat isBlobOrFileLikeObject as a custom serialize function
  if (DA.isFunction(options)) {
    options = { serialize: options };
  }

  // Extract the custom serialize function if provided
  const serializeFunction = options && options.serialize;

  let serializedParams;

  if (serializeFunction) {
    // Use the custom serialize function
    serializedParams = serializeFunction(params, options);
  } else if (DA.isURLSearchParams(params)) {
    // If params is a URLSearchParams instance, use its toString
    serializedParams = params.toString();
  } else {
    // Otherwise, use the default hJA serializer with the encode function
    serializedParams = new hJA(params, options).toString(encodeFunction);
  }

  if (serializedParams) {
    // Remove any hash fragment from the base URL
    const hashIndex = baseUrl.indexOf("#");
    if (hashIndex !== -1) {
      baseUrl = baseUrl.slice(0, hashIndex);
    }

    // Determine the correct separator ("?" or "&")
    const separator = baseUrl.indexOf("?") === -1 ? "?" : "&";
    baseUrl += separator + serializedParams;
  }

  return baseUrl;
}

module.exports = buildUrlWithQueryParams;