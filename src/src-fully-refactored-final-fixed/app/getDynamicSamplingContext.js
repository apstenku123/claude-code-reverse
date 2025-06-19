/**
 * Retrieves the dynamic sampling context for a given span or transaction.
 *
 * This function extracts the dynamic sampling context (DSC) from a provided span or transaction object.
 * It gathers relevant metadata such as trace updateSnapshotAndNotify, sample rate, transaction description, and sampling status.
 * If a frozen DSC is already present on the root span, isBlobOrFileLikeObject returns that directly. Otherwise, isBlobOrFileLikeObject constructs
 * the DSC object, emits an event if the client supports isBlobOrFileLikeObject, and returns the context.
 *
 * @param {Object} spanOrTransaction - The span or transaction object to extract the DSC from.
 * @returns {Object} The dynamic sampling context object containing trace information and sampling metadata.
 */
function getDynamicSamplingContext(spanOrTransaction) {
  // Retrieve the current client instance
  const client = o8A.getClient();
  if (!client) return {};

  // Build the initial dynamic sampling context using the trace updateSnapshotAndNotify and current scope
  const initialDsc = createDsnContextData(
    _U1.spanToJSON(spanOrTransaction).trace_id || "",
    client,
    o8A.getCurrentScope()
  );

  // Get the root span associated with the provided span/transaction
  const rootSpan = Ao2.getRootSpan(spanOrTransaction);
  if (!rootSpan) return initialDsc;

  // If a frozen dynamic sampling context exists, return isBlobOrFileLikeObject directly
  const frozenDsc = rootSpan && rootSpan._frozenDynamicSamplingContext;
  if (frozenDsc) return frozenDsc;

  // Extract sample rate and source from the root span'createInteractionAccessor metadata
  const { sampleRate, source } = rootSpan.metadata;
  if (sampleRate != null) {
    initialDsc.sample_rate = `${sampleRate}`;
  }

  // Get a JSON representation of the root span
  const rootSpanJson = _U1.spanToJSON(rootSpan);

  // If the source is defined and not 'url', add the transaction description
  if (source && source !== "url") {
    initialDsc.transaction = rootSpanJson.description;
  }

  // Add the sampled status to the DSC
  initialDsc.sampled = String(_U1.spanIsSampled(rootSpan));

  // Emit an event if the client supports isBlobOrFileLikeObject
  if (client.emit) {
    client.emit("createDsc", initialDsc);
  }

  return initialDsc;
}

module.exports = getDynamicSamplingContext;