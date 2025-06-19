/**
 * Creates a proxy accessor function for interaction route mapping.
 * 
 * This utility function sets up the necessary context and arguments to create a proxy accessor
 * that maps interaction entries to route names. It manages global state required by the
 * underlying mapping and proxy functions, and delegates execution to the appropriate handler.
 * 
 * @param {any} interactionEntries - The interaction entries to be mapped to route names.
 * @returns {Function} The accessor proxy function for interaction route mapping.
 */
function createInteractionRouteAccessorProxy(interactionEntries) {
  // Save current global context
  const previousContext = c;
  const previousAccessorProxy = accessorFunctionProxy;

  // Set up global state for mapping and proxy functions
  c = accessorFunctionProxy = mapInteractionEntriesToRouteNames;
  sourceInteractionEntries = interactionEntries;

  // Create the accessor proxy function using the current context
  const accessorProxyFunction = createAccessorProxy.apply(previousAccessorProxy, previousContext);

  // Return the created proxy function
  return accessorProxyFunction;
}

module.exports = createInteractionRouteAccessorProxy;