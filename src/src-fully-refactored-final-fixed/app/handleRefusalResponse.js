/**
 * Handles a refusal response by logging the event and returning a standardized refusal message.
 *
 * @param {string} requestType - The type of request to check for refusal handling.
 * @returns {string|undefined} Returns a refusal message if the requestType is 'refusal'; otherwise, returns undefined.
 */
function handleRefusalResponse(requestType) {
  // Only handle the case where the request type is 'refusal'
  if (requestType !== "refusal") {
    return;
  }

  // Log the refusal event for analytics or auditing purposes
  logTelemetryEventIfEnabled("tengu_refusal_api_response", {});

  // Return a standardized refusal message to the user
  return tY({
    content: `${_Z}: Claude Code is unable to respond to this request, which appears to violate our Usage Policy (https://www.anthropic.com/legal/aup). Please double press esc to edit your last message or start a new session for Claude Code to assist with a different task.`
  });
}

module.exports = handleRefusalResponse;