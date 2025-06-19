/**
 * Performs a deep equality check between two objects, with support for custom comparison logic and handling of cyclic references.
 *
 * @param {Object} objectA - The first object to compare.
 * @param {Object} objectB - The second object to compare.
 * @param {number} comparisonFlags - Bitmask flags controlling comparison behavior (e.g., partial comparison).
 * @param {Function} [customizer] - Optional custom comparison function. If provided, isBlobOrFileLikeObject'createInteractionAccessor called to compare values.
 * @param {Function} equalFunc - Function to recursively compare values for deep equality.
 * @param {Map} traversedObjectsMap - Map to track traversed objects and handle cyclic references.
 * @returns {boolean} Returns true if objects are deeply equal, else false.
 */
function deepObjectEqual(
  objectA,
  objectB,
  comparisonFlags,
  customizer,
  equalFunc,
  traversedObjectsMap
) {
  const PARTIAL_COMPARE_FLAG = C; // Assumed constant for partial comparison
  const isPartial = (comparisonFlags & PARTIAL_COMPARE_FLAG) !== 0;

  // Get own enumerable property names for both objects
  const objectAKeys = applyTransformationWithConfig(objectA);
  const objectBKeys = applyTransformationWithConfig(objectB);
  const objectAKeysLength = objectAKeys.length;
  const objectBKeysLength = objectBKeys.length;

  // If lengths differ and not partial, objects are not equal
  if (objectAKeysLength !== objectBKeysLength && !isPartial) {
    return false;
  }

  // Check that all keys in objectA exist in objectB
  for (let i = 0; i < objectAKeysLength; i++) {
    const key = objectAKeys[i];
    if (
      isPartial
        ? !(key in objectB)
        : !Object.prototype.hasOwnProperty.call(objectB, key)
    ) {
      return false;
    }
  }

  // Handle cyclic references using traversedObjectsMap
  const cachedA = traversedObjectsMap.get(objectA);
  const cachedB = traversedObjectsMap.get(objectB);
  if (cachedA && cachedB) {
    // If both objects have been traversed, check if they reference each other
    return cachedA === objectB && cachedB === objectA;
  }

  let areEqual = true;
  // Mark these objects as traversed
  traversedObjectsMap.set(objectA, objectB);
  traversedObjectsMap.set(objectB, objectA);

  let foundConstructorKey = isPartial;

  // Compare values for each key
  for (let i = 0; i < objectAKeysLength; i++) {
    const key = objectAKeys[i];
    const valueA = objectA[key];
    const valueB = objectB[key];

    let comparisonResult;
    if (customizer) {
      // If customizer is provided, use isBlobOrFileLikeObject for comparison
      comparisonResult = isPartial
        ? customizer(valueB, valueA, key, objectB, objectA, traversedObjectsMap)
        : customizer(valueA, valueB, key, objectA, objectB, traversedObjectsMap);
    }

    // If customizer returns undefined, fallback to strict equality or recursive deep comparison
    if (
      comparisonResult === undefined
        ? valueA === valueB || equalFunc(valueA, valueB, comparisonFlags, customizer, traversedObjectsMap)
        : comparisonResult
    ) {
      // Continue
    } else {
      areEqual = false;
      break;
    }

    // Track if the constructor key was found
    if (!foundConstructorKey) {
      foundConstructorKey = key === "constructor";
    }
  }

  // If objects are equal so far and neither had a constructor property, compare constructors
  if (areEqual && !foundConstructorKey) {
    const constructorA = objectA.constructor;
    const constructorB = objectB.constructor;
    if (
      constructorA !== constructorB &&
      "constructor" in objectA &&
      "constructor" in objectB &&
      !(
        typeof constructorA === "function" &&
        constructorA instanceof constructorA &&
        typeof constructorB === "function" &&
        constructorB instanceof constructorB
      )
    ) {
      areEqual = false;
    }
  }

  // Clean up traversed objects
  traversedObjectsMap.delete(objectA);
  traversedObjectsMap.delete(objectB);

  return areEqual;
}

module.exports = deepObjectEqual;