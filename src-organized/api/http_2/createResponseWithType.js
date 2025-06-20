/**
 * Creates a response object with a specified type and associated properties.
 *
 * @param {Object} sourceResponse - The original response object to base the new response on.
 * @param {string} responseType - The type of response to create. Can be one of: 'basic', 'cors', 'opaque', 'opaqueredirect'.
 * @returns {Object} The new response object with the specified type and properties.
 * @throws Will call hu1(false) if the responseType is invalid.
 */
function createResponseWithType(sourceResponse, responseType) {
  // Handle 'basic' and 'cors' types, which share the same structure
  if (responseType === "basic" || responseType === "cors") {
    return createObservableProxy(sourceResponse, {
      type: responseType,
      headersList: sourceResponse.headersList
    });
  }

  // Handle 'opaque' type
  if (responseType === "opaque") {
    return createObservableProxy(sourceResponse, {
      type: "opaque",
      urlList: Object.freeze([]), // An immutable empty array for urlList
      status: 0,
      statusText: "",
      body: null
    });
  }

  // Handle 'opaqueredirect' type
  if (responseType === "opaqueredirect") {
    return createObservableProxy(sourceResponse, {
      type: "opaqueredirect",
      status: 0,
      statusText: "",
      headersList: [], // An empty array for headersList
      body: null
    });
  }

  // If the responseType is not recognized, trigger an error handler
  hu1(false);
}

module.exports = createResponseWithType;