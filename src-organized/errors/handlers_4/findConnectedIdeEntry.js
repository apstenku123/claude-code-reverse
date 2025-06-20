/**
 * Searches for an entry in the provided array that represents a connected IDE.
 *
 * @param {Array<Object>} interactionEntries - Array of interaction entry objects to search through.
 * @returns {Object|undefined} The first entry with type 'connected' and name 'ide', or undefined if not found.
 */
function findConnectedIdeEntry(interactionEntries) {
  // Return early if the input is falsy (null, undefined, etc.)
  if (!interactionEntries) return;

  // Find the first entry where type is 'connected' and name is 'ide'
  const connectedIdeEntry = interactionEntries.find(
    (entry) => entry.type === "connected" && entry.name === "ide"
  );

  // Return the entry only if its type is still 'connected', otherwise undefined
  return connectedIdeEntry?.type === "connected" ? connectedIdeEntry : undefined;
}

module.exports = findConnectedIdeEntry;