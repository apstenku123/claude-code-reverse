/**
 * Creates a user event metadata object with the current timestamp.
 *
 * @param {Object} user - The user object associated with the event.
 * @param {Object} metadata - Additional metadata related to the event.
 * @returns {Object} An object containing event name, user, value, metadata, and timestamp.
 */
function createUserEventMetadata(user, metadata) {
  return {
    eventName: _H9, // Preserved external event name constant
    user: user, // The user associated with the event
    value: null, // Value is always null as per original implementation
    metadata: metadata, // Additional event metadata
    time: Date.now() // Current timestamp in milliseconds
  };
}

module.exports = createUserEventMetadata;