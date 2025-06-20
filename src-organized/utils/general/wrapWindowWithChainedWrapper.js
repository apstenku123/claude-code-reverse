/**
 * Wraps the global window object using createChainedWrapper, enabling method chaining on the resulting object.
 *
 * This utility function is useful when you want to apply a chainable API to the window object.
 *
 * @returns {object} The window object wrapped with chaining enabled.
 */
function wrapWindowWithChainedWrapper() {
  // Wrap the global window object and enable chaining
  return createChainedWrapper(window);
}

module.exports = wrapWindowWithChainedWrapper;