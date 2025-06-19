/**
 * Sets up integration between a Sentry SDK client and a Spotlight sidecar service.
 * Listens for outgoing Sentry envelopes and forwards them to the Spotlight sidecar via HTTP POST.
 * Disables integration after 3 failed requests.
 *
 * @param {object} sdkClient - The Sentry SDK client instance, expected to have an `.on` method for event subscription.
 * @param {object} options - Configuration object containing the `sidecarUrl` property.
 * @param {string} options.sidecarUrl - The URL of the Spotlight sidecar service.
 * @returns {void}
 */
function setupSentryToSpotlightIntegration(sdkClient, options) {
  // Parse the Spotlight sidecar URL
  const sidecarUrlParsed = createUrlFromString(options.sidecarUrl);
  if (!sidecarUrlParsed) return;

  // Track the number of failed requests
  let failedRequestCount = 0;

  // Ensure the SDK client supports event subscription
  if (typeof sdkClient.on !== "function") {
    Yx.logger.warn("[Spotlight] Cannot connect to spotlight due to missing method on SDK client (`client.on`)");
    return;
  }

  // Listen for outgoing Sentry envelopes
  sdkClient.on("beforeEnvelope", envelope => {
    // Disable integration after 3 failed requests
    if (failedRequestCount > 3) {
      Yx.logger.warn("[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests");
      return;
    }

    // Serialize the Sentry envelope
    const serializedEnvelope = Yx.serializeEnvelope(envelope);

    // Prepare HTTP request options for the Spotlight sidecar
    const createRequestOptions = {
      method: "POST",
      path: sidecarUrlParsed.pathname,
      hostname: sidecarUrlParsed.hostname,
      port: sidecarUrlParsed.port,
      headers: {
        "Content-Type": "application/x-sentry-envelope"
      }
    };

    // Send the envelope to the Spotlight sidecar
    const request = getOriginalSentryRequest()(createRequestOptions, response => {
      // Attach no-op listeners for data and end events
      response.on("data", () => {});
      response.on("end", () => {});
      response.setEncoding("utf8");
    });

    // Handle request errors
    request.on("error", () => {
      failedRequestCount++;
      Yx.logger.warn("[Spotlight] Failed to send envelope to Spotlight Sidecar");
    });

    // Write and end the request
    request.write(serializedEnvelope);
    request.end();
  });
}

module.exports = setupSentryToSpotlightIntegration;