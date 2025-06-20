/**
 * Creates a proxy accessor function that combines an existing array (c) with additional arguments,
 * and invokes a target function (handleReturnIfPresent) with the correct context and arguments.
 *
 * If called as a constructor (with `new`), delegates to accessorFunctionProxy (accessorFunctionProxy),
 * otherwise delegates to a standard accessor (H). Handles context and argument merging.
 *
 * @param {...*} args - Additional arguments to append to the base array `c`.
 * @returns {*} The result of invoking the target function with the merged arguments and correct context.
 */
function createAccessorProxy(...args) {
  // Number of arguments passed to this function
  const numberOfAdditionalArgs = args.length;
  // Length of the base array 'c'
  const baseArrayLength = c.length;
  // Allocate a new array to hold all arguments (base + additional)
  const combinedArgs = $a(baseArrayLength + numberOfAdditionalArgs);

  // Determine the correct function to delegate to based on invocation context
  // If called as a constructor, use accessorFunctionProxy (accessorFunctionProxy), else use standard accessor (H)
  const targetFunction = (this && this !== processPendingCallbacks && this instanceof createAccessorProxy) ? accessorFunctionProxy : H;

  // Copy elements from the base array 'c' into the combined arguments array
  for (let i = 0; i < baseArrayLength; i++) {
    combinedArgs[i] = c[i];
  }

  // Append additional arguments to the combined arguments array
  for (let i = 0; i < numberOfAdditionalArgs; i++) {
    combinedArgs[baseArrayLength + i] = args[i];
  }

  // Call the target function with the correct context and combined arguments
  // If accessorFunctionProxy is truthy, use 'k' as context, otherwise use the current 'this'
  return handleReturnIfPresent(targetFunction, accessorFunctionProxy ? k : this, combinedArgs);
}

module.exports = createAccessorProxy;