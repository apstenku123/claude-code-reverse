/**
 * Creates a function that applies a specific style configuration and inherits from a given prototype.
 *
 * The returned function delegates its execution to the global 'formatWithStyles' function, preserving the context and arguments.
 * It also attaches the provided styles to the function instance and sets its prototype to 'sK5'.
 *
 * @param {Object} styles - The style configuration object to attach to the function.
 * @returns {Function} a function with attached styles and a specific prototype.
 */
function createStyledFunction(styles) {
  /**
   * Delegates function call to the global 'formatWithStyles' function, preserving arguments.
   * @returns {*} The result of calling 'formatWithStyles' with the current context and arguments.
   */
  const styledFunction = function styledFunctionDelegate() {
    // Forward all arguments to formatWithStyles, using this function as the context
    return formatWithStyles.apply(styledFunctionDelegate, arguments);
  };

  // Attach the styles object to the function for later reference
  styledFunction._styles = styles;
  // Set the prototype of the function to sK5 to inherit its properties/methods
  styledFunction.__proto__ = sK5;

  return styledFunction;
}

module.exports = createStyledFunction;