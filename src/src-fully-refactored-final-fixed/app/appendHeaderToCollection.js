/**
 * Appends a header to a headers collection after validating the header name and value.
 * Throws errors if the header name or value are invalid, or if the headers collection is immutable.
 *
 * @param {object} headersCollection - The headers collection to which the header will be appended.
 * @param {string} headerName - The name of the header to append.
 * @param {string} headerValue - The value of the header to append.
 * @returns {any} The result of appending the header to the collection.
 * @throws {TypeError} If the headers collection is immutable.
 * @throws {Error} If the header name or value are invalid.
 */
function appendHeaderToCollection(headersCollection, headerName, headerValue) {
  // Normalize the header value
  const normalizedHeaderValue = trimStringByPredicate(headerValue);

  // Validate the header name
  if (!kr(headerName)) {
    throw o6.errors.invalidArgument({
      prefix: "Headers.append",
      value: headerName,
      type: "header name"
    });
  }

  // Validate the header value
  if (!Gp0(normalizedHeaderValue)) {
    throw o6.errors.invalidArgument({
      prefix: "Headers.append",
      value: normalizedHeaderValue,
      type: "header value"
    });
  }

  // Check if the headers collection is immutable
  if (Wp0(headersCollection) === "immutable") {
    throw new TypeError("immutable");
  }

  // Append the header to the collection
  return bu1(headersCollection).append(headerName, normalizedHeaderValue, false);
}

module.exports = appendHeaderToCollection;