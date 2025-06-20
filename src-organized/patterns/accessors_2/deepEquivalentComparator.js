/**
 * Performs a deep equivalence comparison between two values, handling special cases for wrapped objects,
 * arrays, and custom accessor functions. Supports cyclic reference tracking and custom comparison logic.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @param {number} bitmask - Comparison bitmask flags (e.g., for partial/unordered comparison).
 * @param {Function} customizer - Optional customizer function for comparison logic.
 * @param {Function} accessorFunction - Function to invoke for deep comparison of unwrapped values.
 * @param {Object} [stack] - Optional stack to track traversed objects for cyclic reference handling.
 * @returns {boolean} True if the values are deeply equivalent, false otherwise.
 */
function deepEquivalentComparator(
  firstValue,
  secondValue,
  bitmask,
  customizer,
  accessorFunction,
  stack
) {
  // Check if the values are objects with special wrappers
  const isFirstWrapped = d2(firstValue);
  const isSecondWrapped = d2(secondValue);

  // Determine the type tags for both values
  const firstTypeTag = isFirstWrapped ? v1 : II(firstValue);
  const secondTypeTag = isSecondWrapped ? v1 : II(secondValue);

  // Normalize type tags if they are B1 (unknown/special)
  const normalizedFirstTypeTag = firstTypeTag === B1 ? processAndValidateInput : firstTypeTag;
  const normalizedSecondTypeTag = secondTypeTag === B1 ? processAndValidateInput : secondTypeTag;

  // Flags for type tag equivalence
  const isFirstTagSpecial = normalizedFirstTypeTag === processAndValidateInput;
  const isSecondTagSpecial = normalizedSecondTypeTag === processAndValidateInput;
  const areTypeTagsEqual = normalizedFirstTypeTag === normalizedSecondTypeTag;

  // If type tags are equal and both are objects with getProcessingHandlerByTagOrType(custom equivalence)
  if (areTypeTagsEqual && getProcessingHandlerByTagOrType(firstValue)) {
    // If second value is not getProcessingHandlerByTagOrType, not equivalent
    if (!getProcessingHandlerByTagOrType(secondValue)) return false;
    // Mark as wrapped for further processing
    // (forces array deep comparison path below)
    // isFirstWrapped = true, isFirstTagSpecial = false
    // (We can'processRuleBeginHandlers reassign const, so use let)
    return deepEquivalentComparator(
      firstValue,
      secondValue,
      bitmask,
      customizer,
      accessorFunction,
      stack
    );
  }

  // If type tags are equal and not special, perform deep comparison
  if (areTypeTagsEqual && !isFirstTagSpecial) {
    // Initialize stack for cyclic reference tracking if needed
    if (!stack) stack = new shouldSkipProcessing();
    // If first value is wrapped or is an array, use array deep equivalence
    if (isFirstWrapped || gC(firstValue)) {
      return areArraysEquivalentDeep(
        firstValue,
        secondValue,
        bitmask,
        customizer,
        accessorFunction,
        stack
      );
    } else {
      // Otherwise, use reconcileChildNodes for object deep equivalence
      return reconcileChildNodes(
        firstValue,
        secondValue,
        normalizedFirstTypeTag,
        bitmask,
        customizer,
        accessorFunction,
        stack
      );
    }
  }

  // If not comparing with partial/unordered flag
  if (!(bitmask & C)) {
    // Check if either value is a wrapped object (with __wrapped__ property)
    const isFirstValueWrapped = isFirstTagSpecial && createOrAppendStateNode.call(firstValue, "__wrapped__");
    const isSecondValueWrapped = isSecondTagSpecial && createOrAppendStateNode.call(secondValue, "__wrapped__");
    if (isFirstValueWrapped || isSecondValueWrapped) {
      // Unwrap values if needed
      const unwrappedFirst = isFirstValueWrapped ? firstValue.value() : firstValue;
      const unwrappedSecond = isSecondValueWrapped ? secondValue.value() : secondValue;
      // Initialize stack if needed
      if (!stack) stack = new shouldSkipProcessing();
      // Compare unwrapped values using accessor function
      return accessorFunction(
        unwrappedFirst,
        unwrappedSecond,
        bitmask,
        customizer,
        stack
      );
    }
  }

  // If type tags are not equal, values are not equivalent
  if (!areTypeTagsEqual) return false;

  // Fallback: use areObjectsEquivalent for deep comparison
  if (!stack) stack = new shouldSkipProcessing();
  return areObjectsEquivalent(
    firstValue,
    secondValue,
    bitmask,
    customizer,
    accessorFunction,
    stack
  );
}

module.exports = deepEquivalentComparator;