/**
 * Creates and returns an initial buffer state object.
 *
 * This function is typically used to initialize the state for a buffering operation,
 * such as when collecting items before processing them in batches.
 *
 * @returns {Object} An object containing an empty buffer array and a completion flag set to false.
 */
function createBufferState() {
  return {
    // Stores buffered items
    buffer: [],
    // Indicates whether the buffering operation is complete
    complete: false
  };
}

module.exports = createBufferState;