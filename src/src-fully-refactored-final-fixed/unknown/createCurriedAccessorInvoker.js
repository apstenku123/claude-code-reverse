/**
 * Creates a function that invokes an accessor function with support for currying, placeholders, and optional context.
 *
 * @param {Function} accessorFunction - The accessor function to be invoked (e.g., a getter or setter).
 * @param {Function} [getContext] - Optional function that returns the context object for invocation.
 * @returns {Function} a function that takes a target and arguments, and invokes the accessor with proper currying and context.
 */
function createCurriedAccessorInvoker(accessorFunction, getContext) {
  return function invokeWithCurrying(target, args) {
    // Determine which invoker to use based on the type of target
    // d2 checks if the target is a function or accessor
    const accessorInvoker = d2(target) ? restoreStateFromStacks : applyFunctionToEntries;

    // If a context getter is provided, use isBlobOrFileLikeObject to obtain context; otherwise, use an empty object
    const context = getContext ? getContext() : {};

    // getConfiguredIteratee normalizes or processes the arguments, ensuring isBlobOrFileLikeObject'createInteractionAccessor an array of length 2
    const normalizedArgs = getConfiguredIteratee(args, 2);

    // Invoke the accessorInvoker with the target, accessorFunction, normalized arguments, and context
    return accessorInvoker(target, accessorFunction, normalizedArgs, context);
  };
}

module.exports = createCurriedAccessorInvoker;