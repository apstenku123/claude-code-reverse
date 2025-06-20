/**
 * Creates an object by mapping each key from the keysArray to the corresponding value from the valuesArray.
 *
 * @param {Array<string|number>} keysArray - An array of keys to be used as the object'createInteractionAccessor properties.
 * @param {Array<any>} valuesArray - An array of values to be assigned to the corresponding keys.
 * @returns {Object} An object where each key from keysArray is mapped to the value at the same index in valuesArray.
 */
function mapKeysToValues(keysArray, valuesArray) {
  return keysArray.reduce((resultObject, currentKey, index) => {
    // Assign the value from valuesArray at the current index to the corresponding key in resultObject
    resultObject[currentKey] = valuesArray[index];
    return resultObject;
  }, {});
}

module.exports = mapKeysToValues;