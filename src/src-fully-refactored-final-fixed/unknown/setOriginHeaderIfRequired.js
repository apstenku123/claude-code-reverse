/**
 * Sets the 'Origin' header on the request if required, based on request properties and referrer policy.
 *
 * @param {Object} requestConfig - The request configuration object.
 * @param {string} requestConfig.origin - The origin of the request.
 * @param {string} [requestConfig.responseTainting] - The tainting of the response (e.g., 'cors').
 * @param {string} [requestConfig.mode] - The mode of the request (e.g., 'websocket').
 * @param {string} [requestConfig.method] - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} [requestConfig.referrerPolicy] - The referrer policy for the request.
 * @param {Object} requestConfig.headersList - The headers list object with an 'append' method.
 * @returns {void}
 *
 * External dependencies:
 * - getLastUrlFromList(requestConfig): Returns the request'createInteractionAccessor URL or destination for origin comparison.
 * - isHttpsUrlOrProtocol(origin): Checks if the origin is potentially trustworthy.
 * - areUrlsSameOriginOrNullOrigin(requestConfig, destination): Checks if the request is same-origin with the destination.
 */
function setOriginHeaderIfRequired(requestConfig) {
  let originHeaderValue = requestConfig.origin;

  // normalizeToError not set the Origin header for client-originated requests or if origin is undefined
  if (originHeaderValue === "client" || originHeaderValue === undefined) {
    return;
  }

  // Always set Origin header for CORS requests or websockets
  if (
    requestConfig.responseTainting === "cors" ||
    requestConfig.mode === "websocket"
  ) {
    requestConfig.headersList.append("origin", originHeaderValue, true);
    return;
  }

  // For non-GET/HEAD requests, handle referrer policy
  if (
    requestConfig.method !== "GET" &&
    requestConfig.method !== "HEAD"
  ) {
    switch (requestConfig.referrerPolicy) {
      case "no-referrer":
        // Never send the Origin header
        originHeaderValue = null;
        break;
      case "no-referrer-when-downgrade":
      case "strict-origin":
      case "strict-origin-when-cross-origin": {
        // Only send Origin if both origins are trustworthy and not a downgrade
        const requestOrigin = requestConfig.origin;
        const destinationOrigin = getLastUrlFromList(requestConfig);
        if (
          requestOrigin &&
          isHttpsUrlOrProtocol(requestOrigin) &&
          !isHttpsUrlOrProtocol(destinationOrigin)
        ) {
          originHeaderValue = null;
        }
        break;
      }
      case "same-origin": {
        // Only send Origin if request is same-origin
        const destinationOrigin = getLastUrlFromList(requestConfig);
        if (!areUrlsSameOriginOrNullOrigin(requestConfig, destinationOrigin)) {
          originHeaderValue = null;
        }
        break;
      }
      default:
        // For other policies, send the Origin header as is
        break;
    }
    requestConfig.headersList.append("origin", originHeaderValue, true);
  }
}

module.exports = setOriginHeaderIfRequired;
