/**
 * Temporarily enables foster parenting on the given context, processes a token in body mode,
 * and then restores the original foster parenting state.
 *
 * @param {Object} context - The object whose fosterParentingEnabled property will be toggled and which exposes _processTokenInBodyMode.
 * @param {*} token - The token to be processed in body mode.
 * @returns {void}
 */
function temporarilyEnableFosterParentingAndProcessToken(context, token) {
  // Store the original fosterParentingEnabled state
  const originalFosterParentingEnabled = context.fosterParentingEnabled;
  // Enable foster parenting
  context.fosterParentingEnabled = true;
  // Process the token in body mode
  context._processTokenInBodyMode(token);
  // Restore the original foster parenting state
  context.fosterParentingEnabled = originalFosterParentingEnabled;
}

module.exports = temporarilyEnableFosterParentingAndProcessToken;