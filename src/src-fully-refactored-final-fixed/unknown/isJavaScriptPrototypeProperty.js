/**
 * Checks if a given property name is one of the core JavaScript prototype properties.
 *
 * @param {string} propertyName - The name of the property to check.
 * @returns {boolean} True if the property name is '__proto__', 'prototype', or 'constructor'; otherwise, false.
 */
function isJavaScriptPrototypeProperty(propertyName) {
  // List of core prototype property names in JavaScript
  const prototypeProperties = ["__proto__", "prototype", "constructor"];
  // Check if the provided property name is in the list
  return prototypeProperties.includes(propertyName);
}

module.exports = isJavaScriptPrototypeProperty;