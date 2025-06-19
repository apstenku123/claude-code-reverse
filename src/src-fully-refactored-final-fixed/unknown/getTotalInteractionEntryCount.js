/**
 * Calculates the total number of interaction entries from a given input.
 *
 * The input can be either:
 *   - a string: representing encoded interaction entries (each entry is 4 characters)
 *   - An array: containing objects that may represent interaction entries or special markers
 *
 * For string input, isBlobOrFileLikeObject delegates to getInteractionEntryCount to determine the count.
 * For array input, isBlobOrFileLikeObject sums up:
 *   - The count of interaction entries in each object with a 'text' property (using getInteractionEntryCount)
 *   - Adds 1600 for each object that matches a special marker (determined by isSpecialMarker)
 *
 * @param {string | Array<object>} interactionData - The interaction data to process. Can be a string or an array of objects.
 * @returns {number} The total number of interaction entries calculated from the input.
 */
function getTotalInteractionEntryCount(interactionData) {
  if (!interactionData) return 0;

  // If the input is a string, count entries using getInteractionEntryCount
  if (typeof interactionData === "string") {
    return getInteractionEntryCount(interactionData);
  }

  // If the input is an array, process each entry
  return interactionData.reduce((totalCount, entry) => {
    // If the entry is a text entry, add its count
    if (isTextEntry(entry)) {
      return totalCount + getInteractionEntryCount(entry.text);
    }
    // If the entry is a special marker, add 1600
    else if (isSpecialMarker(entry)) {
      return totalCount + 1600;
    }
    // Otherwise, do not add anything
    return totalCount;
  }, 0);
}

module.exports = getTotalInteractionEntryCount;