/**
 * Performs a deep comparison between two values, with support for custom comparison logic, wrapped values, and cycle detection.
 * This function is used to determine if two values are equivalent, accounting for special cases such as wrapped objects and custom comparison handlers.
 *
 * @param {*} valueA - The first value to compare.
 * @param {*} valueB - The second value to compare.
 * @param {number} bitmask - a bitmask flag that controls comparison behavior.
 * @param {Function} customizer - a function to customize comparison logic.
 * @param {Function} equalFunc - The function to determine equality for values.
 * @param {Object} [stack] - An optional stack to track traversed objects for cycle detection.
 * @returns {boolean} Returns true if the values are equivalent, else false.
 */
function deepCompareWithCustomHandlers(
  valueA,
  valueB,
  bitmask,
  customizer,
  equalFunc,
  stack
) {
  // Determine if valueA and valueB are array-like or buffer-like
  const isValueAArrayLike = J8(valueA);
  const isValueBArrayLike = J8(valueB);

  // Get the type tag for each value
  let tagA = isValueAArrayLike ? Q4A : tE(valueA);
  let tagB = isValueBArrayLike ? Q4A : tE(valueB);

  // Normalize tags if they are unrecognized
  tagA = tagA === B4A ? e01 : tagA;
  tagB = tagB === B4A ? e01 : tagB;

  const isTagAUnrecognized = tagA === e01;
  const isTagBUnrecognized = tagB === e01;
  const areTagsEqual = tagA === tagB;

  // Special case: both tags are equal and valueA is a special host object
  if (areTagsEqual && SH(valueA)) {
    // If valueB is not a host object, they are not equal
    if (!SH(valueB)) return false;
    // Treat valueA as array-like for further comparison
    // and mark tagA as recognized
    isValueAArrayLike = true;
    isTagAUnrecognized = false;
  }

  // If tags are equal and tagA is recognized
  if (areTagsEqual && !isTagAUnrecognized) {
    // Use a stack for cycle detection if not provided
    if (!stack) stack = new yH();
    // If valueA is array-like or a typed array, use t01 for comparison
    // Otherwise, use e9A for comparison
    return isValueAArrayLike || Ey(valueA)
      ? t01(valueA, valueB, bitmask, customizer, equalFunc, stack)
      : e9A(valueA, valueB, tagA, bitmask, customizer, equalFunc, stack);
  }

  // Handle wrapped values if bitmask does not include Cb2
  if (!(bitmask & Cb2)) {
    const isValueAWrapped = isTagAUnrecognized && I4A.call(valueA, "__wrapped__");
    const isValueBWrapped = isTagBUnrecognized && I4A.call(valueB, "__wrapped__");
    if (isValueAWrapped || isValueBWrapped) {
      // Unwrap values if necessary
      const unwrappedA = isValueAWrapped ? valueA.value() : valueA;
      const unwrappedB = isValueBWrapped ? valueB.value() : valueB;
      if (!stack) stack = new yH();
      // Compare unwrapped values using the provided equalFunc
      return equalFunc(unwrappedA, unwrappedB, bitmask, customizer, stack);
    }
  }

  // If tags are not equal, values are not equivalent
  if (!areTagsEqual) return false;

  // Fallback: use A4A for deep comparison
  if (!stack) stack = new yH();
  return A4A(valueA, valueB, bitmask, customizer, equalFunc, stack);
}

module.exports = deepCompareWithCustomHandlers;