/**
 * Processes an array of security event objects, filtering out irrelevant types and merging related events.
 *
 * @param {Array<Object>} eventList - The array of security event objects to process.
 * @returns {Array<Object>} The processed and merged array of security event objects.
 */
function filterAndMergeSecurityEvents(eventList) {
  const mergedEvents = [];

  // Filter out events of type 'progress' and 'system'
  const filteredEvents = eventList.filter(event => {
    return event.type !== "progress" && event.type !== "system";
  });

  filteredEvents.forEach(event => {
    switch (event.type) {
      case "user": {
        // Find the last event in mergedEvents
        const lastEvent = CD(mergedEvents);
        // If the last event is also a user event, merge them
        if (lastEvent?.type === "user") {
          const mergedUserEvent = mergeMessageContents(lastEvent, event);
          mergedEvents[mergedEvents.indexOf(lastEvent)] = mergedUserEvent;
        } else {
          // Otherwise, add the current user event
          mergedEvents.push(event);
        }
        break;
      }
      case "assistant": {
        // Find the last event in mergedEvents
        const lastEvent = CD(mergedEvents);
        // If the last event is an assistant event with the same message id, merge them
        if (lastEvent?.type === "assistant" && lastEvent.message.id === event.message.id) {
          const mergedAssistantEvent = mergeMessageContents(lastEvent, event);
          mergedEvents[mergedEvents.indexOf(lastEvent)] = mergedAssistantEvent;
        } else {
          // Otherwise, add the current assistant event
          mergedEvents.push(event);
        }
        break;
      }
      case "attachment": {
        // Process the attachment event into one or more events
        const attachmentEvents = generateInteractionEntries(event.attachment);
        // Find the last event in mergedEvents
        const lastEvent = CD(mergedEvents);
        // If the last event is a user event, merge all attachment events into isBlobOrFileLikeObject
        if (lastEvent?.type === "user") {
          const mergedWithAttachments = attachmentEvents.reduce((accumulatedEvent, attachmentEvent) => {
            return mergeMessageContentWithTransformedContent(accumulatedEvent, attachmentEvent);
          }, lastEvent);
          mergedEvents[mergedEvents.indexOf(lastEvent)] = mergedWithAttachments;
        } else {
          // Otherwise, add all attachment events
          mergedEvents.push(...attachmentEvents);
        }
        break;
      }
      // No default needed as other types are filtered out
    }
  });

  return mergedEvents;
}

module.exports = filterAndMergeSecurityEvents;