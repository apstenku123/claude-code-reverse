/**
 * Processes an event by merging configuration, applying scope data, handling integrations, and normalizing the event data.
 * This function prepares an event for sending by applying processors, mechanisms, and attachments, then normalizes the result.
 *
 * @param {Object} options - Options for event processing, including normalization settings and integrations.
 * @param {Object} eventConfig - The event configuration object, containing event-specific data.
 * @param {Object} eventContext - Context for the event, including integrations, attachments, and mechanisms.
 * @param {Object} scope - The current scope, possibly containing additional context or processors.
 * @param {Object} globalProcessorProvider - Provider for global event processors.
 * @param {Object} [additionalScope] - Optional additional scope to merge into the event.
 * @returns {Promise<Object>} a promise that resolves to the processed and normalized event object.
 */
function processAndNormalizeEvent(
  options,
  eventConfig,
  eventContext,
  scope,
  globalProcessorProvider,
  additionalScope
) {
  // Extract normalization settings with defaults
  const {
    normalizeDepth = 3,
    normalizeMaxBreadth = 1000
  } = options;

  // Merge eventConfig with fallback event_id and timestamp
  const mergedEventConfig = {
    ...eventConfig,
    event_id: eventConfig.event_id || eventContext.event_id || aW.uuid4(),
    timestamp: eventConfig.timestamp || aW.dateTimestampInSeconds()
  };

  // Determine integrations to use
  const integrations = eventContext.integrations || (options.integrations && options.integrations.map(integration => integration.name));

  // Preprocess event with project-specific and integration-specific logic
  applyEventDefaultsAndTruncateFields(mergedEventConfig, options);
  addSdkIntegrations(mergedEventConfig, integrations);

  // If event type is undefined, parse the stack trace
  if (eventConfig.type === undefined) {
    c8A(mergedEventConfig, options.stackParser);
  }

  // Get additional capture context from scope
  const captureContext = mergeScopeWithConfig(scope, eventContext.captureContext);

  // Add exception mechanism if provided
  if (eventContext.mechanism) {
    aW.addExceptionMechanism(mergedEventConfig, eventContext.mechanism);
  }

  // Gather event processors from global provider and scope
  const eventProcessors = globalProcessorProvider && globalProcessorProvider.getEventProcessors ? globalProcessorProvider.getEventProcessors() : [];
  const globalScopeData = OU1.getGlobalScope().getScopeData();

  // Merge in additional scope data if provided
  if (additionalScope) {
    const additionalScopeData = additionalScope.getScopeData();
    RU1.mergeScopeData(globalScopeData, additionalScopeData);
  }

  // Merge in capture context scope data if available
  if (captureContext) {
    const captureContextData = captureContext.getScopeData();
    RU1.mergeScopeData(globalScopeData, captureContextData);
  }

  // Combine attachments from eventContext and global scope
  const combinedAttachments = [
    ...(eventContext.attachments || []),
    ...globalScopeData.attachments
  ];
  if (combinedAttachments.length) {
    eventContext.attachments = combinedAttachments;
  }

  // Apply merged scope data to the event
  RU1.applyScopeDataToEvent(mergedEventConfig, globalScopeData);

  // Combine all event processors
  const allEventProcessors = [
    ...eventProcessors,
    ...u8A.getGlobalEventProcessors(),
    ...globalScopeData.eventProcessors
  ];

  // Notify all processors and normalize the event if needed
  return u8A.notifyEventProcessors(allEventProcessors, mergedEventConfig, eventContext).then(processedEvent => {
    if (processedEvent) {
      extractDebugIdsToDebugMetaImages(processedEvent);
    }
    if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
      return normalizeEventData(processedEvent, normalizeDepth, normalizeMaxBreadth);
    }
    return processedEvent;
  });
}

module.exports = processAndNormalizeEvent;