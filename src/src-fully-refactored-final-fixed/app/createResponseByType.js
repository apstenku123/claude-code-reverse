/**
 * Creates a response object based on the specified response type.
 *
 * @param {Object} sourceResponse - The original response object to base the new response on.
 * @param {string} responseType - The type of response to create. Can be one of: 'basic', 'cors', 'opaque', 'opaqueredirect'.
 * @returns {Object} The new response object with properties set according to the response type.
 * @throws Will call hu1(false) if an unknown responseType is provided.
 */
function createResponseByType(sourceResponse, responseType) {
  // Handle 'basic' and 'cors' types: pass through headersList
  if (responseType === "basic") {
    return createObservableProxy(sourceResponse, {
      type: "basic",
      headersList: sourceResponse.headersList
    });
  } else if (responseType === "cors") {
    return createObservableProxy(sourceResponse, {
      type: "cors",
      headersList: sourceResponse.headersList
    });
  } 
  // Handle 'opaque' type: freeze urlList, set status to 0, empty statusText, and null body
  else if (responseType === "opaque") {
    return createObservableProxy(sourceResponse, {
      type: "opaque",
      urlList: Object.freeze([]),
      status: 0,
      statusText: "",
      body: null
    });
  } 
  // Handle 'opaqueredirect' type: set status to 0, empty statusText, empty headersList, and null body
  else if (responseType === "opaqueredirect") {
    return createObservableProxy(sourceResponse, {
      type: "opaqueredirect",
      status: 0,
      statusText: "",
      headersList: [],
      body: null
    });
  } 
  // If responseType is not recognized, call error handler
  else {
    hu1(false);
  }
}

module.exports = createResponseByType;