/**
 * Creates a normalized HTTP request state object with default values, allowing overrides via the provided options.
 *
 * @param {Object} [options={}] - Optional overrides for the HTTP request state properties.
 * @param {boolean} [options.aborted] - Indicates if the request was aborted.
 * @param {boolean} [options.rangeRequested] - Indicates if a range was requested.
 * @param {boolean} [options.timingAllowPassed] - Indicates if timing-allow check passed.
 * @param {boolean} [options.requestIncludesCredentials] - Indicates if credentials are included in the request.
 * @param {string} [options.type] - The type of the request.
 * @param {number} [options.status] - The HTTP status code.
 * @param {Object|null} [options.timingInfo] - Timing information for the request.
 * @param {string} [options.cacheState] - The cache state of the request.
 * @param {string} [options.statusText] - The HTTP status text.
 * @param {Array} [options.urlList] - List of URLs involved in the request.
 * @param {Object|Array} [options.headersList] - Headers for the request.
 * @returns {Object} The normalized HTTP request state object with defaults and overrides.
 */
function createHttpRequestState(options = {}) {
  // Destructure headersList and urlList for special handling
  const { headersList, urlList, ...otherOptions } = options;

  return {
    aborted: false,
    rangeRequested: false,
    timingAllowPassed: false,
    requestIncludesCredentials: false,
    type: "default",
    status: 200,
    timingInfo: null,
    cacheState: "",
    statusText: "",
    ...otherOptions, // Spread other overrides
    // Normalize headersList: wrap in Jp0 if provided, else create new Jp0
    headersList: headersList ? new Jp0(headersList) : new Jp0(),
    // Normalize urlList: shallow copy if provided, else empty array
    urlList: urlList ? [...urlList] : []
  };
}

module.exports = createHttpRequestState;