/**
 * Merges additional event context and metadata into an existing event object.
 *
 * This function takes an existing event object and a configuration object containing
 * additional context, metadata, and arrays of processors, breadcrumbs, etc., and merges
 * them into the event. It ensures that arrays are concatenated, objects are shallow-merged,
 * and certain properties are only set if present in the configuration.
 *
 * @param {Object} event - The event object to augment. This object will be mutated.
 * @param {Object} contextConfig - The configuration object containing additional context and metadata.
 * @param {Object} contextConfig.extra - Additional arbitrary information to attach to the event.
 * @param {Object} contextConfig.tags - Tags to associate with the event.
 * @param {Object} contextConfig.user - User information to attach to the event.
 * @param {Object} contextConfig.contexts - Additional context objects to attach to the event.
 * @param {string} [contextConfig.level] - The severity level of the event.
 * @param {Object} contextConfig.sdkProcessingMetadata - SDK processing metadata.
 * @param {Array} contextConfig.breadcrumbs - Breadcrumbs to add to the event.
 * @param {Array} contextConfig.fingerprint - Fingerprint for grouping the event.
 * @param {Array} contextConfig.eventProcessors - Event processors to apply to the event.
 * @param {Array} contextConfig.attachments - Attachments to add to the event.
 * @param {Object} contextConfig.propagationContext - Propagation context to merge into the event.
 * @param {string} [contextConfig.transactionName] - Name of the transaction, if any.
 * @param {Object} [contextConfig.span] - Span object to associate with the event.
 * @returns {void}
 */
function mergeEventContext(event, contextConfig) {
  const {
    extra,
    tags,
    user,
    contexts,
    level,
    sdkProcessingMetadata,
    breadcrumbs,
    fingerprint,
    eventProcessors,
    attachments,
    propagationContext,
    transactionName,
    span
  } = contextConfig;

  // Merge simple objects using helper function
  mergePropertiesIntoObjectKey(event, "extra", extra);
  mergePropertiesIntoObjectKey(event, "tags", tags);
  mergePropertiesIntoObjectKey(event, "user", user);
  mergePropertiesIntoObjectKey(event, "contexts", contexts);
  mergePropertiesIntoObjectKey(event, "sdkProcessingMetadata", sdkProcessingMetadata);

  // Set level if provided
  if (level) {
    event.level = level;
  }

  // Set transaction name if provided
  if (transactionName) {
    event.transactionName = transactionName;
  }

  // Set span if provided
  if (span) {
    event.span = span;
  }

  // Concatenate breadcrumbs if any are provided
  if (breadcrumbs.length) {
    event.breadcrumbs = [...event.breadcrumbs, ...breadcrumbs];
  }

  // Concatenate fingerprint if any are provided
  if (fingerprint.length) {
    event.fingerprint = [...event.fingerprint, ...fingerprint];
  }

  // Concatenate event processors if any are provided
  if (eventProcessors.length) {
    event.eventProcessors = [...event.eventProcessors, ...eventProcessors];
  }

  // Concatenate attachments if any are provided
  if (attachments.length) {
    event.attachments = [...event.attachments, ...attachments];
  }

  // Merge propagation context objects (shallow merge)
  event.propagationContext = {
    ...event.propagationContext,
    ...propagationContext
  };
}

module.exports = mergeEventContext;