/**
 * Converts a FormData object into a nested plain JavaScript object, handling array and object keys,
 * and preventing prototype pollution. Supports complex keys (e.g., 'user[address][city]') by parsing them into nested objects/arrays.
 *
 * @param {FormData} formData - The FormData instance to convert.
 * @returns {Object|null} The resulting nested object, or null if input is not valid FormData.
 */
function parseFormDataToObject(formData) {
  /**
   * Recursively assigns a value to the nested object structure based on the key path array.
   * Handles arrays, objects, and prevents prototype pollution via '__proto__'.
   *
   * @param {string[]} keyPathArray - Array of key segments (e.g., ['user', 'address', 'city']).
   * @param {*} value - The value to assign.
   * @param {Object|Array} targetObject - The current object/array being traversed.
   * @param {number} keyPathIndex - The current index in the keyPathArray.
   * @returns {boolean} True if prototype pollution was detected, otherwise false.
   */
  function assignValueByKeyPath(keyPathArray, value, targetObject, keyPathIndex) {
    let currentKey = keyPathArray[keyPathIndex++];

    // Prevent prototype pollution
    if (currentKey === "__proto__") return true;

    const isFiniteIndex = Number.isFinite(+currentKey);
    const isLastKey = keyPathIndex >= keyPathArray.length;

    // If currentKey is falsy (e.g., empty string) and targetObject is an array, use array length as key
    if (!currentKey && DA.isArray(targetObject)) {
      currentKey = targetObject.length;
    }

    if (isLastKey) {
      // If the property already exists, convert to array to support multiple values for the same key
      if (DA.hasOwnProp(targetObject, currentKey)) {
        targetObject[currentKey] = [targetObject[currentKey], value];
      } else {
        targetObject[currentKey] = value;
      }
      // Return true if currentKey is NOT a finite index (i.e., not an array index)
      return !isFiniteIndex;
    }

    // If the next level does not exist or is not an object, initialize as array
    if (!targetObject[currentKey] || !DA.isObject(targetObject[currentKey])) {
      targetObject[currentKey] = [];
    }

    // Recursively assign value to the next level
    if (
      assignValueByKeyPath(keyPathArray, value, targetObject[currentKey], keyPathIndex) &&
      DA.isArray(targetObject[currentKey])
    ) {
      // If prototype pollution detected and current is array, sanitize with shallowCloneObject
      targetObject[currentKey] = shallowCloneObject(targetObject[currentKey]);
    }
    return !isFiniteIndex;
  }

  // Validate input is FormData and has entries method
  if (DA.isFormData(formData) && DA.isFunction(formData.entries)) {
    const resultObject = {};
    // Iterate over each entry in the FormData
    DA.forEachEntry(formData, (entryKey, entryValue) => {
      // Parse the key into a path array (e.g., 'user[address][city]' => ['user', 'address', 'city'])
      const keyPathArray = PV9(entryKey);
      assignValueByKeyPath(keyPathArray, entryValue, resultObject, 0);
    });
    return resultObject;
  }
  // Return null if input is not valid FormData
  return null;
}

module.exports = parseFormDataToObject;