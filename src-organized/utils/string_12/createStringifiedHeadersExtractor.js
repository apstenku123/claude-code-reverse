/**
 * Extracts headers from a provided function, stringifies their values, and warns about invalid entries.
 *
 * @param {Function} getHeadersFn - a function that returns an object of header key-value pairs.
 * @returns {Function} a function that, when called, returns an object with stringified header values.
 */
function createStringifiedHeadersExtractor(getHeadersFn) {
  return () => {
    const stringifiedHeaders = {};
    // Safely invoke getHeadersFn and default to an empty object if undefined/null
    const headers = getHeadersFn?.() ?? {};
    Object.entries(headers).forEach(([headerName, headerValue]) => {
      if (typeof headerValue !== "undefined") {
        // Stringify valid header values
        stringifiedHeaders[headerName] = String(headerValue);
      } else {
        // Warn about invalid (undefined) header values
        Q26.diag.warn(`Header "${headerName}" has invalid value (${headerValue}) and will be ignored`);
      }
    });
    return stringifiedHeaders;
  };
}

module.exports = createStringifiedHeadersExtractor;