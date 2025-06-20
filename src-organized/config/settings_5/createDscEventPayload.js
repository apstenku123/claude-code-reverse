/**
 * Creates a DSC (Data Source Context) event payload from provided configuration, subscription, and trace updateSnapshotAndNotify.
 *
 * @param {string} traceId - The trace identifier for the event.
 * @param {object} config - The configuration object, expected to provide getOptions(), getDsn(), and emit() methods.
 * @param {object} subscription - The subscription object, expected to provide getUser() method.
 * @returns {object} The constructed event payload with environment, release, user segment, public key, and trace updateSnapshotAndNotify.
 */
function createDscEventPayload(traceId, config, subscription) {
  // Extract options from the configuration
  const options = config.getOptions();

  // Extract public key from DSN if available
  const { publicKey } = (config.getDsn() || {});

  // Extract user segment from subscription'createInteractionAccessor user if available
  const { segment: userSegment } = (subscription && subscription.getUser()) || {};

  // Build the event payload, dropping undefined keys
  const eventPayload = tr2.dropUndefinedKeys({
    environment: options.environment || er2.DEFAULT_ENVIRONMENT,
    release: options.release,
    user_segment: userSegment,
    public_key: publicKey,
    trace_id: traceId
  });

  // Emit the event if the emit method exists
  if (config.emit) {
    config.emit("createDsc", eventPayload);
  }

  return eventPayload;
}

module.exports = createDscEventPayload;