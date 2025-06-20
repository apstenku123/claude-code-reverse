/**
 * Appends a header to a headers object after validating the header name and value.
 * Throws errors if the header name or value is invalid, or if the headers object is immutable.
 *
 * @param {object} headersObject - The headers object to which the header will be appended.
 * @param {string} headerName - The name of the header to append.
 * @param {string} headerValue - The value of the header to append.
 * @returns {any} The result of appending the header to the headers object.
 * @throws {TypeError} If the headers object is immutable.
 * @throws {Error} If the header name or value is invalid.
 */
function appendHeaderToHeadersObject(headersObject, headerName, headerValue) {
  // Normalize the header value
  const normalizedHeaderValue = trimStringByPredicate(headerValue);

  // Validate header name
  if (!kr(headerName)) {
    throw o6.errors.invalidArgument({
      prefix: "Headers.append",
      value: headerName,
      type: "header name"
    });
  }

  // Validate header value
  if (!Gp0(normalizedHeaderValue)) {
    throw o6.errors.invalidArgument({
      prefix: "Headers.append",
      value: normalizedHeaderValue,
      type: "header value"
    });
  }

  // Check if the headers object is immutable
  if (Wp0(headersObject) === "immutable") {
    throw new TypeError("immutable");
  }

  // Append the header to the headers object
  return bu1(headersObject).append(headerName, normalizedHeaderValue, false);
}

module.exports = appendHeaderToHeadersObject;