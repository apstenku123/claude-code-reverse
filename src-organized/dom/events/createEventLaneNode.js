/**
 * Creates a new event lane node object for scheduling or tracking events.
 *
 * @param {number} eventTime - The timestamp or time at which the event occurs.
 * @param {number} laneId - The identifier for the lane or priority of the event.
 * @returns {Object} An event lane node object with default properties for scheduling.
 */
function createEventLaneNode(eventTime, laneId) {
  return {
    eventTime: eventTime, // The time the event is scheduled to occur
    lane: laneId,        // The lane or priority identifier for the event
    tag: 0,              // Default tag value (reserved for future use or type identification)
    payload: null,       // Placeholder for event data
    callback: null,      // Placeholder for callback function
    next: null           // Pointer to the next node in the linked list (if any)
  };
}

module.exports = createEventLaneNode;