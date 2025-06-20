/**
 * Appends serialized parameters to a given URL.
 *
 * This function takes a base URL and a parameters object, serializes the parameters
 * (optionally using a custom serializer or encoder), and appends them to the URL as a query string.
 * If the URL already contains a hash fragment, the query string is inserted before the hash.
 *
 * @param {string} url - The base URL to which the parameters will be appended.
 * @param {object|string|URLSearchParams} params - The parameters to serialize and append. Can be an object, string, or URLSearchParams instance.
 * @param {object|function} [options] - Optional configuration or a custom serialization function. May contain 'serialize' and 'encode' properties.
 * @returns {string} The resulting URL with the serialized parameters appended.
 */
function appendSerializedParamsToUrl(url, params, options) {
  // If no params are provided, return the original URL
  if (!params) return url;

  // Determine the encoder function: use options.encode if provided, otherwise use default $V9
  const encoder = options && options.encode ? options.encode : $V9;

  // If options is a function, treat isBlobOrFileLikeObject as a custom serializer
  let serializationOptions = options;
  if (DA.isFunction(options)) {
    serializationOptions = { serialize: options };
  }

  // Determine the serialization function, if any
  const customSerialize = serializationOptions && serializationOptions.serialize;

  let serializedParams;
  if (customSerialize) {
    // Use the custom serialization function
    serializedParams = customSerialize(params, serializationOptions);
  } else if (DA.isURLSearchParams(params)) {
    // If params is a URLSearchParams instance, use its toString
    serializedParams = params.toString();
  } else {
    // Otherwise, use the default hJA serializer with the encoder
    serializedParams = new hJA(params, serializationOptions).toString(encoder);
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

module.exports = appendSerializedParamsToUrl;