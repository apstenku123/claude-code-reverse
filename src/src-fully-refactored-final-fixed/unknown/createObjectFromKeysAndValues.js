/**
 * Creates an object by mapping each key from the keysArray to the corresponding value in the valuesArray.
 *
 * @param {Array<string|number>} keysArray - An array of keys to be used as the object'createInteractionAccessor property names.
 * @param {Array<any>} valuesArray - An array of values to be assigned to the corresponding keys.
 * @returns {Object} An object composed of keys from keysArray and values from valuesArray.
 */
function createObjectFromKeysAndValues(keysArray, valuesArray) {
  return keysArray.reduce((resultObject, currentKey, index) => {
    // Assign the value from valuesArray at the current index to the currentKey in the resultObject
    resultObject[currentKey] = valuesArray[index];
    return resultObject;
  }, {});
}

module.exports = createObjectFromKeysAndValues;