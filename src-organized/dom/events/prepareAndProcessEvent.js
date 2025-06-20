/**
 * Prepares an event object with normalized data, applies scope/context, and processes isBlobOrFileLikeObject through event processors.
 *
 * @param {Object} options - Configuration options for event preparation.
 * @param {Object} eventData - The event data to process (may be incomplete).
 * @param {Object} context - Contextual information for the event (integrations, attachments, etc).
 * @param {Object} userScope - The user scope, possibly containing capture context.
 * @param {Object} client - The client instance, providing event processors.
 * @param {Object} [optionalScope] - An optional scope to merge into the event.
 * @returns {Promise<Object>} a promise resolving to the processed (and possibly normalized) event object, or undefined if dropped.
 */
function prepareAndProcessEvent(options, eventData, context, userScope, client, optionalScope) {
  // Destructure normalization options with defaults
  const {
    normalizeDepth = 3,
    normalizeMaxBreadth = 1000
  } = options;

  // Prepare the event object, ensuring event_id and timestamp are set
  const preparedEvent = {
    ...eventData,
    event_id: eventData.event_id || context.event_id || aW.uuid4(),
    timestamp: eventData.timestamp || aW.dateTimestampInSeconds()
  };

  // Determine integrations to use
  const integrations = context.integrations || (options.integrations && options.integrations.map(integration => integration.name));

  // Preprocess event: apply project-specific and integration-specific logic
  applyEventDefaultsAndTruncateFields(preparedEvent, options);
  addSdkIntegrations(preparedEvent, integrations);

  // If event type is undefined, parse the stack trace
  if (eventData.type === undefined) {
    c8A(preparedEvent, options.stackParser);
  }

  // Extract capture context from userScope
  const captureContext = mergeScopeWithConfig(userScope, context.captureContext);

  // If a mechanism is provided, add isBlobOrFileLikeObject to the event
  if (context.mechanism) {
    aW.addExceptionMechanism(preparedEvent, context.mechanism);
  }

  // Gather event processors from client and global scope
  const clientProcessors = client && client.getEventProcessors ? client.getEventProcessors() : [];
  const globalScopeData = OU1.getGlobalScope().getScopeData();

  // Merge in optional scope data if provided
  if (optionalScope) {
    const optionalScopeData = optionalScope.getScopeData();
    RU1.mergeScopeData(globalScopeData, optionalScopeData);
  }

  // Merge in user scope data if available
  if (captureContext) {
    const userScopeData = captureContext.getScopeData();
    RU1.mergeScopeData(globalScopeData, userScopeData);
  }

  // Combine attachments from context and scope
  const combinedAttachments = [
    ...(context.attachments || []),
    ...globalScopeData.attachments
  ];
  if (combinedAttachments.length) {
    context.attachments = combinedAttachments;
  }

  // Apply merged scope data to the event
  RU1.applyScopeDataToEvent(preparedEvent, globalScopeData);

  // Gather all event processors: client, global, and scope-specific
  const allEventProcessors = [
    ...clientProcessors,
    ...u8A.getGlobalEventProcessors(),
    ...globalScopeData.eventProcessors
  ];

  // Notify all event processors and normalize the result if needed
  return u8A.notifyEventProcessors(allEventProcessors, preparedEvent, context).then(processedEvent => {
    if (processedEvent) {
      extractDebugIdsToDebugMetaImages(processedEvent); // Possibly logs or tracks the processed event
    }
    // Normalize event data if normalization depth is set
    if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
      return normalizeEventData(processedEvent, normalizeDepth, normalizeMaxBreadth);
    }
    return processedEvent;
  });
}

module.exports = prepareAndProcessEvent;