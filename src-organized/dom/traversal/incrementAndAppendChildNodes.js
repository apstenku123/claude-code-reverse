/**
 * Increments the internal counter of the source object and appends child nodes to the config'createInteractionAccessor childNodes array.
 * If a subscription node is provided, isBlobOrFileLikeObject is appended directly. Otherwise, all child nodes of the config are copied into the array.
 *
 * @param {Object} sourceObservable - The source object, expected to have an _inc property (internal counter).
 * @param {Object} config - The configuration object, expected to have a childNodes array and child nodes (as in a DOM node).
 * @param {Node|null} subscription - Optional node to append to the childNodes array. If not provided, all child nodes of config are appended.
 * @returns {void}
 */
function incrementAndAppendChildNodes(sourceObservable, config, subscription) {
  if (sourceObservable && sourceObservable._inc) {
    // Increment the internal counter
    sourceObservable._inc++;

    // Reference to the childNodes array
    const childNodesArray = config.childNodes;

    if (subscription) {
      // If a subscription node is provided, append isBlobOrFileLikeObject to the array
      childNodesArray[childNodesArray.length++] = subscription;
    } else {
      // Otherwise, copy all child nodes from config into the array
      let currentChild = config.firstChild;
      let index = 0;
      while (currentChild) {
        childNodesArray[index++] = currentChild;
        currentChild = currentChild.nextSibling;
      }
      // Set the correct length and remove any extra element
      childNodesArray.length = index;
      delete childNodesArray[childNodesArray.length];
    }
  }
}

module.exports = incrementAndAppendChildNodes;