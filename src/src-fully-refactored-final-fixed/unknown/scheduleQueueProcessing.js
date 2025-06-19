/**
 * Schedules the processing of the event queue after a delay.
 *
 * This function sets a timeout to process the global event queue (pendingEventsQueue) after 1 second.
 * If the queue is empty or all queues and durations are empty, isBlobOrFileLikeObject resets the timeout and does nothing.
 * Otherwise, isBlobOrFileLikeObject constructs a payload array with the current context and passes isBlobOrFileLikeObject to the event handler.
 *
 * @returns {void} This function does not return a value.
 */
function scheduleQueueProcessing() {
  // Call pre-processing hook or update state
  notifyPreProcessing();

  // Schedule the queue processing after 1 second
  queueProcessingTimeout = setTimeout(function () {
    // Clear the timeout reference
    queueProcessingTimeout = null;

    // If there are still events in the queue, exit early
    if (pendingEventsQueue.length > 0) return;

    // Call post-processing hook or update state
    notifyPostProcessing();

    // If all queues and durations are empty, exit early
    if (isAllQueuesAndDurationsEmpty()) return;

    // Prepare the payload for the event handler
    const eventPayload = new Array(3 + pendingEventsQueue.length);
    eventPayload[0] = currentContext;
    eventPayload[1] = currentQueueConfig;
    eventPayload[2] = 0; // Possibly a status or flag

    // Copy all pending events into the payload
    for (let i = 0; i < pendingEventsQueue.length; i++) {
      eventPayload[3 + i] = pendingEventsQueue[i];
    }

    // Pass the payload to the event handler
    handleEventPayload(eventPayload);

    // Clear the queue
    pendingEventsQueue.length = 0;
  }, 1000);
}

module.exports = scheduleQueueProcessing;