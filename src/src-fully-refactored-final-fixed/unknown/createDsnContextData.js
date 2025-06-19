/**
 * Constructs a DSN (Data Source Name) context object with relevant metadata and emits an event if supported.
 *
 * @param {string} traceId - The unique identifier for the trace or request.
 * @param {object} config - The configuration object providing options and DSN information. Must implement getOptions(), getDsn(), and optionally emit().
 * @param {object} [subscription] - Optional subscription object that may provide user segmentation via getUser().
 * @returns {object} The constructed DSN context object with environment, release, user segment, public key, and trace updateSnapshotAndNotify.
 */
function createDsnContextData(traceId, config, subscription) {
  // Retrieve options from the configuration
  const options = config.getOptions();

  // Extract publicKey from DSN if available
  const dsn = config.getDsn() || {};
  const { publicKey } = dsn;

  // Extract user segment from subscription'createInteractionAccessor user, if available
  let userSegment;
  if (subscription && typeof subscription.getUser === 'function') {
    const user = subscription.getUser();
    if (user && typeof user.segment !== 'undefined') {
      userSegment = user.segment;
    }
  }

  // Build the context object, dropping undefined keys
  const contextData = tr2.dropUndefinedKeys({
    environment: options.environment || er2.DEFAULT_ENVIRONMENT,
    release: options.release,
    user_segment: userSegment,
    public_key: publicKey,
    trace_id: traceId
  });

  // Emit the 'createDsc' event with the context data if emit is available
  if (typeof config.emit === 'function') {
    config.emit('createDsc', contextData);
  }

  return contextData;
}

module.exports = createDsnContextData;
