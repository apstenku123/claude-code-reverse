/**
 * Creates an ES module-like object by marking the target as an ES module and copying all own properties from the source object as getters.
 *
 * @param {object} sourceObject - The object whose properties will be copied as getters to the ES module object.
 * @returns {object} a new object marked as an ES module with all properties from the source object accessible as getters.
 */
const createESModuleWithAccessors = (sourceObject) => {
  // Create a new object with the __esModule property set to true
  const esModuleObject = gX1({}, "__esModule", { value: true });

  // Copy all own properties from the source object as getters, preserving enumerability
  return copyMissingPropertiesWithGetters(esModuleObject, sourceObject);
};

module.exports = createESModuleWithAccessors;