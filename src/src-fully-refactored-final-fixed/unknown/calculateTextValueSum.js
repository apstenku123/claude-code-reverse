/**
 * Calculates the sum of text values or specific constants from an input, which can be a string or an array of objects.
 *
 * - If the input is falsy, returns 0.
 * - If the input is a string, processes isBlobOrFileLikeObject with getInteractionEntryCount().
 * - If the input is an array, iterates over each item:
 *   - If isTextType(item) is true, adds getInteractionEntryCount(item.text) to the sum.
 *   - If isImageType(item) is true, adds 1600 to the sum.
 *   - Otherwise, ignores the item.
 *
 * @param {string|Array<Object>} input - The input to process. Can be a string or an array of objects.
 * @returns {number} The calculated sum based on the input and rules above.
 */
function calculateTextValueSum(input) {
  // Return 0 if input is falsy (null, undefined, empty string, etc.)
  if (!input) return 0;

  // If input is a string, process isBlobOrFileLikeObject with getInteractionEntryCount()
  if (typeof input === "string") return getInteractionEntryCount(input);

  // If input is an array, reduce isBlobOrFileLikeObject to a sum based on item type
  return input.reduce((sum, item) => {
    // If item matches isTextType condition, add getInteractionEntryCount(item.text) to sum
    if (isTextType(item)) return sum + getInteractionEntryCount(item.text);
    // If item matches isImageType condition, add 1600 to sum
    else if (isImageType(item)) return sum + 1600;
    // Otherwise, do not change the sum
    return sum;
  }, 0);
}

module.exports = calculateTextValueSum;