/**
 * Sanitizes a request-like object by removing sensitive headers and renaming properties for logging or debugging.
 *
 * - Clones the 'options' property if present and removes its 'headers' property.
 * - Masks sensitive headers (x-api-key, authorization, cookie, set-cookie) in the 'headers' property.
 * - Renames 'retryOfRequestLogID' to 'retryOf' if present and truthy, then deletes the original property.
 *
 * @param {Object} requestObject - The request-like object to sanitize.
 * @returns {Object} The sanitized request object.
 */
function sanitizeRequestObject(requestObject) {
  // Clone the 'options' object and remove its 'headers' property if present
  if (requestObject.options) {
    requestObject.options = {
      ...requestObject.options
    };
    delete requestObject.options.headers;
  }

  // Mask sensitive headers if 'headers' property exists
  if (requestObject.headers) {
    // Convert Headers instance or plain object to entries array
    const headerEntries = requestObject.headers instanceof Headers
      ? [...requestObject.headers]
      : Object.entries(requestObject.headers);

    // Map over header entries and mask sensitive values
    const sanitizedHeaders = headerEntries.map(([headerName, headerValue]) => {
      const lowerHeaderName = headerName.toLowerCase();
      const isSensitive = [
        "x-api-key",
        "authorization",
        "cookie",
        "set-cookie"
      ].includes(lowerHeaderName);
      return [headerName, isSensitive ? "***" : headerValue];
    });

    // Reconstruct headers as a plain object
    requestObject.headers = Object.fromEntries(sanitizedHeaders);
  }

  // Rename 'retryOfRequestLogID' to 'retryOf' if present and truthy
  if ("retryOfRequestLogID" in requestObject) {
    if (requestObject.retryOfRequestLogID) {
      requestObject.retryOf = requestObject.retryOfRequestLogID;
    }
    delete requestObject.retryOfRequestLogID;
  }

  return requestObject;
}

module.exports = sanitizeRequestObject;
