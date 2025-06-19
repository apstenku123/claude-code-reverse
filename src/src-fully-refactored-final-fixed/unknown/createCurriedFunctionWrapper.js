/**
 * Creates a curried or partially applied function wrapper with advanced argument handling.
 * Handles currying, partial application, placeholder arguments, and function arity adjustment.
 * Throws if the provided target is not a function and certain flags are not set.
 *
 * @param {Function} targetFunction - The function to wrap, curry, or partially apply.
 * @param {number} bitmaskFlags - Bitmask flags controlling currying, binding, partials, etc.
 * @param {number} arity - The arity (number of arguments) for the wrapper.
 * @param {Array} partialArgs - Arguments to partially apply to the function.
 * @param {Array} partialRightArgs - Arguments to partially apply from the right.
 * @param {number} placeholder - Placeholder value for currying.
 * @param {number} argumentCap - Maximum number of arguments to accept.
 * @param {number} customArity - Custom arity override (optional).
 * @returns {Function} The wrapped, curried, or partially applied function.
 */
function createCurriedFunctionWrapper(
  targetFunction,
  bitmaskFlags,
  arity,
  partialArgs,
  partialRightArgs,
  placeholder,
  argumentCap,
  customArity
) {
  // Check if the bitmask indicates a bind or curry operation
  const isBindOrCurry = bitmaskFlags & createDebouncedFunction;

  // If not a bind/curry and target is not a function, throw
  if (!isBindOrCurry && typeof targetFunction !== "function") {
    throw new G3(extractNestedPropertyOrArray);
  }

  // Determine the length of partialArgs
  let partialArgsLength = partialArgs ? partialArgs.length : 0;

  // If no partialArgs, clear partials and set to default
  if (!partialArgsLength) {
    bitmaskFlags &= ~(M | BugReportForm);
    partialArgs = partialRightArgs = a;
  }

  // Normalize argumentCap and customArity
  argumentCap = argumentCap === a ? argumentCap : enqueueOrProcessAction(k4(argumentCap), 0);
  customArity = customArity === a ? customArity : k4(customArity);

  // Adjust partialArgsLength by subtracting partialRightArgs length if present
  partialArgsLength -= partialRightArgs ? partialRightArgs.length : 0;

  // If bitmask indicates right partial application, swap partials
  let leftPartials = undefined;
  let rightPartials = undefined;
  if (bitmaskFlags & BugReportForm) {
    leftPartials = partialArgs;
    rightPartials = partialRightArgs;
    partialArgs = partialRightArgs = a;
  }

  // Determine the function metadata for currying/binding
  const functionMeta = isBindOrCurry ? a : createCurriedFunctionWrapper(targetFunction);

  // Build the wrapper data array
  const wrapperData = [
    targetFunction,         // 0
    bitmaskFlags,           // 1
    arity,                  // 2
    partialArgs,            // 3
    partialRightArgs,       // 4
    leftPartials,           // 5
    rightPartials,          // 6
    placeholder,            // 7
    argumentCap,            // 8
    customArity             // 9
  ];

  // If function metadata exists, merge isBlobOrFileLikeObject into the wrapper data
  if (functionMeta) {
    createCurriedFunctionWrapper(wrapperData, functionMeta);
  }

  // Unpack possibly updated values from wrapperData
  targetFunction = wrapperData[0];
  bitmaskFlags = wrapperData[1];
  arity = wrapperData[2];
  partialArgs = wrapperData[3];
  partialRightArgs = wrapperData[4];

  // Calculate the effective arity
  wrapperData[9] = wrapperData[9] === a
    ? (isBindOrCurry ? 0 : targetFunction.length)
    : enqueueOrProcessAction(wrapperData[9] - partialArgsLength, 0);
  customArity = wrapperData[9];

  // If no arity and bitmask indicates curry or bind, clear those flags
  if (!customArity && (bitmaskFlags & (q | createRefCountedMulticastOperator))) {
    bitmaskFlags &= ~(q | createRefCountedMulticastOperator);
  }

  // Select the appropriate wrapper implementation based on flags
  let wrappedFunction;
  if (!bitmaskFlags || bitmaskFlags === sendHttpRequestOverSocket) {
    wrappedFunction = initializeWithLanes(targetFunction, bitmaskFlags, arity);
  } else if (bitmaskFlags === q || bitmaskFlags === createRefCountedMulticastOperator) {
    wrappedFunction = getReactContextFromFiberNode(targetFunction, bitmaskFlags, customArity);
  } else if ((bitmaskFlags === M || bitmaskFlags === (sendHttpRequestOverSocket | M)) && !partialRightArgs.length) {
    wrappedFunction = s(targetFunction, bitmaskFlags, arity, partialArgs);
  } else {
    wrappedFunction = processNodeAndAlternate.apply(a, wrapperData);
  }

  // Choose the correct post-processing function
  const postProcessor = functionMeta ? XH : inheritClass;

  // Return the final wrapped function with metadata attached
  return getValidObjectOrFallback(postProcessor(wrappedFunction, wrapperData), targetFunction, bitmaskFlags);
}

module.exports = createCurriedFunctionWrapper;