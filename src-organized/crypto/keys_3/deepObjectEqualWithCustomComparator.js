/**
 * Performs a deep equality check between two objects, with support for partial comparisons,
 * custom comparators, and circular reference handling. Used to determine if two objects are equivalent
 * in structure and values, optionally allowing for partial matches and custom comparison logic.
 *
 * @param {Object} objectA - The first object to compare.
 * @param {Object} objectB - The second object to compare.
 * @param {number} comparisonFlags - Bitmask flags to control comparison behavior (e.g., partial comparison).
 * @param {Function} [customizer] - Optional custom comparison function. If provided, called for each property.
 * @param {Function} equalFunc - Function to perform equality check on values (used for recursion).
 * @param {Map} traversedObjects - Map to track traversed objects for circular reference handling.
 * @returns {boolean} True if objects are considered equal, false otherwise.
 */
function deepObjectEqualWithCustomComparator(
  objectA,
  objectB,
  comparisonFlags,
  customizer,
  equalFunc,
  traversedObjects
) {
  const PARTIAL_COMPARE_FLAG = Wb2; // External constant for partial comparison
  const isPartial = (comparisonFlags & PARTIAL_COMPARE_FLAG) !== 0;

  // Get own enumerable property names
  const keysA = up(objectA);
  const keysB = up(objectB);
  const lengthA = keysA.length;
  const lengthB = keysB.length;

  // If lengths differ and not partial, objects are not equal
  if (lengthA !== lengthB && !isPartial) return false;

  // Ensure every key in objectA exists in objectB
  for (let i = 0; i < lengthA; i++) {
    const key = keysA[i];
    // For partial, just check key existence; otherwise, check as own property
    if (isPartial ? !(key in objectB) : !Jb2.call(objectB, key)) {
      return false;
    }
  }

  // Handle circular references
  const stackedA = traversedObjects.get(objectA);
  const stackedB = traversedObjects.get(objectB);
  if (stackedA && stackedB) {
    // If both objects are already traversed, check for circular reference equivalence
    return stackedA === objectB && stackedB === objectA;
  }

  let areEqual = true;
  traversedObjects.set(objectA, objectB);
  traversedObjects.set(objectB, objectA);

  let foundConstructorKey = isPartial;
  // Compare properties
  for (let i = 0; i < lengthA; i++) {
    const key = keysA[i];
    const valueA = objectA[key];
    const valueB = objectB[key];
    let compared;
    if (customizer) {
      // For partial, swap argument order
      compared = isPartial
        ? customizer(valueB, valueA, key, objectB, objectA, traversedObjects)
        : customizer(valueA, valueB, key, objectA, objectB, traversedObjects);
    }
    // If customizer result is undefined, use default equality or recurse
    if (
      compared === undefined
        ? valueA === valueB || equalFunc(valueA, valueB, comparisonFlags, customizer, traversedObjects)
        : compared
    ) {
      // Continue
    } else {
      areEqual = false;
      break;
    }
    // Track if 'constructor' property is present
    if (!foundConstructorKey && key === "constructor") {
      foundConstructorKey = true;
    }
  }

  // If all properties are equal but 'constructor' was not found, compare constructors
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

  // Clean up traversed objects map
  traversedObjects.delete(objectA);
  traversedObjects.delete(objectB);

  return areEqual;
}

module.exports = deepObjectEqualWithCustomComparator;