/**
 * Extracts headers from a provided function, stringifies their values, and filters out undefined values.
 * Logs a warning for any header with an undefined value.
 *
 * @param {Function} getHeadersFn - a function that returns an object representing headers.
 * @returns {Function} - a function that, when called, returns an object with stringified header values.
 */
function createStringifiedHeaderExtractor(getHeadersFn) {
  return () => {
    const stringifiedHeaders = {};
    // Safely call getHeadersFn and default to empty object if result is null/undefined
    const headers = getHeadersFn?.() ?? {};
    Object.entries(headers).forEach(([headerName, headerValue]) => {
      if (typeof headerValue !== "undefined") {
        // Stringify the header value
        stringifiedHeaders[headerName] = String(headerValue);
      } else {
        // Log a warning if the header value is undefined
        Q26.diag.warn(`Header "${headerName}" has invalid value (${headerValue}) and will be ignored`);
      }
    });
    return stringifiedHeaders;
  };
}

module.exports = createStringifiedHeaderExtractor;