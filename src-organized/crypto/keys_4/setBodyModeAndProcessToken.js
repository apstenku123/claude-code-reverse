/**
 * Sets the insertion mode of the given security context to 'IN_BODY_MODE' and processes the provided token.
 *
 * @param {Object} securityContext - The security context object whose insertion mode will be set and which will process the token.
 * @param {Object} token - The token to be processed by the security context.
 * @returns {void}
 */
function setBodyModeAndProcessToken(securityContext, token) {
  // Set the insertion mode to indicate processing is happening in the body mode
  securityContext.insertionMode = "IN_BODY_MODE";
  // Process the provided token using the security context'createInteractionAccessor internal method
  securityContext._processToken(token);
}

module.exports = setBodyModeAndProcessToken;