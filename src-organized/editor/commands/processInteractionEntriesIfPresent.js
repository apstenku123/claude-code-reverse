/**
 * Processes an array of interaction entries if present, mapping each entry using a provided mapping function and a processing function.
 * If the entries array is empty or undefined, returns the result of processInteractionEntries.
 *
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @param {Function} mappingFunction - The function used to map each interaction entry (typically to a tuple or object).
 * @returns {*} The result of processing the mapped interaction entries, or the default processInteractionEntries result if no entries are present.
 */
function processInteractionEntriesIfPresent(interactionEntries, mappingFunction) {
  // Check if interactionEntries is defined and has at least one element
  if (interactionEntries && interactionEntries.length) {
    // Map the entries using the provided mapping function and process them
    return findMatchingElementByAccessor(interactionEntries, getConfiguredIteratee(mappingFunction, 2), processInteractionEntries);
  } else {
    // If no entries, return the default processInteractionEntries result
    return processInteractionEntries;
  }
}

module.exports = processInteractionEntriesIfPresent;