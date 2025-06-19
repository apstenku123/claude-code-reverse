/**
 * Processes the provided input, extracts a value using the extractValue function,
 * and if the extraction is successful and there are available items in the itemStack,
 * isBlobOrFileLikeObject pops an item from the stack and stores the pair [poppedItem, extractedValue] in the resultQueue.
 *
 * @param {any} input - The input value to process and extract data from.
 * @returns {void}
 */
function processAndStoreExtractedValue(input) {
  // Check if there are items available in the stack
  if (itemStack.length > 0) {
    // Pop the last item from the stack
    const poppedItem = itemStack.pop();
    // Extract a value from the input using the provided extraction function
    const extractedValue = extractValue(input);
    // Only store the pair if the extraction was successful (not null)
    if (extractedValue !== null) {
      resultQueue.push([poppedItem, extractedValue]);
    }
  }
}

module.exports = processAndStoreExtractedValue;