/**
 * Sets the prototype of a given object to another object, using Object.setPrototypeOf if available,
 * otherwise falls back to using the deprecated __proto__ property for compatibility.
 *
 * @param {Object} targetObject - The object whose prototype will be set.
 * @param {Object|null} prototypeObject - The object to set as the prototype, or null.
 * @returns {Object} The target object with its prototype set to the specified prototype object.
 */
function setPrototypeOfCompat(targetObject, prototypeObject) {
  // Use Object.setPrototypeOf if available, otherwise fallback to __proto__
  const setPrototype = Object.setPrototypeOf || function fallbackSetPrototype(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };
  return setPrototype(targetObject, prototypeObject);
}

module.exports = setPrototypeOfCompat;