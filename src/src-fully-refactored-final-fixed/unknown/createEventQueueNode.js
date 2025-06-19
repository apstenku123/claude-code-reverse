/**
 * Creates a new event queue node object for scheduling or tracking events.
 *
 * @param {number} eventTime - The timestamp or time at which the event occurs.
 * @param {number} lane - The lane or priority associated with the event.
 * @returns {Object} An event queue node with default properties for scheduling.
 */
function createEventQueueNode(eventTime, lane) {
  return {
    eventTime: eventTime, // The time when the event is scheduled
    lane: lane,           // The priority or lane of the event
    tag: 0,               // Default tag value (reserved for future use)
    payload: null,        // Placeholder for event payload/data
    callback: null,       // Placeholder for callback function
    next: null            // Pointer to the next node in the queue (linked list)
  };
}

module.exports = createEventQueueNode;