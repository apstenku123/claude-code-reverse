/**
 * Recursively compares and merges two values (objects, arrays, primitives, or dates),
 * validating that their structures and values are compatible. If compatible, returns
 * a merged result; otherwise, indicates invalidity.
 *
 * @param {*} sourceValue - The first value to compare and merge (e.g., a source object).
 * @param {*} targetValue - The second value to compare and merge (e.g., a target object).
 * @returns {{valid: boolean, data?: *}} An object indicating if the merge is valid, and the merged data if so.
 */
function deepMergeAndValidate(sourceValue, targetValue) {
  const sourceType = getTypeDescriptor(sourceValue);
  const targetType = getTypeDescriptor(targetValue);

  // If both values are strictly equal, return as valid with the value
  if (sourceValue === targetValue) {
    return {
      valid: true,
      data: sourceValue
    };
  }

  // If both are plain objects, recursively merge and validate their common keys
  if (sourceType === T2.object && targetType === T2.object) {
    const targetKeys = a6.objectKeys(targetValue);
    // Only consider keys present in both objects
    const commonKeys = a6.objectKeys(sourceValue).filter(key => targetKeys.indexOf(key) !== -1);
    // Start with a shallow merge of both objects
    const mergedObject = {
      ...sourceValue,
      ...targetValue
    };
    for (const key of commonKeys) {
      const result = deepMergeAndValidate(sourceValue[key], targetValue[key]);
      if (!result.valid) {
        return { valid: false };
      }
      mergedObject[key] = result.data;
    }
    return {
      valid: true,
      data: mergedObject
    };
  }

  // If both are arrays, compare lengths and recursively merge/validate each element
  if (sourceType === T2.array && targetType === T2.array) {
    if (sourceValue.length !== targetValue.length) {
      return { valid: false };
    }
    const mergedArray = [];
    for (let index = 0; index < sourceValue.length; index++) {
      const sourceElement = sourceValue[index];
      const targetElement = targetValue[index];
      const result = deepMergeAndValidate(sourceElement, targetElement);
      if (!result.valid) {
        return { valid: false };
      }
      mergedArray.push(result.data);
    }
    return {
      valid: true,
      data: mergedArray
    };
  }

  // If both are dates and represent the same time, consider valid
  if (sourceType === T2.date && targetType === T2.date && +sourceValue === +targetValue) {
    return {
      valid: true,
      data: sourceValue
    };
  }

  // For all other cases, the values are not compatible
  return { valid: false };
}

module.exports = deepMergeAndValidate;