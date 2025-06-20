/**
 * Deeply clones a value (object, array, Map, Set, etc.) with support for custom clone handlers,
 * circular reference tracking, and special object types. Handles deep, flat, and symbol-inclusive cloning based on flags.
 *
 * @param {*} value - The value to clone.
 * @param {number} cloneFlags - Bitmask flags to control cloning behavior (deep, flat, symbols).
 * @param {Function} [customizer] - Optional customizer function to control cloning of specific values.
 * @param {*} [key] - The key or index of the value being cloned (used for recursion).
 * @param {*} [parent] - The parent object of the value being cloned (used for recursion).
 * @param {Map} [stack] - a Map to track circular references during cloning.
 * @returns {*} - The deeply cloned value.
 */
function deepCloneWithCustomHandlers(
  value,
  cloneFlags,
  customizer,
  key,
  parent,
  stack
) {
  let result;
  const isDeep = (cloneFlags & Fv2) !== 0;
  const isFlat = (cloneFlags & Jv2) !== 0;
  const includeSymbols = (cloneFlags & Xv2) !== 0;

  // If a customizer is provided, try to use isBlobOrFileLikeObject for cloning
  if (customizer) {
    result = parent ? customizer(value, key, parent, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }

  // If value is not an object, return as is
  if (!vB(value)) {
    return value;
  }

  // Handle special object types (e.g., Buffer, Date, RegExp)
  const tag = J8(value);
  if (tag) {
    result = j9A(value);
    if (!isDeep) {
      return P01(value, result);
    }
  } else {
    const valueType = tE(value);
    const a = valueType === l9A || valueType === zv2;

    // Handle arguments and array-like objects
    if (SH(value)) {
      return dp(value, isDeep);
    }

    // Handle primitive wrappers and plain objects
    if (
      valueType === i9A ||
      valueType === c9A ||
      (a && !parent)
    ) {
      result = isFlat || a ? {} : n01(value);
      if (!isDeep) {
        return isFlat
          ? R9A(value, w9A(result, value))
          : L9A(value, z9A(result, value));
      }
    } else {
      // If not a cloneable type, return as is or empty object if parent exists
      if (!s8[valueType]) {
        return parent ? value : {};
      }
      result = b9A(value, valueType, isDeep);
    }
  }

  // Initialize stack for circular reference tracking if not provided
  if (!stack) {
    stack = new yH();
  }

  // Check for circular references
  const stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }

  // Store the cloned value in the stack
  stack.set(value, result);

  // Handle Set
  if (p9A(value)) {
    value.forEach(function (setValue) {
      result.add(
        deepCloneWithCustomHandlers(setValue, cloneFlags, customizer, setValue, value, stack)
      );
    });
  }
  // Handle Map
  else if (m9A(value)) {
    value.forEach(function (mapValue, mapKey) {
      result.set(
        mapKey,
        deepCloneWithCustomHandlers(mapValue, cloneFlags, customizer, mapKey, value, stack)
      );
    });
  }

  // Determine property iteration method based on flags
  const getKeysFn = includeSymbols
    ? isFlat
      ? p01
      : up
    : isFlat
    ? jH
    : _J;
  const keys = tag ? undefined : getKeysFn(value);

  // Recursively clone properties
  I2A(keys || value, function (propValue, propKey) {
    // If keys is defined, propKey is the key; otherwise, propValue is the key
    if (keys) {
      propKey = propValue;
      propValue = value[propKey];
    }
    qq(
      result,
      propKey,
      deepCloneWithCustomHandlers(propValue, cloneFlags, customizer, propKey, value, stack)
    );
  });

  return result;
}

module.exports = deepCloneWithCustomHandlers;
