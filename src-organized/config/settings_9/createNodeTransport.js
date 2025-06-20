/**
 * Creates a transport mechanism for sending events, supporting proxy and tunnel configurations.
 * Handles invalid DSN or tunnel options gracefully by warning and returning a no-op transport.
 *
 * @param {Object} transportOptions - The options for configuring the transport.
 * @param {string} transportOptions.url - The DSN or tunnel URL to send events to.
 * @param {string} [transportOptions.proxy] - Optional proxy URL.
 * @param {boolean} [transportOptions.keepAlive] - Whether to keep sockets alive.
 * @param {any} [transportOptions.httpModule] - Optional HTTP module override.
 * @returns {any} The created transport object, or a no-op transport if configuration is invalid.
 */
function createNodeTransport(transportOptions) {
  let parsedUrl;
  try {
    // Attempt to parse the provided URL using the URL class from qGA
    parsedUrl = new qGA.URL(transportOptions.url);
  } catch (error) {
    // If URL parsing fails, warn and return a no-op transport
    c39.consoleSandbox(() => {
      console.warn(
        "[@sentry/node]: Invalid dsn or tunnel option, will not send any events. The tunnel option must be a full URL when used."
      );
    });
    return $getCachedOrFreshConfig.createTransport(transportOptions, () => Promise.resolve({}));
  }

  // Determine if the protocol is HTTPS
  const isHttps = parsedUrl.protocol === "https:";

  // Resolve proxy URL: use explicit proxy, or environment variables depending on protocol
  const proxyUrl = shouldBypassProxy(
    parsedUrl,
    transportOptions.proxy ||
      (isHttps ? process.env.https_proxy : undefined) ||
      process.env.http_proxy
  );

  // Select appropriate HTTP/HTTPS agent constructor
  const AgentConstructor = isHttps ? d39 : m39;

  // Determine keepAlive setting (default to false if undefined)
  const keepAlive = transportOptions.keepAlive === undefined ? false : transportOptions.keepAlive;

  // Create the agent: use proxy agent if proxyUrl is set, otherwise standard agent
  const agent = proxyUrl
    ? new l39.HttpsProxyAgent(proxyUrl)
    : new AgentConstructor.Agent({
        keepAlive,
        maxSockets: 30,
        timeout: 2000
      });

  // Prepare the request handler using createHttpPostRequestHandler and mN1
  const requestHandler = createHttpPostRequestHandler(
    transportOptions,
    mN1(transportOptions.httpModule, () => AgentConstructor),
    agent
  );

  // Create and return the transport using $getCachedOrFreshConfig.createTransport
  return $getCachedOrFreshConfig.createTransport(transportOptions, requestHandler);
}

module.exports = { createNodeTransport };