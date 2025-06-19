/**
 * Invokes an accessor function with a combination of preset and provided arguments.
 * Handles invocation context to determine if called as a constructor or regular function.
 *
 * @param {...*} args - Arguments to be appended to the preset arguments array.
 * @returns {*} The result of invoking the accessor function with the combined arguments.
 */
function invokeAccessorWithArguments(...args) {
  // Preset arguments array (external dependency)
  const presetArgs = c;
  const presetArgsLength = presetArgs.length;
  const additionalArgsLength = args.length;

  // Create a new array to hold all arguments (preset + additional)
  const combinedArgs = $a(presetArgsLength + additionalArgsLength);

  // Determine the function to invoke based on invocation context
  // If called as a constructor (with 'new'), use invokeAccessorFunction (accessorFunctionProxy), otherwise use noop (H)
  const accessorFunction = (this && this !== processPendingCallbacks && this instanceof invokeAccessorWithArguments)
    ? invokeAccessorFunction
    : noop;

  // Copy preset arguments into the combined arguments array
  for (let i = 0; i < presetArgsLength; i++) {
    combinedArgs[i] = presetArgs[i];
  }

  // Copy additional arguments into the combined arguments array
  for (let i = 0; i < additionalArgsLength; i++) {
    combinedArgs[presetArgsLength + i] = args[i];
  }

  // Invoke the accessor function with the correct context and combined arguments
  // If accessorFunctionProxy is truthy, use 'k' as the context; otherwise, use the current 'this'
  return handleReturnIfPresent(accessorFunction, accessorFunctionProxy ? k : this, combinedArgs);
}

module.exports = invokeAccessorWithArguments;