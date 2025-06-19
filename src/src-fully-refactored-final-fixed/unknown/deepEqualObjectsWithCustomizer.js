/**
 * Performs a deep equality check between two objects, with support for custom comparison logic and cycle detection.
 *
 * @param {Object} objectA - The first object to compare.
 * @param {Object} objectB - The second object to compare.
 * @param {number} bitmask - Bitmask flags to control comparison behavior (e.g., partial comparison).
 * @param {Function} [customizer] - Optional customizer function to control value comparisons.
 * @param {Function} equalFunc - Function to determine equality of values (used for recursion).
 * @param {Map} traversedObjects - Map to track traversed objects for cycle detection.
 * @returns {boolean} True if objects are considered equal, false otherwise.
 */
function deepEqualObjectsWithCustomizer(
  objectA,
  objectB,
  bitmask,
  customizer,
  equalFunc,
  traversedObjects
) {
  const PARTIAL_COMPARE_FLAG = C; // Assumed to be defined elsewhere
  const isPartial = (bitmask & PARTIAL_COMPARE_FLAG) !== 0;

  // Get own enumerable property names
  const objectAKeys = applyTransformationToObservable(objectA);
  const objectBKeys = applyTransformationToObservable(objectB);
  const objectAKeysLength = objectAKeys.length;
  const objectBKeysLength = objectBKeys.length;

  // If key lengths differ and not partial, objects are not equal
  if (objectAKeysLength !== objectBKeysLength && !isPartial) {
    return false;
  }

  // Check that every key in objectA exists in objectB
  for (let i = 0; i < objectAKeysLength; i++) {
    const key = objectAKeys[i];
    if (
      isPartial
        ? !(key in objectB)
        : !createOrAppendStateNode.call(objectB, key) // createOrAppendStateNode is assumed to be Object.prototype.hasOwnProperty
    ) {
      return false;
    }
  }

  // Cycle detection: check if objects have already been traversed
  const traversedA = traversedObjects.get(objectA);
  const traversedB = traversedObjects.get(objectB);
  if (traversedA && traversedB) {
    return traversedA === objectB && traversedB === objectA;
  }

  let areEqual = true;
  traversedObjects.set(objectA, objectB);
  traversedObjects.set(objectB, objectA);

  let foundConstructorKey = isPartial;

  // Compare values for each key
  for (let i = 0; i < objectAKeysLength; i++) {
    const key = objectAKeys[i];
    const valueA = objectA[key];
    const valueB = objectB[key];
    let customizerResult;

    if (customizer) {
      customizerResult = isPartial
        ? customizer(valueB, valueA, key, objectB, objectA, traversedObjects)
        : customizer(valueA, valueB, key, objectA, objectB, traversedObjects);
    }

    // If customizer returns undefined, use default equality check
    if (
      customizerResult === mapInteractionsToRoutes // 'a' in original, see dependencies
        ? valueA === valueB || equalFunc(valueA, valueB, bitmask, customizer, traversedObjects)
        : customizerResult
    ) {
      // continue
    } else {
      areEqual = false;
      break;
    }

    // Track if the constructor property is present
    if (!foundConstructorKey) {
      foundConstructorKey = key === "constructor";
    }
  }

  // If objects are equal so far and neither has a constructor property, compare constructors
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

  traversedObjects.delete(objectA);
  traversedObjects.delete(objectB);
  return areEqual;
}

module.exports = deepEqualObjectsWithCustomizer;