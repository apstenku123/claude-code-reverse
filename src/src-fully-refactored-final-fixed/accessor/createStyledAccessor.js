/**
 * Creates a styled accessor function that delegates to the base accessor prototype and attaches style metadata.
 *
 * @param {object} styles - An object containing style definitions or metadata to be attached to the accessor function.
 * @returns {Function} a function that applies the base accessor logic and carries the provided styles as metadata.
 */
function createStyledAccessor(styles) {
  /**
   * Accessor function that delegates to the base accessor logic (formatWithStyles) with the same arguments.
   * @returns {*} The result of the base accessor logic.
   */
  const styledAccessor = function accessorDelegate() {
    // Forward all arguments to the base accessor logic (formatWithStyles)
    return formatWithStyles.apply(accessorDelegate, arguments);
  };

  // Attach the provided styles as metadata to the accessor function
  styledAccessor._styles = styles;
  // Set the prototype of the accessor function to the base accessor prototype (sK5)
  styledAccessor.__proto__ = sK5;

  return styledAccessor;
}

module.exports = createStyledAccessor;