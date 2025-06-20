/**
 * Creates a curried or partially applied function with specific configuration flags and arguments.
 * This utility manages bitmask flags for currying, partial application, and placeholder handling.
 *
 * @param {Function} originalFunction - The function to be wrapped (curried/partially applied).
 * @param {number} bitmask - Bitmask flags indicating currying/partial application behavior.
 * @param {Function} wrapperFunction - The function used to wrap the original function.
 * @param {*} placeholderValue - The placeholder value to be used for partial application.
 * @param {*} thisBinding - The value to use as 'this' when calling the original function.
 * @param {*} partialsLeft - Arguments to be partially applied from the left.
 * @param {*} partialsRight - Arguments to be partially applied from the right.
 * @param {*} argArray - Additional arguments to pass to the wrapper function.
 * @param {*} customizer - Customizer function or value for advanced behaviors.
 * @param {*} additionalData - Additional data to pass to the wrapper function.
 * @returns {Function} The wrapped (curried/partially applied) function.
 */
function createCurriedFunction(
  originalFunction,
  bitmask,
  wrapperFunction,
  placeholderValue,
  thisBinding,
  partialsLeft,
  partialsRight,
  argArray,
  customizer,
  additionalData
) {
  // Determine if the bitmask includes the 'curry' flag
  const isCurry = bitmask & CURRY_FLAG;

  // Select arguments based on the curry flag
  const leftPartials = isCurry ? partialsRight : sourceFunction;
  const rightPartials = isCurry ? sourceFunction : partialsRight;
  const leftPartialsHolder = isCurry ? partialsLeft : sourceFunction;
  const rightPartialsHolder = isCurry ? sourceFunction : partialsLeft;

  // Update bitmask for currying/partial application
  bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG;
  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

  // If not currying, remove BIND and BIND_KEY flags
  if (!(bitmask & CURRY_BOUND_FLAG)) {
    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
  }

  // Prepare arguments array for the wrapper function
  const wrapperArgs = [
    originalFunction,
    bitmask,
    thisBinding,
    leftPartialsHolder,
    leftPartials,
    rightPartialsHolder,
    rightPartials,
    argArray,
    customizer,
    additionalData
  ];

  // Call the wrapper function with the prepared arguments
  const wrappedFunction = wrapperFunction.apply(sourceFunction, wrapperArgs);

  // If the original function is a placeholder, update the wrapped function
  if (isPlaceholder(originalFunction)) {
    updatePlaceholder(wrappedFunction, wrapperArgs);
  }

  // Set the placeholder property and finalize the wrapped function
  wrappedFunction.placeholder = placeholderValue;
  finalizeWrappedFunction(wrappedFunction, originalFunction, bitmask);

  return wrappedFunction;
}

module.exports = createCurriedFunction;