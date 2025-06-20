/**
 * Adds the __esModule property to the target object and defines missing properties from the source object as getters.
 *
 * @function defineEsModuleAndProperties
 * @param {object} sourceObject - The source object whose properties will be defined on the target.
 * @returns {object} The target object with __esModule set to true and properties from the source object defined as getters.
 */
const defineEsModuleAndProperties = (sourceObject) => {
  // Create a target object with the __esModule property set to true
  const targetObject = i81({}, "__esModule", { value: true });

  // Define missing properties from the source object onto the target object as getters
  return defineMissingPropertiesWithGetters(targetObject, sourceObject);
};

module.exports = defineEsModuleAndProperties;
