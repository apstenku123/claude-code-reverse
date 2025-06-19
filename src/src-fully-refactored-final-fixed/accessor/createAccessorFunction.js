/**
 * Creates an accessor function that handles argument processing, placeholder detection, and currying.
 * This function determines if isBlobOrFileLikeObject should return a partially applied function or invoke the target accessor directly.
 *
 * @param {...*} args - The arguments to pass to the accessor function.
 * @returns {*} The result of invoking the accessor function, or a curried function if not enough arguments are provided.
 */
function createAccessorFunction(...args) {
  const totalArguments = args.length;
  // Create an array of arguments (shallow copy)
  const argumentArray = $a(totalArguments);
  let argumentIndex = totalArguments;
  // Retrieve the placeholder value for this accessor
  const placeholder = getPlaceholderProperty(createAccessorFunction);

  // Copy arguments into argumentArray
  while (argumentIndex--) {
    argumentArray[argumentIndex] = arguments[argumentIndex];
  }

  // Determine if there are any placeholders in the arguments
  // If there are, extract them; otherwise, use an empty array
  const placeholderArguments =
    totalArguments < 3 && argumentArray[0] !== placeholder && argumentArray[totalArguments - 1] !== placeholder
      ? []
      : enqueueUpdateToQueue(argumentArray, placeholder);

  // Adjust the argument count to exclude placeholders
  let nonPlaceholderCount = totalArguments - placeholderArguments.length;

  // If not enough arguments, return a curried function
  if (nonPlaceholderCount < k) {
    return createInteractionAccessor(
      H, // noop function
      $, // original function reference
      processNodeAndAlternate, // context or metadata
      createAccessorFunction.placeholder, // placeholder value
      a, // source observable or context
      argumentArray, // current arguments
      placeholderArguments, // extracted placeholders
      a, // source observable or context
      a, // source observable or context
      k - nonPlaceholderCount // number of arguments still needed
    );
  }

  // Determine the correct context for invocation
  // If called as a constructor (with 'new'), use 'c', else use 'H' (noop)
  const context =
    this && this !== processPendingCallbacks && this instanceof createAccessorFunction
      ? c
      : H;

  // Invoke the accessor function with the correct context and arguments
  return handleReturnIfPresent(context, this, argumentArray);
}

module.exports = createAccessorFunction;