/**
 * Assigns a value from the config object to the target array at a specific index,
 * only if the value is not null/undefined and less than the global threshold N89.
 *
 * @param {Array<any>} targetArray - The array to assign the value into.
 * @param {Object} configObject - The object containing possible values.
 * @param {string|number} configKey - The key to look up in the configObject.
 * @param {number} targetIndex - The index in targetArray to assign the value to.
 * @returns {void}
 */
function assignIfValidConfigValue(targetArray, configObject, configKey, targetIndex) {
  // Retrieve the value from the config object using the provided key
  const configValue = configObject[configKey];

  // Only assign if the value is not null/undefined and less than the threshold N89
  if (configValue != null && configValue < N89) {
    targetArray[targetIndex] = configValue;
  }
}

module.exports = assignIfValidConfigValue;