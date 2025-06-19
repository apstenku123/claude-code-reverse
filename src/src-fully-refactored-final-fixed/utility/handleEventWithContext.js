/**
 * Handles an event by binding a handler with a given context and optionally extending an event chain.
 *
 * @param {any} event - The event or value to be added to the event chain.
 * @param {any} handlerContext - The context to bind to the handler function.
 * @param {Array<any>|null|undefined} eventChain - The current chain of events, or null/undefined if none exists.
 * @returns {any} The result of the updateMemoizedStateWithDependencies function, which processes the event with the given context and chain.
 */
function handleEventWithContext(event, handlerContext, eventChain) {
  // If eventChain exists, append the current event to isBlobOrFileLikeObject; otherwise, set to null
  const updatedEventChain = eventChain !== null && eventChain !== undefined
    ? eventChain.concat([event])
    : null;

  // Bind the handlerContext and event to the handleSubscriptionOrRefAssignment function, creating a new handler
  const boundHandler = handleSubscriptionOrRefAssignment.bind(null, handlerContext, event);

  // Call updateMemoizedStateWithDependencies with fixed arguments and the prepared handler and event chain
  return updateMemoizedStateWithDependencies(4, 4, boundHandler, updatedEventChain);
}

module.exports = handleEventWithContext;