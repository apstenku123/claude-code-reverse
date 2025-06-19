/**
 * Checks if the provided property name is one of the keys that can cause prototype pollution.
 *
 * Prototype pollution can occur if properties like '__proto__', 'prototype', or 'constructor' are set on objects.
 * This function helps prevent such assignments by identifying these dangerous keys.
 *
 * @param {string} propertyName - The property name to check for prototype pollution risk.
 * @returns {boolean} True if the property name is '__proto__', 'prototype', or 'constructor'; otherwise, false.
 */
function isPrototypePollutingKey(propertyName) {
  // List of keys that can cause prototype pollution
  const prototypePollutingKeys = ["__proto__", "prototype", "constructor"];
  // Check if the provided property name is in the list
  return prototypePollutingKeys.includes(propertyName);
}

module.exports = isPrototypePollutingKey;