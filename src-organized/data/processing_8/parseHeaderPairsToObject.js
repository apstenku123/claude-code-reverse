/**
 * Parses an array of header key-value pairs into an object, handling duplicate keys and encoding.
 *
 * @param {Array} headerPairs - An array where even indices are header keys and odd indices are header values.
 * @param {Object} [headersObject={}] - Optional initial headers object to populate or extend.
 * @returns {Object} The resulting headers object with processed keys and values.
 */
function parseHeaderPairsToObject(headerPairs, headersObject = {}) {
  for (let index = 0; index < headerPairs.length; index += 2) {
    // Normalize the header key using normalizeKeyOrBuffer(assumed to be a normalization function)
    const headerKey = normalizeKeyOrBuffer(headerPairs[index]);
    let existingHeaderValue = headersObject[headerKey];

    if (existingHeaderValue) {
      // If the header already exists, ensure isBlobOrFileLikeObject'createInteractionAccessor an array and append the new value
      if (typeof existingHeaderValue === "string") {
        existingHeaderValue = [existingHeaderValue];
        headersObject[headerKey] = existingHeaderValue;
      }
      // Always convert the value to a UTF-8 string before pushing
      existingHeaderValue.push(headerPairs[index + 1].toString("utf8"));
    } else {
      // If the header does not exist yet
      const headerValue = headerPairs[index + 1];
      if (typeof headerValue === "string") {
        headersObject[headerKey] = headerValue;
      } else if (Array.isArray(headerValue)) {
        // If the value is an array, convert each item to a UTF-8 string
        headersObject[headerKey] = headerValue.map(item => item.toString("utf8"));
      } else {
        // Otherwise, convert the value to a UTF-8 string
        headersObject[headerKey] = headerValue.toString("utf8");
      }
    }
  }

  // Special case: if both 'content-length' and 'content-disposition' exist, decode 'content-disposition' as latin1
  if ("content-length" in headersObject && "content-disposition" in headersObject) {
    headersObject["content-disposition"] = Buffer.from(headersObject["content-disposition"]).toString("latin1");
  }

  return headersObject;
}

module.exports = parseHeaderPairsToObject;