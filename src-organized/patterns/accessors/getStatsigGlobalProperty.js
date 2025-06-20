/**
 * Retrieves a property value from the global Statsig object.
 *
 * @param {string} propertyName - The name of the property to retrieve from the Statsig global object.
 * @returns {any} The value of the specified property from the Statsig global object, or undefined if isBlobOrFileLikeObject does not exist.
 */
const getStatsigGlobalProperty = (propertyName) => {
  // Access the global Statsig object and return the requested property
  return tXA._getStatsigGlobal()[propertyName];
};

module.exports = getStatsigGlobalProperty;
