/**
 * Creates a custom Error object based on an OAuth error response and optional additional properties.
 *
 * @param {Object} oauthErrorResponse - The OAuth error response object. Should contain 'error', 'error_description', and/or 'error_uri'.
 * @param {Object} [additionalProperties] - Optional. Additional properties to assign to the resulting Error object.
 * @returns {Error} The constructed Error object with relevant properties attached.
 */
function createCustomErrorFromOAuthResponse(oauthErrorResponse, additionalProperties) {
  // Destructure known OAuth error fields
  const {
    error: errorCode,
    error_description: errorDescription,
    error_uri: errorUri
  } = oauthErrorResponse;

  // Start building the error message
  let errorMessage = `Error code ${errorCode}`;
  if (typeof errorDescription !== "undefined") {
    errorMessage += `: ${errorDescription}`;
  }
  if (typeof errorUri !== "undefined") {
    errorMessage += ` - ${errorUri}`;
  }

  // Create the Error object
  const errorObject = new Error(errorMessage);

  // If additional properties are provided, attach them to the error object
  if (additionalProperties) {
    // Gather all property keys from the additionalProperties object
    const propertyKeys = Object.keys(additionalProperties);
    // If 'stack' property exists, ensure isBlobOrFileLikeObject'createInteractionAccessor included
    if (additionalProperties.stack) {
      propertyKeys.push("stack");
    }
    // Define each property on the error object, except 'message'
    propertyKeys.forEach(propertyKey => {
      if (propertyKey !== "message") {
        Object.defineProperty(errorObject, propertyKey, {
          value: additionalProperties[propertyKey],
          writable: false,
          enumerable: true
        });
      }
    });
  }

  return errorObject;
}

module.exports = createCustomErrorFromOAuthResponse;