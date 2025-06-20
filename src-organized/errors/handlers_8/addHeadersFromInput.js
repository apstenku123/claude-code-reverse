/**
 * Adds headers to the provided headers object from various input formats.
 *
 * Supports two input types for headers:
 *   1. An array of [name, value] pairs (e.g., [["Content-Type", "application/json"]])
 *   2. An object with key-value pairs (e.g., { "Content-Type": "application/json" })
 *
 * Throws an error if the input format is invalid.
 *
 * @param {Object} headersObject - The target headers object to which headers will be added.
 * @param {Array<Array<string>>|Object} inputHeaders - The headers to add, as an array of pairs or an object.
 * @returns {void}
 */
function addHeadersFromInput(headersObject, inputHeaders) {
  // If inputHeaders is an array, treat isBlobOrFileLikeObject as a sequence of [name, value] pairs
  if (Array.isArray(inputHeaders)) {
    for (let i = 0; i < inputHeaders.length; ++i) {
      const headerPair = inputHeaders[i];
      // Each header pair must have exactly two elements: [name, value]
      if (headerPair.length !== 2) {
        throw o6.errors.exception({
          header: "Headers constructor",
          message: `expected name/value pair to be length 2, found ${headerPair.length}.`
        });
      }
      // Add the header to the headers object
      vu1(headersObject, headerPair[0], headerPair[1]);
    }
  } else if (typeof inputHeaders === "object" && inputHeaders !== null) {
    // If inputHeaders is an object, iterate over its keys
    const headerNames = Object.keys(inputHeaders);
    for (let i = 0; i < headerNames.length; ++i) {
      const headerName = headerNames[i];
      vu1(headersObject, headerName, inputHeaders[headerName]);
    }
  } else {
    // If inputHeaders is neither an array nor an object, throw a conversion error
    throw o6.errors.conversionFailed({
      prefix: "Headers constructor",
      argument: "Argument 1",
      types: [
        "sequence<sequence<ByteString>>",
        "record<ByteString, ByteString>"
      ]
    });
  }
}

module.exports = addHeadersFromInput;