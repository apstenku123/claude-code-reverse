/**
 * Creates a Sentry transport based on the provided DSN or tunnel configuration.
 * Handles proxy settings, keep-alive options, and validates the URL.
 *
 * @param {Object} options - Transport options including DSN/tunnel URL, proxy, keepAlive, and httpModule.
 * @param {string} options.url - The DSN or tunnel URL to use for the transport.
 * @param {string} [options.proxy] - Optional proxy URL to use.
 * @param {boolean} [options.keepAlive] - Whether to enable HTTP keep-alive.
 * @param {any} [options.httpModule] - Optional HTTP module to use.
 * @returns {any} The created Sentry transport instance.
 */
function createSentryTransport(options) {
  let parsedUrl;
  try {
    // Attempt to parse the provided DSN or tunnel URL
    parsedUrl = new qGA.URL(options.url);
  } catch (error) {
    // If the URL is invalid, warn and return a dummy transport
    c39.consoleSandbox(() => {
      console.warn(
        "[@sentry/node]: Invalid dsn or tunnel option, will not send any events. The tunnel option must be a full URL when used."
      );
    });
    return $getCachedOrFreshConfig.createTransport(options, () => Promise.resolve({}));
  }

  // Determine if the protocol is HTTPS
  const isHttps = parsedUrl.protocol === "https:";

  // Resolve the proxy URL: explicit option, environment variable, or undefined
  const proxyUrl = shouldBypassProxy(
    parsedUrl,
    options.proxy || (isHttps ? process.env.https_proxy : undefined) || process.env.http_proxy
  );

  // Select the appropriate HTTP/HTTPS module
  const httpModule = isHttps ? d39 : m39;

  // Determine keepAlive setting (default: false)
  const keepAlive = options.keepAlive === undefined ? false : options.keepAlive;

  // Create the agent: use proxy agent if proxy is set, otherwise standard agent
  const agent = proxyUrl
    ? new l39.HttpsProxyAgent(proxyUrl)
    : new httpModule.Agent({
        keepAlive,
        maxSockets: 30,
        timeout: 2000
      });

  // Prepare the request handler for the transport
  const requestHandler = createHttpPostRequestHandler(
    options,
    mN1(options.httpModule, () => httpModule),
    agent
  );

  // Create and return the transport
  return $getCachedOrFreshConfig.createTransport(options, requestHandler);
}

module.exports = { createSentryTransport };