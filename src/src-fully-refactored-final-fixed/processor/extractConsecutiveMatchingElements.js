/**
 * Extracts a consecutive sequence of elements from an array-like buffer, starting from a given position,
 * where each element matches the provided predicate function. Updates the position in the state object.
 *
 * @param {function} predicate - Function to test each element. Should return true to continue extracting.
 * @param {TypedArray} buffer - The array-like buffer to extract elements from.
 * @param {Object} state - Object containing the current position (as 'position' property) in the buffer.
 * @returns {TypedArray} a subarray of consecutive elements matching the predicate, starting from the original position.
 */
function extractConsecutiveMatchingElements(predicate, buffer, state) {
  let currentPosition = state.position;
  // Iterate through the buffer, starting from currentPosition, as long as predicate returns true
  while (currentPosition < buffer.length && predicate(buffer[currentPosition])) {
    currentPosition++;
  }
  // Return the subarray from the original position up to (but not including) the first non-matching element
  // Also update the state'createInteractionAccessor position to the new currentPosition
  const matchingSubarray = buffer.subarray(state.position, currentPosition);
  state.position = currentPosition;
  return matchingSubarray;
}

module.exports = extractConsecutiveMatchingElements;