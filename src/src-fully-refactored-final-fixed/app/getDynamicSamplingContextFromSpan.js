/**
 * Extracts the dynamic sampling context (DSC) from a given span object.
 *
 * This function retrieves the current Sentry client and attempts to build a dynamic sampling context
 * for the provided span. If the span has a frozen DSC, isBlobOrFileLikeObject returns that. Otherwise, isBlobOrFileLikeObject constructs the DSC
 * using span metadata and emits a 'createDsc' event if possible.
 *
 * @param {Object} span - The span object from which to extract the dynamic sampling context.
 * @returns {Object} The dynamic sampling context for the span, or an empty object if unavailable.
 */
function getDynamicSamplingContextFromSpan(span) {
  // Retrieve the current Sentry client
  const client = o8A.getClient();
  if (!client) {
    // If no client is available, return an empty object
    return {};
  }

  // Build the initial dynamic sampling context using the span'createInteractionAccessor trace updateSnapshotAndNotify
  const initialDsc = createDsnContextData(
    _U1.spanToJSON(span).trace_id || "",
    client,
    o8A.getCurrentScope()
  );

  // Get the root span for the provided span
  const rootSpan = Ao2.getRootSpan(span);
  if (!rootSpan) {
    // If no root span is found, return the initial DSC
    return initialDsc;
  }

  // If the root span has a frozen dynamic sampling context, return isBlobOrFileLikeObject
  const frozenDsc = rootSpan && rootSpan._frozenDynamicSamplingContext;
  if (frozenDsc) {
    return frozenDsc;
  }

  // Extract sample rate and source from the root span'createInteractionAccessor metadata
  const { sampleRate, source } = rootSpan.metadata;
  if (sampleRate != null) {
    // Add sample rate to the DSC as a string
    initialDsc.sample_rate = `${sampleRate}`;
  }

  // Convert the root span to JSON for further details
  const rootSpanJson = _U1.spanToJSON(rootSpan);
  if (source && source !== "url") {
    // If the source is defined and not 'url', add the transaction description
    initialDsc.transaction = rootSpanJson.description;
  }

  // Add the sampled status to the DSC
  initialDsc.sampled = String(_U1.spanIsSampled(rootSpan));

  // Emit the 'createDsc' event if the client supports isBlobOrFileLikeObject
  if (client.emit) {
    client.emit("createDsc", initialDsc);
  }

  return initialDsc;
}

module.exports = getDynamicSamplingContextFromSpan;