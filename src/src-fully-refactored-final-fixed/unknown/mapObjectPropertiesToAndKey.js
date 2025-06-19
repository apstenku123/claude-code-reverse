/**
 * Transforms an input object into a new object with a single key (lH1.AND),
 * whose value is an array of objects, each containing a single property from the input object.
 *
 * Example:
 *   If inputObject = { foo: 1, bar: 2 } and lH1.AND = 'AND',
 *   returns: { AND: [ { foo: 1 }, { bar: 2 } ] }
 *
 * @param {Object} inputObject - The object whose properties will be mapped.
 * @returns {Object} An object with a single key (lH1.AND) mapping to an array of single-property objects.
 */
const mapObjectPropertiesToAndKey = (inputObject) => {
  // Get all property names of the input object
  const propertyNames = Object.keys(inputObject);

  // Map each property name to an object with that property and its value
  const mappedProperties = propertyNames.map((propertyName) => {
    return {
      [propertyName]: inputObject[propertyName]
    };
  });

  // Return an object with the lH1.AND key and the mapped properties array as its value
  return {
    [lH1.AND]: mappedProperties
  };
};

module.exports = mapObjectPropertiesToAndKey;
