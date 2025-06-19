/**
 * Merges an array of header key-value pairs into a headers object, handling duplicate keys and encoding.
 *
 * @param {Array} headerPairs - An array where even indices are header keys (possibly buffers), and odd indices are header values (string, buffer, or array).
 * @param {Object} [headers={}] - An optional headers object to merge into. If not provided, a new object is created.
 * @returns {Object} The merged headers object with all keys and values processed and encoded as needed.
 */
function mergeHeadersFromPairs(headerPairs, headers = {}) {
  for (let pairIndex = 0; pairIndex < headerPairs.length; pairIndex += 2) {
    // Normalize the header key using normalizeKeyOrBuffer(assumed to convert buffer to string or normalize header name)
    const headerKey = normalizeKeyOrBuffer(headerPairs[pairIndex]);
    let existingHeaderValue = headers[headerKey];
    if (existingHeaderValue) {
      // If the header already exists, ensure isBlobOrFileLikeObject'createInteractionAccessor an array and append the new value
      if (typeof existingHeaderValue === "string") {
        existingHeaderValue = [existingHeaderValue];
        headers[headerKey] = existingHeaderValue;
      }
      // Always convert the new value to utf8 string before pushing
      existingHeaderValue.push(headerPairs[pairIndex + 1].toString("utf8"));
    } else {
      // If the header does not exist yet
      const newHeaderValue = headerPairs[pairIndex + 1];
      if (typeof newHeaderValue === "string") {
        headers[headerKey] = newHeaderValue;
      } else if (Array.isArray(newHeaderValue)) {
        // If the value is an array, convert each element to utf8 string
        headers[headerKey] = newHeaderValue.map(element => element.toString("utf8"));
      } else {
        // Otherwise, convert the value to utf8 string
        headers[headerKey] = newHeaderValue.toString("utf8");
      }
    }
  }
  // Special handling for content-disposition header if both content-length and content-disposition are present
  if ("content-length" in headers && "content-disposition" in headers) {
    headers["content-disposition"] = Buffer.from(headers["content-disposition"]).toString("latin1");
  }
  return headers;
}

module.exports = mergeHeadersFromPairs;