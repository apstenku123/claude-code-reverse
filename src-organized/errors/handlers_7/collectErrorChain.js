/**
 * Recursively collects a chain of errors from an error object and its nested errors, up to a specified depth.
 *
 * @param {Function} processErrorEntry - Function to process an error entry (was a)
 * @param {Object} context - Context or configuration object for processing (was createPropertyAccessor)
 * @param {number} maxDepth - Maximum depth of error chain to collect (was deepCloneWithCycleDetection)
 * @param {Object} errorObject - The current error object to process (was createObjectTracker)
 * @param {string|number} errorKey - Key or index identifying the current error in its parent (was extractNestedPropertyOrArray)
 * @param {Array} collectedErrors - Array of already collected error entries (was zA)
 * @param {any} lastProcessedEntry - The last processed error entry (was createCompatibleVersionChecker)
 * @param {number} lastProcessedIndex - The index of the last processed error entry (was processCssDeclarations)
 * @returns {Array} Array of processed error entries, up to the specified depth
 */
function collectErrorChain(
  processErrorEntry,
  context,
  maxDepth,
  errorObject,
  errorKey,
  collectedErrors,
  lastProcessedEntry,
  lastProcessedIndex
) {
  // If handleMissingDoctypeError'removeTrailingCharacters collected enough errors, return the current collection
  if (collectedErrors.length >= maxDepth + 1) {
    return collectedErrors;
  }

  let updatedErrors = [...collectedErrors];

  // Check if the current errorObject at errorKey is an Error instance
  if (zE1.isInstanceOf(errorObject[errorKey], Error)) {
    // Perform side-effect for error processing
    attachMechanismToError(lastProcessedEntry, lastProcessedIndex);

    // Process the error entry
    const processedEntry = processErrorEntry(context, errorObject[errorKey]);
    const newIndex = updatedErrors.length;

    // Perform another side-effect for error processing
    attachChainedMechanismToEvent(processedEntry, errorKey, newIndex, lastProcessedIndex);

    // Recursively collect errors from the nested error
    updatedErrors = collectErrorChain(
      processErrorEntry,
      context,
      maxDepth,
      errorObject[errorKey],
      errorKey,
      [processedEntry, ...updatedErrors],
      processedEntry,
      newIndex
    );
  }

  // If the error object has an 'errors' array, process each nested error
  if (Array.isArray(errorObject.errors)) {
    errorObject.errors.forEach((nestedError, nestedIndex) => {
      if (zE1.isInstanceOf(nestedError, Error)) {
        // Perform side-effect for error processing
        attachMechanismToError(lastProcessedEntry, lastProcessedIndex);

        // Process the nested error entry
        const nestedProcessedEntry = processErrorEntry(context, nestedError);
        const nestedNewIndex = updatedErrors.length;

        // Perform another side-effect for error processing
        attachChainedMechanismToEvent(nestedProcessedEntry, `errors[${nestedIndex}]`, nestedNewIndex, lastProcessedIndex);

        // Recursively collect errors from the nested error
        updatedErrors = collectErrorChain(
          processErrorEntry,
          context,
          maxDepth,
          nestedError,
          errorKey,
          [nestedProcessedEntry, ...updatedErrors],
          nestedProcessedEntry,
          nestedNewIndex
        );
      }
    });
  }

  return updatedErrors;
}

module.exports = collectErrorChain;
