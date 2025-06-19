/**
 * Performs a deep equality comparison between two values, with support for custom comparison logic and handling of wrapped values.
 *
 * @param {*} valueA - The first value to compare.
 * @param {*} valueB - The second value to compare.
 * @param {number} bitmask - Bitmask flags to control comparison behavior.
 * @param {Function} customizer - Optional function to customize comparisons.
 * @param {Function} equalFunc - Function to determine equality for values.
 * @param {Object} [stack] - Tracks traversed objects to handle circular references.
 * @returns {boolean} True if the values are equivalent, else false.
 */
function deepEqualWithCustomizer(valueA, valueB, bitmask, customizer, equalFunc, stack) {
  const isValueAArray = J8(valueA);
  const isValueBArray = J8(valueB);

  // Determine the tag/type of each value
  let tagA = isValueAArray ? Q4A : tE(valueA);
  let tagB = isValueBArray ? Q4A : tE(valueB);

  // Normalize tags if they are the special B4A tag
  tagA = tagA === B4A ? e01 : tagA;
  tagB = tagB === B4A ? e01 : tagB;

  const isTagAObject = tagA === e01;
  const isTagBObject = tagB === e01;
  const areTagsEqual = tagA === tagB;

  // If both tags are equal and both are arguments objects
  if (areTagsEqual && SH(valueA)) {
    if (!SH(valueB)) return false;
    // Treat arguments objects as arrays for comparison
    // Mark valueA as array, and not as a plain object
    isValueAArray = true;
    isTagAObject = false;
  }

  // If tags are equal and not plain objects, use specialized comparison
  if (areTagsEqual && !isTagAObject) {
    if (!stack) stack = new yH();
    return isValueAArray || Ey(valueA)
      ? t01(valueA, valueB, bitmask, customizer, equalFunc, stack)
      : e9A(valueA, valueB, tagA, bitmask, customizer, equalFunc, stack);
  }

  // Handle wrapped values (e.g., lodash'createInteractionAccessor wrapped objects)
  if (!(bitmask & Cb2)) {
    const isValueAWrapped = isTagAObject && I4A.call(valueA, "__wrapped__");
    const isValueBWrapped = isTagBObject && I4A.call(valueB, "__wrapped__");
    if (isValueAWrapped || isValueBWrapped) {
      const unwrappedA = isValueAWrapped ? valueA.value() : valueA;
      const unwrappedB = isValueBWrapped ? valueB.value() : valueB;
      if (!stack) stack = new yH();
      return equalFunc(unwrappedA, unwrappedB, bitmask, customizer, stack);
    }
  }

  // If tags are not equal, values are not equal
  if (!areTagsEqual) return false;

  // Fallback to generic object comparison
  if (!stack) stack = new yH();
  return A4A(valueA, valueB, bitmask, customizer, equalFunc, stack);
}

module.exports = deepEqualWithCustomizer;