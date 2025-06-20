/**
 * Sets the insertion mode of the given security context to 'IN_BODY_MODE' and processes the provided token.
 *
 * @param {Object} securityContext - The security context object that manages authentication state and token processing.
 * @param {Object} token - The token object to be processed for authentication.
 * @returns {void}
 */
function setInBodyModeAndProcessToken(securityContext, token) {
  // Set the insertion mode to 'IN_BODY_MODE' to indicate the current authentication phase
  securityContext.insertionMode = "IN_BODY_MODE";
  // Process the provided token using the security context'createInteractionAccessor internal method
  securityContext._processToken(token);
}

module.exports = setInBodyModeAndProcessToken;