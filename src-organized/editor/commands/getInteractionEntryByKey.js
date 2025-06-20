/**
 * Retrieves an interaction entry from the kc2 mapping by its key.
 *
 * @param {string} interactionKey - The key identifying the interaction entry to retrieve.
 * @returns {*} The interaction entry associated with the provided key, or undefined if not found.
 */
function getInteractionEntryByKey(interactionKey) {
  // kc2 is assumed to be an external mapping of interaction entries
  return kc2[interactionKey];
}

module.exports = getInteractionEntryByKey;