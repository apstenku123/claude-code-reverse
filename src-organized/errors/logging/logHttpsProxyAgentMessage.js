/**
 * Logs messages to the https-proxy-agent logger.
 *
 * This function acts as a wrapper around the logger for the https-proxy-agent,
 * forwarding any provided messages or data to the logger'createInteractionAccessor log method.
 *
 * @param {...any} messages - The messages or data to log. Accepts any number of arguments of any type.
 * @returns {void} This function does not return a value.
 */
function logHttpsProxyAgentMessage(...messages) {
  // Forward all provided messages to the https-proxy-agent logger
  f39.logger.log("[https-proxy-agent]", ...messages);
}

module.exports = logHttpsProxyAgentMessage;