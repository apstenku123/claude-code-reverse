/**
 * Checks if the provided property name is one of the keys commonly associated with prototype pollution vulnerabilities.
 *
 * @param {string} propertyName - The property name to check for prototype pollution risk.
 * @returns {boolean} Returns true if the property name is '__proto__', 'prototype', or 'constructor'; otherwise, false.
 */
function isPrototypePollutionKey(propertyName) {
  // List of keys that can cause prototype pollution if assigned
  const prototypePollutionKeys = ["__proto__", "prototype", "constructor"];
  return prototypePollutionKeys.includes(propertyName);
}

module.exports = isPrototypePollutionKey;