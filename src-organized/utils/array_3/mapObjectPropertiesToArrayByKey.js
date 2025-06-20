/**
 * Maps the properties of the input object to an array of key-value objects,
 * and returns an object with a single property whose key is lH1.AND and value is the array.
 *
 * @param {Object} sourceObject - The object whose properties will be mapped.
 * @returns {Object} An object with a single property (lH1.AND) containing an array of key-value objects.
 */
const mapObjectPropertiesToArrayByKey = (sourceObject) => ({
  // Use lH1.AND as the key, and map each property of sourceObject to a { key: value } object
  [lH1.AND]: Object.keys(sourceObject).map((propertyKey) => ({
    [propertyKey]: sourceObject[propertyKey]
  }))
});

module.exports = mapObjectPropertiesToArrayByKey;
