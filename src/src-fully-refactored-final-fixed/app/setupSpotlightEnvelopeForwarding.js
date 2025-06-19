/**
 * Sets up forwarding of Sentry envelopes to a Spotlight Sidecar service.
 * Listens for 'beforeEnvelope' events on the provided SDK client and forwards serialized envelopes
 * to the configured Spotlight Sidecar URL using an HTTP POST request. Handles connection errors and disables
 * forwarding after too many failures.
 *
 * @param {object} sdkClient - The SDK client instance that emits 'beforeEnvelope' events (must have an 'on' method).
 * @param {object} config - Configuration object containing the 'sidecarUrl' property.
 * @returns {void}
 */
function setupSpotlightEnvelopeForwarding(sdkClient, config) {
  // Parse the sidecar URL from the config
  const sidecarUrlParsed = createUrlFromString(config.sidecarUrl);
  if (!sidecarUrlParsed) {
    return;
  }

  let failedRequestCount = 0;

  // Ensure the SDK client supports event subscription
  if (typeof sdkClient.on !== "function") {
    Yx.logger.warn("[Spotlight] Cannot connect to spotlight due to missing method on SDK client (`client.on`)");
    return;
  }

  // Listen for outgoing envelopes and forward them to the Spotlight Sidecar
  sdkClient.on("beforeEnvelope", envelope => {
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

    // Create the HTTP request using the getOriginalSentryRequest function (likely an HTTP client factory)
    const request = getOriginalSentryRequest()(createRequestOptions, response => {
      // Attach empty listeners to consume data and end events, and set encoding
      response.on("data", () => {});
      response.on("end", () => {});
      response.setEncoding("utf8");
    });

    // Handle request errors by incrementing the failure count and logging a warning
    request.on("error", () => {
      failedRequestCount++;
      Yx.logger.warn("[Spotlight] Failed to send envelope to Spotlight Sidecar");
    });

    // Send the serialized envelope and end the request
    request.write(serializedEnvelope);
    request.end();
  });
}

module.exports = setupSpotlightEnvelopeForwarding;