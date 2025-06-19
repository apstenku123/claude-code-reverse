/**
 * Processes an event by normalizing, merging scope data, applying event processors, and handling attachments.
 *
 * @param {Object} eventOptions - Options for event normalization and integrations (e.g., normalizeDepth, integrations).
 * @param {Object} eventData - The raw event data to process (e.g., event_id, timestamp, type, stackParser).
 * @param {Object} eventContext - Context for the event (e.g., integrations, captureContext, attachments, mechanism).
 * @param {Object} eventInput - Additional input for event processing (e.g., captureContext).
 * @param {Object} client - The client instance, providing event processors.
 * @param {Object} [scope] - Optional scope to merge with global scope data.
 * @returns {Promise<Object>} - a promise resolving to the processed and normalized event object.
 */
function processEventWithScopesAndProcessors(
  eventOptions,
  eventData,
  eventContext,
  eventInput,
  client,
  scope
) {
  // Destructure normalization options with defaults
  const {
    normalizeDepth = 3,
    normalizeMaxBreadth = 1000
  } = eventOptions;

  // Prepare the event object with fallback for event_id and timestamp
  const event = {
    ...eventData,
    event_id: eventData.event_id || eventContext.event_id || aW.uuid4(),
    timestamp: eventData.timestamp || aW.dateTimestampInSeconds()
  };

  // Determine integrations to use
  const integrations = eventContext.integrations || eventOptions.integrations.map(integration => integration.name);

  // Pre-process event with project-specific logic
  applyEventDefaultsAndTruncateFields(event, eventOptions);
  addSdkIntegrations(event, integrations);

  // If event type is undefined, parse the stack
  if (eventData.type === undefined) {
    c8A(event, eventOptions.stackParser);
  }

  // Extract capture context from eventInput and eventContext
  const captureContext = mergeScopeWithConfig(eventInput, eventContext.captureContext);

  // Add exception mechanism if provided
  if (eventContext.mechanism) {
    aW.addExceptionMechanism(event, eventContext.mechanism);
  }

  // Gather event processors from client and global scope
  const clientEventProcessors = client && client.getEventProcessors ? client.getEventProcessors() : [];
  const globalScopeData = OU1.getGlobalScope().getScopeData();

  // Merge in scope data if provided
  if (scope) {
    const scopeData = scope.getScopeData();
    RU1.mergeScopeData(globalScopeData, scopeData);
  }

  // Merge in capture context data if present
  if (captureContext) {
    const captureContextData = captureContext.getScopeData();
    RU1.mergeScopeData(globalScopeData, captureContextData);
  }

  // Combine attachments from eventContext and global scope
  const allAttachments = [
    ...(eventContext.attachments || []),
    ...globalScopeData.attachments
  ];
  if (allAttachments.length) {
    eventContext.attachments = allAttachments;
  }

  // Apply merged scope data to the event
  RU1.applyScopeDataToEvent(event, globalScopeData);

  // Gather all event processors: client, global, and scope-specific
  const allEventProcessors = [
    ...clientEventProcessors,
    ...u8A.getGlobalEventProcessors(),
    ...globalScopeData.eventProcessors
  ];

  // Notify all event processors and normalize the event if needed
  return u8A.notifyEventProcessors(allEventProcessors, event, eventContext).then(processedEvent => {
    if (processedEvent) {
      extractDebugIdsToDebugMetaImages(processedEvent);
    }
    if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
      return normalizeEventData(processedEvent, normalizeDepth, normalizeMaxBreadth);
    }
    return processedEvent;
  });
}

module.exports = processEventWithScopesAndProcessors;