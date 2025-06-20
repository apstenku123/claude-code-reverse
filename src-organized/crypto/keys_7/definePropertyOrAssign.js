/**
 * Defines a property on the target object, using Object.defineProperty if the property name is '__proto__' and the Ky function is available.
 * Otherwise, assigns the value directly to the property on the target object.
 *
 * @param {Object} targetObject - The object on which to define or assign the property.
 * @param {string} propertyName - The name of the property to define or assign.
 * @param {*} propertyValue - The value to set for the property.
 */
function definePropertyOrAssign(targetObject, propertyName, propertyValue) {
  // If the property is '__proto__' and Ky is available, use Ky to define the property with specific descriptors
  if (propertyName === "__proto__" && typeof Ky === "function") {
    Ky(targetObject, propertyName, {
      configurable: true,
      enumerable: true,
      value: propertyValue,
      writable: true
    });
  } else {
    // Otherwise, assign the value directly
    targetObject[propertyName] = propertyValue;
  }
}

module.exports = definePropertyOrAssign;