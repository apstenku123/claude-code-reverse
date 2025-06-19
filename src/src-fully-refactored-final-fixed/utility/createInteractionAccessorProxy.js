/**
 * Creates a proxy accessor function for interaction entries.
 *
 * This function sets up the necessary context and arguments for creating an accessor proxy
 * that handles interaction entries. It temporarily updates global or module-scoped variables
 * to ensure the correct context is passed to the proxy creation logic.
 *
 * @param {any} interactionEntries - The array or value representing interaction entries to process.
 * @returns {Function} The created accessor proxy function for the given interaction entries.
 */
function createInteractionAccessorProxy(interactionEntries) {
  // Save current context and accessor function proxy
  const currentContext = c;
  const currentAccessorProxy = accessorFunctionProxy;

  // Set up global/module-scoped variables for proxy creation
  c = accessorFunctionProxy = processInteractionEntries;
  A0 = interactionEntries;

  // Create the accessor proxy with the correct context and arguments
  const accessorProxy = createAccessorProxy.apply(currentAccessorProxy, currentContext);

  // Return the created proxy
  return accessorProxy;
}

module.exports = createInteractionAccessorProxy;