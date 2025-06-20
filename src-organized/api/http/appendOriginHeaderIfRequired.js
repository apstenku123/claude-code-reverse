/**
 * Appends the 'Origin' header to the request'createInteractionAccessor headers list if required, based on request mode, method, and referrer policy.
 *
 * @param {Object} requestConfig - The configuration object for the request.
 * @param {string} requestConfig.origin - The origin of the request.
 * @param {string} [requestConfig.responseTainting] - Indicates how the response will be tainted (e.g., 'cors').
 * @param {string} [requestConfig.mode] - The request mode (e.g., 'websocket').
 * @param {Object} requestConfig.headersList - The headers list object with an 'append' method.
 * @param {string} [requestConfig.method] - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} [requestConfig.referrerPolicy] - The referrer policy for the request.
 * @returns {void}
 *
 * External dependencies:
 * - getLastUrlFromList: Function that returns the request'createInteractionAccessor URL or destination.
 * - isHttpsUrlOrProtocol: Function that checks if a given origin is secure.
 * - areUrlsSameOriginOrNullOrigin: Function that checks if two origins are the same.
 */
function appendOriginHeaderIfRequired(requestConfig) {
  let originHeaderValue = requestConfig.origin;

  // If the origin is 'client' or undefined, do not append the header
  if (originHeaderValue === "client" || originHeaderValue === undefined) {
    return;
  }

  // If response tainting is 'cors' or mode is 'websocket', always append the origin header
  if (
    requestConfig.responseTainting === "cors" ||
    requestConfig.mode === "websocket"
  ) {
    requestConfig.headersList.append("origin", originHeaderValue, true);
    return;
  }

  // For non-GET and non-HEAD methods, handle referrer policy
  if (
    requestConfig.method !== "GET" &&
    requestConfig.method !== "HEAD"
  ) {
    switch (requestConfig.referrerPolicy) {
      case "no-referrer":
        originHeaderValue = null;
        break;
      case "no-referrer-when-downgrade":
      case "strict-origin":
      case "strict-origin-when-cross-origin":
        // If the request origin is secure and the destination is not, omit the origin header
        if (
          requestConfig.origin &&
          isHttpsUrlOrProtocol(requestConfig.origin) &&
          !isHttpsUrlOrProtocol(getLastUrlFromList(requestConfig))
        ) {
          originHeaderValue = null;
        }
        break;
      case "same-origin":
        // If the request origin and destination are not the same, omit the origin header
        if (!areUrlsSameOriginOrNullOrigin(requestConfig, getLastUrlFromList(requestConfig))) {
          originHeaderValue = null;
        }
        break;
      default:
        // For all other policies, do nothing (fall through)
        break;
    }
    requestConfig.headersList.append("origin", originHeaderValue, true);
  }
}

module.exports = appendOriginHeaderIfRequired;
