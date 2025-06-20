/**
 * Creates a DSN (Data Source Name) context object with relevant metadata for event emission.
 *
 * @param {string} traceId - The unique trace identifier for the current operation.
 * @param {Object} config - Configuration object providing options and DSN details.
 * @param {Object} [subscription] - Optional subscription object that may provide user segmentation.
 * @returns {Object} The context object containing environment, release, user segment, public key, and trace updateSnapshotAndNotify.
 */
function createDsnContext(traceId, config, subscription) {
  // Retrieve configuration options (e.g., environment, release)
  const options = config.getOptions();

  // Extract the public key from the DSN, if available
  const { publicKey } = (config.getDsn() || {});

  // Extract the user segment from the subscription'createInteractionAccessor user, if available
  const { segment: userSegment } = (subscription && subscription.getUser()) || {};

  // Build the context object, dropping any undefined keys
  const context = tr2.dropUndefinedKeys({
    environment: options.environment || er2.DEFAULT_ENVIRONMENT,
    release: options.release,
    user_segment: userSegment,
    public_key: publicKey,
    trace_id: traceId
  });

  // Emit the 'createDsc' event with the context, if the emit method exists
  if (config.emit) {
    config.emit("createDsc", context);
  }

  return context;
}

module.exports = createDsnContext;