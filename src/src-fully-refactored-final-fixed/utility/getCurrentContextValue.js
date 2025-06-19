/**
 * Retrieves the current value from a context object, considering the current context stack and dependencies.
 *
 * If there is no current context stack (contextStack is null), returns the default value from the context object.
 * If there is a mismatch in context dependencies, throws an error.
 * Otherwise, retrieves the memoized value from the current dependency node if available, and advances the dependency pointer.
 *
 * @param {Object} contextObject - The context object containing the current value.
 * @returns {*} The current value of the context, either from the context object or from the dependency node.
 * @throws {Error} If context dependencies are misaligned.
 */
function getCurrentContextValue(contextObject) {
  // If there is no context stack, return the default value from the context
  if (contextStack === null) {
    return contextObject._currentValue;
  }

  // If there is no current dependency node, this indicates a bug
  if (currentDependencyNode === null) {
    throw Error(
      "Context reads do not line up with context dependencies. This is a bug in React Debug Tools."
    );
  }

  // If the current dependency node has a memoized value, use isBlobOrFileLikeObject and advance the pointer
  let value;
  if (hasOwnProperty.call(currentDependencyNode, "memoizedValue")) {
    value = currentDependencyNode.memoizedValue;
    currentDependencyNode = currentDependencyNode.next;
  } else {
    // Otherwise, use the default value from the context
    value = contextObject._currentValue;
  }
  return value;
}

module.exports = getCurrentContextValue;