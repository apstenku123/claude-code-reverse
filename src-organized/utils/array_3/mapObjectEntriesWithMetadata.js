/**
 * Maps the enumerable own properties of an object to an array of [key, value, metadata] triples.
 * For each property, the key, its value, and the result of applying `A21` to the value are included.
 *
 * @param {Object} sourceObject - The object whose own enumerable properties will be mapped.
 * @returns {Array<[string, any, any]>} An array of triples: [propertyKey, propertyValue, metadata].
 */
function mapObjectEntriesWithMetadata(sourceObject) {
  // Get all own enumerable property names of the source object
  const propertyKeys = _J(sourceObject);
  const totalProperties = propertyKeys.length;

  // Iterate backwards through the property keys array
  for (let index = totalProperties - 1; index >= 0; index--) {
    const propertyKey = propertyKeys[index];
    const propertyValue = sourceObject[propertyKey];
    // Replace the key in the array with a [key, value, metadata] triple
    propertyKeys[index] = [propertyKey, propertyValue, A21(propertyValue)];
  }

  return propertyKeys;
}

module.exports = mapObjectEntriesWithMetadata;