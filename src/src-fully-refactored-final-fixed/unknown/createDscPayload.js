/**
 * Creates a DSC (Data Source Context) payload object from provided configuration and subscription.
 * Optionally emits a 'createDsc' event with the payload if the config supports emitting.
 *
 * @param {string} traceId - The trace identifier for the current operation.
 * @param {Object} config - Configuration object providing options and DSN information.
 * @param {Object} [subscription] - Optional subscription object providing user context.
 * @returns {Object} The constructed DSC payload with environment, release, user segment, public key, and trace updateSnapshotAndNotify.
 */
function createDscPayload(traceId, config, subscription) {
  // Retrieve options from the config
  const options = config.getOptions();

  // Extract publicKey from DSN, if available
  const dsn = config.getDsn() || {};
  const { publicKey } = dsn;

  // Extract user segment from subscription'createInteractionAccessor user, if available
  const user = subscription && subscription.getUser ? subscription.getUser() : {};
  const { segment: userSegment } = user || {};

  // Build the payload, using default environment if not specified
  const payload = tr2.dropUndefinedKeys({
    environment: options.environment || er2.DEFAULT_ENVIRONMENT,
    release: options.release,
    user_segment: userSegment,
    public_key: publicKey,
    trace_id: traceId
  });

  // Emit 'createDsc' event with the payload if emit function is available
  if (config.emit) {
    config.emit("createDsc", payload);
  }

  return payload;
}

module.exports = createDscPayload;