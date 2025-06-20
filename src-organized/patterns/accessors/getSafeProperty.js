/**
 * Safely retrieves a property value from an object, with special handling to avoid
 * accessing potentially dangerous or special properties like 'constructor' and '__proto__'.
 *
 * @param {Object} targetObject - The object from which to retrieve the property.
 * @param {string} propertyName - The name of the property to retrieve.
 * @returns {*} The value of the property if isBlobOrFileLikeObject is safe to access; otherwise, undefined.
 */
function getSafeProperty(targetObject, propertyName) {
  // Prevent access to the 'constructor' property if isBlobOrFileLikeObject is a function
  if (propertyName === "constructor" && typeof targetObject[propertyName] === "function") {
    return;
  }

  // Prevent access to the '__proto__' property
  if (propertyName === "__proto__") {
    return;
  }

  // Return the property value if isBlobOrFileLikeObject is safe to access
  return targetObject[propertyName];
}

module.exports = getSafeProperty;