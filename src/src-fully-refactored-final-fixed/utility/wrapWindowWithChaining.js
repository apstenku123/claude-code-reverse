/**
 * Wraps the global window object using createChainedWrapper, enabling method chaining on the resulting wrapper.
 *
 * This utility function is useful when you want to operate on the window object using a chainable API provided by createChainedWrapper.
 *
 * @returns {Object} The window object wrapped in a chainable wrapper.
 */
function wrapWindowWithChaining() {
  // Wrap the global window object with chaining capabilities
  return createChainedWrapper(window);
}

module.exports = wrapWindowWithChaining;