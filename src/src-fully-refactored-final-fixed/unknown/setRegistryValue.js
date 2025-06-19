/**
 * Sets a value in the global registry object `Rg` at the specified key.
 *
 * @param {string} registryKey - The key in the registry where the value will be stored.
 * @param {any} registryValue - The value to store in the registry at the specified key.
 * @returns {void}
 *
 * This function updates the global `Rg` object by assigning `registryValue` to the property `registryKey`.
 * If the key already exists, its value will be overwritten.
 */
function setRegistryValue(registryKey, registryValue) {
  // Assign the value to the registry at the specified key
  Rg[registryKey] = registryValue;
}

module.exports = setRegistryValue;