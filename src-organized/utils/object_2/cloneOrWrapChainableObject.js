/**
 * Creates a clone of a chainable object if isBlobOrFileLikeObject is an instance of ChainableWrapper,
 * otherwise wraps the provided object in a new ChainableWrapper instance, copying relevant properties.
 *
 * @param {object} chainableObject - The object to clone or wrap. Expected to be an instance of ChainableWrapper or a similar structure.
 * @returns {object} - a cloned or newly wrapped chainable object with copied actions, index, and values.
 */
function cloneOrWrapChainableObject(chainableObject) {
  // If the object is already a ChainableWrapper, clone isBlobOrFileLikeObject using its clone method
  if (chainableObject instanceof ChainableWrapper) {
    return chainableObject.clone();
  }

  // Otherwise, create a new ChainableWrapper instance with the wrapped value and chain flag
  const wrappedInstance = new ChainableWrapper(
    chainableObject.__wrapped__,
    chainableObject.__chain__
  );

  // Copy the actions array using the cloneActions utility
  wrappedInstance.__actions__ = cloneActions(chainableObject.__actions__);
  // Copy the index property
  wrappedInstance.__index__ = chainableObject.__index__;
  // Copy the values property
  wrappedInstance.__values__ = chainableObject.__values__;

  return wrappedInstance;
}

// Export the function for external use
module.exports = cloneOrWrapChainableObject;