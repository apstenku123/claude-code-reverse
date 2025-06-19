/**
 * Checks if the provided event name represents an end-like event.
 *
 * Recognized end-like events are: "end", "finish", and "prefinish".
 *
 * @param {string} eventName - The name of the event to check.
 * @returns {boolean} True if the event is an end-like event, false otherwise.
 */
const isEndLikeEvent = (eventName) => {
  // Check if the event name matches any of the recognized end-like events
  return eventName === "end" || eventName === "finish" || eventName === "prefinish";
};

module.exports = isEndLikeEvent;
