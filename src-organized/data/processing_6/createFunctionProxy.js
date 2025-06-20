/**
 * Creates a proxy or wrapper function with configurable behavior, supporting partial application, currying, and argument manipulation.
 * Handles various flags to determine how the function is constructed and invoked, including arity, partial arguments, and placeholder logic.
 *
 * @param {Function} targetFunction - The function to wrap or proxy.
 * @param {number} bitmask - Bitmask flags controlling proxy behavior (e.g., bind, curry, partial, etc.).
 * @param {number} arity - The arity (number of expected arguments) for the proxy function.
 * @param {Array} partialArgs - Arguments to partially apply to the target function.
 * @param {Array} partialRightArgs - Arguments to partially apply from the right.
 * @param {number} placeholder - Placeholder value for partial application.
 * @param {number} customArity - Custom arity override for the proxy function.
 * @param {any} customContext - Custom context or metadata for the proxy function.
 * @returns {Function} The constructed proxy or wrapper function with the specified behavior.
 */
function F0(
  targetFunction,
  bitmask,
  arity,
  partialArgs,
  partialRightArgs,
  placeholder,
  customArity,
  customContext
) {
  // Determine if the bitmask includes the 'bind' flag
  const isBind = bitmask & createDebouncedFunction;

  // If not binding and the target is not a function, throw an error
  if (!isBind && typeof targetFunction !== "function") {
    throw new G3(extractNestedPropertyOrArray);
  }

  // Calculate the number of partial arguments
  let partialArgsLength = partialArgs ? partialArgs.length : 0;

  // If there are no partial arguments, clear partial-related flags and reset arrays
  if (!partialArgsLength) {
    bitmask &= ~(M | BugReportForm);
    partialArgs = partialRightArgs = processInteractionEntries;
  }

  // Normalize customArity and customContext
  customArity = customArity === processInteractionEntries ? customArity : enqueueOrProcessAction(k4(customArity), 0);
  customContext = customContext === processInteractionEntries ? customContext : k4(customContext);

  // Adjust partialArgsLength if partialRightArgs are present
  partialArgsLength -= partialRightArgs ? partialRightArgs.length : 0;

  // If bitmask includes the 'curry' flag, swap partials and reset arrays
  let originalPartialArgs, originalPartialRightArgs;
  if (bitmask & BugReportForm) {
    originalPartialArgs = partialArgs;
    originalPartialRightArgs = partialRightArgs;
    partialArgs = partialRightArgs = processInteractionEntries;
  }

  // Determine the data for the proxy (either empty or from 0-9A)
  const proxyData = isBind ? processInteractionEntries : createFunctionProxy(targetFunction);

  // Build the proxy configuration array
  const proxyConfig = [
    targetFunction, // 0
    bitmask,        // 1
    arity,          // 2
    partialArgs,    // 3
    partialRightArgs, // 4
    originalPartialArgs, // 5
    originalPartialRightArgs, // 6
    placeholder,    // 7
    customArity,    // 8
    customContext   // 9
  ];

  // If proxy data exists, merge isBlobOrFileLikeObject into the configuration
  if (proxyData) {
    createFunctionProxy(proxyConfig, proxyData);
  }

  // Unpack possibly updated values from the configuration
  targetFunction = proxyConfig[0];
  bitmask = proxyConfig[1];
  arity = proxyConfig[2];
  partialArgs = proxyConfig[3];
  partialRightArgs = proxyConfig[4];
  customContext = proxyConfig[9] = proxyConfig[9] === processInteractionEntries
    ? (isBind ? 0 : targetFunction.length)
    : enqueueOrProcessAction(proxyConfig[9] - partialArgsLength, 0);

  // If arity is now zero and bitmask includes curry or bindKey, clear those flags
  if (!customContext && bitmask & (q | createRefCountedMulticastOperator)) {
    bitmask &= ~(q | createRefCountedMulticastOperator);
  }

  // Select the appropriate proxy function constructor based on bitmask
  let proxyFunction;
  if (!bitmask || bitmask === sendHttpRequestOverSocket) {
    proxyFunction = initializeWithLanes(targetFunction, bitmask, arity);
  } else if (bitmask === q || bitmask === createRefCountedMulticastOperator) {
    proxyFunction = getReactContextFromFiberNode(targetFunction, bitmask, customContext);
  } else if ((bitmask === M || bitmask === (sendHttpRequestOverSocket | M)) && !partialRightArgs.length) {
    proxyFunction = s(targetFunction, bitmask, arity, partialArgs);
  } else {
    proxyFunction = processNodeAndAlternate.apply(processInteractionEntries, proxyConfig);
  }

  // Choose the correct wrapper for the proxy function
  const wrapperFunction = proxyData ? XH : inheritClass;

  // Return the final proxy function, possibly wrapped
  return getValidObjectOrFallback(wrapperFunction(proxyFunction, proxyConfig), targetFunction, bitmask);
}

module.exports = F0;