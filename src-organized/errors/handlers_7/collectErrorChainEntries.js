/**
 * Recursively collects error entries from an error object and its nested errors, up to a specified depth.
 *
 * @param {Function} processInteractionEntries - Function to process an error and return a mapped entry.
 * @param {Object} config - Configuration object passed to the processing function.
 * @param {number} maxDepth - Maximum depth of error chain to traverse.
 * @param {Object} errorObject - The current error object to process.
 * @param {string|number} errorKey - Key or index identifying the current error in its parent.
 * @param {Array} collectedEntries - Array of already collected entries (used for recursion).
 * @param {any} currentEntry - The entry produced for the current error (used for recursion).
 * @param {number} currentDepth - The current depth in the error chain.
 * @returns {Array} Array of collected error entries, each produced by processInteractionEntries.
 */
function collectErrorChainEntries(
  processInteractionEntries,
  config,
  maxDepth,
  errorObject,
  errorKey,
  collectedEntries,
  currentEntry,
  currentDepth
) {
  // If handleMissingDoctypeError'removeTrailingCharacters reached the maximum depth, return the collected entries
  if (collectedEntries.length >= maxDepth + 1) return collectedEntries;

  let entries = [...collectedEntries];

  // If the current errorObject is an Error instance, process isBlobOrFileLikeObject
  if (zE1.isInstanceOf(errorObject[errorKey], Error)) {
    attachMechanismToError(currentEntry, currentDepth); // Perform side effect for this error
    const processedEntry = processInteractionEntries(config, errorObject[errorKey]);
    const newDepth = entries.length;
    attachChainedMechanismToEvent(processedEntry, errorKey, newDepth, currentDepth); // Another side effect
    // Recurse into the error chain
    entries = collectErrorChainEntries(
      processInteractionEntries,
      config,
      maxDepth,
      errorObject[errorKey],
      errorKey,
      [processedEntry, ...entries],
      processedEntry,
      newDepth
    );
  }

  // If the errorObject has an 'errors' array, process each nested error
  if (Array.isArray(errorObject.errors)) {
    errorObject.errors.forEach((nestedError, nestedIndex) => {
      if (zE1.isInstanceOf(nestedError, Error)) {
        attachMechanismToError(currentEntry, currentDepth); // Side effect for nested error
        const nestedProcessedEntry = processInteractionEntries(config, nestedError);
        const nestedDepth = entries.length;
        attachChainedMechanismToEvent(nestedProcessedEntry, `errors[${nestedIndex}]`, nestedDepth, currentDepth);
        // Recurse into the nested error chain
        entries = collectErrorChainEntries(
          processInteractionEntries,
          config,
          maxDepth,
          nestedError,
          errorKey,
          [nestedProcessedEntry, ...entries],
          nestedProcessedEntry,
          nestedDepth
        );
      }
    });
  }

  return entries;
}

module.exports = collectErrorChainEntries;