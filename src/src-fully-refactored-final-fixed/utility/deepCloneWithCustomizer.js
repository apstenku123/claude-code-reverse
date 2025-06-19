/**
 * Deeply clones a value, supporting custom cloning logic and handling circular references.
 *
 * @param {*} sourceValue - The value to clone.
 * @param {number} cloneFlags - Bitmask flags controlling clone behavior (e.g., deep, flat, symbols).
 * @param {Function} [customizer] - Optional function to customize cloning of values.
 * @param {*} [key] - The key or index of the value being cloned (used for recursion).
 * @param {*} [parent] - The parent object of the value being cloned (used for recursion).
 * @param {Map} [stack] - a Map to track circular references during cloning.
 * @returns {*} - The deeply cloned value.
 */
function deepCloneWithCustomizer(
  sourceValue,
  cloneFlags,
  customizer,
  key,
  parent,
  stack
) {
  let result;
  const isDeep = (cloneFlags & Fv2) !== 0;
  const isFlat = (cloneFlags & Jv2) !== 0;
  const isFull = (cloneFlags & Xv2) !== 0;

  // Allow customizer to override cloning
  if (customizer) {
    result = parent ? customizer(sourceValue, key, parent, stack) : customizer(sourceValue);
  }
  if (result !== undefined) return result;

  // Return primitives as-is
  if (!vB(sourceValue)) return sourceValue;

  // Handle array-like objects
  const isArray = J8(sourceValue);
  if (isArray) {
    result = j9A(sourceValue);
    if (!isDeep) return P01(sourceValue, result);
  } else {
    const tag = tE(sourceValue);
    const isBuffer = tag === l9A || tag === zv2;
    if (SH(sourceValue)) return dp(sourceValue, isDeep);
    if (tag === i9A || tag === c9A || (isBuffer && !parent)) {
      result = isFlat || isBuffer ? {} : n01(sourceValue);
      if (!isDeep) {
        return isFlat
          ? R9A(sourceValue, w9A(result, sourceValue))
          : L9A(sourceValue, z9A(result, sourceValue));
      }
    } else {
      // If type is not cloneable, return as-is or empty object
      if (!s8[tag]) return parent ? sourceValue : {};
      result = b9A(sourceValue, tag, isDeep);
    }
  }

  // Initialize stack for circular reference tracking
  if (!stack) stack = new yH();
  const stacked = stack.get(sourceValue);
  if (stacked) return stacked;
  stack.set(sourceValue, result);

  // Handle Set
  if (p9A(sourceValue)) {
    sourceValue.forEach(function (subValue) {
      result.add(deepCloneWithCustomizer(subValue, cloneFlags, customizer, subValue, sourceValue, stack));
    });
  }
  // Handle Map
  else if (m9A(sourceValue)) {
    sourceValue.forEach(function (subValue, subKey) {
      result.set(subKey, deepCloneWithCustomizer(subValue, cloneFlags, customizer, subKey, sourceValue, stack));
    });
  }

  // Determine property iteration function
  const propertyIterateFn = isFull
    ? (isFlat ? p01 : up)
    : (isFlat ? jH : _J);
  const props = isArray ? undefined : propertyIterateFn(sourceValue);

  // Recursively clone properties
  I2A(props || sourceValue, function (subValue, subKey) {
    // If props is defined, subKey is the property name, subValue is the value
    // If props is undefined (array), subKey is index, subValue is value
    if (props) {
      subKey = subValue;
      subValue = sourceValue[subKey];
    }
    qq(result, subKey, deepCloneWithCustomizer(subValue, cloneFlags, customizer, subKey, sourceValue, stack));
  });

  return result;
}

module.exports = deepCloneWithCustomizer;