/**
 * Determines whether the scheme of a given interaction entry is mapped to a route name.
 *
 * @param {Object} interactionEntry - The interaction entry object containing a scheme property.
 * @param {string} interactionEntry.scheme - The scheme identifier to check in the global mapping.
 * @returns {boolean} True if the scheme is mapped to a route name; otherwise, false.
 */
function isInteractionEntrySchemeMapped(interactionEntry) {
  // Check if the provided interaction entry'createInteractionAccessor scheme exists in the global mapping
  return isInteractionEntryMapped(interactionEntry.scheme);
}

module.exports = isInteractionEntrySchemeMapped;