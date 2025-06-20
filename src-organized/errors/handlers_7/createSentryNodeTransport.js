/**
 * Creates a Sentry transport for Node.js, handling proxy, keep-alive, and tunnel/DSN validation.
 * If the DSN or tunnel option is invalid, logs a warning and returns a noop transport.
 *
 * @param {Object} transportOptions - The options for configuring the Sentry transport.
 * @param {string} transportOptions.url - The DSN or tunnel URL.
 * @param {string} [transportOptions.proxy] - Optional explicit proxy URL.
 * @param {boolean} [transportOptions.keepAlive] - Whether to enable keep-alive for the agent.
 * @param {string} [transportOptions.httpModule] - Optional HTTP module override.
 * @returns {Function} a Sentry transport function suitable for use in Node.js.
 */
function createSentryNodeTransport(transportOptions) {
  let parsedUrl;
  try {
    // Attempt to parse the DSN or tunnel URL
    parsedUrl = new qGA.URL(transportOptions.url);
  } catch (error) {
    // If parsing fails, log a warning and return a noop transport
    c39.consoleSandbox(() => {
      console.warn(
        "[@sentry/node]: Invalid dsn or tunnel option, will not send any events. The tunnel option must be a full URL when used."
      );
    });
    return $getCachedOrFreshConfig.createTransport(transportOptions, () => Promise.resolve({}));
  }

  // Determine if the protocol is HTTPS
  const isHttps = parsedUrl.protocol === "https:";

  // Determine the proxy to use: explicit option, environment variable, or undefined
  const proxyUrl = shouldBypassProxy(
    parsedUrl,
    transportOptions.proxy ||
      (isHttps ? process.env.https_proxy : undefined) ||
      process.env.http_proxy
  );

  // Choose the appropriate HTTP/HTTPS module
  const httpModule = isHttps ? d39 : m39;

  // Determine keepAlive setting (default to false if not specified)
  const keepAlive = transportOptions.keepAlive === undefined ? false : transportOptions.keepAlive;

  // Create the appropriate agent: proxy agent if proxy is set, else standard agent
  const agent = proxyUrl
    ? new l39.HttpsProxyAgent(proxyUrl)
    : new httpModule.Agent({
        keepAlive,
        maxSockets: 30,
        timeout: 2000
      });

  // Build the request function using the resolved HTTP module and agent
  const defineGaussHighlighting = createHttpPostRequestHandler(
    transportOptions,
    mN1(transportOptions.httpModule, () => httpModule),
    agent
  );

  // Return the configured transport
  return $getCachedOrFreshConfig.createTransport(transportOptions, defineGaussHighlighting);
}

module.exports = { createSentryNodeTransport };