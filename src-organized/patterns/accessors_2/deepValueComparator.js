/**
 * Performs a deep comparison between two values, supporting custom comparison logic,
 * partial and unordered comparison modes, and handling cyclic references. This function
 * is designed to handle complex data structures, including arrays and wrapped objects.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @param {number} comparisonFlags - Bitmask flags that control comparison behavior (e.g., partial, unordered).
 * @param {Function} customizer - Optional custom comparison function.
 * @param {Function} accessorProxy - Proxy for accessor functions, handling partial application and context.
 * @param {Object} [stack] - Tracks traversed objects to handle cyclic references.
 * @returns {boolean} Returns true if the values are equivalent, else false.
 */
function deepValueComparator(
  firstValue,
  secondValue,
  comparisonFlags,
  customizer,
  accessorProxy,
  stack
) {
  // Determine if firstValue and secondValue are arrays
  const isFirstArray = d2(firstValue);
  const isSecondArray = d2(secondValue);

  // Get the type tags for both values
  const firstTypeTag = isFirstArray ? v1 : II(firstValue);
  const secondTypeTag = isSecondArray ? v1 : II(secondValue);

  // Normalize type tags if they are B1
  const normalizedFirstTypeTag = firstTypeTag === B1 ? processAndValidateInput : firstTypeTag;
  const normalizedSecondTypeTag = secondTypeTag === B1 ? processAndValidateInput : secondTypeTag;

  // Flags for type tag checks
  const isFirstTagNormalized = normalizedFirstTypeTag === processAndValidateInput;
  const isSecondTagNormalized = normalizedSecondTypeTag === processAndValidateInput;
  const areTypeTagsEqual = normalizedFirstTypeTag === normalizedSecondTypeTag;

  // If type tags are equal and firstValue is a complex object (getProcessingHandlerByTagOrType), check secondValue
  if (areTypeTagsEqual && getProcessingHandlerByTagOrType(firstValue)) {
    if (!getProcessingHandlerByTagOrType(secondValue)) return false;
    // Both are complex objects, treat as arrays for further comparison
    // (createAccessorProxy = true, I0 = false in original)
    return deepValueComparator(
      firstValue,
      secondValue,
      comparisonFlags,
      customizer,
      accessorProxy,
      stack
    );
  }

  // If type tags are equal and not normalized, perform deep comparison
  if (areTypeTagsEqual && !isFirstTagNormalized) {
    // Initialize stack if not provided
    if (!stack) stack = new shouldSkipProcessing();
    // If either value is an array or array-like, use areArraysEquivalentDeep
    if (isFirstArray || gC(firstValue)) {
      return areArraysEquivalentDeep(
        firstValue,
        secondValue,
        comparisonFlags,
        customizer,
        accessorProxy,
        stack
      );
    } else {
      // Otherwise, use reconcileChildNodes for deep object comparison
      return reconcileChildNodes(
        firstValue,
        secondValue,
        normalizedFirstTypeTag,
        comparisonFlags,
        customizer,
        accessorProxy,
        stack
      );
    }
  }

  // Handle wrapped values if comparisonFlags does not include C
  if (!(comparisonFlags & C)) {
    const isFirstWrapped = isFirstTagNormalized && createOrAppendStateNode.call(firstValue, "__wrapped__");
    const isSecondWrapped = isSecondTagNormalized && createOrAppendStateNode.call(secondValue, "__wrapped__");
    if (isFirstWrapped || isSecondWrapped) {
      // Unwrap values if necessary
      const unwrappedFirst = isFirstWrapped ? firstValue.value() : firstValue;
      const unwrappedSecond = isSecondWrapped ? secondValue.value() : secondValue;
      if (!stack) stack = new shouldSkipProcessing();
      // Use accessorProxy for comparison
      return accessorProxy(
        unwrappedFirst,
        unwrappedSecond,
        comparisonFlags,
        customizer,
        stack
      );
    }
  }

  // If type tags are not equal, values are not equivalent
  if (!areTypeTagsEqual) return false;

  // Fallback to areObjectsEquivalent for final deep comparison
  if (!stack) stack = new shouldSkipProcessing();
  return areObjectsEquivalent(
    firstValue,
    secondValue,
    comparisonFlags,
    customizer,
    accessorProxy,
    stack
  );
}

module.exports = deepValueComparator;