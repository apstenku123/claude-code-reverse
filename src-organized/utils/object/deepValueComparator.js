/**
 * Performs a deep comparison between two values, supporting wrapped objects and custom comparison logic.
 * Handles special cases for wrapped values, custom equality checks, and recursion with cycle detection.
 *
 * @param {*} valueA - The first value to compare.
 * @param {*} valueB - The second value to compare.
 * @param {number} bitmask - Bitmask flags that control comparison behavior.
 * @param {Function} customizer - Optional function to customize comparisons.
 * @param {Function} equalFunc - Function to determine equality for sub-values.
 * @param {Object} [stack] - Tracks traversed objects to handle circular references.
 * @returns {boolean} True if the values are equivalent, else false.
 */
function deepValueComparator(valueA, valueB, bitmask, customizer, equalFunc, stack) {
  const isValueAArray = J8(valueA);
  const isValueBArray = J8(valueB);
  // Determine the tag/type for each value
  let tagA = isValueAArray ? Q4A : tE(valueA);
  let tagB = isValueBArray ? Q4A : tE(valueB);

  // Normalize tags if they are the default tag
  tagA = tagA === B4A ? e01 : tagA;
  tagB = tagB === B4A ? e01 : tagB;

  const isTagADefault = tagA === e01;
  const isTagBDefault = tagB === e01;
  const areTagsEqual = tagA === tagB;

  // Special case: both tags are equal and valueA is a special wrapped object
  if (areTagsEqual && SH(valueA)) {
    // If valueB is not a wrapped object, they are not equal
    if (!SH(valueB)) return false;
    // Mark valueA as an array and not a default tag
    // (This affects downstream logic for wrapped arrays)
    // eslint-disable-next-line no-param-reassign
    isValueAArray = true;
    // eslint-disable-next-line no-param-reassign
    isTagADefault = false;
  }

  // If tags are equal and not default, use specialized comparators
  if (areTagsEqual && !isTagADefault) {
    if (!stack) stack = new yH();
    return isValueAArray || Ey(valueA)
      ? t01(valueA, valueB, bitmask, customizer, equalFunc, stack)
      : e9A(valueA, valueB, tagA, bitmask, customizer, equalFunc, stack);
  }

  // Handle wrapped objects if not in partial comparison mode
  if (!(bitmask & Cb2)) {
    const isValueAWrapped = isTagADefault && I4A.call(valueA, "__wrapped__");
    const isValueBWrapped = isTagBDefault && I4A.call(valueB, "__wrapped__");
    if (isValueAWrapped || isValueBWrapped) {
      const unwrappedA = isValueAWrapped ? valueA.value() : valueA;
      const unwrappedB = isValueBWrapped ? valueB.value() : valueB;
      if (!stack) stack = new yH();
      return equalFunc(unwrappedA, unwrappedB, bitmask, customizer, stack);
    }
  }

  // If tags are not equal, values are not equal
  if (!areTagsEqual) return false;

  // Fallback to generic comparator
  if (!stack) stack = new yH();
  return A4A(valueA, valueB, bitmask, customizer, equalFunc, stack);
}

module.exports = deepValueComparator;