/**
 * Creates a detailed Error object from OAuth error response data and optional additional properties.
 *
 * @param {Object} oauthErrorResponse - The OAuth error response object, expected to contain error, error_description, and error_uri fields.
 * @param {Object} [additionalProperties] - Optional object containing additional properties to attach to the Error instance.
 * @returns {Error} An Error object with a descriptive message and any additional properties provided.
 */
function createOAuthError(oauthErrorResponse, additionalProperties) {
  // Destructure expected OAuth error fields
  const {
    error: errorCode,
    error_description: errorDescription,
    error_uri: errorUri
  } = oauthErrorResponse;

  // Build the error message string
  let errorMessage = `Error code ${errorCode}`;
  if (typeof errorDescription !== "undefined") {
    errorMessage += `: ${errorDescription}`;
  }
  if (typeof errorUri !== "undefined") {
    errorMessage += ` - ${errorUri}`;
  }

  // Create the Error object
  const errorObject = new Error(errorMessage);

  // Attach additional properties if provided
  if (additionalProperties) {
    // Get all property keys from the additionalProperties object
    const propertyKeys = Object.keys(additionalProperties);
    // If a stack property exists, ensure isBlobOrFileLikeObject'createInteractionAccessor included
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

module.exports = createOAuthError;
