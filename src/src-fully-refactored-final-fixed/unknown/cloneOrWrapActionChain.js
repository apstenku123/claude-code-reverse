/**
 * Clones an action chain object if isBlobOrFileLikeObject'createInteractionAccessor an instance of ActionChainClass, otherwise wraps isBlobOrFileLikeObject in a new ActionChainWrapper.
 * Copies relevant properties to ensure the new object maintains the same state as the original.
 *
 * @param {object} actionChain - The action chain object to clone or wrap.
 * @returns {object} - a cloned or wrapped action chain object with copied properties.
 */
function cloneOrWrapActionChain(actionChain) {
  // If the input is already an instance of ActionChainClass, clone isBlobOrFileLikeObject directly
  if (actionChain instanceof ActionChainClass) {
    return actionChain.clone();
  }

  // Otherwise, create a new ActionChainWrapper with the wrapped value and chain state
  const wrappedChain = new ActionChainWrapper(actionChain.__wrapped__, actionChain.__chain__);

  // Copy the actions array (deep copy if necessary)
  wrappedChain.__actions__ = cloneActionsArray(actionChain.__actions__);

  // Copy the index and values properties
  wrappedChain.__index__ = actionChain.__index__;
  wrappedChain.__values__ = actionChain.__values__;

  return wrappedChain;
}

module.exports = cloneOrWrapActionChain;