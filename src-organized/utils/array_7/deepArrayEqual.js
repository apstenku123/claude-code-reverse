/**
 * Performs a deep equality check between two arrays, supporting custom comparison logic and handling circular references.
 *
 * @param {Array} arrayA - The first array to compare.
 * @param {Array} arrayB - The second array to compare.
 * @param {number} comparisonFlags - Bitmask flags that control comparison behavior (e.g., unordered comparison).
 * @param {Function} [customizer] - Optional custom comparison function. If provided, called for each element pair.
 * @param {Function} equalFunc - Function to compare individual elements (typically a deep equality function).
 * @param {Map} traversed - Map to track traversed objects/arrays for circular reference handling.
 * @returns {boolean} True if arrays are deeply equal according to the provided logic; otherwise, false.
 */
function deepArrayEqual(arrayA, arrayB, comparisonFlags, customizer, equalFunc, traversed) {
  const UNORDERED_COMPARE_FLAG = pv2; // Bitmask for unordered comparison
  const PARTIAL_COMPARE_FLAG = cv2;   // Bitmask for partial comparison

  const isUnordered = (comparisonFlags & UNORDERED_COMPARE_FLAG) !== 0;
  const lengthA = arrayA.length;
  const lengthB = arrayB.length;

  // If lengths differ and not in partial/unordered mode, arrays are not equal
  if (lengthA !== lengthB && !(isUnordered && lengthB > lengthA)) {
    return false;
  }

  // Handle circular references
  const traversedA = traversed.get(arrayA);
  const traversedB = traversed.get(arrayB);
  if (traversedA && traversedB) {
    // If both arrays are already traversed, check if they are mapped to each other
    return traversedA === arrayB && traversedB === arrayA;
  }

  let index = -1;
  let areEqual = true;
  // For unordered comparison, track matched indices
  const matchedIndices = (comparisonFlags & PARTIAL_COMPARE_FLAG) ? new r01() : undefined;

  // Mark arrays as traversed to handle circular references
  traversed.set(arrayA, arrayB);
  traversed.set(arrayB, arrayA);

  // Iterate over elements of arrayA
  while (++index < lengthA) {
    const valueA = arrayA[index];
    const valueB = arrayB[index];

    let compared;
    if (customizer) {
      // If unordered, swap arguments for customizer
      compared = isUnordered
        ? customizer(valueB, valueA, index, arrayB, arrayA, traversed)
        : customizer(valueA, valueB, index, arrayA, arrayB, traversed);
    }
    if (compared !== undefined) {
      if (compared) continue; // Customizer says equal, move to next
      areEqual = false;
      break;
    }

    if (matchedIndices) {
      // Unordered comparison: try to find a matching element in arrayB
      const found = r9A(arrayB, (candidate, candidateIndex) => {
        // If not already matched and elements are equal, mark as matched
        if (!o01(matchedIndices, candidateIndex) && (valueA === candidate || equalFunc(valueA, candidate, comparisonFlags, customizer, traversed))) {
          matchedIndices.push(candidateIndex);
          return true;
        }
        return false;
      });
      if (!found) {
        areEqual = false;
        break;
      }
    } else if (!(valueA === valueB || equalFunc(valueA, valueB, comparisonFlags, customizer, traversed))) {
      // Ordered comparison: elements must be strictly equal or deeply equal
      areEqual = false;
      break;
    }
  }

  // Clean up traversed map
  traversed.delete(arrayA);
  traversed.delete(arrayB);

  return areEqual;
}

module.exports = deepArrayEqual;