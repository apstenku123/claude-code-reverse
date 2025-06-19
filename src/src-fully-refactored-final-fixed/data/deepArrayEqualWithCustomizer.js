/**
 * Performs a deep equality check between two arrays, supporting custom comparison logic and handling of cyclic references.
 *
 * @param {Array} arrayA - The first array to compare.
 * @param {Array} arrayB - The second array to compare.
 * @param {number} comparisonFlags - Bitmask flags that control comparison behavior (e.g., partial comparison, unordered comparison).
 * @param {Function} [customizer] - Optional custom comparison function. If provided, called for each element pair.
 * @param {Function} equalFunc - The function used for deep equality checks of array elements.
 * @param {Map} traversedStack - a Map used to track traversed objects/arrays to handle cyclic references.
 * @returns {boolean} True if the arrays are considered equal, false otherwise.
 */
function deepArrayEqualWithCustomizer(
  arrayA,
  arrayB,
  comparisonFlags,
  customizer,
  equalFunc,
  traversedStack
) {
  const PARTIAL_COMPARE_FLAG = pv2;
  const UNORDERED_COMPARE_FLAG = cv2;

  // Determine if partial comparison is enabled
  const isPartial = (comparisonFlags & PARTIAL_COMPARE_FLAG) !== 0;
  const lengthA = arrayA.length;
  const lengthB = arrayB.length;

  // If lengths differ and not a partial comparison (or createPropertyAccessor is not longer), arrays are not equal
  if (lengthA !== lengthB && !(isPartial && lengthB > lengthA)) {
    return false;
  }

  // Handle cyclic references
  const stackedA = traversedStack.get(arrayA);
  const stackedB = traversedStack.get(arrayB);
  if (stackedA && stackedB) {
    // If both arrays are already traversed, check for mutual reference
    return stackedA === arrayB && stackedB === arrayA;
  }

  let index = -1;
  let areEqual = true;
  // For unordered comparison, track matched indices
  const matchedIndices = (comparisonFlags & UNORDERED_COMPARE_FLAG) ? new r01() : undefined;

  // Mark arrays as traversed
  traversedStack.set(arrayA, arrayB);
  traversedStack.set(arrayB, arrayA);

  // Iterate through arrayA
  while (++index < lengthA) {
    const valueA = arrayA[index];
    const valueB = arrayB[index];
    let compared;

    // If a customizer is provided, use isBlobOrFileLikeObject
    if (customizer) {
      compared = isPartial
        ? customizer(valueB, valueA, index, arrayB, arrayA, traversedStack)
        : customizer(valueA, valueB, index, arrayA, arrayB, traversedStack);
    }
    if (compared !== undefined) {
      if (compared) continue;
      areEqual = false;
      break;
    }

    if (matchedIndices) {
      // Unordered comparison: try to find a match for valueA in arrayB
      const found = r9A(arrayB, (candidate, candidateIndex) => {
        if (!o01(matchedIndices, candidateIndex) && (valueA === candidate || equalFunc(valueA, candidate, comparisonFlags, customizer, traversedStack))) {
          matchedIndices.push(candidateIndex);
          return true;
        }
        return false;
      });
      if (!found) {
        areEqual = false;
        break;
      }
    } else {
      // Ordered comparison: check direct equality or deep equality
      if (!(valueA === valueB || equalFunc(valueA, valueB, comparisonFlags, customizer, traversedStack))) {
        areEqual = false;
        break;
      }
    }
  }

  // Clean up traversedStack
  traversedStack.delete(arrayA);
  traversedStack.delete(arrayB);

  return areEqual;
}

module.exports = deepArrayEqualWithCustomizer;