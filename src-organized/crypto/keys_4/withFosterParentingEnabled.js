/**
 * Temporarily enables foster parenting mode on the given security context while processing a token in body mode.
 * Restores the original fosterParentingEnabled state after processing.
 *
 * @param {Object} securityContext - The security context object that contains the fosterParentingEnabled flag and the _processTokenInBodyMode method.
 * @param {*} token - The token to be processed in body mode.
 * @returns {void}
 */
function withFosterParentingEnabled(securityContext, token) {
  // Save the original state of fosterParentingEnabled
  const originalFosterParentingEnabled = securityContext.fosterParentingEnabled;

  // Enable foster parenting mode
  securityContext.fosterParentingEnabled = true;

  // Process the token in body mode while foster parenting is enabled
  securityContext._processTokenInBodyMode(token);

  // Restore the original foster parenting state
  securityContext.fosterParentingEnabled = originalFosterParentingEnabled;
}

module.exports = withFosterParentingEnabled;