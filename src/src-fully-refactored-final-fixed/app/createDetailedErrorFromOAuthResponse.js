/**
 * Creates a detailed Error object from an OAuth error response and optional additional properties.
 *
 * @param {Object} oauthErrorResponse - The OAuth error response object. Should contain 'error', 'error_description', and/or 'error_uri'.
 * @param {Object} [additionalProperties] - Optional. An object containing additional properties to assign to the Error object.
 * @returns {Error} a new Error object with a detailed message and any additional properties provided.
 */
function createDetailedErrorFromOAuthResponse(oauthErrorResponse, additionalProperties) {
  // Destructure relevant fields from the OAuth error response
  const {
    error: errorCode,
    error_description: errorDescription,
    error_uri: errorUri
  } = oauthErrorResponse;

  // Start building the error message
  let errorMessage = `Error code ${errorCode}`;

  // Append error description if available
  if (typeof errorDescription !== "undefined") {
    errorMessage += `: ${errorDescription}`;
  }

  // Append error URI if available
  if (typeof errorUri !== "undefined") {
    errorMessage += ` - ${errorUri}`;
  }

  // Create the Error object with the constructed message
  const errorObject = new Error(errorMessage);

  // If additional properties are provided, assign them to the error object
  if (additionalProperties) {
    // Get all property keys from the additionalProperties object
    const propertyKeys = Object.keys(additionalProperties);

    // If a stack property exists, ensure isBlobOrFileLikeObject'createInteractionAccessor included
    if (additionalProperties.stack) {
      propertyKeys.push("stack");
    }

    // Assign each property to the error object, except for 'message'
    propertyKeys.forEach(propertyName => {
      if (propertyName !== "message") {
        Object.defineProperty(errorObject, propertyName, {
          value: additionalProperties[propertyName],
          writable: false,
          enumerable: true
        });
      }
    });
  }

  return errorObject;
}

module.exports = createDetailedErrorFromOAuthResponse;