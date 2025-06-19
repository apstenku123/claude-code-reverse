/**
 * Compares memoized selectors and their values for a given input, determining if changes have occurred.
 *
 * @param {any} inputSelector - The selector or observable to compare.
 * @returns {boolean|null} Returns true if a change is detected, false if not, or null if comparison cannot be performed.
 */
function compareMemoizedSelectors(inputSelector) {
  // Ensure the global memoization cache exists
  if (iE !== null) {
    // Generate a unique key for the selector
    const selectorKey = evaluateOrFallback(inputSelector);
    // Retrieve the memoized selector pair from the cache
    const memoizedSelectorPair = iE.has(selectorKey) ? iE.get(selectorKey) : null;
    // Retrieve the memoized value pair for the selector
    const memoizedValuePair = extractContextFromNode(inputSelector);

    // If either the selector or value pair is missing, cannot compare
    if (memoizedSelectorPair == null || memoizedValuePair == null) return null;

    // Destructure the selector pair: [previousSelector, previousValue]
    const [previousSelector, previousValue] = getReactContextFromFiberNode(memoizedSelectorPair, 2);
    // Destructure the value pair: [currentSelector, currentValue]
    const [currentSelector, currentValue] = getReactContextFromFiberNode(memoizedValuePair, 2);

    // Determine the type of selector for comparison logic
    switch (getProcessingHandlerByTagOrType(inputSelector)) {
      case d6: // Accessor operation
        if (memoizedSelectorPair && memoizedValuePair) {
          // If the current selector is valid, compare using the utility function
          if (currentSelector !== pE) {
            return tk(previousSelector, currentSelector);
          // If the current value is valid, compare previous and current values
          } else if (currentValue !== pE) {
            return previousValue !== currentValue;
          }
        }
        break;
      case handleElementProcessing: // HTML element processing
      case processHtmlElement:
      case updateBitwiseStateAndEncode:
        // If the current value is valid, compare the memoized value chains
        if (currentValue !== pE) {
          let previousValueNode = previousValue;
          let currentValueNode = currentValue;
          // Traverse both linked lists and compare memoized values
          while (previousValueNode && currentValueNode) {
            if (!isValidAndTypeMatch(previousValueNode.memoizedValue, currentValueNode.memoizedValue)) {
              return true;
            }
            previousValueNode = previousValueNode.next;
            currentValueNode = currentValueNode.next;
          }
          // If all values matched, return false (no change)
          return false;
        }
        break;
      default:
        break;
    }
  }
  // If cache is missing or comparison cannot be performed, return null
  return null;
}

module.exports = compareMemoizedSelectors;