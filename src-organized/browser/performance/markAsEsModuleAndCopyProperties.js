/**
 * Marks the provided object as an ES module and copies all own properties (including symbols)
 * from the source object to a new target object as getter properties, excluding the '__esModule' property.
 * Properties are only copied if they do not already exist on the target object. The enumerability of each property is preserved if possible.
 *
 * @param {object} sourceObject - The object whose properties will be copied to the ES module-marked target.
 * @returns {object} a new object marked as an ES module with all properties from the source object copied as getters.
 */
const markAsESModuleAndCopyProperties = (sourceObject) => {
  // Create a new object with the __esModule property set to true
  const esModuleTarget = DX1({}, "__esModule", {
    value: true
  });

  // Copy all own properties (including symbols) from the source object to the target
  // as getter properties, excluding the '__esModule' property
  return copyPropertiesWithGetters(esModuleTarget, sourceObject);
};

module.exports = markAsESModuleAndCopyProperties;