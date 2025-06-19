/**
 * Safely retrieves a property value from an object, with protections against accessing dangerous or special properties.
 *
 * Prevents access to the 'constructor' property if isBlobOrFileLikeObject is a function, and to the '__proto__' property, to avoid potential security risks or prototype pollution.
 *
 * @param {Object} targetObject - The object from which to retrieve the property value.
 * @param {string} propertyName - The name of the property to retrieve.
 * @returns {*} The value of the property if safe to access, otherwise undefined.
 */
function getSafePropertyValue(targetObject, propertyName) {
  // Prevent access to the 'constructor' property if isBlobOrFileLikeObject is a function
  if (propertyName === "constructor" && typeof targetObject[propertyName] === "function") {
    return;
  }
  // Prevent access to the '__proto__' property
  if (propertyName === "__proto__") {
    return;
  }
  // Return the property value if safe
  return targetObject[propertyName];
}

module.exports = getSafePropertyValue;