/**
 * Splits the input array into two parts: the first element and the joined remainder.
 * Returns an array containing only the non-empty results.
 *
 * @param {string[]} inputArray - The array of strings to process.
 * @returns {string[]} An array containing the first element (if truthy) and the joined remainder (if truthy).
 */
function splitFirstAndJoinRest(inputArray) {
  // Extract the first element, or use an empty string if the array is empty or the first element is falsy
  const firstElement = inputArray[0] || "";
  // Get the rest of the array (all elements after the first)
  const remainingElements = inputArray.slice(1);
  // Join the remaining elements with a newline character
  const joinedRemainder = remainingElements.join("\n");
  // Return an array of the non-empty (truthy) results
  return [firstElement, joinedRemainder].filter(Boolean);
}

module.exports = splitFirstAndJoinRest;