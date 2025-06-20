/**
 * Determines how to process the given input: returns true if null/undefined, processes arrays with processInteractionEntries,
 * otherwise processes objects with processObjectEntry.
 *
 * @param {any} input - The value to process. Can be null, an array, or an object.
 * @returns {any} Returns true if input is null/undefined, otherwise the result of the appropriate processing function.
 */
function processInputOrEntries(input) {
  // Return true if the input is null or undefined
  if (input == null) return true;

  // If the input is an array, process isBlobOrFileLikeObject with processInteractionEntries
  if (Array.isArray(input)) return processInteractionEntries(input);

  // Otherwise, process the input as an object
  return processObjectEntry(input);
}

module.exports = processInputOrEntries;