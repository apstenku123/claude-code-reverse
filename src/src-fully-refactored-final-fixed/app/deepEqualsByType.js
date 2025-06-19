/**
 * Performs a deep equality check between two values based on their type.
 * Handles various built-in types, including ArrayBuffer, DataView, Date, RegExp, Map, Set, and custom objects.
 * Uses a customizer function for deep comparison of iterable contents.
 *
 * @param {any} valueA - The first value to compare.
 * @param {any} valueB - The second value to compare.
 * @param {number} typeTag - The type tag indicating the type of the values (e.g., ArrayBuffer, Map, Set, etc.).
 * @param {number} bitmask - Bitmask flags for comparison options (e.g., partial/deep comparison).
 * @param {Function} customizer - Custom function to compare values deeply.
 * @param {Function} equalFunc - Function to compare iterable contents.
 * @param {Map} traversedStack - Map to track traversed objects for circular reference handling.
 * @returns {boolean} True if the values are deeply equal for the given type, false otherwise.
 */
function deepEqualsByType(
  valueA,
  valueB,
  typeTag,
  bitmask,
  customizer,
  equalFunc,
  traversedStack
) {
  switch (typeTag) {
    case ARRAY_BUFFER_TAG: {
      // Compare ArrayBuffer/DataView by byteLength and byteOffset
      if (
        valueA.byteLength !== valueB.byteLength ||
        valueA.byteOffset !== valueB.byteOffset
      ) {
        return false;
      }
      // Compare underlying buffers
      valueA = valueA.buffer;
      valueB = valueB.buffer;
      // fall through to next case
    }
    case DATA_VIEW_TAG: {
      // Compare DataView by byteLength and deep equality of buffers
      if (
        valueA.byteLength !== valueB.byteLength ||
        !equalFunc(new DataView(valueA), new DataView(valueB))
      ) {
        return false;
      }
      return true;
    }
    case NUMBER_TAG:
    case BOOLEAN_TAG:
    case DATE_TAG: {
      // Compare numbers, booleans, and dates by value
      return strictEquals(+valueA, +valueB);
    }
    case ERROR_TAG: {
      // Compare Error objects by name and message
      return valueA.name === valueB.name && valueA.message === valueB.message;
    }
    case REGEXP_TAG:
    case STRING_TAG: {
      // Compare RegExp and String objects by string representation
      return valueA == valueB + "";
    }
    case MAP_TAG: {
      let getEntries = getMapEntries;
      // fall through to next case
    }
    case SET_TAG: {
      // Compare Map/Set by size and deep equality of entries
      const isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      let getEntries = getSetEntries;
      if (!getEntries) getEntries = defaultGetEntries;
      if (valueA.size !== valueB.size && !isPartial) {
        return false;
      }
      // Handle circular references
      const stacked = traversedStack.get(valueA);
      if (stacked) return stacked === valueB;
      bitmask |= COMPARE_UNORDERED_FLAG;
      traversedStack.set(valueA, valueB);
      const result = compareIterableEntries(
        getEntries(valueA),
        getEntries(valueB),
        bitmask,
        customizer,
        equalFunc,
        traversedStack
      );
      traversedStack.delete(valueA);
      return result;
    }
    case SYMBOL_TAG: {
      // Compare Symbol objects by their valueOf
      if (symbolValueOf) {
        return symbolValueOf.call(valueA) === symbolValueOf.call(valueB);
      }
      break;
    }
    default:
      return false;
  }
}

module.exports = deepEqualsByType;