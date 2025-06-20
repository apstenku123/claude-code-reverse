/**
 * Creates a styled route accessor function that wraps the formatWithStyles logic and attaches style metadata.
 *
 * @param {Array} interactionEntries - An array of interaction entries to be mapped to route names and context.
 * @returns {Function} a function that applies formatWithStyles with the given arguments, with attached style metadata and prototype.
 */
function createStyledRouteAccessor(interactionEntries) {
  /**
   * Subscription function that delegates to formatWithStyles with the current arguments.
   * @returns {*} The result of formatWithStyles.apply with the current arguments.
   */
  const styledRouteAccessor = function subscription() {
    return formatWithStyles.apply(subscription, arguments);
  };

  // Attach the styles (interaction entries) to the accessor function
  styledRouteAccessor._styles = interactionEntries;
  // Set the prototype of the accessor function to sK5
  styledRouteAccessor.__proto__ = sK5;

  return styledRouteAccessor;
}

module.exports = createStyledRouteAccessor;