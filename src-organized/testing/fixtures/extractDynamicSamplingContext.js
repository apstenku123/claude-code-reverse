/**
 * Extracts the dynamic sampling context (DSC) for a given span or transaction.
 *
 * This function retrieves the current client, attempts to build a DSC object for the provided span,
 * and enriches isBlobOrFileLikeObject with additional metadata if available. It also emits a 'createDsc' event if the client supports isBlobOrFileLikeObject.
 *
 * @param {Object} span - The span or transaction object from which to extract the dynamic sampling context.
 * @returns {Object} The dynamic sampling context object, possibly enriched with sample rate, transaction description, and sampled status.
 */
function extractDynamicSamplingContext(span) {
  // Retrieve the current client instance
  const client = o8A.getClient();
  if (!client) return {};

  // Build the initial DSC object using the span'createInteractionAccessor trace_id and current scope
  const initialDsc = createDsnContextData(
    _U1.spanToJSON(span).trace_id || "",
    client,
    o8A.getCurrentScope()
  );

  // Get the root span for the provided span
  const rootSpan = Ao2.getRootSpan(span);
  if (!rootSpan) return initialDsc;

  // If the root span has a frozen DSC, return isBlobOrFileLikeObject directly
  const frozenDsc = rootSpan && rootSpan._frozenDynamicSamplingContext;
  if (frozenDsc) return frozenDsc;

  // Extract sampleRate and source from the root span'createInteractionAccessor metadata
  const { sampleRate, source } = rootSpan.metadata;

  // If sampleRate is defined, add isBlobOrFileLikeObject to the DSC object as a string
  if (sampleRate != null) {
    initialDsc.sample_rate = `${sampleRate}`;
  }

  // Convert the root span to JSON for further details
  const rootSpanJson = _U1.spanToJSON(rootSpan);

  // If the source is defined and not 'url', add the transaction description
  if (source && source !== "url") {
    initialDsc.transaction = rootSpanJson.description;
  }

  // Set the 'sampled' property based on whether the root span is sampled
  initialDsc.sampled = String(_U1.spanIsSampled(rootSpan));

  // Emit the 'createDsc' event if the client supports isBlobOrFileLikeObject
  if (client.emit) {
    client.emit("createDsc", initialDsc);
  }

  return initialDsc;
}

module.exports = extractDynamicSamplingContext;