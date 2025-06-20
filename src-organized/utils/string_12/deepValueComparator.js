/**
 * Compares two values for deep equality based on their type, structure, and content.
 * Handles various special cases for ArrayBuffers, TypedArrays, Maps, Sets, Numbers, Errors, and custom objects.
 *
 * @param {*} valueA - The first value to compare.
 * @param {*} valueB - The second value to compare.
 * @param {number} typeTag - Type identifier/tag for the comparison logic.
 * @param {number} comparisonFlags - Bitmask flags to control comparison behavior.
 * @param {Function} customizer - Optional customizer function for deep comparison.
 * @param {Function} equalityFunction - Function to use for deep equality checks.
 * @param {Map} traversedMap - Map to track traversed objects for circular reference handling.
 * @returns {boolean} True if the values are deeply equal, false otherwise.
 */
function deepValueComparator(
  valueA,
  valueB,
  typeTag,
  comparisonFlags,
  customizer,
  equalityFunction,
  traversedMap
) {
  switch (typeTag) {
    case ARRAY_BUFFER_TAG: {
      // Compare ArrayBuffers by byteLength and byteOffset
      if (
        valueA.byteLength !== valueB.byteLength ||
        valueA.byteOffset !== valueB.byteOffset
      ) {
        return false;
      }
      // Compare underlying buffers
      valueA = valueA.buffer;
      valueB = valueB.buffer;
      // fall through to TYPED_ARRAY_TAG
    }
    case TYPED_ARRAY_TAG: {
      // Compare TypedArrays by byteLength and deep equality
      if (
        valueA.byteLength !== valueB.byteLength ||
        !equalityFunction(new TypedArrayView(valueA), new TypedArrayView(valueB))
      ) {
        return false;
      }
      return true;
    }
    case NUMBER_TAG:
    case DATE_TAG:
    case BOOLEAN_TAG: {
      // Compare numbers, dates, and booleans using a specialized equality function
      return numberEquality(+valueA, +valueB);
    }
    case ERROR_TAG: {
      // Compare Error objects by name and message
      return valueA.name === valueB.name && valueA.message === valueB.message;
    }
    case STRING_TAG:
    case SYMBOL_TAG: {
      // Compare strings and symbols by coercing valueB to string
      return valueA == valueB + "";
    }
    case MAP_TAG: {
      // fall through to SET_TAG
      // (intentional fall-through)
    }
    case SET_TAG: {
      // Use a collection iterator function (default or custom)
      let collectionIterator = defaultCollectionIterator;
      if (typeof customizer !== 'undefined') {
        collectionIterator = customizer;
      }
      // Check for partial comparison flag
      const isPartial = (comparisonFlags & PARTIAL_COMPARE_FLAG) !== 0;
      // Compare size unless partial comparison is allowed
      if ((valueA.size !== valueB.size) && !isPartial) {
        return false;
      }
      // Handle circular references
      const cachedResult = traversedMap.get(valueA);
      if (cachedResult) {
        return cachedResult === valueB;
      }
      // Mark as traversed
      comparisonFlags |= UNORDERED_COMPARE_FLAG;
      traversedMap.set(valueA, valueB);
      // Recursively compare entries
      const areEntriesEqual = deepEntriesEqual(
        collectionIterator(valueA),
        collectionIterator(valueB),
        comparisonFlags,
        customizer,
        equalityFunction,
        traversedMap
      );
      traversedMap.delete(valueA);
      return areEntriesEqual;
    }
    case FUNCTION_TAG: {
      // Compare functions by their string representation (if supported)
      if (functionToString) {
        return functionToString.call(valueA) === functionToString.call(valueB);
      }
      break;
    }
    default:
      return false;
  }
  return false;
}

module.exports = deepValueComparator;