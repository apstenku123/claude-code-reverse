/**
 * Determines if the provided object is a Synthetic Event.
 *
 * a Synthetic Event is identified by:
 *   - Passing the n4A type guard (external dependency)
 *   - Having 'nativeEvent', 'preventDefault', and 'stopPropagation' properties
 *
 * @param {object} possibleEvent - The object to check for Synthetic Event characteristics.
 * @returns {boolean} True if the object is a Synthetic Event, false otherwise.
 */
function isSyntheticEvent(possibleEvent) {
  // Check if the object passes the n4A type guard
  // and contains all required properties for a Synthetic Event
  return (
    n4A(possibleEvent) &&
    'nativeEvent' in possibleEvent &&
    'preventDefault' in possibleEvent &&
    'stopPropagation' in possibleEvent
  );
}

module.exports = isSyntheticEvent;