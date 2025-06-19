/**
 * Checks if the provided event name indicates the end of a stream.
 *
 * Recognized ending events are: "end", "finish", and "prefinish".
 *
 * @param {string} eventName - The name of the event to check.
 * @returns {boolean} True if the event is an ending event, false otherwise.
 */
const isStreamEndingEvent = (eventName) => {
  // Return true if the eventName matches any of the known ending events
  return eventName === "end" || eventName === "finish" || eventName === "prefinish";
};

module.exports = isStreamEndingEvent;
