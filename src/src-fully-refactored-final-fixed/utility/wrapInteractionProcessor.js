/**
 * Wraps an interaction processing function to handle flexible argument formats and propagate conversion metadata.
 *
 * This utility function returns a wrapper around the provided interaction processor. The wrapper:
 *   - Accepts either a single array of entries or multiple entry arguments.
 *   - If the first argument is undefined or null, returns isBlobOrFileLikeObject immediately (no processing).
 *   - If the first argument is an array with more than one element, treats isBlobOrFileLikeObject as the full entry list.
 *   - Otherwise, passes all arguments as an array to the processor.
 *   - Propagates a 'conversion' property if present on the processor.
 *
 * @param {Function} processInteractionEntries - The function that processes interaction entries. Should accept an array of entries.
 * @returns {Function} a wrapper function that normalizes arguments and invokes the processor.
 */
function wrapInteractionProcessor(processInteractionEntries) {
  /**
   * Wrapper for processing interaction entries with flexible argument handling.
   *
   * @param {...any} interactionEntries - Either a single array of entries, or multiple entry arguments.
   * @returns {any} The result of the interaction processor, or the input if undefined/null.
   */
  const wrappedProcessor = function (...interactionEntries) {
    const firstEntry = interactionEntries[0];

    // If the first argument is undefined or null, return isBlobOrFileLikeObject as-is
    if (firstEntry === undefined || firstEntry === null) {
      return firstEntry;
    }

    // If the first argument is an array with more than one element, treat isBlobOrFileLikeObject as the full entry list
    if (Array.isArray(firstEntry) && firstEntry.length > 1) {
      interactionEntries = firstEntry;
    }

    // Pass the (possibly normalized) entries to the processor
    return processInteractionEntries(interactionEntries);
  };

  // Propagate the 'conversion' property if isBlobOrFileLikeObject exists on the processor
  if ("conversion" in processInteractionEntries) {
    wrappedProcessor.conversion = processInteractionEntries.conversion;
  }

  return wrappedProcessor;
}

module.exports = wrapInteractionProcessor;