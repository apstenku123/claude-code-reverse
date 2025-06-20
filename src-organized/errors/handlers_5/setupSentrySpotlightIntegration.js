/**
 * Sets up integration between a Sentry SDK client and the Spotlight Sidecar for envelope forwarding.
 * Listens for 'beforeEnvelope' events on the Sentry client and forwards envelopes to the Spotlight Sidecar.
 * Disables forwarding after 3 consecutive failures.
 *
 * @param {object} sentryClient - The Sentry SDK client instance. Must have an 'on' method for event subscription.
 * @param {object} options - Configuration options for the integration.
 * @param {string} options.sidecarUrl - The URL of the Spotlight Sidecar to forward envelopes to.
 * @returns {void}
 */
function setupSentrySpotlightIntegration(sentryClient, options) {
  // Parse the Spotlight Sidecar URL
  const sidecarUrlParsed = createUrlFromString(options.sidecarUrl);
  if (!sidecarUrlParsed) {
    // If the URL is invalid, do not proceed
    return;
  }

  // Track the number of consecutive failed requests
  let failedRequestCount = 0;

  // Ensure the Sentry client supports event subscription
  if (typeof sentryClient.on !== "function") {
    Yx.logger.warn("[Spotlight] Cannot connect to spotlight due to missing method on SDK client (`client.on`)");
    return;
  }

  // Listen for 'beforeEnvelope' events to forward envelopes
  sentryClient.on("beforeEnvelope", envelope => {
    // Disable integration after 3 failed requests
    if (failedRequestCount > 3) {
      Yx.logger.warn("[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests");
      return;
    }

    // Serialize the envelope for transmission
    const serializedEnvelope = Yx.serializeEnvelope(envelope);

    // Prepare HTTP request options for the Spotlight Sidecar
    const createRequestOptions = {
      method: "POST",
      path: sidecarUrlParsed.pathname,
      hostname: sidecarUrlParsed.hostname,
      port: sidecarUrlParsed.port,
      headers: {
        "Content-Type": "application/x-sentry-envelope"
      }
    };

    // Create the HTTP request to the Spotlight Sidecar
    const request = getOriginalSentryRequest()(createRequestOptions, response => {
      // No-op listeners to consume response data and end events
      response.on("data", () => {});
      response.on("end", () => {});
      response.setEncoding("utf8");
    });

    // Handle request errors
    request.on("error", () => {
      failedRequestCount++;
      Yx.logger.warn("[Spotlight] Failed to send envelope to Spotlight Sidecar");
    });

    // Send the serialized envelope
    request.write(serializedEnvelope);
    request.end();
  });
}

module.exports = setupSentrySpotlightIntegration;