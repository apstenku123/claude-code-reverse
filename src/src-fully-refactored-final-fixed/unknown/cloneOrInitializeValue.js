/**
 * Clones or initializes a value for deep-copying or merging operations, handling various data types and circular references.
 *
 * @param {any} sourceValue - The original value to clone or initialize.
 * @param {any} targetValue - The target value to clone from, or use as a template.
 * @param {string|number} propertyKey - The property key or index being processed.
 * @param {Function} processValue - Callback to process the cloned/initialized value recursively.
 * @param {Function} customizer - Optional customizer function to override cloning behavior.
 * @param {Map} cloneMap - Map to track already cloned values and handle circular references.
 * @param {Function} assignClonedValue - Function to assign the cloned value back to the source.
 * @returns {void}
 */
function cloneOrInitializeValue(
  sourceValue,
  targetValue,
  propertyKey,
  processValue,
  customizer,
  cloneMap,
  assignClonedValue
) {
  // Compute the source and target property values
  const sourcePropValue = lp(sourceValue, propertyKey);
  const targetPropValue = lp(targetValue, propertyKey);

  // Check if handleMissingDoctypeError'removeTrailingCharacters already cloned this value (circular reference handling)
  const existingClone = cloneMap.get(targetPropValue);
  if (existingClone) {
    assignClonedValue(sourceValue, propertyKey, existingClone);
    return;
  }

  // Allow customizer to override cloning behavior
  let cloneResult = customizer ? customizer(sourcePropValue, targetPropValue, String(propertyKey), sourceValue, targetValue, cloneMap) : undefined;
  let shouldRecurse = cloneResult === undefined;

  if (shouldRecurse) {
    const isArray = J8(targetPropValue);
    const isBuffer = !isArray && SH(targetPropValue);
    const isTypedArray = !isArray && !isBuffer && Ey(targetPropValue);

    cloneResult = targetPropValue;
    if (isArray || isBuffer || isTypedArray) {
      // Handle arrays, buffers, and typed arrays
      if (J8(sourcePropValue)) {
        cloneResult = sourcePropValue;
      } else if ($4A(sourcePropValue)) {
        cloneResult = P01(sourcePropValue);
      } else if (isBuffer) {
        shouldRecurse = false;
        cloneResult = dp(targetPropValue, true);
      } else if (isTypedArray) {
        shouldRecurse = false;
        cloneResult = i01(targetPropValue, true);
      } else {
        cloneResult = [];
      }
    } else if (mp(targetPropValue) || rE(targetPropValue)) {
      // Handle plain objects and arguments objects
      cloneResult = sourcePropValue;
      if (rE(sourcePropValue)) {
        cloneResult = q4A(sourcePropValue);
      } else if (!vB(sourcePropValue) || Vy(sourcePropValue)) {
        cloneResult = n01(targetPropValue);
      }
    } else {
      // Not a cloneable type; skip recursion
      shouldRecurse = false;
    }
  }

  // If handleMissingDoctypeError should recurse, add to map, process recursively, then remove from map
  if (shouldRecurse) {
    cloneMap.set(targetPropValue, cloneResult);
    processValue(cloneResult, targetPropValue, propertyKey, customizer, cloneMap);
    cloneMap.delete(targetPropValue);
  }

  // Assign the cloned or initialized value back to the source
  assignClonedValue(sourceValue, propertyKey, cloneResult);
}

module.exports = cloneOrInitializeValue;
