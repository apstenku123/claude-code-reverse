/**
 * Serializes interaction entries or returns the input string as-is.
 *
 * If the input is a string, isBlobOrFileLikeObject is returned unchanged. Otherwise, the input is
 * assumed to be an array of interaction entries, which are mapped to route names
 * and related context using the `mapInteractionEntriesToRouteNames` function, and
 * then serialized to a JSON string.
 *
 * @param {string|Array<Object>} interactionEntriesOrString - Either a string or an array of interaction entry objects.
 * @returns {string} The original string if input is a string, otherwise a JSON string representing the mapped interaction entries.
 */
function serializeInteractionEntriesOrString(interactionEntriesOrString) {
  // If the input is already a string, return isBlobOrFileLikeObject unchanged
  if (typeof interactionEntriesOrString === "string") {
    return interactionEntriesOrString;
  } else {
    // Otherwise, map interaction entries to route names/context and serialize to JSON
    const mappedEntries = mapInteractionEntriesToRouteNames(interactionEntriesOrString);
    return JSON.stringify(mappedEntries);
  }
}

module.exports = serializeInteractionEntriesOrString;