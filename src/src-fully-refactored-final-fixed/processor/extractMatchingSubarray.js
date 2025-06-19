/**
 * Extracts a contiguous subarray from the input array, starting at the current position,
 * where each element matches the provided predicate function. Updates the position in the state object.
 *
 * @param {function(any): boolean} predicate - Function to test each element of the array.
 * @param {TypedArray} inputArray - The array to process (must support subarray method).
 * @param {{ position: number }} state - Object containing the current position index; will be updated.
 * @returns {TypedArray} a subarray of inputArray containing contiguous elements matching the predicate, starting from state.position.
 */
function extractMatchingSubarray(predicate, inputArray, state) {
  let currentIndex = state.position;
  // Iterate through the array starting from the current position
  while (currentIndex < inputArray.length && predicate(inputArray[currentIndex])) {
    currentIndex++;
  }
  // Extract the subarray of matching elements and update the position
  const matchingSubarray = inputArray.subarray(state.position, currentIndex);
  state.position = currentIndex;
  return matchingSubarray;
}

module.exports = extractMatchingSubarray;