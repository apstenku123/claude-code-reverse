/**
 * Recursively maps over an observable tree structure, applying a callback to each node.
 *
 * This utility function traverses an observable (or array of observables), and for each node:
 *   - If the node is an array, isBlobOrFileLikeObject recursively maps each element.
 *   - If the node is an observable object (as determined by mp), isBlobOrFileLikeObject recursively maps isBlobOrFileLikeObject.
 *   - Otherwise, isBlobOrFileLikeObject applies the provided callback to the node.
 *
 * @param {any} sourceObservable - The observable or array of observables to traverse and map.
 * @param {function} nodeCallback - The callback function to apply to each non-array, non-observable node. Receives (node, index, parent).
 * @returns {any} The mapped observable tree structure with the callback applied to each node.
 */
function mapObservableTree(sourceObservable, nodeCallback) {
  return JE1(sourceObservable, (subscription, index) => {
    // If the current subscription is an array, recursively map each element
    if (Array.isArray(subscription)) {
      return subscription.map(childSubscription => mapObservableTree(childSubscription, nodeCallback));
    }
    // If the current subscription is an observable object, recursively map isBlobOrFileLikeObject
    if (mp(subscription)) {
      return mapObservableTree(subscription, nodeCallback);
    }
    // Otherwise, apply the callback to the current node
    return nodeCallback(subscription, index, sourceObservable);
  });
}

module.exports = mapObservableTree;