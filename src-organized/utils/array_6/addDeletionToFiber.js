/**
 * Adds a deletion effect to a fiber node if the global 'processWithTransformedObservable' flag is enabled.
 *
 * @param {Object} fiberNode - The fiber node object which may have a 'deletions' array and 'flags' property.
 * @param {Object} childToDelete - The child fiber node to be marked for deletion.
 * @returns {void}
 *
 * If the global 'processWithTransformedObservable' flag is true, this function ensures that the 'deletions' array exists on the fiber node.
 * If isBlobOrFileLikeObject does not exist, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject with the child to delete and sets the appropriate flag.
 * If isBlobOrFileLikeObject already exists, isBlobOrFileLikeObject appends the child to the array.
 */
function UL(fiberNode, childToDelete) {
  // Check if the global deletion tracking is enabled
  if (processWithTransformedObservable) {
    // Retrieve the current deletions array from the fiber node
    let deletionsArray = fiberNode.deletions;
    if (deletionsArray === null) {
      // If no deletions array exists, initialize isBlobOrFileLikeObject and set the deletion flag (bitwise OR with 16)
      fiberNode.deletions = [childToDelete];
      fiberNode.flags |= 16;
    } else {
      // If deletions array exists, add the child to delete
      deletionsArray.push(childToDelete);
    }
  }
}

module.exports = UL;