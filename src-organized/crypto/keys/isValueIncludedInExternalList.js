/**
 * Checks if a computed value derived from the provided arguments exists within an external list.
 *
 * This function first performs an external side-effect with the provided key, then computes a value
 * using the given source and field, and finally checks if this computed value is included in a list
 * associated with the key.
 *
 * @param {any} source - The source object or value to compute from.
 * @param {any} field - The field or parameter used in the computation.
 * @param {string} key - The key used for both the side-effect and to access the external list.
 * @returns {boolean} True if the computed value is included in the external list for the key; otherwise, false.
 */
function isValueIncludedInExternalList(source, field, key) {
  // Perform an external side-effect with the provided key
  b9(key);

  // Compute a value based on the source and field
  const computedValue = createClassHandle(source, field);

  // Check if the computed value exists in the external list associated with the key
  return X0[key].includes(computedValue);
}

module.exports = isValueIncludedInExternalList;