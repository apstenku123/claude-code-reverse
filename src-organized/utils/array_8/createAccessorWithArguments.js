/**
 * Creates a new accessor function by combining an existing array (c) with additional arguments.
 * Determines the correct function to invoke (accessorFunction or noop) based on the context (constructor or regular call).
 * Forwards all arguments and uses the appropriate 'this' context.
 *
 * @param {...*} args - Additional arguments to append to the base array 'c'.
 * @returns {*} The result of invoking the selected function with the combined arguments and correct context.
 */
function createAccessorWithArguments(...args) {
  // Number of additional arguments provided
  const additionalArgsCount = args.length;

  // Length of the base array 'c'
  const baseArrayLength = c.length;

  // Create a new array large enough to hold both base array and additional arguments
  const combinedArgs = $a(baseArrayLength + additionalArgsCount);

  // Determine which function to call: accessorFunction (accessorFunctionProxy) if called as a constructor, otherwise noop (H)
  const functionToCall = (this && this !== processPendingCallbacks && this instanceof createAccessorWithArguments)
    ? accessorFunction
    : noop;

  // Copy elements from the base array 'c' into the new combined array
  for (let i = 0; i < baseArrayLength; i++) {
    combinedArgs[i] = c[i];
  }

  // Copy additional arguments into the combined array
  for (let i = 0; i < additionalArgsCount; i++) {
    combinedArgs[baseArrayLength + i] = args[i];
  }

  // Call handleReturnIfPresent with the selected function, the correct 'this' context, and the combined arguments
  // If accessorFunctionProxy is truthy, use 'k' as the context; otherwise, use the current 'this'
  return handleReturnIfPresent(functionToCall, accessorFunctionProxy ? k : this, combinedArgs);
}

module.exports = createAccessorWithArguments;