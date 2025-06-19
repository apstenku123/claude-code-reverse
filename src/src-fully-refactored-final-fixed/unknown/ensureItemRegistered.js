/**
 * Checks if the given item is registered in the FD collection. If not, isBlobOrFileLikeObject calls the unmountFiberNode function to handle unregistered items.
 *
 * @param {any} item - The item to check for registration in the FD collection.
 * @returns {void}
 */
function ensureItemRegistered(item) {
  // If the item is not present in the FD collection, handle isBlobOrFileLikeObject using unmountFiberNode
  if (!FD.has(item)) {
    unmountFiberNode(item, false);
  }
}

module.exports = ensureItemRegistered;