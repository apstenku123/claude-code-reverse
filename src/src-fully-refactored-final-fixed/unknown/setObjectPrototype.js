/**
 * Sets the prototype of a given object to a specified prototype object.
 * Uses Object.setPrototypeOf if available, otherwise falls back to setting __proto__ directly.
 *
 * @param {Object} targetObject - The object whose prototype will be set.
 * @param {Object} prototypeObject - The object to set as the prototype.
 * @returns {Object} The target object with its prototype set to the specified prototype object.
 */
function setObjectPrototype(targetObject, prototypeObject) {
  // Use Object.setPrototypeOf if available, otherwise use __proto__ fallback
  const setPrototype = Object.setPrototypeOf || function fallbackSetPrototype(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };
  return setPrototype(targetObject, prototypeObject);
}

module.exports = setObjectPrototype;