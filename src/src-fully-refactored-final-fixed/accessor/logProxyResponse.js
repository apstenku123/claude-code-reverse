/**
 * Logs proxy response details using the application'createInteractionAccessor logger.
 *
 * This function acts as a centralized logger for proxy response events,
 * forwarding all provided arguments to the logger with a specific context label.
 *
 * @param {...any} proxyResponseDetails - The details or messages to log about the proxy response.
 * @returns {void} This function does not return a value.
 */
function logProxyResponse(...proxyResponseDetails) {
  // Log all proxy response details with a context label for easier debugging
  S39.logger.log("[https-proxy-agent:parse-proxy-response]", ...proxyResponseDetails);
}

module.exports = logProxyResponse;