/**
 * Sets the prototype of a given object to another object.
 * Uses Object.setPrototypeOf if available; otherwise, falls back to assigning __proto__ directly.
 *
 * @param {Object} targetObject - The object whose prototype is to be set.
 * @param {Object} prototypeObject - The object to set as the prototype.
 * @returns {Object} The target object with its prototype set to the specified object.
 */
function setPrototypeOfOrAssignProto(targetObject, prototypeObject) {
  // Use Object.setPrototypeOf if available, otherwise assign __proto__ directly
  setPrototypeOfOrAssignProto = Object.setPrototypeOf || function fallbackSetPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };
  // Call the resolved function with the provided arguments
  return setPrototypeOfOrAssignProto(targetObject, prototypeObject);
}

module.exports = setPrototypeOfOrAssignProto;