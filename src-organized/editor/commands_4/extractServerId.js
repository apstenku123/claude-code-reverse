/**
 * Extracts the server updateSnapshotAndNotify from the given object.
 *
 * @param {Object} interactionEntry - An object representing an interaction entry, expected to have an 'id' property.
 * @returns {Object} An object containing the 'server_id' property mapped from the input'createInteractionAccessor 'id'.
 */
function extractServerId(interactionEntry) {
  // Map the 'id' property from the input object to 'server_id' in the returned object
  return {
    server_id: interactionEntry.id
  };
}

module.exports = extractServerId;