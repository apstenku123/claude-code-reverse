/**
 * Creates a proxy function for accessor operations, handling partial application and context.
 *
 * @param {Function} handlerFunction - The main handler or constructor function to be used by the accessor proxy.
 * @param {Function} [contextProvider] - Optional function to provide additional context or configuration.
 * @returns {Function} a function that proxies accessor operations, handling partial application and context.
 */
function createAccessorFunctionProxy(handlerFunction, contextProvider) {
  return function accessorProxy(target, accessor) {
    // Determine which accessor function proxy to use based on the type of target
    const accessorFunctionProxy = isConstructor(target) ? constructorAccessorProxy : standardAccessorProxy;
    // If a context provider is supplied, call isBlobOrFileLikeObject to get additional context; otherwise, use an empty object
    const context = contextProvider ? contextProvider() : {};
    // Prepare the accessor with a maximum arity of 2
    const preparedAccessor = prepareAccessor(accessor, 2);
    // Call the selected accessor function proxy with all required arguments
    return accessorFunctionProxy(target, handlerFunction, preparedAccessor, context);
  };
}

module.exports = createAccessorFunctionProxy;
