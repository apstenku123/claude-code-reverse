/**
 * Determines if two arrays are deeply equivalent, with support for partial and unordered comparisons, custom comparators, and cycle detection.
 *
 * @param {Array} arrayA - The first array to compare.
 * @param {Array} arrayB - The second array to compare.
 * @param {number} comparisonFlags - Bitmask flags controlling comparison behavior (e.g., partial, unordered).
 * @param {Function} [customizer] - Optional custom comparison function.
 * @param {Function} equalFunc - Function to compare individual elements deeply.
 * @param {Map} traversedStack - Map to track traversed objects for cycle detection.
 * @returns {boolean} True if arrays are equivalent based on the provided criteria, false otherwise.
 */
function areArraysEquivalentDeep(
  arrayA,
  arrayB,
  comparisonFlags,
  customizer,
  equalFunc,
  traversedStack
) {
  const PARTIAL_COMPARE_FLAG = pv2;
  const UNORDERED_COMPARE_FLAG = cv2;

  const isPartial = (comparisonFlags & PARTIAL_COMPARE_FLAG) !== 0;
  const isUnordered = (comparisonFlags & UNORDERED_COMPARE_FLAG) !== 0;

  const lengthA = arrayA.length;
  const lengthB = arrayB.length;

  // If lengths differ and not in partial mode, arrays are not equivalent
  if (lengthA !== lengthB && !(isPartial && lengthB > lengthA)) {
    return false;
  }

  // Cycle detection: check if these arrays have already been compared
  const stackedA = traversedStack.get(arrayA);
  const stackedB = traversedStack.get(arrayB);
  if (stackedA && stackedB) {
    return stackedA === arrayB && stackedB === arrayA;
  }

  let index = -1;
  let areEquivalent = true;
  // For unordered comparison, track matched indices
  const matchedIndices = isUnordered ? new r01() : undefined;

  // Mark these arrays as traversed
  traversedStack.set(arrayA, arrayB);
  traversedStack.set(arrayB, arrayA);

  // Iterate through elements of arrayA
  while (++index < lengthA) {
    const valueA = arrayA[index];
    const valueB = arrayB[index];

    let compared;
    if (customizer) {
      // For partial, swap arguments to customizer
      compared = isPartial
        ? customizer(valueB, valueA, index, arrayB, arrayA, traversedStack)
        : customizer(valueA, valueB, index, arrayA, arrayB, traversedStack);
    }

    if (compared !== undefined) {
      if (compared) continue;
      areEquivalent = false;
      break;
    }

    if (matchedIndices) {
      // Unordered comparison: try to find a match in arrayB
      const found = r9A(arrayB, (candidateB, candidateIndex) => {
        if (
          !o01(matchedIndices, candidateIndex) &&
          (valueA === candidateB || equalFunc(valueA, candidateB, comparisonFlags, customizer, traversedStack))
        ) {
          matchedIndices.push(candidateIndex);
          return true;
        }
        return false;
      });
      if (!found) {
        areEquivalent = false;
        break;
      }
    } else if (!(valueA === valueB || equalFunc(valueA, valueB, comparisonFlags, customizer, traversedStack))) {
      // Ordered comparison: values must match in order
      areEquivalent = false;
      break;
    }
  }

  // Clean up traversedStack to avoid memory leaks
  traversedStack.delete(arrayA);
  traversedStack.delete(arrayB);

  return areEquivalent;
}

module.exports = areArraysEquivalentDeep;