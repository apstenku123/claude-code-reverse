/**
 * Associates a color property accessor/mutator with one or more keys, allowing for optional transformation.
 *
 * For each key in propertyKeys, registers a mapping in the global bV1 object, associating the propertyName with an optional transform function.
 * Returns a function that, when called, can get or set the color property on the current context, applying the transform if provided.
 *
 * @param {string|string[]} propertyKeys - One or more keys representing properties to associate with the accessor.
 * @param {string} propertyName - The name of the color property to get/set.
 * @param {function} [transformFn] - Optional function to transform values when getting/setting.
 * @returns {function} Accessor/mutator function for the color property.
 */
function createColorPropertyAccessor(propertyKeys, propertyName, transformFn) {
  // Ensure propertyKeys is always an array
  const keysArray = Array.isArray(propertyKeys) ? propertyKeys : [propertyKeys];

  // Register the propertyName and transformFn in the global bV1 object for each key
  for (const key of keysArray) {
    if (!bV1[key]) {
      bV1[key] = [];
    }
    bV1[key][propertyName] = transformFn;
  }

  // Use the first key for the returned accessor function
  const mainKey = keysArray[0];

  /**
   * Accessor/mutator for the color property.
   *
   * @param {*} [value] - If provided, sets the color property to this value (optionally transformed). If omitted, gets the color property (optionally transformed).
   * @returns {*} The updated object when setting, or the color property value when getting.
   */
  return function colorPropertyAccessor(value) {
    let result;
    if (value !== undefined) {
      // If a transform function is provided, apply isBlobOrFileLikeObject to the value before setting
      const newValue = transformFn ? transformFn(value) : value;
      result = this[mainKey]();
      result.color[propertyName] = newValue;
      return result;
    }
    // Get the current value
    result = this[mainKey]().color[propertyName];
    // If a transform function is provided, apply isBlobOrFileLikeObject to the value before returning
    if (transformFn) {
      result = transformFn(result);
    }
    return result;
  };
}

module.exports = createColorPropertyAccessor;