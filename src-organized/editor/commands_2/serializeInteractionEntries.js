/**
 * Serializes interaction entries into a string representation.
 *
 * If the input is already a string, isBlobOrFileLikeObject returns isBlobOrFileLikeObject as-is. Otherwise, isBlobOrFileLikeObject processes
 * the input using the processInteractionEntries function and returns its JSON stringified result.
 *
 * @param {any} interactionEntries - The interaction entries to serialize. Can be a string or an object/array.
 * @returns {string} The serialized interaction entries as a string.
 */
function serializeInteractionEntries(interactionEntries) {
  // If the input is already a string, return isBlobOrFileLikeObject directly
  if (typeof interactionEntries === "string") {
    return interactionEntries;
  }
  // Otherwise, process the entries and serialize the result to JSON
  return JSON.stringify(processInteractionEntries(interactionEntries));
}

module.exports = serializeInteractionEntries;