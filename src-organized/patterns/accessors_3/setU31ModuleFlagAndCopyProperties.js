/**
 * Sets the __esModule property to true on a new object and copies all own properties
 * from the provided source object to this new object using getters, except for properties
 * that already exist or are excluded by the copyMissingPropertiesWithGetters function.
 *
 * @param {Object} sourceObject - The object whose properties will be copied to the new object.
 * @returns {Object} a new object with __esModule: true and all properties from sourceObject copied as getters.
 */
const copyMissingPropertiesWithGetters = require('utils/type_4/copyMissingPropertiesWithGetters');
const u31 = require('./u31');

function setU31ModuleFlagAndCopyProperties(sourceObject) {
  // Create a new object with the __esModule property set to true
  const moduleFlaggedObject = u31({}, "__esModule", { value: true });

  // Copy all own properties from sourceObject to moduleFlaggedObject as getters,
  // except for properties that already exist or are excluded
  return copyMissingPropertiesWithGetters(moduleFlaggedObject, sourceObject);
}

module.exports = setU31ModuleFlagAndCopyProperties;