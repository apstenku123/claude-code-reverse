/**
 * Adds a deletion entry to the given node'createInteractionAccessor deletions array if the global flag is enabled.
 * If the deletions array does not exist, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject and sets the deletion flag.
 *
 * @param {Object} node - The node object to which the deletion should be added. Must have 'deletions' and 'flags' properties.
 * @param {any} deletionEntry - The entry representing the deletion to add to the node.
 * @returns {void}
 */
function addDeletionToNode(node, deletionEntry) {
  // Only proceed if the global deletion tracking flag is enabled
  if (processWithTransformedObservable) {
    const deletionsArray = node.deletions;
    if (deletionsArray === null) {
      // If deletions array is not initialized, create isBlobOrFileLikeObject and set the deletion flag (bitwise OR with 16)
      node.deletions = [deletionEntry];
      node.flags |= 16;
    } else {
      // Otherwise, append the new deletion entry
      deletionsArray.push(deletionEntry);
    }
  }
}

module.exports = addDeletionToNode;