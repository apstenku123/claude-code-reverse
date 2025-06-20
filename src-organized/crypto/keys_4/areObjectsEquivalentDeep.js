/**
 * Determines if two objects are deeply equivalent, with support for partial comparisons and custom equality logic.
 * Handles cyclic references using a Map to track already compared objects.
 *
 * @param {Object} objectA - The first object to compare.
 * @param {Object} objectB - The second object to compare.
 * @param {number} comparisonFlags - Bitmask flags controlling comparison behavior (e.g., partial comparison).
 * @param {Function} [customizer] - Optional custom comparison function. Receives (valueA, valueB, key, objectA, objectB, stack).
 * @param {Function} equalFunc - Function to compare values recursively (e.g., for nested objects/arrays).
 * @param {Map} stack - Map used to track traversed objects for cyclic reference handling.
 * @returns {boolean} True if objects are considered equivalent, false otherwise.
 */
function areObjectsEquivalentDeep(
  objectA,
  objectB,
  comparisonFlags,
  customizer,
  equalFunc,
  stack
) {
  const PARTIAL_COMPARE_FLAG = Wb2; // External constant controlling partial comparison
  const isPartial = (comparisonFlags & PARTIAL_COMPARE_FLAG) !== 0;

  // Get own enumerable property names for both objects
  const keysA = up(objectA);
  const keysB = up(objectB);
  const lengthA = keysA.length;
  const lengthB = keysB.length;

  // If number of keys differ and not a partial comparison, objects are not equivalent
  if (lengthA !== lengthB && !isPartial) return false;

  // Check that every key in objectA exists in objectB
  for (let i = 0; i < lengthA; i++) {
    const key = keysA[i];
    // For partial comparison, just check key existence; otherwise, use hasOwnProperty
    if (!(isPartial ? key in objectB : Jb2.call(objectB, key))) {
      return false;
    }
  }

  // Handle cyclic references: check if handleMissingDoctypeError'removeTrailingCharacters already compared these objects
  const stackedA = stack.get(objectA);
  const stackedB = stack.get(objectB);
  if (stackedA && stackedB) {
    // If both objects are already in the stack, check for mutual reference
    return stackedA === objectB && stackedB === objectA;
  }

  let areEquivalent = true;
  // Mark these objects as traversed
  stack.set(objectA, objectB);
  stack.set(objectB, objectA);

  let foundConstructorKey = isPartial;
  // Compare values for each key
  for (let i = 0; i < lengthA; i++) {
    const key = keysA[i];
    const valueA = objectA[key];
    const valueB = objectB[key];
    let result;
    if (customizer) {
      // For partial comparison, swap argument order
      result = isPartial
        ? customizer(valueB, valueA, key, objectB, objectA, stack)
        : customizer(valueA, valueB, key, objectA, objectB, stack);
    }
    // If customizer returns undefined, use default equality check
    if (
      result === undefined
        ? valueA === valueB || equalFunc(valueA, valueB, comparisonFlags, customizer, stack)
        : result
    ) {
      // Continue
    } else {
      areEquivalent = false;
      break;
    }
    // Track if handleMissingDoctypeError encounter the 'constructor' key
    if (!foundConstructorKey) {
      foundConstructorKey = key === "constructor";
    }
  }

  // If all keys matched and neither object had a 'constructor' property, compare constructors
  if (areEquivalent && !foundConstructorKey) {
    const constructorA = objectA.constructor;
    const constructorB = objectB.constructor;
    if (
      constructorA !== constructorB &&
      "constructor" in objectA &&
      "constructor" in objectB &&
      !(typeof constructorA === "function" && constructorA instanceof constructorA &&
        typeof constructorB === "function" && constructorB instanceof constructorB)
    ) {
      areEquivalent = false;
    }
  }

  // Clean up stack to avoid memory leaks
  stack.delete(objectA);
  stack.delete(objectB);

  return areEquivalent;
}

module.exports = areObjectsEquivalentDeep;