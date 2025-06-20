/**
 * Performs a deep comparison between two values, with support for custom comparison logic and handling of wrapped values.
 *
 * @param {*} valueA - The first value to compare.
 * @param {*} valueB - The second value to compare.
 * @param {number} bitmask - Bitmask flags that control comparison behavior.
 * @param {Function} customizer - Optional function to customize comparisons.
 * @param {Function} equalFunc - Function to determine equality for values.
 * @param {Object} [stack] - Tracks traversed objects to handle circular references.
 * @returns {boolean} Returns true if the values are equivalent, else false.
 */
function deepCompareWithCustomizer(valueA, valueB, bitmask, customizer, equalFunc, stack) {
  // Determine if valueA and valueB are arrays
  const isValueAArray = J8(valueA);
  const isValueBArray = J8(valueB);

  // Get the tag/type of each value
  let tagA = isValueAArray ? Q4A : tE(valueA);
  let tagB = isValueBArray ? Q4A : tE(valueB);

  // Normalize tags if they are B4A
  tagA = tagA === B4A ? e01 : tagA;
  tagB = tagB === B4A ? e01 : tagB;

  const isTagANormalized = tagA === e01;
  const isTagBNormalized = tagB === e01;
  const areTagsEqual = tagA === tagB;

  // If tags are equal and both values are 'arguments' objects
  if (areTagsEqual && SH(valueA)) {
    // If valueB is not also an 'arguments' object, they are not equal
    if (!SH(valueB)) return false;
    // Treat both as arrays for further comparison
    // (since 'arguments' objects are array-like)
    // Mark valueA as array, and tag as not normalized
    isValueAArray = true;
    isTagANormalized = false;
  }

  // If tags are equal and not normalized, use specialized comparison
  if (areTagsEqual && !isTagANormalized) {
    // Initialize stack if not provided
    if (!stack) stack = new yH();
    // If valueA is an array or typed array, use t01
    // Otherwise, use e9A for objects
    return isValueAArray || Ey(valueA)
      ? t01(valueA, valueB, bitmask, customizer, equalFunc, stack)
      : e9A(valueA, valueB, tagA, bitmask, customizer, equalFunc, stack);
  }

  // Handle wrapped values if not performing partial comparisons
  if (!(bitmask & Cb2)) {
    const isValueAWrapped = isTagANormalized && I4A.call(valueA, "__wrapped__");
    const isValueBWrapped = isTagBNormalized && I4A.call(valueB, "__wrapped__");
    if (isValueAWrapped || isValueBWrapped) {
      // Unwrap values if necessary
      const unwrappedA = isValueAWrapped ? valueA.value() : valueA;
      const unwrappedB = isValueBWrapped ? valueB.value() : valueB;
      if (!stack) stack = new yH();
      // Compare unwrapped values using the provided equalFunc
      return equalFunc(unwrappedA, unwrappedB, bitmask, customizer, stack);
    }
  }

  // If tags are not equal, values are not equal
  if (!areTagsEqual) return false;

  // Fallback to A4A for final comparison
  if (!stack) stack = new yH();
  return A4A(valueA, valueB, bitmask, customizer, equalFunc, stack);
}

module.exports = deepCompareWithCustomizer;