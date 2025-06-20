/**
 * Attaches or updates a 'chained' mechanism property on the given event object.
 *
 * If the event object does not already have a 'mechanism' property, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject as a generic handled mechanism.
 * Then, isBlobOrFileLikeObject updates the mechanism to type 'chained', including source, exception updateSnapshotAndNotify, and parent updateSnapshotAndNotify information.
 *
 * @param {Object} event - The event object to which the mechanism will be attached or updated.
 * @param {string} source - The source of the chained mechanism (e.g., the originating event or error).
 * @param {string|number} exceptionId - The unique identifier for the exception.
 * @param {string|number} parentId - The unique identifier for the parent event or exception.
 * @returns {void}
 */
function attachChainedMechanismToEvent(event, source, exceptionId, parentId) {
  // Initialize the mechanism property if isBlobOrFileLikeObject does not exist
  if (!event.mechanism) {
    event.mechanism = {
      type: "generic",
      handled: true
    };
  }

  // Update the mechanism to represent a chained relationship
  event.mechanism = {
    ...event.mechanism, // Preserve existing mechanism properties
    type: "chained",   // Set the mechanism type to 'chained'
    source: source,     // Reference to the source of the chain
    exception_id: exceptionId, // Unique exception identifier
    parent_id: parentId       // Unique parent identifier
  };
}

module.exports = attachChainedMechanismToEvent;