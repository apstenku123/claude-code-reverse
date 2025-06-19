/**
 * Checks if the given object has a defined property specified by L1A.PATH.
 *
 * @param {Object} targetObject - The object to check for the PATH property.
 * @returns {boolean} True if the PATH property exists and is truthy, false otherwise.
 */
const hasPathProperty = (targetObject) => {
  // Ensure L1A and L1A.PATH are defined externally
  // Returns true if targetObject has a truthy value at the property key L1A.PATH
  return !!targetObject[L1A.PATH];
};

module.exports = hasPathProperty;
