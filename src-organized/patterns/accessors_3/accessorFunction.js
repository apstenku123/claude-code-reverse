/**
 * Determines the appropriate accessor function to invoke based on the calling context,
 * and applies isBlobOrFileLikeObject with the correct 'this' value and arguments.
 *
 * If the function is called as a constructor (with 'new'), or with a specific context,
 * isBlobOrFileLikeObject delegates to the 'specialAccessor' function. Otherwise, isBlobOrFileLikeObject uses the default 'noopAccessor'.
 *
 * @returns {*} The result of invoking the selected accessor function with the provided arguments.
 */
function accessorFunction() {
  // Determine which accessor to use based on the calling context
  // If called as a constructor (with 'new') or with a specific context, use 'specialAccessor'.
  // Otherwise, use 'noopAccessor' as a default.
  const accessorToInvoke = (this && this !== globalContext && this instanceof accessorFunction)
    ? specialAccessor
    : noopAccessor;

  // Determine the correct 'this' context for the function call
  // If 'useCustomContext' is true, use 'customContext', otherwise use the current 'this'
  const context = useCustomContext ? customContext : this;

  // Call the selected accessor function with the appropriate context and arguments
  return accessorToInvoke.apply(context, arguments);
}

module.exports = accessorFunction;