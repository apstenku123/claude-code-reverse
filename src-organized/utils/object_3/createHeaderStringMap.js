/**
 * Creates a function that, when called, returns an object mapping header names to their string values.
 * Only headers with defined values are included; undefined values trigger a warning and are ignored.
 *
 * @param {Function} getHeaders - a function that returns an object of header key-value pairs when invoked.
 * @returns {Function} a function that returns an object mapping header names to string values.
 */
function createHeaderStringMap(getHeaders) {
  return () => {
    const headerStringMap = {};
    // Safely invoke getHeaders and get its entries, defaulting to an empty object if undefined/null
    const headers = getHeaders?.() ?? {};
    Object.entries(headers).forEach(([headerName, headerValue]) => {
      if (typeof headerValue !== "undefined") {
        // Convert header value to string and add to result
        headerStringMap[headerName] = String(headerValue);
      } else {
        // Warn if header value is undefined
        Q26.diag.warn(
          `Header "${headerName}" has invalid value (${headerValue}) and will be ignored`
        );
      }
    });
    return headerStringMap;
  };
}

module.exports = createHeaderStringMap;