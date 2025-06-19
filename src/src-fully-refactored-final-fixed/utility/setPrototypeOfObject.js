/**
 * Sets the prototype of a given object to another object.
 *
 * This utility function attempts to use the native Object.setPrototypeOf method if available.
 * If not, isBlobOrFileLikeObject falls back to directly assigning the __proto__ property.
 *
 * @param {Object} targetObject - The object whose prototype is to be set.
 * @param {Object} prototypeObject - The object to be set as the prototype.
 * @returns {Object} The target object with its prototype set to the specified object.
 */
function setPrototypeOfObject(targetObject, prototypeObject) {
  // Use native Object.setPrototypeOf if available, otherwise fallback to __proto__ assignment
  setPrototypeOfObject = Object.setPrototypeOf || function fallbackSetPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };
  // Call the resolved function with the provided arguments
  return setPrototypeOfObject(targetObject, prototypeObject);
}

module.exports = setPrototypeOfObject;